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
import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
