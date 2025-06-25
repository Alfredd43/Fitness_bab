import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import LogoutButton from './LogoutButton';

import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [foodLogs, setFoodLogs] = useState([]);
  const [waterLogs, setWaterLogs] = useState([]);
  const [exerciseLogs, setExerciseLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!user) return;

      try {
        const foodResponse = await fetch('/user/logs/food');
        const waterResponse = await fetch('/user/logs/water');
        const exerciseResponse = await fetch('/user/logs/exercise');

        const foodData = await foodResponse.json();
        const waterData = await waterResponse.json();
        const exerciseData = await exerciseResponse.json();

        setFoodLogs(foodData);
        setWaterLogs(waterData);
        setExerciseLogs(exerciseData);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, [user]);

  return (
    <div className="dashboard-container min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <h1 className="dashboard-title text-4xl font-extrabold text-center text-gray-800 mb-8 animate-slideDown">
          Your Wellness Hub
        </h1>

        {user && (
          <p className="welcome-message text-xl text-center text-gray-700 mb-12 animate-fadeIn delay-200">
            Welcome back, <span className="font-semibold text-blue-600">{user.username}</span>!
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div className="quick-actions-card bg-white p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl animate-fadeInLeft">
            <h2 className="card-title text-2xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-3">Quick Actions</h2>
            <div className="flex flex-col space-y-6">
              <Link
                to="/logging"
                className="action-button bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-lg"
              >
                Log Your Activity
              </Link>
              <Link
                to="/ai-coach"
                className="action-button bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-lg"
              >
                Talk to Your AI Coach
              </Link>
            </div>
          </div>

          <div className="progress-summary-card bg-white p-8 rounded-xl shadow-lg animate-fadeInRight">
            <h2 className="card-title text-2xl font-bold mb-6 text-gray-800 border-b-2 border-green-500 pb-3">Your Progress Summary</h2>
            <p className="text-gray-700">Summary statistics or charts could go here based on your logs.</p>
            <div className="mt-6 text-center text-gray-600 italic">
              Feature coming soon!
            </div>
          </div>
        </div>

        <h2 className="section-title text-3xl font-bold text-gray-800 text-center mb-8 animate-slideUp delay-400">Your Recent Activity</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="log-card bg-white p-6 rounded-lg shadow-md animate-fadeInUp delay-500">
            <h3 className="log-card-title text-xl font-semibold mb-5 text-gray-700 border-b border-gray-300 pb-3">Food Logs</h3>
            {foodLogs.length === 0 ? (
              <p className="text-gray-500 italic">No food logs yet. Time to fuel up!</p>
            ) : (
              <ul className="space-y-5">
                {foodLogs.map((log: any) => (
                  <li key={log.id} className="log-item border border-gray-200 p-4 rounded-md bg-gray-50 hover:bg-gray-100 transition duration-200 ease-in-out transform hover:scale-[1.02] shadow-sm">
                    <p className="font-semibold text-gray-800 text-lg">{log.food_item}</p>
                    {log.calories && <p className="text-sm text-gray-600 mt-1">{log.calories} calories</p>}
                    {log.protein && <p className="text-sm text-gray-600">Protein: {log.protein}g</p>}
                    {log.carbs && <p className="text-sm text-gray-600">Carbs: {log.carbs}g</p>}
                    {log.fat && <p className="text-sm text-gray-600">Fat: {log.fat}g</p>}
                    <p className="text-xs text-gray-500 mt-2">Logged on: {new Date(log.timestamp).toLocaleDateString()} at {new Date(log.timestamp).toLocaleTimeString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="log-card bg-white p-6 rounded-lg shadow-md animate-fadeInUp delay-600">
            <h3 className="log-card-title text-xl font-semibold mb-5 text-blue-700 border-b border-blue-300 pb-3">Water Logs</h3>
            {waterLogs.length === 0 ? (
              <p className="text-gray-500 italic">Stay hydrated! Log some water.</p>
            ) : (
              <ul className="space-y-5">
                {waterLogs.map((log: any) => (
                  <li key={log.id} className="log-item border border-blue-200 p-4 rounded-md bg-blue-50 hover:bg-blue-100 transition duration-200 ease-in-out transform hover:scale-[1.02] shadow-sm">
                    <p className="font-semibold text-blue-800 text-lg">{log.amount} ml</p>
                    <p className="text-xs text-gray-500 mt-2">Logged on: {new Date(log.timestamp).toLocaleDateString()} at {new Date(log.timestamp).toLocaleTimeString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="log-card bg-white p-6 rounded-lg shadow-md animate-fadeInUp delay-700">
            <h3 className="log-card-title text-xl font-semibold mb-5 text-green-700 border-b border-green-300 pb-3">Exercise Logs</h3>
            {exerciseLogs.length === 0 ? (
              <p className="text-gray-500 italic">Time to move! Log your exercise.</p>
            ) : (
              <ul className="space-y-5">
                {exerciseLogs.map((log: any) => (
                  <li key={log.id} className="log-item border border-green-200 p-4 rounded-md bg-green-50 hover:bg-green-100 transition duration-200 ease-in-out transform hover:scale-[1.02] shadow-sm">
                    <p className="font-semibold text-green-800 text-lg">{log.exercise_type}</p>
                    <p className="text-sm text-gray-600 mt-1">{log.duration} minutes</p>
                    <p className="text-xs text-gray-500 mt-2">Logged on: {new Date(log.timestamp).toLocaleDateString()} at {new Date(log.timestamp).toLocaleTimeString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-12 text-center animate-fadeIn delay-800">
          <LogoutButton />
        </div>

        {/* Potential: Add a footer or persistent navigation/status bar */}
      </div>
    </div>
  );
};

export default DashboardPage;
