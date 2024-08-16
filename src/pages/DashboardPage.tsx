import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import UrlShortenerForm from '../components/UrlShortenerForm';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Dashboard page component
const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [, setUrls] = useState<any[]>([]);
  const [, setLoading] = useState(true);
  const navigate = useNavigate();

    // Set up authentication state listener
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUrls = async () => {
      if (user) {
        const urlsCollection = collection(db, 'urls');
        const q = query(urlsCollection, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const urlsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUrls(urlsList);
        setLoading(false);
      }
    };

     // Fetch URLs for the authenticated user
    fetchUrls();
  }, [user]);

  // Add a new URL to the list of managed URLs
  const addUrl = (url: any) => {
    setUrls((prevUrls) => [url, ...prevUrls]);
  };

  // Handle sign-out and redirect to the home page
  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await auth.signOut();
      setUser(null);
      navigate('/'); // Redirect to home page after signing out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="urls">Manage URLs</Link></li>
          <li><Link to="analytics">View Analytics</Link></li>
          <li><Link to="markdown">Write Markdown</Link></li>
        </ul>
      </nav>
      <UrlShortenerForm onUrlShortened={addUrl} />
      <button onClick={handleSignOut}>Sign Out</button>
      <Outlet />
    </div>
  );
};

export default DashboardPage;
