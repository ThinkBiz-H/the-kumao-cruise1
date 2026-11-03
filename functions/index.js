/**
 * The Kumaon Crest — Cloud Functions
 *
 * notifyOnEnquiry: fires when a document is created in `enquiries`
 * and emails the owner. SMTP credentials live in Secret Manager and
 * never reach the browser.
 */
import { initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { setGlobalOptions, logger } from 'firebase-functions/v2';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { defineInt, defineSecret, defineString } from 'firebase-functions/params';
import nodemailer from 'nodemailer';

initializeApp();

// ---- Configuration -------------------------------------------------------
// Secrets:  firebase functions:secrets:set SMTP_USER / SMTP_PASS
// Params:   functions/.env (see .env.example) or prompted on first deploy
const SMTP_USER = defineSecret('SMTP_USER');
const SMTP_PASS = defineSecret('SMTP_PASS');
const SMTP_HOST = defineString('SMTP_HOST', { default: 'smtp.gmail.com' });
const SMTP_PORT = defineInt('SMTP_PORT', { default: 465 });
const NOTIFY_EMAIL = defineString('NOTIFY_EMAIL', {
  description: 'Inbox that receives new enquiry notifications',
});
const MAIL_FROM_NAME = defineString('MAIL_FROM_NAME', { default: 'The Kumaon Crest Website' });
const FUNCTION_REGION = defineString('FUNCTION_REGION', {
  default: 'asia-south1',
  description: 'Must match your Firestore database location (e.g. asia-south1, us-central1 for nam5).',
});

const TIMEZONE = 'Asia/Kolkata';
const MAX_EVENT_AGE_MS = 60 * 60 * 1000; // stop retrying after an hour

setGlobalOptions({ region: FUNCTION_REGION, maxInstances: 5 });

// ---- Helpers --------------------------------------------------------------
const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const stripHeaderBreaks = (value) => String(value ?? '').replace(/[\r\n]+/g, ' ').trim();

function formatSubmittedAt(timestamp) {
  const date = timestamp?.toDate ? timestamp.toDate() : new Date();
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: TIMEZONE,
  }).format(date);
}

function buildEmail(enquiry, submittedAt, enquiryId) {
  const rows = [
    ['Name', enquiry.name],
    ['Email', enquiry.email],
    ['Phone', enquiry.phone],
    ['Company', enquiry.company || '—'],
    ['Subject', enquiry.subject],
    ['Submitted', `${submittedAt} (IST)`],
  ];

  const text = [
    'New enquiry from The Kumaon Crest website',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    enquiry.message,
    '',
    `Reference: ${enquiryId}`,
  ].join('\n');

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px 10px 0;color:#5a5248;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;color:#241f19;font-size:15px;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join('');

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#faf3e8;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf3e8;padding:24px 12px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:6px;overflow:hidden;border:1px solid #eadfcd;">
          <tr><td style="height:6px;background:#c1553a;"></td></tr>
          <tr><td style="padding:28px 28px 8px;">
            <p style="margin:0;color:#a3432c;font-size:12px;letter-spacing:.08em;text-transform:uppercase;">New website enquiry</p>
            <h1 style="margin:8px 0 0;font-family:Georgia,serif;font-weight:500;font-size:24px;color:#241f19;">${escapeHtml(enquiry.subject)}</h1>
          </td></tr>
          <tr><td style="padding:12px 28px 4px;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">${htmlRows}</table>
          </td></tr>
          <tr><td style="padding:12px 28px 28px;">
            <p style="margin:0 0 8px;color:#5a5248;font-size:13px;">Message</p>
            <div style="padding:16px 18px;background:#f2e8d8;border-left:3px solid #e8a33d;border-radius:3px;color:#241f19;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(enquiry.message)}</div>
            <p style="margin:24px 0 0;">
              <a href="mailto:${encodeURIComponent(enquiry.email)}?subject=${encodeURIComponent(`Re: ${enquiry.subject}`)}"
                 style="display:inline-block;background:#c1553a;color:#ffffff;text-decoration:none;padding:11px 22px;border-radius:3px;font-weight:600;font-size:14px;">Reply to ${escapeHtml(enquiry.name)}</a>
            </p>
          </td></tr>
          <tr><td style="padding:14px 28px;background:#1f4d3a;color:#cfe0d5;font-size:12px;">
            Reference ${escapeHtml(enquiryId)} · The Kumaon Crest, Kausani
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  return { text, html };
}

// ---- Trigger --------------------------------------------------------------
export const notifyOnEnquiry = onDocumentCreated(
  {
    document: 'enquiries/{enquiryId}',
    secrets: [SMTP_USER, SMTP_PASS],
    retry: true,
    timeoutSeconds: 60,
    memory: '256MiB',
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) return;

    const { enquiryId } = event.params;

    if (Date.now() - Date.parse(event.time) > MAX_EVENT_AGE_MS) {
      logger.error('Dropping stale enquiry notification after repeated failures', { enquiryId });
      return;
    }
    const docRef = getFirestore().collection('enquiries').doc(enquiryId);

    // Firestore triggers are at-least-once: claim the notification first
    // so a retried event never sends a second email.
    const claimed = await getFirestore().runTransaction(async (tx) => {
      const current = await tx.get(docRef);
      if (!current.exists || current.get('notification.claimedAt')) return false;
      tx.update(docRef, { 'notification.claimedAt': FieldValue.serverTimestamp() });
      return true;
    });
    if (!claimed) {
      logger.info('Notification already handled', { enquiryId });
      return;
    }

    const enquiry = snapshot.data();
    const submittedAt = formatSubmittedAt(enquiry.createdAt);
    const { text, html } = buildEmail(enquiry, submittedAt, enquiryId);

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST.value(),
      port: SMTP_PORT.value(),
      secure: SMTP_PORT.value() === 465,
      auth: { user: SMTP_USER.value(), pass: SMTP_PASS.value() },
    });

    try {
      await transporter.sendMail({
        from: { name: MAIL_FROM_NAME.value(), address: SMTP_USER.value() },
        to: NOTIFY_EMAIL.value(),
        replyTo: { name: stripHeaderBreaks(enquiry.name), address: stripHeaderBreaks(enquiry.email) },
        subject: `New enquiry: ${stripHeaderBreaks(enquiry.subject)} — ${stripHeaderBreaks(enquiry.name)}`,
        text,
        html,
      });

      await docRef.update({
        'notification.sentAt': FieldValue.serverTimestamp(),
        'notification.error': FieldValue.delete(),
      });
      logger.info('Enquiry notification sent', { enquiryId });
    } catch (error) {
      // Release the claim so the retry can try again.
      await docRef.update({
        'notification.claimedAt': FieldValue.delete(),
        'notification.error': String(error?.message ?? error).slice(0, 500),
      });
      logger.error('Enquiry notification failed', { enquiryId, error: error?.message });
      throw error;
    }
  },
);
