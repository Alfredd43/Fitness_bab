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