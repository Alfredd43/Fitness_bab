import React from 'react';
import { Link } from 'react-router-dom';

const LoggingPage: React.FC = () => {
  return (
    <div className="logging-page-container"> {/* Placeholder for UI container */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-green-200 p-4"> {/* Placeholder for background and centering */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Logging</h1> {/* Placeholder for UI heading */}
        <p className="text-lg text-gray-700 mb-8">Select a category to log your activities:</p> {/* Placeholder for UI text */}
        <ul className="flex flex-col space-y-4"> {/* Placeholder for UI list */}
          <li>
            {/* Placeholder for UI link button with hover and active effects */}
            {/* Consider using a UI library Button component here */}
            {/* Potential animation: slight scale up on hover */}
            <Link to="/log/exercise" className="block w-64 px-6 py-3 text-center text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
              Log Exercise
            </Link>
          </li>
          <li>
            {/* Placeholder for UI link button */}
            <Link to="/log/food" className="block w-64 px-6 py-3 text-center text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out">
              Log Food
            </Link>
          </li>
          <li>
            {/* Placeholder for UI link button */}
            <Link to="/log/water" className="block w-64 px-6 py-3 text-center text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 transition duration-300 ease-in-out">Log Water</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoggingPage;
import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const LoggingPage: React.FC = () => {
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Log Your Activities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/log/food"
              className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Food</h3>
              <p className="text-gray-600">Log your meals and track nutrition</p>
            </Link>

            <Link
              to="/log/water"
              className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Water</h3>
              <p className="text-gray-600">Track your daily water intake</p>
            </Link>

            <Link
              to="/log/exercise"
              className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Exercise</h3>
              <p className="text-gray-600">Log your workouts and activities</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoggingPage;
