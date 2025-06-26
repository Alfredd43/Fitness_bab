import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const LogWaterPage: React.FC = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setFeedbackMessage('You must be logged in to log water.');
      return;
    }

    if (!amount || parseInt(amount) <= 0) {
      setAmountError('Please enter a valid water amount.');
      return;
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
        setFeedbackMessage('Water logged successfully!');
        setAmount('');
        setAmountError('');
      } else {
        setFeedbackMessage(`Error logging water: ${data.error}`);
        setAmountError('');
      }
    } catch (error) {
      setFeedbackMessage('An error occurred while logging water.');
      console.error('Error logging water:', error);
    }
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

            {feedbackMessage && (
              <div className={`mb-4 px-4 py-3 rounded relative ${
                feedbackMessage.startsWith('Error') ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'
              }`} role="alert">
                {feedbackMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (ml)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    amountError ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                  placeholder="e.g., 500"
                  required
                />
                {amountError && <p className="text-red-500 text-sm mt-1">{amountError}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
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