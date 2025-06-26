import React, { useState } from 'react';
import { useAuth } from './AuthContext';

// Add placeholder class names or basic inline styles for UI library integration
// Enhance styling placeholders and suggest animations for a more engaging UI
const LogWaterPage: React.FC = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  // State for validation error messages
  const [amountError, setAmountError] = useState('');
  // State for general feedback/success messages
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setMessage('You must be logged in to log water.');
      setFeedbackMessage('You must be logged in to log water.'); // Using feedbackMessage for user feedback
      return;
    }

    // Simple input validation
    if (!amount || parseInt(amount) <= 0) {
      setAmountError('Please enter a valid water amount.');
      return; // Stop submission if validation fails
    }

    try {
      const response = await fetch('/log_water', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parseInt(amount) }),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedbackMessage('Water logged successfully!'); // Using feedbackMessage for user feedback
        setAmount('');
        setAmountError(''); // Clear validation error on success
      } else {
        setFeedbackMessage(`Error logging water: ${data.error}`); // Using feedbackMessage for user feedback
        setAmountError(''); // Clear validation error on failure
      }
      // Suggestion: Add a brief success/error animation here
    } catch (error) {
      setMessage('An error occurred while logging water.');
      console.error('Error logging water:', error);
    }
  };

  return (
    <div className="container mx-auto p-4"> {/* Added container styling */}
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Log Your Water Intake</h2> {/* Enhanced heading styling */}
      {/* Suggestion: Add a simple fade-in animation for the form */}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md space-y-6"> {/* Enhanced form styling */}
        <div className="form-group"> {/* Placeholder for form group styling */}
          <label htmlFor="amount" className="block text-gray-700 font-semibold mb-2">Amount (ml):</label> {/* Label styling */}
          <input className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${amountError ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`} // Input styling with conditional border
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 500" // Added placeholder
          />
          {/* Suggestion: Add a subtle shake animation on validation error */}
          {amountError && <p className="text-red-500 text-sm mt-1">{amountError}</p>} {/* Error message styling */}
        </div>
        {/* Suggestion: Add a pulse or scale animation on button hover */}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Log Water</button> {/* Button styling */}
      </form>
      {/* Suggestion: Add a fade-in animation for feedback messages */}
      {feedbackMessage && (
        <p className={`mt-6 text-center ${feedbackMessage.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>
          {feedbackMessage}
        </p>
      )} {/* Feedback message styling with conditional color */}
    </div>
  );
};

export default LogWaterPage;

const LogWaterPage: React.FC = () => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement water logging
    console.log('Water logged:', { amount });
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-xl font-semibold">Wellness Coach AI</Link>
            </div>
            <div className="flex items-center">
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Log Water Intake</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (ml)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="250"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Log Water
              </button>
            </form>

            <Link
              to="/logging"
              className="block text-center mt-4 text-indigo-600 hover:text-indigo-500"
            >
              Back to Logging
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LogWaterPage;
