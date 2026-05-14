import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailsPage } from './pages/EventDetailsPage';
import { CreateEditEventPage } from './pages/CreateEditEventPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { CreateAdminPage } from './pages/CreateAdminPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/:id" element={<EventDetailsPage />} />
        
        {/* User Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Add user-specific routes here if any */}
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="events/new" element={<CreateEditEventPage />} />
          <Route path="events/:id/edit" element={<CreateEditEventPage />} />
          <Route path="admin/dashboard" element={<AdminDashboardPage />} />
        </Route>

        {/* Super Admin Protected Routes */}
        <Route element={<ProtectedRoute superAdminOnly={true} />}>
          <Route path="admin/create" element={<CreateAdminPage />} />
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="admin/login" element={<AdminLoginPage />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
