import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../features/auth/components/LoginForm';
import { authApi } from '../features/auth/services/authApi';
import { useAuth } from '../features/auth/context/AuthContext';
import { toast } from 'sonner';
import { ShieldAlert } from 'lucide-react';

export function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const response = await authApi.adminLogin(data);
      login(response.admin, response.token);
      toast.success('Admin access granted');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Access denied');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pt-12">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
            <ShieldAlert className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Admin Portal</h1>
        <p className="text-muted-foreground">Restricted access area.</p>
      </div>
      <div className="bg-card border-2 border-primary/20 rounded-lg p-6 shadow-lg shadow-primary/5">
        <LoginForm onSubmit={handleLogin} loading={loading} />
      </div>
    </div>
  );
}
