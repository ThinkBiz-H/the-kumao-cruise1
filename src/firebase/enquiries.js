export const ENQUIRIES_COLLECTION = 'enquiries';
export const ENQUIRY_STATUS_NEW = 'New';

/**
 * Writes an enquiry to Firestore. The Firebase SDK is imported on demand,
 * so it is only downloaded when a visitor actually submits the form.
 * The notification email is sent server-side by the `notifyOnEnquiry`
 * Cloud Function (see /functions), never from the browser.
 */
export async function createEnquiry(enquiry) {
  const [{ getDb }, { collection, addDoc, serverTimestamp }] = await Promise.all([
    import('./firebase.js'),
    import('firebase/firestore/lite'),
  ]);

  const docRef = await addDoc(collection(getDb(), ENQUIRIES_COLLECTION), {
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    company: enquiry.company,
    subject: enquiry.subject,
    message: enquiry.message,
    createdAt: serverTimestamp(),
    status: ENQUIRY_STATUS_NEW,
  });

  return docRef.id;
}
