import React from 'react';
import { useAuth } from './AuthContext';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <button
      onClick={handleLogout}
      // Add styling for a button with potential hover effects
      className="logout-button" 
    >
      Logout
    </button>
  );
};

export default LogoutButton;