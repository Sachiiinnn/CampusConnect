import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from '../features/auth/components/LoginForm';
import { authApi } from '../features/auth/services/authApi';
import { useAuth } from '../features/auth/context/AuthContext';
import { toast } from 'sonner';

export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const response = await authApi.userLogin(data);
      login(response.user, response.token);
      toast.success('Successfully logged in');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pt-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-muted-foreground">Enter your credentials to access your account.</p>
      </div>
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <LoginForm onSubmit={handleLogin} loading={loading} />
        <div className="mt-6 flex justify-between items-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Create one here
            </Link>
          </p>
          <Link to="/admin/login" className="text-muted-foreground hover:text-primary transition-colors text-xs">
            Admin Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
