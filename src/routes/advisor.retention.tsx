import { createFileRoute, Link } from "@tanstack/react-router";
import { MOCK_STUDENTS, RISK_FACTORS, RETENTION_TREND } from "@/lib/mock-data";
import { AlertTriangle, TrendingUp, Filter, BrainCircuit } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/advisor/retention")({ component: RetentionPage });

function RetentionPage() {
  const highRisk = MOCK_STUDENTS.filter(s => s.riskLevel === "high");
  const medRisk = MOCK_STUDENTS.filter(s => s.riskLevel === "medium");
  const lowRisk = MOCK_STUDENTS.filter(s => s.riskLevel === "low");

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-accent">Predictive</div>
          <h1 className="font-serif text-3xl font-semibold mt-1">Predictive Retention</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            A weighted AI model surfaces students at risk of disengagement or attrition weeks before traditional signals.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Filter size={14} className="mr-2" /> Filters</Button>
          <Button size="sm">Run Cohort Analysis</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-5">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Total monitored</div>
          <div className="font-serif text-3xl font-semibold mt-1">{MOCK_STUDENTS.length}</div>
        </div>
        <div className="rounded-xl border bg-card p-5 border-b-4 border-b-destructive">
          <div className="text-xs uppercase tracking-widest text-destructive">High risk</div>
          <div className="font-serif text-3xl font-semibold mt-1 text-destructive">{highRisk.length}</div>
        </div>
        <div className="rounded-xl border bg-card p-5 border-b-4 border-b-[color:var(--warning)]">
          <div className="text-xs uppercase tracking-widest text-[color:var(--warning)]">Medium risk</div>
          <div className="font-serif text-3xl font-semibold mt-1 text-[color:var(--warning)]">{medRisk.length}</div>
        </div>
        <div className="rounded-xl border bg-card p-5 border-b-4 border-b-[color:var(--success)]">
          <div className="text-xs uppercase tracking-widest text-[color:var(--success)]">Low risk</div>
          <div className="font-serif text-3xl font-semibold mt-1 text-[color:var(--success)]">{lowRisk.length}</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Historical Trend</div>
              <h2 className="font-serif text-xl mt-1">Retention & Risk Analytics</h2>
            </div>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RETENTION_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="retention" stroke="var(--color-chart-3)" strokeWidth={2.5} dot={{ r: 3 }} name="Retention %" />
                <Line type="monotone" dataKey="atRisk" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={{ r: 3 }} name="At-Risk Count" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="font-serif text-xl">Model Factors</h2>
          <p className="text-sm text-muted-foreground">Signals continuously ingested into the risk score.</p>
          <div className="mt-5 space-y-3">
            {RISK_FACTORS.map(f => (
              <div key={f.factor} className="flex items-center gap-4">
                <div className="w-40 text-xs">{f.factor}</div>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent to-destructive" style={{ width: `${f.weight * 300}%`, maxWidth: "100%" }} />
                </div>
                <div className="w-10 text-right text-xs font-medium">{Math.round(f.weight * 100)}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <RiskColumn title="High risk — immediate action required" tone="danger" students={highRisk} />
        <RiskColumn title="Medium risk — active monitoring" tone="warning" students={medRisk} />
      </div>
    </div>
  );
}

function RiskColumn({ title, tone, students }: { title: string; tone: "danger" | "warning"; students: typeof MOCK_STUDENTS }) {
  const cls = tone === "danger" ? "text-destructive border-l-destructive" : "text-[color:var(--warning)] border-l-[color:var(--warning)]";
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className={`border-l-4 pl-3 ${cls}`}>
        <div className="text-xs uppercase tracking-widest">Cohort segment</div>
        <h2 className="font-serif text-xl">{title}</h2>
      </div>
      <div className="mt-4 space-y-4">
        {students.map(s => (
          <div key={s.id} className="rounded-lg border bg-background overflow-hidden">
            <Link to="/advisor/students/$id" params={{ id: s.id }} className="block p-4 hover:bg-secondary/40 transition border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold">{s.avatar}</div>
                  <div>
                    <div className="font-medium text-sm">{s.name} <span>{s.flag}</span></div>
                    <div className="text-xs text-muted-foreground">{s.program}</div>
                  </div>
                </div>
                <AlertTriangle size={16} className={tone === "danger" ? "text-destructive" : "text-[color:var(--warning)]"} />
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
                <div><div className="text-muted-foreground">Score</div><div className="font-medium">{s.readinessScore}/100</div></div>
                <div><div className="text-muted-foreground">GPA</div><div className="font-medium">{s.gpa || "—"}</div></div>
                <div><div className="text-muted-foreground">Attend.</div><div className="font-medium">{s.attendance}%</div></div>
                <div><div className="text-muted-foreground">Wellbeing</div><div className="font-medium">{s.wellbeing}</div></div>
              </div>
            </Link>
            <div className="p-3 bg-secondary/30">
              <div className="flex gap-2">
                <BrainCircuit size={14} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-medium text-accent">AI Risk Explanation</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {s.riskLevel === "high" 
                      ? "Declining attendance over the past 3 weeks combined with a drop in wellbeing score indicates severe burnout risk."
                      : "Slight dip in recent academic engagement. Missed one advisor check-in."}
                  </div>
                  <div className="text-xs font-medium mt-2">Recommended: {s.riskLevel === "high" ? "Urgent 1:1 meeting & counseling referral" : "Check-in email"}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
