import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { states } from './store';

const ProtectedRoute = () => {
    const { user } = states();
 

    // If no user is logged in, redirect to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If user exists, render the child routes
    return <Outlet />;
};

export default ProtectedRoute;