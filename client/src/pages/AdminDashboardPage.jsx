import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authApi } from "../features/auth/services/authApi";
import { useAuth } from "../features/auth/context/AuthContext";
import {
  Shield,
  Users,
  Loader2,
  Calendar,
  HelpCircle,
  UserPlus,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

export function AdminDashboardPage() {
  const { user, displayName } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await authApi.getAdminDashboard();
        setDashboardData(res.data);
      } catch (error) {
        toast.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  const stats = dashboardData?.stats || {};

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Control Panel
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {displayName} ({user?.role})
            </p>
          </div>
        </div>

        {/* Conditional Create Admin Button */}
        {user?.role === "super-admin" && (
          <Link
            to="/admin/create"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 font-medium transition-colors shadow-sm"
          >
            <UserPlus className="h-5 w-5" />
            Provision New Admin
          </Link>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users Card */}
        <div className="bg-card border rounded-xl p-6 shadow-sm flex flex-col justify-center gap-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Registered Users
            </p>
            <div className="bg-blue-500/10 p-2 rounded-full text-blue-500">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.totalUsers || 0}</p>
        </div>

        {/* Total Events Card */}
        <div className="bg-card border rounded-xl p-6 shadow-sm flex flex-col justify-center gap-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Total Events
            </p>
            <div className="bg-green-500/10 p-2 rounded-full text-green-500">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.totalEvents || 0}</p>
        </div>

        {/* Total FAQs Card */}
        <div className="bg-card border rounded-xl p-6 shadow-sm flex flex-col justify-center gap-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              FAQs Asked
            </p>
            <div className="bg-yellow-500/10 p-2 rounded-full text-yellow-500">
              <HelpCircle className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.totalFAQs || 0}</p>
        </div>

        {/* Total Admins Card */}
        <div className="bg-card border rounded-xl p-6 shadow-sm flex flex-col justify-center gap-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Admin Accounts
            </p>
            <div className="bg-red-500/10 p-2 rounded-full text-red-500">
              <ShieldAlert className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.totalAdmins || 0}</p>
        </div>
      </div>
    </div>
  );
}
