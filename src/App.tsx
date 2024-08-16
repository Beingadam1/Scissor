import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import DashboardPage from './pages/DashboardPage';
import UrlManagement from './components/UrlManagement';
import Analytics from './components/Analytics';
import MarkdownPage from './pages/MarkdownPage';
import RedirectPage from './pages/RedirectPage';
import './styles/App.css';

// Main application component
const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route path="urls" element={<UrlManagement />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="markdown" element={<MarkdownPage />} />
        </Route>
        <Route path="/:shortCode" element={<RedirectPage />} />
        <Route path="/not-found" element={<h1>404: URL Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
