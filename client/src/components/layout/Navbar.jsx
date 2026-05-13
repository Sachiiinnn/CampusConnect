import { Link, NavLink } from 'react-router-dom';
import { Network } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
          <Network className="h-6 w-6" />
          <span>CampusConnect</span>
        </Link>
        <div className="flex gap-6">
          <NavLink to="/" className={({ isActive }) => cn("text-sm font-medium transition-colors hover:text-primary", isActive ? "text-primary" : "text-muted-foreground")}>Home</NavLink>
          <NavLink to="/events" className={({ isActive }) => cn("text-sm font-medium transition-colors hover:text-primary", isActive ? "text-primary" : "text-muted-foreground")}>All Events</NavLink>
          <Link to="/events/new" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">Add Event</Link>
        </div>
      </div>
    </nav>
  );
}
