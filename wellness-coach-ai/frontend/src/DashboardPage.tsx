
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
        const baseUrl = 'http://127.0.0.1:5000';
        
        const [foodResponse, waterResponse, exerciseResponse] = await Promise.all([
          fetch(`${baseUrl}/user/logs/food`),
          fetch(`${baseUrl}/user/logs/water`),
          fetch(`${baseUrl}/user/logs/exercise`)
        ]);

        if (foodResponse.ok) {
          const foodData = await foodResponse.json();
          setFoodLogs(foodData);
        }
        if (waterResponse.ok) {
          const waterData = await waterResponse.json();
          setWaterLogs(waterData);
        }
        if (exerciseResponse.ok) {
          const exerciseData = await exerciseResponse.json();
          setExerciseLogs(exerciseData);
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Wellness Coach AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.username}</span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Link
                to="/logging"
                className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Log Activities</h3>
                <p className="text-gray-600">Track your food, water, and exercise</p>
              </Link>

              <Link
                to="/ai-coach"
                className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Coach</h3>
                <p className="text-gray-600">Get personalized wellness advice</p>
              </Link>

              <div className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress</h3>
                <p className="text-gray-600">View your wellness journey</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-lg font-semibold mb-2">Food Logs</h4>
                {foodLogs.length === 0 ? (
                  <p className="text-gray-500">No food logs yet</p>
                ) : (
                  <ul className="space-y-2">
                    {foodLogs.slice(0, 3).map((log: any) => (
                      <li key={log.id} className="text-sm">
                        {log.food_item} - {log.calories} cal
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-lg font-semibold mb-2">Water Logs</h4>
                {waterLogs.length === 0 ? (
                  <p className="text-gray-500">No water logs yet</p>
                ) : (
                  <ul className="space-y-2">
                    {waterLogs.slice(0, 3).map((log: any) => (
                      <li key={log.id} className="text-sm">
                        {log.amount} ml
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-lg font-semibold mb-2">Exercise Logs</h4>
                {exerciseLogs.length === 0 ? (
                  <p className="text-gray-500">No exercise logs yet</p>
                ) : (
                  <ul className="space-y-2">
                    {exerciseLogs.slice(0, 3).map((log: any) => (
                      <li key={log.id} className="text-sm">
                        {log.exercise_type} - {log.duration} min
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
