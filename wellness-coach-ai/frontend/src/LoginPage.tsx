import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();setError(null); // Clear previous errors
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err: any) {
      // Assuming the backend returns an error message in err.message or err.response.data.message
      setError(err.message || err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100"> {/* Use flexbox for centering, set min height, and background color */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md"> {/* Container with max width, padding, spacing, background, rounded corners, and shadow */}
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2> {/* Larger font, bold, centered text, dark text color */}
        {/* Consider adding a simple fade-in animation to the title or container */}
        <form onSubmit={handleSubmit} className="space-y-4"> {/* Add spacing between form elements */}
          <div className="form-group"> {/* Group label and input */}
            {/* Consider adding a slight translation or scale animation on input focus */}
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" // Tailwind-like classes for styling and focus effects
              placeholder="Enter your username" // Placeholder text
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group"> {/* Group label and input */}
            {/* Consider adding a slight translation or scale animation on input focus */}
          <label htmlFor="username">Username:</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" // Tailwind-like classes for styling and focus effects
              placeholder="Enter your password" // Placeholder text
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>} {/* Red text for error message */}
          {/* Consider adding a slight scale or pulse animation on button hover */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" // Tailwind-like classes for button styling and hover/focus effects
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;