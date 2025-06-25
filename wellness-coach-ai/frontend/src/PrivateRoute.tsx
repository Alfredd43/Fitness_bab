import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Assuming useAuth hook is in AuthContext.tsx

interface PrivateRouteProps {
  children: React.ReactNode; // Use children prop for React Router v6
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth(); // Use the useAuth hook

  if (!user) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children (the protected component)
  return <>{children}</>;
};

export default PrivateRoute;
