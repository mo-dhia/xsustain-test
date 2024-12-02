import { Navigate, Outlet } from 'react-router-dom';
import { states } from './store';
import Layout from './components/layout/layout';
import { useEffect } from 'react';

const ProtectedRoute = () => {
    const { user, setUser } = states();

    useEffect(() => {
        if (!user) {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, [user]);

    if (!user && !localStorage.getItem("user")) {
        return <Navigate to="/login" replace />;
    }

    // If user exists, render the child routes
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default ProtectedRoute;
