import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import UrlShortenerForm from '../components/UrlShortenerForm';

const HomePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup the subscription on component unmount
  }, [auth]);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      setUser(null); // Ensure UI updates after signing out
    });
  };

  return (
    <div>
      <h1>Welcome to Scissor</h1>
      <p>Your simple and powerful URL shortening tool.</p>

      {!user ? (
        <div>
          <UrlShortenerForm />
          <div>
            <Link to="/sign-in">
              <button>Sign In</button>
            </Link>
            <Link to="/sign-up">
              <button>Sign Up</button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <UrlShortenerForm />
          <div>
            <Link to="/dashboard">
              <button>Go to Dashboard</button>
            </Link>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
