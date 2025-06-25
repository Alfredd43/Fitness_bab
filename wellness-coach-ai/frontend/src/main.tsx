import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './AuthContext';
import { BrowserRouter } from 'react-router-dom'; // ✅ Add this

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter> {/* ✅ Wrap with BrowserRouter to enable routing */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
