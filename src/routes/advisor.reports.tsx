import { createFileRoute } from "@tanstack/react-router";
import { RETENTION_TREND, COHORT_BREAKDOWN, MOCK_STUDENTS } from "@/lib/mock-data";
import { StatCard } from "@/components/app-shell";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/advisor/reports")({ component: ReportsPage });

function ReportsPage() {
  const risk = ["low","medium","high"].map(r => ({ name: r, value: MOCK_STUDENTS.filter(s => s.riskLevel === r).length }));
  const colors = ["var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-1)"];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-accent">Analytics</div>
          <h1 className="font-serif text-3xl font-semibold mt-1">Reports</h1>
          <p className="mt-2 text-muted-foreground">Executive-ready views of readiness, engagement, and retention.</p>
        </div>
        <Button variant="outline" onClick={() => toast.success("Report exported (mock)")}><Download size={16} className="mr-1" /> Export PDF</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Overall retention" value="92%" hint="↑ 2pp vs prev semester" tone="success" />
        <StatCard label="Avg readiness" value="69" hint="/ 100" tone="accent" />
        <StatCard label="Interventions closed" value="34" hint="last 30 days" />
        <StatCard label="Avg time-to-intervention" value="4.2d" hint="from risk trigger" tone="warning" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border bg-card p-6">
          <h2 className="font-serif text-xl">Retention & risk trend</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RETENTION_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Legend />
                <Line type="monotone" dataKey="retention" stroke="var(--color-chart-3)" strokeWidth={2.5} />
                <Line type="monotone" dataKey="atRisk" stroke="var(--color-chart-1)" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="font-serif text-xl">Risk distribution</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={risk} innerRadius={50} outerRadius={90} dataKey="value" nameKey="name">
                  {risk.map((_, i) => <Cell key={i} fill={colors[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h2 className="font-serif text-xl">Cohort by country</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="text-left py-2">Country</th><th className="text-left py-2">Students</th><th className="text-left py-2">At risk</th><th className="text-left py-2">Retention est.</th></tr>
            </thead>
            <tbody className="divide-y">
              {COHORT_BREAKDOWN.map(c => (
                <tr key={c.country}>
                  <td className="py-3">{c.country}</td>
                  <td className="py-3">{c.count}</td>
                  <td className="py-3">{c.atRisk}</td>
                  <td className="py-3">{Math.round(100 - (c.atRisk / c.count) * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
