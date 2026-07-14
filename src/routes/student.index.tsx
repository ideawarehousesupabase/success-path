import { createFileRoute, Link } from "@tanstack/react-router";
import { StatCard } from "@/components/app-shell";
import { MOCK_STUDENTS, READINESS_MODULES, JOURNEY_MILESTONES } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/student/")({ component: StudentDashboard });

function StudentDashboard() {
  const { user } = useAuth();
  const student = MOCK_STUDENTS.find(s => s.id === user?.studentId) ?? MOCK_STUDENTS[0];
  const upcoming = JOURNEY_MILESTONES.filter(m => !m.complete).slice(0, 3);
  const active = READINESS_MODULES.filter(m => m.progress < 100).slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-br from-sidebar to-sidebar/85 text-sidebar-foreground p-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 h-64 w-64 bg-accent/30 blur-3xl rounded-full" />
        <div className="relative">
          <div className="text-xs uppercase tracking-widest text-sidebar-foreground/60">Welcome back</div>
          <h1 className="mt-2 font-serif text-4xl font-semibold">Hello, {(user?.name || "there").split(" ")[0]} {student.flag}</h1>
          <p className="mt-2 text-sidebar-foreground/70 max-w-xl">
            You're {student.readinessScore}% ready for your journey to {student.university}. Let's keep the momentum going.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/student/readiness">Continue readiness <ArrowRight size={16} className="ml-1" /></Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent border-sidebar-foreground/30 text-sidebar-foreground hover:bg-sidebar-accent">
              <Link to="/student/companion"><Sparkles size={16} className="mr-1" /> Talk to AI companion</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Readiness score" value={`${student.readinessScore}`} hint="out of 100" tone="accent" />
        <StatCard label="Journey phase" value={<span className="capitalize">{student.phase.replace("-", " ")}</span>} hint={student.arrivalDate} />
        <StatCard label="Wellbeing" value={`${student.wellbeing}`} hint="weekly check-in" tone={student.wellbeing >= 70 ? "success" : "warning"} />
        <StatCard label="Engagement" value={`${student.engagement}%`} hint="last 30 days" tone="default" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Continue where you left off</div>
              <h2 className="font-serif text-xl mt-1">Readiness modules</h2>
            </div>
            <Button asChild variant="ghost" size="sm"><Link to="/student/readiness">View all</Link></Button>
          </div>
          <div className="mt-4 space-y-4">
            {active.map(m => (
              <div key={m.id} className="rounded-lg border p-4 hover:bg-secondary/40 transition">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{m.icon}</span>
                    <div>
                      <div className="font-medium">{m.title}</div>
                      <div className="text-xs text-muted-foreground capitalize">{m.status.replace("-", " ")}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{m.progress}%</div>
                </div>
                <Progress value={m.progress} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Coming up</div>
          <h2 className="font-serif text-xl mt-1">Milestones</h2>
          <div className="mt-4 space-y-3">
            {upcoming.map(m => (
              <div key={m.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-accent shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{m.title}</div>
                  <div className="text-xs text-muted-foreground">{m.date}</div>
                </div>
              </div>
            ))}
            {JOURNEY_MILESTONES.filter(m => m.complete).slice(-1).map(m => (
              <div key={m.id} className="flex items-start gap-3 p-3 rounded-lg bg-[color:var(--success)]/10">
                <CheckCircle2 size={16} className="mt-0.5 text-[color:var(--success)] shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{m.title}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
