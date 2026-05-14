import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-xl text-muted-foreground">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
