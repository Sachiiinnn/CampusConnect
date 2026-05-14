import { Link, NavLink } from 'react-router-dom';
import { Network, LogOut, LayoutDashboard } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../features/auth/context/AuthContext';

export function Navbar() {
  const { user, logout, isAdmin, displayName } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
          <Network className="h-6 w-6" />
          <span>CampusConnect</span>
        </Link>
        <div className="flex items-center gap-6">
          <NavLink to="/" className={({ isActive }) => cn("text-sm font-medium transition-colors hover:text-primary", isActive ? "text-primary" : "text-muted-foreground")}>Home</NavLink>
          <NavLink to="/events" className={({ isActive }) => cn("text-sm font-medium transition-colors hover:text-primary", isActive ? "text-primary" : "text-muted-foreground")}>All Events</NavLink>
          
          <div className="flex items-center gap-4">
            {isAdmin && (
              <>
                <NavLink to="/admin/dashboard" className={({ isActive }) => cn("flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary", isActive ? "text-primary" : "text-muted-foreground")}>
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </NavLink>
                <Link to="/events/new" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">Add Event</Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-4 border-l pl-6">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold">{displayName}</span>
                  <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-full hover:bg-accent transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <>
                <NavLink to="/login" className={({ isActive }) => cn("text-sm font-medium transition-colors hover:text-primary", isActive ? "text-primary" : "text-muted-foreground")}>Login</NavLink>
                <NavLink to="/register" className="text-sm font-medium border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary/5 transition-colors">Register</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
