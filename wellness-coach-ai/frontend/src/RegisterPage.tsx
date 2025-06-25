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
