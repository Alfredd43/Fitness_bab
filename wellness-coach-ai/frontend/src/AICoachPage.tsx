import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AICoachPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    const userMessage = { text: prompt, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/ai-coach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage = { text: data.response, sender: 'ai' as const };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to get AI response');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      console.error('AI Coach API Error:', err);
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-500">
                ← Back to Dashboard
              </Link>
              <h1 className="text-xl font-semibold">AI Wellness Coach</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.username}</span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="ai-coach-container flex flex-col h-96">
            <div className="chat-area flex-grow overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <p>Ask your AI wellness coach anything about health, fitness, nutrition, or wellness!</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message p-3 rounded-lg max-w-xs ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white ml-auto'
                        : 'bg-gray-300 text-gray-800 mr-auto'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))
              )}
              {loading && (
                <div className="bg-gray-300 text-gray-800 mr-auto p-3 rounded-lg max-w-xs">
                  Thinking...
                </div>
              )}
            </div>
          </div>

          <div className="border-t p-4">
            {error && (
              <div className="text-red-600 text-sm mb-4 p-2 bg-red-50 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                  Ask your coach:
                </label>
                <textarea
                  id="prompt"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  disabled={loading}
                  placeholder="e.g., How can I improve my sleep hygiene?"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Asking...' : 'Ask Coach'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AICoachPage;