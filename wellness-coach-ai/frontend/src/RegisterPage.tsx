import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State for error messages
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Input validation
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Registration successful, redirect to login
        navigate('/login');
      } else {
        // Handle registration errors (e.g., username already exists)
        const data = await response.json();
        setError(data.message || 'Registration failed.'); // Display error message from backend or a default
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred during registration.'); // Display a generic error message
    }
  };

  return (
    <div className="register-container"> {/* Placeholder class for container styling */}
      <h2 className="register-title">Register</h2> {/* Placeholder class for title styling */}
      {error && <div className="error-message">{error}</div>} {/* Placeholder class for error message styling */}
      <form onSubmit={handleRegister} className="register-form"> {/* Placeholder class for form styling */}
        <div className="form-group"> {/* Placeholder class for form group styling */}
          <label htmlFor="username" className="form-label">Username:</label> {/* Placeholder class for label styling */}
          <input
            type="text"
            id="username"
            className="form-input" // Placeholder class for input styling
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required // HTML5 validation
          />
        </div>
        <div className="form-group"> {/* Placeholder class for form group styling */}
          <label htmlFor="password" className="form-label">Password:</label> {/* Placeholder class for label styling */}
          <input
            type="password"
            id="password"
            className="form-input" // Placeholder class for input styling
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // HTML5 validation
          />
        </div>
        <button type="submit" className="register-button">Register</button> {/* Placeholder class for button styling */}
      </form>
      <p className="login-link-text"> {/* Placeholder class for link text styling */}
        Already have an account? <a href="/login" className="login-link">Login here</a> {/* Placeholder class for link styling */}
      </p>
    </div>
  );
};

export default RegisterPage;
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const success = await register(username, password);
    if (success) {
      navigate('/login');
    } else {
      setError('Registration failed. Username may already exist.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
