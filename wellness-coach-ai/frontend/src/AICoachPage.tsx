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