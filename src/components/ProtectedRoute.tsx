
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean; // Make authentication optional for routes like Learning
  requirePremium?: boolean; // New prop to check if route requires premium access
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true,
  requirePremium = false 
}) => {
  const { isAuthenticated, isPending, user, startFreeTimer } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if we've checked auth status, authentication is required, and user is not authenticated
    if (!isPending && requireAuth && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
    
    // Start the free trial timer if this is a premium feature and user is not premium
    if (!isPending && isAuthenticated && requirePremium && user && !user.isPremium) {
      startFreeTimer();
    }
  }, [isAuthenticated, navigate, isPending, requireAuth, requirePremium, user, startFreeTimer]);

  // Show loading spinner while checking auth status
  if (isPending) {
    return <LoadingSpinner fullScreen />;
  }

  // For routes that require auth, only render children if authenticated
  // For routes that don't require auth, always render children
  return (requireAuth && !isAuthenticated) ? <LoadingSpinner fullScreen /> : <>{children}</>;
};

export default ProtectedRoute;
