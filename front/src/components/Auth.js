import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists in localStorage

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
