
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
import { useAuth } from './AuthContext';

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import DashboardPage from './DashboardPage';
import LoggingPage from './LoggingPage';
import LogExercisePage from './LogExercisePage';
import LogFoodPage from './LogFoodPage';
import LogWaterPage from './LogWaterPage';
import AICoachPage from './AICoachPage';
import NotFoundPage from './NotFoundPage';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
      />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

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

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;
