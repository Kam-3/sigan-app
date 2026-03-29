import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    // Se não tiver token, redireciona para o login
    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;