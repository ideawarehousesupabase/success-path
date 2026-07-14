import { createFileRoute, Link } from "@tanstack/react-router";
import { MOCK_STUDENTS, RISK_FACTORS } from "@/lib/mock-data";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/advisor/risk")({ component: RiskPage });

function RiskPage() {
  const highRisk = MOCK_STUDENTS.filter(s => s.riskLevel === "high");
  const medRisk = MOCK_STUDENTS.filter(s => s.riskLevel === "medium");

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <div className="text-xs uppercase tracking-widest text-accent">Predictive</div>
        <h1 className="font-serif text-3xl font-semibold mt-1">Risk Insights</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          A weighted AI model surfaces students at risk of disengagement or attrition weeks before traditional signals.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h2 className="font-serif text-xl">Model factors</h2>
        <p className="text-sm text-muted-foreground">Signals continuously ingested into the risk score.</p>
        <div className="mt-5 space-y-3">
          {RISK_FACTORS.map(f => (
            <div key={f.factor} className="flex items-center gap-4">
              <div className="w-48 text-sm">{f.factor}</div>
              <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent to-destructive" style={{ width: `${f.weight * 300}%`, maxWidth: "100%" }} />
              </div>
              <div className="w-14 text-right text-sm font-medium">{Math.round(f.weight * 100)}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <RiskColumn title="High risk — act now" tone="danger" students={highRisk} />
        <RiskColumn title="Medium risk — monitor" tone="warning" students={medRisk} />
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
      <div className="mt-4 space-y-3">
        {students.map(s => (
          <Link key={s.id} to="/advisor/students/$id" params={{ id: s.id }} className="block rounded-lg border p-4 hover:bg-secondary/40 transition">
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
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div><div className="text-muted-foreground">GPA</div><div className="font-medium">{s.gpa || "—"}</div></div>
              <div><div className="text-muted-foreground">Attend.</div><div className="font-medium">{s.attendance}%</div></div>
              <div><div className="text-muted-foreground">Wellbeing</div><div className="font-medium">{s.wellbeing}</div></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
