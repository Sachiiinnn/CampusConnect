import { useState } from 'react';
import { CreateAdminForm } from '../features/auth/components/CreateAdminForm';
import { authApi } from '../features/auth/services/authApi';
import { toast } from 'sonner';
import { ShieldCheck } from 'lucide-react';

export function CreateAdminPage() {
  const [loading, setLoading] = useState(false);

  const handleCreateAdmin = async (data) => {
    setLoading(true);
    try {
      const response = await authApi.createAdmin(data);
      toast.success(response.message || 'Admin account provisioned successfully');
      // Reset logic handled by react-hook-form ideally, but a reload or manual reset is fine
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pt-12">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
            <ShieldCheck className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Provision Admin</h1>
        <p className="text-muted-foreground">Create a new administrator account. Super Admin access required.</p>
      </div>
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <CreateAdminForm onSubmit={handleCreateAdmin} loading={loading} />
      </div>
    </div>
  );
}
