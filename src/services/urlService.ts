import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { nanoid } from 'nanoid';

export const shortenUrl = async (longUrl: string, customCode?: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const shortCode = customCode || nanoid(6);  // Generate a short code using nanoid

  try {
    await setDoc(doc(db, 'urls', shortCode), {  // Use setDoc to set the document with shortCode as ID
      longUrl,
      shortCode,  // Include the shortCode in the document
      userId: user ? user.uid : null,  // Allow null userId for guest users
      createdAt: new Date(),
      disabled: false,
    });

    const baseUrl = window.location.origin; // Get the base URL of your app
    return `${baseUrl}/${shortCode}`; // Return the full shortened URL
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Could not shorten the URL. Please try again.');
    } else {
      throw new Error('An unknown error occurred. Please try again.');
    }
  }
};
