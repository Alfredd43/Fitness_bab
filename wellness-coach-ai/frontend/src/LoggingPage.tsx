
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
