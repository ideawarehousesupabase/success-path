import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MOCK_STUDENTS, INTERVENTIONS, RISK_FACTORS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/app-shell";
import { ArrowLeft, Mail, MessageSquare, Plus } from "lucide-react";
import { toast } from "sonner";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/advisor/students/$id")({
  component: StudentDetail,
  loader: ({ params }) => {
    const s = MOCK_STUDENTS.find(m => m.id === params.id);
    if (!s) throw notFound();
    return { student: s };
  },
  notFoundComponent: () => (
    <div className="p-8"><Link to="/advisor/students" className="text-accent">← Back to students</Link><h1 className="mt-4 font-serif text-2xl">Student not found</h1></div>
  ),
  errorComponent: ({ error }) => <div className="p-8 text-destructive">{error.message}</div>,
});

function StudentDetail() {
  const { student: s } = Route.useLoaderData();
  const ints = INTERVENTIONS.filter(i => i.studentId === s.id);
  const radarData = [
    { dim: "Academic", value: s.gpa * 25 },
    { dim: "Attendance", value: s.attendance },
    { dim: "Engagement", value: s.engagement },
    { dim: "Wellbeing", value: s.wellbeing },
    { dim: "Readiness", value: s.readinessScore },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <Link to="/advisor/students" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
        <ArrowLeft size={14} /> Back to students
      </Link>

      <div className="rounded-2xl border bg-card p-6 flex flex-wrap items-center gap-5">
        <div className="h-20 w-20 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-serif text-2xl font-semibold">{s.avatar}</div>
        <div className="flex-1 min-w-64">
          <div className="font-serif text-3xl">{s.name} <span>{s.flag}</span></div>
          <div className="text-sm text-muted-foreground">{s.email} · {s.program}</div>
          <div className="mt-1 text-sm capitalize">Phase: {s.phase.replace("-"," ")} · Arrived {s.arrivalDate}</div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Mail size={14} className="mr-1" /> Email</Button>
          <Button variant="outline"><MessageSquare size={14} className="mr-1" /> Message</Button>
          <Button onClick={() => toast.success("Intervention drafted")}><Plus size={14} className="mr-1" /> New intervention</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Readiness" value={s.readinessScore} tone="accent" />
        <StatCard label="GPA" value={s.gpa || "—"} />
        <StatCard label="Attendance" value={s.attendance ? `${s.attendance}%` : "—"} tone={s.attendance >= 80 ? "success" : "warning"} />
        <StatCard label="Engagement" value={`${s.engagement}%`} />
        <StatCard label="Wellbeing" value={s.wellbeing} tone={s.wellbeing < 50 ? "danger" : s.wellbeing < 70 ? "warning" : "success"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6">
          <h2 className="font-serif text-xl">Holistic profile</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis dataKey="dim" stroke="var(--color-muted-foreground)" fontSize={12} />
                <PolarRadiusAxis stroke="var(--color-muted-foreground)" fontSize={10} />
                <Radar dataKey="value" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="font-serif text-xl">AI risk analysis</h2>
          <p className="text-sm text-muted-foreground">Weighted factors driving the current risk score.</p>
          <div className="mt-4 space-y-3">
            {RISK_FACTORS.map(f => (
              <div key={f.factor}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>{f.factor}</span>
                  <span className="text-muted-foreground">{Math.round(f.weight * 100)}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: `${f.weight * 100 * 3}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h2 className="font-serif text-xl">Interventions & notes</h2>
        {ints.length === 0 && <div className="mt-4 text-sm text-muted-foreground">No interventions yet.</div>}
        <div className="mt-4 space-y-3">
          {ints.map(i => (
            <div key={i.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">{i.type}</div>
                <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                  i.status === "completed" ? "bg-[color:var(--success)]/10 text-[color:var(--success)]" :
                  i.status === "in-progress" ? "bg-[color:var(--warning)]/15 text-[color:var(--warning)]" :
                  i.status === "scheduled" ? "bg-accent/15 text-accent-foreground/90" :
                  "bg-secondary text-muted-foreground"
                }`}>{i.status.replace("-"," ")}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">{i.date}</div>
              <p className="mt-2 text-sm">{i.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
