import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';

export function EventCard({ event }) {
  const fallbackImage = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1350&q=80';
  
  return (
    <Link to={`/events/${event._id}`} className="group relative rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all hover:-translate-y-1 overflow-hidden flex flex-col h-full">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img 
          src={event.imageURL || fallbackImage} 
          alt={event.title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-primary/10 text-primary">
            {event.type}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(event.deadline).toLocaleDateString()}
          </span>
        </div>
        <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
          {event.description}
        </p>
        <div className="flex items-center text-xs text-muted-foreground border-t pt-3 mt-auto">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{event.location || event.mode}</span>
        </div>
      </div>
    </Link>
  );
}
