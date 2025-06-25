import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import DashboardPage from './DashboardPage';
import LoggingPage from './LoggingPage';
import LogExercisePage from './LogExercisePage';
import LogFoodPage from './LogFoodPage';
import LogWaterPage from './LogWaterPage';
import NotFoundPage from './NotFoundPage';
import PrivateRoute from './PrivateRoute';
import AICoachPage from './AICoachPage';
import { AuthProvider, useAuth } from './AuthContext';

function App() {
  const { user } = useAuth(); // Access the authenticated user

  return (
    <AuthProvider>
      <Routes>
        {/* Redirect root based on login status */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/logging"
          element={
            <PrivateRoute>
              <LoggingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/log/exercise"
          element={
            <PrivateRoute>
              <LogExercisePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/log/food"
          element={
            <PrivateRoute>
              <LogFoodPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/log/water"
          element={
            <PrivateRoute>
              <LogWaterPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/ai-coach"
          element={
            <PrivateRoute>
              <AICoachPage />
            </PrivateRoute>
          }
        />

        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
