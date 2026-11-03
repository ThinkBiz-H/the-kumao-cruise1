export const ENQUIRY_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  phone: { minDigits: 10, maxDigits: 15, max: 20 },
  company: { max: 100 },
  subject: { min: 3, max: 120 },
  message: { min: 10, max: 2000 },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s()-]+$/;

export const EMPTY_ENQUIRY = {
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
};

/** Trims every field and collapses internal whitespace in single-line fields. */
export function normalizeEnquiry(values) {
  const singleLine = (v) => v.trim().replace(/\s+/g, ' ');
  return {
    name: singleLine(values.name),
    email: values.email.trim().toLowerCase(),
    phone: singleLine(values.phone),
    company: singleLine(values.company),
    subject: singleLine(values.subject),
    message: values.message.trim(),
  };
}

const validators = {
  name(v) {
    if (!v) return 'Enter your full name.';
    if (v.length < ENQUIRY_LIMITS.name.min) return 'Name must be at least 2 characters.';
    if (v.length > ENQUIRY_LIMITS.name.max) return 'Name must be 80 characters or fewer.';
    return '';
  },
  email(v) {
    if (!v) return 'Enter your email address.';
    if (v.length > ENQUIRY_LIMITS.email.max || !EMAIL_PATTERN.test(v))
      return 'Enter a valid email, like name@example.com.';
    return '';
  },
  phone(v) {
    if (!v) return 'Enter your phone number.';
    const digits = v.replace(/\D/g, '').length;
    if (
      !PHONE_PATTERN.test(v) ||
      v.length > ENQUIRY_LIMITS.phone.max ||
      digits < ENQUIRY_LIMITS.phone.minDigits ||
      digits > ENQUIRY_LIMITS.phone.maxDigits
    )
      return 'Enter a valid phone number with 10–15 digits.';
    return '';
  },
  company(v) {
    if (v.length > ENQUIRY_LIMITS.company.max) return 'Company must be 100 characters or fewer.';
    return '';
  },
  subject(v) {
    if (!v) return 'Add a subject.';
    if (v.length < ENQUIRY_LIMITS.subject.min) return 'Subject must be at least 3 characters.';
    if (v.length > ENQUIRY_LIMITS.subject.max) return 'Subject must be 120 characters or fewer.';
    return '';
  },
  message(v) {
    if (!v) return 'Tell us your dates, guests and anything else we should know.';
    if (v.length < ENQUIRY_LIMITS.message.min) return 'Message must be at least 10 characters.';
    if (v.length > ENQUIRY_LIMITS.message.max) return 'Message must be 2,000 characters or fewer.';
    return '';
  },
};

export function validateField(field, rawValue) {
  const value = normalizeEnquiry({ ...EMPTY_ENQUIRY, [field]: rawValue })[field];
  return validators[field] ? validators[field](value) : '';
}

export function validateEnquiry(values) {
  const normalized = normalizeEnquiry(values);
  const errors = {};
  for (const field of Object.keys(validators)) {
    const message = validators[field](normalized[field]);
    if (message) errors[field] = message;
  }
  return { errors, normalized, isValid: Object.keys(errors).length === 0 };
}

/** Stable fingerprint used to block identical resubmissions in the same session. */
export function enquiryFingerprint({ email, subject, message }) {
  const source = `${email}|${subject}|${message}`;
  let hash = 5381;
  for (let i = 0; i < source.length; i += 1) {
    hash = (hash * 33) ^ source.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
}
