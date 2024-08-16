import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UrlManagement from '../components/UrlManagement';
import { getDocs } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
}));

describe('UrlManagement Component', () => {
  it('renders loading state initially', () => {
    render(<UrlManagement />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders URLs after loading', async () => {
    // Place the mock here inside the test case
    (getDocs as jest.Mock).mockResolvedValueOnce({
      docs: [
        {
          id: '1',
          data: () => {
            console.log('Mock Data Returned');
            return { shortCode: 'abc123', longUrl: 'http://example.com' };
          },
        },
      ],
    });

    render(<UrlManagement />);

    // Wait for the component to finish loading and render the mocked data
    await waitFor(() => {
      expect(screen.getByText(/abc123/i)).toBeInTheDocument();
    });
  });
});
