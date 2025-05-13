import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  isAuthenticated: boolean;
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, element }) => {
  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;