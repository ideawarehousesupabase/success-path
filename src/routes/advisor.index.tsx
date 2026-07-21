import { createFileRoute, Link } from "@tanstack/react-router";
import { StatCard } from "@/components/app-shell";
import { MOCK_STUDENTS, RETENTION_TREND, COHORT_BREAKDOWN, INTERVENTIONS } from "@/lib/mock-data";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, CheckCircle2, MessageSquare, Briefcase } from "lucide-react";

export const Route = createFileRoute("/advisor/")({ component: AdvisorDashboard });

function AdvisorDashboard() {
  const total = MOCK_STUDENTS.length;
  const high = MOCK_STUDENTS.filter(s => s.riskLevel === "high").length;
  const medium = MOCK_STUDENTS.filter(s => s.riskLevel === "medium").length;
  const avgReadiness = Math.round(MOCK_STUDENTS.reduce((a,s) => a+s.readinessScore, 0) / total);
  const openInts = INTERVENTIONS.filter(i => i.status !== "completed").length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-accent">Advisor console</div>
          <h1 className="font-serif text-3xl font-semibold mt-1">Operational Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Spring 2026 · Northfield University</p>
        </div>
        <Button asChild><Link to="/advisor/students">View my caseload</Link></Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active cases" value={total} hint="students assigned to you" />
        <StatCard label="High-risk students" value={high} hint="needs immediate intervention" tone="danger" />
        <StatCard label="Cohort performance" value={`${avgReadiness}/100`} hint="average readiness score" tone="accent" />
        <StatCard label="Advisor workload" value={openInts} hint="open interventions" tone="warning" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-4 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground"><Clock size={20} /></div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest">Avg intervention time</div>
            <div className="font-medium">2.4 days</div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-4 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-[color:var(--success)]/10 flex items-center justify-center text-[color:var(--success)]"><CheckCircle2 size={20} /></div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest">Success rate</div>
            <div className="font-medium">88% resolved</div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-4 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent"><MessageSquare size={20} /></div>
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest">Response rate</div>
            <div className="font-medium">94% within 24h</div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Trend</div>
              <h2 className="font-serif text-xl mt-1">Retention & risk (7 months)</h2>
            </div>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RETENTION_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="retention" stroke="var(--color-chart-3)" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="atRisk" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Attention needed</div>
              <h2 className="font-serif text-xl mt-1">Top at-risk students</h2>
            </div>
            <Button asChild variant="ghost" size="sm"><Link to="/advisor/students">All</Link></Button>
          </div>
          <div className="mt-4 space-y-2">
            {MOCK_STUDENTS.filter(s => s.riskLevel !== "low").sort((a,b) => a.readinessScore - b.readinessScore).slice(0, 5).map(s => (
              <Link key={s.id} to="/advisor/students/$id" params={{ id: s.id }}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary/40 transition">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold">{s.avatar}</div>
                  <div>
                    <div className="text-sm font-medium">{s.name} <span className="ml-1">{s.flag}</span></div>
                    <div className="text-xs text-muted-foreground">{s.program}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    s.riskLevel === "high" ? "bg-destructive/10 text-destructive" : "bg-[color:var(--warning)]/15 text-[color:var(--warning)]"
                  }`}>{s.riskLevel}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
