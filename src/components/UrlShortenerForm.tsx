import React, { useState } from 'react';
import { shortenUrl } from '../services/urlService';
import QRCode from 'qrcode.react';
import { getAuth } from 'firebase/auth';

interface UrlShortenerFormProps {
  onUrlShortened?: (url: any) => void;
}
// Form component for shortening URLs
const UrlShortenerForm: React.FC<UrlShortenerFormProps> = ({ onUrlShortened }) => {
  const [longUrl, setLongUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

   // Handle form submission and URL shortening
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null); // Clear any previous errors
      const url = await shortenUrl(longUrl, customCode);
      const shortCode = customCode || url.split('/').pop();
      setShortenedUrl(url); // Set the full shortened URL

      // Pass the new URL data to the parent component
      if (onUrlShortened) {
        onUrlShortened({ longUrl, shortCode, userId: getAuth().currentUser?.uid }); // Pass the new URL data
      }
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
      console.error('Failed to shorten URL:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter your long URL"
          required
        />
        <input
          type="text"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          placeholder="Enter custom short code (optional)"
        />
        <button type="submit">Shorten URL</button>
      </form>
      {shortenedUrl && (
        <div>
          <p>Your shortened URL: <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a></p>
          <QRCode value={shortenedUrl} /> {/* Generate QR Code */}
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UrlShortenerForm;
