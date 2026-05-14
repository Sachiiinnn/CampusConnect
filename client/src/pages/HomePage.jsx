import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, GraduationCap, Trophy, Laptop } from 'lucide-react';

export function HomePage() {
  return (
    <div className="flex flex-col gap-20 py-10">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="h-3 w-3" />
          <span>New Opportunities Daily</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl">
          Empower Your Campus Journey with <span className="text-primary">CampusConnect</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          The ultimate platform for students to discover hackathons, internships, fests, and workshops. Your next big break is just a click away.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link to="/events" className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
            Explore Events
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link to="/events/new" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
            List an Opportunity
          </Link>
        </div>
      </section>

      {/* Feature Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="p-8 rounded-2xl border bg-card shadow-sm space-y-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Trophy className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">Hackathons</h3>
          <p className="text-muted-foreground">Join competitive coding events and build innovative solutions with peers.</p>
        </div>
        <div className="p-8 rounded-2xl border bg-card shadow-sm space-y-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">Internships</h3>
          <p className="text-muted-foreground">Find career-starting opportunities at top companies and startups.</p>
        </div>
        <div className="p-8 rounded-2xl border bg-card shadow-sm space-y-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Laptop className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">Workshops</h3>
          <p className="text-muted-foreground">Up-skill yourself with hands-on sessions led by industry experts.</p>
        </div>
      </section>
    </div>
  );
}
