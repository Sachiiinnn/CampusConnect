import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEventDetails } from '../features/events/hooks/useEventDetails';
import { FAQSection } from '../features/events/components/FAQSection';
import { eventsApi } from '../features/events/services/eventsApi';
import { Calendar, MapPin, Briefcase, ExternalLink, Edit, Trash2, Loader2, Building2, Linkedin, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../features/auth/context/AuthContext';

export function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { event, similarEvents, loading, error, refetch } = useEventDetails(id);
  
  // isAdmin checks if the logged in user is either 'admin' or 'super-admin'
  const { isAdmin } = useAuth(); 

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (error || !event) return <div className="text-center text-danger p-4 bg-danger/10 rounded-lg">{error || 'Event not found'}</div>;

  const fallbackImage = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1350&q=80';

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await eventsApi.delete(id);
      toast.success('Event deleted successfully');
      navigate('/events');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete event');
    }
  };

  const copyLinkedinPost = () => {
    const text = `Excited to share that I'm applying for the ${event.title} by ${event.organizer}! Looking forward to this amazing opportunity. 🚀 #${event.type.replace(/\s+/g, '')} #CareerGoals`;
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden relative">
        <img src={event.imageURL || fallbackImage} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6 md:p-10 text-white w-full">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                {event.type}
              </span>
              {event.tags?.map((tag, i) => (
                <span key={i} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-white/30">
                  #{tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{event.title}</h1>
            <div className="flex items-center gap-2 text-white/80">
              <Building2 className="h-5 w-5" />
              <span className="text-lg">by <span className="font-semibold text-white">{event.organizer}</span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-xl p-4 flex items-start gap-3 bg-card shadow-sm">
              <div className="bg-primary/10 p-3 rounded-lg text-primary"><Calendar className="h-6 w-6" /></div>
              <div><p className="text-sm text-muted-foreground">Deadline</p><p className="font-semibold">{new Date(event.deadline).toLocaleDateString()}</p></div>
            </div>
            <div className="border rounded-xl p-4 flex items-start gap-3 bg-card shadow-sm">
              <div className="bg-primary/10 p-3 rounded-lg text-primary"><Briefcase className="h-6 w-6" /></div>
              <div><p className="text-sm text-muted-foreground">Mode</p><p className="font-semibold">{event.mode}</p></div>
            </div>
            <div className="border rounded-xl p-4 flex items-start gap-3 bg-card shadow-sm">
              <div className="bg-primary/10 p-3 rounded-lg text-primary"><MapPin className="h-6 w-6" /></div>
              <div><p className="text-sm text-muted-foreground">Location</p><p className="font-semibold">{event.location}</p></div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">About the Event</h2>
            <div className="prose prose-slate max-w-none text-muted-foreground whitespace-pre-wrap">
              {event.description}
            </div>
            
            <FAQSection event={event} onFaqAdded={refetch} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6 shadow-sm sticky top-24">
            <a href={event.applyLink} target="_blank" rel="noreferrer" className="w-full mb-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8">
              Apply Now <ExternalLink className="ml-2 h-4 w-4" />
            </a>
            
            {/* Conditional Rendering: Only show Edit/Delete if user is an Admin/SuperAdmin */}
            {isAdmin ? (
              <div className="flex gap-2 mb-6 border-b pb-6">
                <Link to={`/events/${event._id}/edit`} className="flex-1 inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Link>
                <button onClick={handleDelete} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-danger hover:bg-danger/10 hover:text-danger hover:border-danger/30">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <hr className="mb-6 border-border" />
            )}

            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2"><Linkedin className="h-5 w-5 text-[#0A66C2]" /> Share on LinkedIn</h3>
              <div className="bg-muted p-3 rounded-lg text-sm text-muted-foreground italic relative group">
                "Excited to share that I'm applying for the {event.title} by {event.organizer}! Looking forward to this amazing opportunity. 🚀 #{event.type.replace(/\s+/g, '')} #CareerGoals"
                <button onClick={copyLinkedinPost} className="absolute top-2 right-2 p-1.5 bg-background rounded border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" title="Copy text"><Copy className="h-3 w-3" /></button>
              </div>
              <a href="https://www.linkedin.com/feed/" target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent h-9 px-4">
                Open LinkedIn
              </a>
            </div>

            {similarEvents?.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold mb-4">Similar Events</h3>
                <div className="space-y-3">
                  {similarEvents.map(sim => (
                    <Link key={sim._id} to={`/events/${sim._id}`} className="block p-3 rounded-lg border hover:border-primary/50 hover:bg-muted/30 transition-colors">
                      <p className="font-medium text-sm line-clamp-1">{sim.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Calendar className="h-3 w-3"/> Ends {new Date(sim.deadline).toLocaleDateString()}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}