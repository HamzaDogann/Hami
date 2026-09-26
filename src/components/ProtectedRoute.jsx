import { Navigate } from 'react-router-dom';

import { useUser } from '../providers/userAccountContext';

// Sends visitors without a profile (username + avatar) back to the login page.
const ProtectedRoute = ({ children }) => {
    const { userAccount } = useUser();
    return userAccount ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
