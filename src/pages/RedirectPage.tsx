import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const RedirectPage: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrl = async () => {
      if (shortCode) {
        const urlDocRef = doc(db, 'urls', shortCode); // Reference the correct document
        const urlDoc = await getDoc(urlDocRef);
        if (urlDoc.exists() && !urlDoc.data()?.disabled) {
          window.location.href = urlDoc.data()?.longUrl; // Redirect to the long URL
        } else {
          navigate('/not-found'); // Redirect to 404 page if not found
        }
      }
    };

    fetchUrl();
  }, [shortCode, navigate]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;
