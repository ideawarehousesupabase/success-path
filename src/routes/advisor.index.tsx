import { createFileRoute, Link } from "@tanstack/react-router";
import { StatCard } from "@/components/app-shell";
import { MOCK_STUDENTS, RETENTION_TREND, COHORT_BREAKDOWN, INTERVENTIONS } from "@/lib/mock-data";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/advisor/")({ component: AdvisorDashboard });

function AdvisorDashboard() {
  const total = MOCK_STUDENTS.length;
  const high = MOCK_STUDENTS.filter(s => s.riskLevel === "high").length;
  const medium = MOCK_STUDENTS.filter(s => s.riskLevel === "medium").length;
  const avgReadiness = Math.round(MOCK_STUDENTS.reduce((a,s) => a+s.readinessScore, 0) / total);
  const openInts = INTERVENTIONS.filter(i => i.status !== "completed").length;

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-widest text-accent">Advisor console</div>
        <h1 className="font-serif text-3xl font-semibold mt-1">Cohort at a glance</h1>
        <p className="mt-2 text-muted-foreground">Spring 2026 · Northfield University</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active students" value={total} hint="assigned to you" />
        <StatCard label="High risk" value={high} hint="needs intervention" tone="danger" />
        <StatCard label="Medium risk" value={medium} hint="watchlist" tone="warning" />
        <StatCard label="Avg readiness" value={`${avgReadiness}`} hint="/ 100" tone="accent" />
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
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Open work</div>
          <h2 className="font-serif text-xl mt-1">Interventions</h2>
          <div className="mt-4 font-serif text-5xl font-semibold">{openInts}</div>
          <div className="text-xs text-muted-foreground">active cases</div>
          <Button asChild variant="outline" className="mt-4 w-full"><Link to="/advisor/interventions">Open center <ArrowRight size={14} className="ml-1" /></Link></Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Cohort</div>
          <h2 className="font-serif text-xl mt-1">By country</h2>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COHORT_BREAKDOWN}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="country" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Bar dataKey="count" fill="var(--color-chart-2)" radius={[4,4,0,0]} />
                <Bar dataKey="atRisk" fill="var(--color-chart-1)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Attention needed</div>
              <h2 className="font-serif text-xl mt-1">Top at-risk students</h2>
            </div>
            <Button asChild variant="ghost" size="sm"><Link to="/advisor/students">All students</Link></Button>
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
                  <div className="text-xs text-muted-foreground mt-1">Score {s.readinessScore}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
