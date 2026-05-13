import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const eventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  type: z.enum(['Hackathon', 'Internship', 'Fest', 'Workshop']),
  organizer: z.string().min(1, "Organizer is required"),
  mode: z.enum(['Online', 'Offline', 'Hybrid']),
  location: z.string().optional(),
  deadline: z.string().min(1, "Deadline is required"),
  applyLink: z.string().url("Must be a valid URL"),
  description: z.string().min(10, "Description needs more detail"),
  tags: z.string().min(1, "Tags are required"),
  imageURL: z.string().url("Must be a valid URL").optional().or(z.literal('')),
});

export function EventForm({ initialData, onSubmit, isLoading }) {
  const defaultValues = {
    title: initialData?.title || '',
    type: initialData?.type || 'Hackathon',
    organizer: initialData?.organizer || '',
    mode: initialData?.mode || 'Online',
    location: initialData?.location || 'Delhi-NCR',
    deadline: initialData?.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : '',
    applyLink: initialData?.applyLink || '',
    description: initialData?.description || '',
    tags: initialData?.tags?.join(', ') || '',
    imageURL: initialData?.imageURL || '',
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card border p-6 md:p-8 rounded-xl shadow-sm">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Title</label>
        <input {...register('title')} className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 ${errors.title ? 'border-danger' : 'border-input'}`} placeholder="e.g., AI Hackathon 2026" />
        {errors.title && <p className="text-sm text-danger">{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Type</label>
          <select {...register('type')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
            <option value="Hackathon">Hackathon</option>
            <option value="Internship">Internship</option>
            <option value="Fest">Fest</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Mode</label>
          <select {...register('mode')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Organizer</label>
          <input {...register('organizer')} className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20" placeholder="e.g., Google Developers" />
          {errors.organizer && <p className="text-sm text-danger">{errors.organizer.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <input {...register('location')} className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20" placeholder="Delhi-NCR, Online, etc." />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Application Deadline</label>
          <input type="date" {...register('deadline')} className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20" />
          {errors.deadline && <p className="text-sm text-danger">{errors.deadline.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Apply Link</label>
          <input type="url" {...register('applyLink')} className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20" placeholder="https://" />
          {errors.applyLink && <p className="text-sm text-danger">{errors.applyLink.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <textarea {...register('description')} rows="4" className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20" placeholder="Brief description of the event..."></textarea>
        {errors.description && <p className="text-sm text-danger">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Tags</label>
        <input {...register('tags')} className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20" placeholder="web, ai, ml (comma separated)" />
        <p className="text-xs text-muted-foreground">Comma separated values</p>
        {errors.tags && <p className="text-sm text-danger">{errors.tags.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Image URL (Optional)</label>
        <input type="url" {...register('imageURL')} className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20" placeholder="https://" />
        {errors.imageURL && <p className="text-sm text-danger">{errors.imageURL.message}</p>}
      </div>

      <button type="submit" disabled={isLoading} className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
        {isLoading ? 'Saving...' : (initialData ? 'Update Event' : 'Create Event')}
      </button>
    </form>
  );
}
