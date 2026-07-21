import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MOCK_STUDENTS, INTERVENTIONS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/app-shell";
import { ArrowLeft, Mail, MessageSquare, Plus, BrainCircuit, Calendar, FileText, CheckCircle2, User, Globe, Wallet, Activity } from "lucide-react";
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
        <ArrowLeft size={14} /> Back to cases
      </Link>

      <div className="rounded-2xl border bg-card p-6 flex flex-wrap items-center gap-5">
        <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center font-serif text-2xl font-semibold">{s.avatar}</div>
        <div className="flex-1 min-w-64">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-3xl font-semibold">{s.name}</h1>
            <span className="text-2xl">{s.flag}</span>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              s.riskLevel === "high" ? "bg-destructive/10 text-destructive" :
              s.riskLevel === "medium" ? "bg-[color:var(--warning)]/15 text-[color:var(--warning)]" :
              "bg-[color:var(--success)]/10 text-[color:var(--success)]"
            }`}>{s.riskLevel} risk</span>
          </div>
          <div className="text-sm text-muted-foreground mt-1">{s.email} · {s.program}</div>
          <div className="mt-1 text-sm capitalize">Phase: {s.phase.replace("-"," ")} · Arrived {s.arrivalDate}</div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Mail size={14} className="mr-1" /> Email</Button>
          <Button variant="outline"><MessageSquare size={14} className="mr-1" /> Message</Button>
          <Button onClick={() => toast.success("Intervention drafted")}><Plus size={14} className="mr-1" /> New intervention</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Readiness" value={`${s.readinessScore}/100`} tone="accent" />
        <StatCard label="GPA" value={s.gpa || "—"} />
        <StatCard label="Attendance" value={s.attendance ? `${s.attendance}%` : "—"} tone={s.attendance >= 80 ? "success" : "warning"} />
        <StatCard label="Engagement" value={`${s.engagement}%`} />
        <StatCard label="Wellbeing" value={s.wellbeing} tone={s.wellbeing < 50 ? "danger" : s.wellbeing < 70 ? "warning" : "success"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-2 border-b pb-4 mb-4">
              <BrainCircuit className="text-accent" size={20} />
              <h2 className="font-serif text-xl">AI Advisor Assistant</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Student Summary & Risk Explanation</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {s.riskLevel === "high" 
                    ? `${s.name} is showing significant signs of disengagement. Attendance dropped below 65% this month and wellbeing scores indicate high stress. Cultural adjustment seems difficult based on low community engagement.`
                    : `${s.name} is generally on track but has missed two recent check-ins. Wellbeing score is stable, but financial readiness was flagged early on.`}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-secondary/20 p-4 rounded-lg border">
                  <h3 className="text-sm font-semibold flex items-center gap-1.5"><Calendar size={14}/> Recommended Agenda</h3>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1.5 list-disc pl-4">
                    <li>Review recent attendance dip</li>
                    <li>Discuss housing/financial stress</li>
                    <li>Refer to culturally-aware counselor</li>
                  </ul>
                </div>
                <div className="bg-secondary/20 p-4 rounded-lg border">
                  <h3 className="text-sm font-semibold flex items-center gap-1.5"><MessageSquare size={14}/> Comm Strategy</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Use a supportive, non-punitive tone. Mention you noticed they haven't been as active and you want to ensure they have the resources they need.
                  </p>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button size="sm">Generate Email Draft</Button>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border bg-card p-6">
              <h2 className="font-serif text-lg mb-4 flex items-center gap-2"><Globe size={18}/> Cultural & Social</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground">Languages</div>
                  <div className="text-sm">{s.languages.join(", ")}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Interests</div>
                  <div className="text-sm">{s.interests.join(", ")}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Community Engagement</div>
                  <div className="text-sm">Low (1 event this month)</div>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <h2 className="font-serif text-lg mb-4 flex items-center gap-2"><Wallet size={18}/> Financial & Wellbeing</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground">Financial Hold Status</div>
                  <div className="text-sm text-[color:var(--success)]">Cleared</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Recent Wellbeing Check-in</div>
                  <div className="text-sm">"Feeling overwhelmed by coursework"</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border bg-card p-6">
            <h2 className="font-serif text-xl mb-4">Holistic Readiness Profile</h2>
            <div className="h-64">
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
        </div>

        <div className="rounded-xl border bg-card p-6 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl">Case Timeline</h2>
            <Button variant="ghost" size="icon"><Plus size={16}/></Button>
          </div>
          
          <div className="relative border-l border-border ml-3 pl-5 space-y-6">
            <div className="relative">
              <div className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-background border-2 border-accent" />
              <div className="text-xs text-accent font-medium mb-1">Upcoming Action</div>
              <div className="text-sm font-medium">Follow-up check-in</div>
              <div className="text-xs text-muted-foreground mt-1">Due: Tomorrow</div>
            </div>

            {ints.length > 0 && ints.map(i => (
              <div key={i.id} className="relative">
                <div className={`absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-background border-2 ${i.status === 'completed' ? 'border-[color:var(--success)]' : 'border-[color:var(--warning)]'}`} />
                <div className="text-xs text-muted-foreground mb-1">{i.date} · {i.status}</div>
                <div className="text-sm font-medium">{i.type}</div>
                <div className="text-xs text-muted-foreground mt-1">{i.note}</div>
              </div>
            ))}

            <div className="relative">
              <div className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-background border-2 border-muted-foreground" />
              <div className="text-xs text-muted-foreground mb-1">2026-01-15 · Note</div>
              <div className="text-sm font-medium">Initial Advising Meeting</div>
              <div className="text-xs text-muted-foreground mt-1">Student expressed concern about keeping up with readings. Suggested tutoring center.</div>
            </div>

            <div className="relative">
              <div className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-background border-2 border-muted-foreground" />
              <div className="text-xs text-muted-foreground mb-1">2026-01-10 · System</div>
              <div className="text-sm font-medium">Student Arrived on Campus</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
