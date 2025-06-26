import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const LogFoodPage: React.FC = () => {
  const [foodItem, setFoodItem] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [calories, setCalories] = useState<string | null>(null);
  const [nutritionalInfo, setNutritionalInfo] = useState<any>(null);
  const [loadingNutrition, setLoadingNutrition] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError('User not authenticated.');
      return;
    }

    const foodLogData = {
      food_item: foodItem,
      calories: calories ? parseInt(calories) : null,
      calories_ai: nutritionalInfo?.calories || null,
      protein: nutritionalInfo?.protein || null,
      carbs: nutritionalInfo?.carbs || null,
      fat: nutritionalInfo?.fat || null,
    };

    try {
      const response = await fetch('/log_food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodLogData),
      });

      if (response.ok) {
        setError(null);
        setFoodItem('');
        setCalories('');
        setNutritionalInfo(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to log food');
      }
    } catch (error) {
      setError('Error logging food');
    }
  };

  const handleGetNutrition = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!foodItem) {
      setError('Please enter a food item.');
      return;
    }
    if (!user) {
      setError('User not authenticated.');
      return;
    }

    setLoadingNutrition(true);
    setError(null);

    try {
      const response = await fetch('/get_nutrition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ food_description: foodItem }),
      });
      if (response.ok) {
        const data = await response.json();
        setNutritionalInfo(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to get nutritional info.');
      }
    } catch (err) {
      setError('Error fetching nutritional information.');
    } finally {
      setLoadingNutrition(false);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Log Food</h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Food Item</label>
                <input
                  type="text"
                  value={foodItem}
                  onChange={(e) => setFoodItem(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Apple, Chicken breast"
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleGetNutrition}
                disabled={loadingNutrition || !foodItem}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              >
                {loadingNutrition ? 'Getting Nutrition...' : 'Get Nutritional Info (AI)'}
              </button>

              {nutritionalInfo && (
                <div className="mt-4 p-4 border border-green-300 rounded-md bg-green-50">
                  <h4 className="text-lg font-semibold text-green-800 mb-2">Nutritional Information:</h4>
                  <div className="text-gray-700 text-sm space-y-1">
                    {nutritionalInfo.calories && <p><strong>Calories:</strong> {nutritionalInfo.calories}</p>}
                    {nutritionalInfo.protein && <p><strong>Protein:</strong> {nutritionalInfo.protein}g</p>}
                    {nutritionalInfo.carbs && <p><strong>Carbs:</strong> {nutritionalInfo.carbs}g</p>}
                    {nutritionalInfo.fat && <p><strong>Fat:</strong> {nutritionalInfo.fat}g</p>}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calories (optional)</label>
                <input
                  type="number"
                  value={calories || ''}
                  onChange={(e) => setCalories(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Manual entry"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Log Food
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

export default LogFoodPage;