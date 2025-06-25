import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const LogExercisePage: React.FC = () => {
  const [exerciseType, setExerciseType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setError(null);
      setSuccessMessage(null);

      const response = await fetch('/log_exercise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          exercise_type: exerciseType,
          duration: parseInt(duration),
          calories_burned: parseInt(caloriesBurned),
        }),
      });

      if (response.ok) {
        setSuccessMessage('Exercise logged successfully!');
        setExerciseType('');
        setDuration('');
        setCaloriesBurned('');
      } else {
        const errorData = await response.json();
        setError(errorData?.error || 'Failed to log exercise. Please try again.');
      }
    } catch (error) {
      console.error('Error logging exercise:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Log Exercise</h2>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        {/* Exercise Type */}
        <div className="mb-4">
          <label htmlFor="exerciseType" className="block text-sm font-medium text-gray-700 mb-1">Exercise Type:</label>
          <input
            type="text"
            id="exerciseType"
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes):</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Calories Burned */}
        <div className="mb-6">
          <label htmlFor="caloriesBurned" className="block text-sm font-medium text-gray-700 mb-1">Calories Burned:</label>
          <input
            type="number"
            id="caloriesBurned"
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Messages */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Log Exercise
        </button>
      </form>
    </div>
  );
};

export default LogExercisePage;
