import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
interface ProtectedRouteProps {
  role?: 'applicant' | 'reviewer' | 'admin' | 'superadmin';
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  role
}) => {
  const {
    isAuthenticated,
    user,
    isLoading
  } = useAuth();
  const location = useLocation();
  // Show loading indicator while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
  }
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{
      from: location
    }} replace />;
  }
  // Check if user has the required role
  if (role && user?.role !== role) {
    // If superadmin, allow access to all roles
    if (user?.role === 'superadmin') {
      return <Outlet />;
    }
    // If admin, allow access to reviewer and applicant roles
    if (user?.role === 'admin' && (role === 'reviewer' || role === 'applicant')) {
      return <Outlet />;
    }
    // If reviewer, allow access to applicant role
    if (user?.role === 'reviewer' && role === 'applicant') {
      return <Outlet />;
    }
    // Otherwise, redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }
  // Allow access to the protected routes
  return <Outlet />;
};