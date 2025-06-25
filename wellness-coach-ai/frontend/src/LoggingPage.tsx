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