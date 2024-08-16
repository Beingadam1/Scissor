import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';

const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const analyticsCollection = collection(db, 'urlAnalytics');
        const q = query(analyticsCollection, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const analyticsList = querySnapshot.docs.map((doc) => doc.data());
        setAnalytics(analyticsList);
      }
      setLoading(false);
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>View Analytics</h2>
      <ul>
        {analytics.map((data, index) => (
          <li key={index}>
            URL: {data.shortCode} - Clicks: {data.clickCount} - Location: {data.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Analytics;
