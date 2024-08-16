import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Component to manage shortened URLs
const UrlManagement: React.FC = () => {
  const [urls, setUrls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Set up authentication state listener and fetch URLs when the user is authenticated
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUrls(user.uid); // Fetch URLs when the user is authenticated
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch URLs for the authenticated user
  const fetchUrls = async (userId: string) => {
    const urlsCollection = collection(db, 'urls');
    const q = query(urlsCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const urlsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUrls(urlsList);
    setLoading(false);
  };

  // Edit the short code of a URL
  const handleEdit = async (id: string) => {
    const newShortCode = prompt('Enter new short code:');
    if (newShortCode) {
      await updateDoc(doc(db, 'urls', id), { shortCode: newShortCode });
      setUrls(urls.map((url) => (url.id === id ? { ...url, shortCode: newShortCode } : url)));
    }
  };

  // Disable a URL
  const handleDisable = async (id: string) => {
    await updateDoc(doc(db, 'urls', id), { disabled: true });
    setUrls(urls.map((url) => (url.id === id ? { ...url, disabled: true } : url)));
  };

  // Revert a shortened URL to its original form
  const handleRevert = async (id: string) => {
    const urlDoc = urls.find((url) => url.id === id);
    if (urlDoc) {
      await updateDoc(doc(db, 'urls', id), { shortCode: urlDoc.originalUrl });
      setUrls(urls.map((url) => (url.id === id ? { ...url, shortCode: urlDoc.originalUrl } : url)));
    }
  };

  // Delete a URL
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this URL? This action cannot be undone.');
    if (confirmDelete) {
      await deleteDoc(doc(db, 'urls', id));
      setUrls(urls.filter((url) => url.id !== id));
    }
  };

  // Navigate to the analytics page for a specific URL
  const handleViewAnalytics = (id: string) => {
    navigate(`/dashboard/analytics/${id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please log in to view your URLs.</p>;
  }

  return (
    <div>
      <h2>Manage URLs</h2>
      <ul>
        {urls.map((url) => (
          <li key={url.id}>
            <span>{url.shortCode}</span>
            <button onClick={() => handleEdit(url.id)}>Edit</button>
            <button onClick={() => handleDisable(url.id)} disabled={url.disabled}>Disable</button>
            <button onClick={() => handleViewAnalytics(url.id)}>View Analytics</button>
            <button onClick={() => handleRevert(url.id)}>Revert</button>
            <button onClick={() => handleDelete(url.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlManagement;
