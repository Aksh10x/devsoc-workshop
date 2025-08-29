import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import SwipeCard from './components/SwipeCard';
import Matches from './components/Matches';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import './App.css';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
}

// Public Route Component (redirect to swipe if logged in)
function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  return user ? <Navigate to="/swipe" /> : children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            
            {/* Protected Routes */}
            <Route path="/swipe" element={
              <ProtectedRoute>
                <Navbar />
                <SwipeCard />
              </ProtectedRoute>
            } />
            <Route path="/matches" element={
              <ProtectedRoute>
                <Navbar />
                <Matches />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Navbar />
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/swipe" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
