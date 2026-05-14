import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthContext';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute({ adminOnly = false, superAdminOnly = false }) {
  const { user, loading, isAdmin, isSuperAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (superAdminOnly && !isSuperAdmin) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !isAdmin && !superAdminOnly) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
