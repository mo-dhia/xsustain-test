import { Navigate, Outlet } from 'react-router-dom';
import { states } from './store';
import Layout from './components/layout/layout';

const ProtectedRoute = () => {
    const { user } = states();


    // If no user is logged in, redirect to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If user exists, render the child routes
    return <Layout>
        <Outlet />
    </Layout>

};

export default ProtectedRoute;