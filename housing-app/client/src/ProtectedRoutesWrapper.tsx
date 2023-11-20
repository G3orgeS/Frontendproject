import React from 'react';
import { RouteProps, Navigate } from 'react-router-dom';

interface ProtectedRoutesWrapperProps {
  isAuthenticated: null | boolean;
  children: React.ReactNode;
}

const ProtectedRoutesWrapper: React.FC<ProtectedRoutesWrapperProps & RouteProps> = ({ isAuthenticated, children, ...rest }) => {
    if (typeof isAuthenticated !== 'boolean') {
        return null
    }
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoutesWrapper;
