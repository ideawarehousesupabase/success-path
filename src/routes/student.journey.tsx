import { createFileRoute } from "@tanstack/react-router";
import { JOURNEY_MILESTONES } from "@/lib/mock-data";
import { CheckCircle2, Circle, Plane, GraduationCap, BookOpen, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/student/journey")({ component: JourneyPage });

const PHASES = [
  { key: "pre-arrival", label: "Pre-arrival", icon: Plane, desc: "Visa, housing, packing, mental prep." },
  { key: "orientation", label: "Orientation", icon: GraduationCap, desc: "Welcome week, registration, campus tour." },
  { key: "semester-1", label: "First semester", icon: BookOpen, desc: "Classes, community, first exams." },
  { key: "ongoing", label: "Ongoing success", icon: TrendingUp, desc: "Career, internships, graduation path." },
] as const;

function JourneyPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <div className="text-xs uppercase tracking-widest text-accent">Your journey</div>
        <h1 className="font-serif text-3xl font-semibold mt-1">Journey Map</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">Every milestone from offer letter to graduation — with AI-suggested next actions.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {PHASES.map((p, i) => {
          const done = JOURNEY_MILESTONES.filter(m => m.phase === p.key && m.complete).length;
          const total = JOURNEY_MILESTONES.filter(m => m.phase === p.key).length;
          const active = done > 0 && done < total;
          return (
            <div key={p.key} className={`rounded-xl border p-5 relative ${active ? "bg-accent/10 border-accent" : "bg-card"}`}>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Phase {i+1}</div>
              <div className="mt-1 flex items-center gap-2">
                <p.icon size={18} className="text-accent" />
                <div className="font-serif text-lg font-semibold">{p.label}</div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
              <div className="mt-3 text-xs">{done}/{total} milestones</div>
            </div>
          );
        })}
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-4">
          {JOURNEY_MILESTONES.map(m => (
            <div key={m.id} className="flex items-start gap-4 pl-1">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 shrink-0 relative z-10 ${
                m.complete ? "bg-[color:var(--success)] border-[color:var(--success)] text-white" : "bg-background border-accent text-accent"
              }`}>
                {m.complete ? <CheckCircle2 size={16} /> : <Circle size={12} />}
              </div>
              <div className={`flex-1 rounded-lg border p-4 ${m.complete ? "bg-card opacity-70" : "bg-card"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{m.phase.replace("-", " ")}</div>
                    <div className="font-medium">{m.title}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{m.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
