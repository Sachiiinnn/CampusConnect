import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterForm } from '../features/auth/components/RegisterForm';
import { authApi } from '../features/auth/services/authApi';
import { useAuth } from '../features/auth/context/AuthContext';
import { toast } from 'sonner';

export function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      const response = await authApi.userRegister(data);
      login(response.user, response.token);
      toast.success('Account created successfully');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pt-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create an Account</h1>
        <p className="text-muted-foreground">Join CampusConnect to stay updated on campus events.</p>
      </div>
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <RegisterForm onSubmit={handleRegister} loading={loading} />
        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
