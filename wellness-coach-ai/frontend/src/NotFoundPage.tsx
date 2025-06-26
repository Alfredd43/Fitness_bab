import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    // Basic styling for a centered, noticeable message
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f8f8f8' }}>
      <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ fontSize: '3em', color: '#e53e3e', marginBottom: '20px' }}>404 - Not Found</h1>
        <p style={{ fontSize: '1.2em', color: '#4a5568' }}>The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/dashboard"
          className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
