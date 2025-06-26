import React, { useState } from 'react';
import { useAuth } from './AuthContext'; // Assuming AuthContext is in './AuthContext'

interface AICoachPageProps {}

const AICoachPage: React.FC<AICoachPageProps> = () => {
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ text: string, sender: 'user' | 'ai' }[]>([]);
  const { user } = useAuth(); // Use user from AuthContext if needed for context
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);
    
    // Add user's message to the messages state
    setMessages(prevMessages => [...prevMessages, { text: prompt, sender: 'user' }]);
    setPrompt(''); // Clear the input after sending
    try {
      const res = await fetch('/ai-coach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary authentication headers, e.g., if using tokens
          // 'Authorization': `Bearer ${user?.token}` // Example if using JWT
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to get AI coach response');
      }

      const data = await res.json();
      // Add AI's response to the messages state
      setMessages(prevMessages => [...prevMessages, { text: data.response, sender: 'ai' }]);

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      console.error('AI Coach API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-coach-container flex flex-col h-screen bg-gray-100"> {/* Use flex for layout and set a background */}
      <h2 className="text-2xl font-bold mb-4">AI Wellness Coach</h2>
      {/* Chat message area */}
      <div className="chat-area flex-grow overflow-y-auto p-4 space-y-4"> {/* Make this scrollable */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message p-3 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 text-gray-800 mr-auto'}`} // Style based on sender
          >
            {msg.text}
          </div>
          // Consider adding animation here, e.g., using CSS transitions or a library like react-spring
        ))}
      </div>
      <form onSubmit={handleSubmit} className="ai-coach-form mb-6">
        <div className="form-group mb-4">
          <label htmlFor="prompt">Ask your coach:</label>
          <textarea
            id="prompt"
            className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            cols={50}
            disabled={loading}
            placeholder="e.g., How can I improve my sleep hygiene?"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? 'Getting Response...' : 'Get Advice'}
        </button>
      </form>
      {error && (
        <div className="error-message text-red-600 mb-4">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default AICoachPage;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const AICoachPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement AI coach functionality
    setResponse('This is a placeholder response from the AI coach. Implement actual AI integration here.');
    setMessage('');
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
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Wellness Coach</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ask your wellness coach</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  rows={4}
                  placeholder="How can I improve my nutrition?"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Ask AI Coach
              </button>
            </form>

            {response && (
              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <h3 className="text-lg font-medium text-blue-900 mb-2">AI Coach Response:</h3>
                <p className="text-blue-800">{response}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AICoachPage;
