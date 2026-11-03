import { useCallback, useRef, useState } from 'react';
import { createEnquiry } from '../firebase/enquiries';
import {
  EMPTY_ENQUIRY,
  enquiryFingerprint,
  validateEnquiry,
  validateField,
} from '../utils/validation';
import { useToast } from './useToast';

const RECENT_KEY = 'kc:recent-enquiry';
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;

function readRecent() {
  try {
    return JSON.parse(sessionStorage.getItem(RECENT_KEY) || 'null');
  } catch {
    return null;
  }
}

function writeRecent(fingerprint) {
  try {
    sessionStorage.setItem(RECENT_KEY, JSON.stringify({ fingerprint, at: Date.now() }));
  } catch {
    /* Storage unavailable (private mode) — the in-flight lock still applies. */
  }
}

function describeError(error) {
  if (error?.name === 'FirebaseConfigError') {
    return 'Enquiries are not connected yet. Please use Get Directions or try again later.';
  }
  if (error?.code === 'permission-denied') {
    return 'Your enquiry could not be saved. Check each field and send it again.';
  }
  if (error?.code === 'unavailable' || !navigator.onLine) {
    return 'You appear to be offline. Reconnect and send your enquiry again.';
  }
  return 'Your enquiry was not sent. Please try again in a moment.';
}

/**
 * Form state, validation and Firestore submission for the enquiry form.
 * status: 'idle' | 'submitting' | 'success' | 'error'
 */
export function useEnquiryForm() {
  const { notify } = useToast();
  const [values, setValues] = useState(EMPTY_ENQUIRY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');
  const [honeypot, setHoneypot] = useState('');
  const inFlight = useRef(false);

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
      if (status === 'error') setStatus('idle');
    },
    [touched, status],
  );

  const handleBlur = useCallback((event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }, []);

  const reset = useCallback(() => {
    setValues(EMPTY_ENQUIRY);
    setErrors({});
    setTouched({});
    setStatus('idle');
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (inFlight.current) return;

      const { errors: nextErrors, normalized, isValid } = validateEnquiry(values);
      setErrors(nextErrors);
      setTouched(Object.fromEntries(Object.keys(EMPTY_ENQUIRY).map((k) => [k, true])));

      if (!isValid) {
        const firstInvalid = Object.keys(EMPTY_ENQUIRY).find((k) => nextErrors[k]);
        document.getElementById(`enquiry-${firstInvalid}`)?.focus();
        notify({ type: 'error', title: 'Check the highlighted fields', message: 'A few details need fixing before we can send this.' });
        return;
      }

      // Bots fill hidden fields; accept silently without writing anything.
      if (honeypot) {
        setStatus('success');
        return;
      }

      const fingerprint = enquiryFingerprint(normalized);
      const recent = readRecent();
      if (recent?.fingerprint === fingerprint && Date.now() - recent.at < DUPLICATE_WINDOW_MS) {
        setStatus('success');
        notify({ type: 'info', title: 'Already received', message: 'This enquiry was sent a few minutes ago — we will reply to it shortly.' });
        return;
      }

      inFlight.current = true;
      setStatus('submitting');

      try {
        await createEnquiry(normalized);
        writeRecent(fingerprint);
        setStatus('success');
        notify({ type: 'success', title: 'Enquiry sent', message: `Thank you, ${normalized.name.split(' ')[0]}. We'll reply to ${normalized.email} shortly.` });
      } catch (error) {
        setStatus('error');
        notify({ type: 'error', title: 'Enquiry not sent', message: describeError(error) });
      } finally {
        inFlight.current = false;
      }
    },
    [values, honeypot, notify],
  );

  return {
    values,
    errors: Object.fromEntries(Object.entries(errors).filter(([k, v]) => v && touched[k])),
    status,
    isSubmitting: status === 'submitting',
    honeypot,
    setHoneypot,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}
