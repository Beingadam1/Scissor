import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInUser } from '../services/authService';

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null); // Clear any previous errors
      await signInUser(email, password);
      navigate('/dashboard'); // Redirect to the dashboard upon successful sign-in
    } catch (err) {
      setError('Failed to sign in. Please check your credentials and try again.');
      console.error('Failed to sign in:', err);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Don't have an account? <Link to="/sign-up"><button>Sign Up</button></Link></p>
    </div>
  );
};

export default SignInPage;
