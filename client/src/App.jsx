import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { EventsPage } from './pages/EventsPage';
import { EventDetailsPage } from './pages/EventDetailsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div className="text-center py-20"><h1 className="text-4xl font-bold mb-4">Welcome to CampusConnect</h1><p className="text-xl text-muted-foreground">Find the best opportunities around you.</p></div>} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/:id" element={<EventDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
