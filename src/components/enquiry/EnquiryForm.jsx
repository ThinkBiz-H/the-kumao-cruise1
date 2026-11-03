import { AnimatePresence, m } from 'framer-motion';
import { HiCheckCircle, HiPaperAirplane } from 'react-icons/hi2';
import Button from '../ui/Button';
import FormField from '../ui/FormField';
import Spinner from '../ui/Spinner';
import { useEnquiryForm } from '../../hooks/useEnquiryForm';
import { ENQUIRY_LIMITS } from '../../utils/validation';
import { EASE } from '../../utils/motion';

const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', autoComplete: 'name', placeholder: 'Your full name', span: 'sm:col-span-2' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', inputMode: 'email', placeholder: 'name@example.com' },
  { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '+91 98765 43210' },
  { name: 'company', label: 'Company', type: 'text', autoComplete: 'organization', placeholder: 'If travelling for work', optional: true },
  { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off', placeholder: 'e.g. 2 adults, March' },
  {
    name: 'message',
    label: 'Message',
    multiline: true,
    rows: 5,
    placeholder: 'Check-in and check-out dates, number of guests, room preference, or anything else we should know',
    span: 'sm:col-span-2',
  },
];

const panel = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export default function EnquiryForm() {
  const form = useEnquiryForm();

  return (
    <div className="rounded-card border border-white/12 bg-white/[0.03] p-5 shadow-[0_30px_60px_-40px_rgb(0_0_0/0.8)] sm:p-7">
      <AnimatePresence mode="wait" initial={false}>
        {form.status === 'success' ? (
          <m.div key="success" {...panel} className="flex min-h-[420px] flex-col items-start justify-center" role="status">
            <HiCheckCircle className="size-12 text-gold" aria-hidden="true" />
            <h3 className="mt-5 text-[1.6rem] text-white">Enquiry sent</h3>
            <p className="mt-3 max-w-[42ch] text-contact-muted">
              Thank you — we&apos;ll get back to you shortly with availability and directions for the last stretch of the drive up.
            </p>
            <Button type="button" variant="glass" className="mt-7" onClick={form.reset}>
              Send another enquiry
            </Button>
          </m.div>
        ) : (
          <m.form key="form" {...panel} noValidate onSubmit={form.handleSubmit} aria-labelledby="enquiry-form-title">
            <h3 id="enquiry-form-title" className="sr-only">
              Enquiry form
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FIELDS.map(({ name, span, ...field }) => (
                <FormField
                  key={name}
                  id={`enquiry-${name}`}
                  name={name}
                  className={span}
                  value={form.values[name]}
                  error={form.errors[name]}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  disabled={form.isSubmitting}
                  maxLength={ENQUIRY_LIMITS[name].max}
                  hint={name === 'message' ? `${form.values.message.length} / ${ENQUIRY_LIMITS.message.max}` : undefined}
                  {...field}
                />
              ))}
            </div>

            {/* Honeypot: hidden from people and assistive tech, filled by bots. */}
            <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="enquiry-website">Website</label>
              <input
                id="enquiry-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.honeypot}
                onChange={(event) => form.setHoneypot(event.target.value)}
              />
            </div>

            <div className="mt-6 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.78rem] text-white/60">
                <span className="text-gold" aria-hidden="true">
                  *
                </span>{' '}
                Required. We only use these details to reply to you.
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={form.isSubmitting}
                aria-busy={form.isSubmitting}
                className="w-full sm:w-auto"
              >
                {form.isSubmitting ? (
                  <>
                    <Spinner />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Enquiry
                    <HiPaperAirplane className="size-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </div>

            {form.status === 'error' && (
              <p className="mt-4 text-[0.85rem] text-[#f5a58c]" role="alert">
                Your enquiry was not sent. See the notice for details, then press Send Enquiry to try again.
              </p>
            )}
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
