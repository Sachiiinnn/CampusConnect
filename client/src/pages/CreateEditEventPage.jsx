import { useParams, useNavigate } from 'react-router-dom';
import { EventForm } from '../features/events/components/EventForm';
import { useEventDetails } from '../features/events/hooks/useEventDetails';
import { eventsApi } from '../features/events/services/eventsApi';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function CreateEditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  // Only fetch if editing
  const { event, loading: fetchLoading } = useEventDetails(isEditMode ? id : null);

  const handleSubmit = async (data) => {
    try {
      // Ensure tags are a comma separated string handled correctly by backend if needed
      // (Backend validation logic handles string split)
      if (isEditMode) {
        await eventsApi.update(id, data);
        toast.success('Event updated successfully');
        navigate(`/events/${id}`);
      } else {
        const newEvent = await eventsApi.create(data);
        toast.success('Event created successfully');
        navigate(`/events/${newEvent._id}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'An error occurred while saving');
    }
  };

  if (isEditMode && fetchLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{isEditMode ? 'Edit Event' : 'Add New Event'}</h1>
        <p className="text-muted-foreground">{isEditMode ? 'Update the details below.' : 'Fill out the form to list a new opportunity.'}</p>
      </div>
      <EventForm initialData={event} onSubmit={handleSubmit} />
    </div>
  );
}
