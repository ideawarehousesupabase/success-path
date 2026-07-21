import { createFileRoute, Link } from "@tanstack/react-router";
import { StatCard } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { ShieldCheck, AlertCircle, Calendar, Download, FileText, Activity, AlertTriangle } from "lucide-react";
import { MOCK_STUDENTS } from "@/lib/mock-data";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export const Route = createFileRoute("/advisor/compliance")({ component: CompliancePage });

const ENGAGEMENT_TREND = [
  { week: "W1", engagement: 98 },
  { week: "W2", engagement: 97 },
  { week: "W3", engagement: 96 },
  { week: "W4", engagement: 94 },
  { week: "W5", engagement: 92 },
  { week: "W6", engagement: 89 },
];

function CompliancePage() {
  const complianceRiskStudents = MOCK_STUDENTS.filter(s => s.attendance < 80);

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-accent">Sponsor Licence Management</div>
          <h1 className="font-serif text-3xl font-semibold mt-1">UKVI Compliance</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Monitor international student attendance, visa conditions, and institutional sponsor obligations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline"><Download size={14} className="mr-2" /> Export Audit Report</Button>
          <Button>Run Compliance Check</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Compliance Health" value="98%" hint="overall cohort average" tone="success" />
        <StatCard label="UKVI Compliance" value="99%" hint="visa conditions met" tone="success" />
        <StatCard label="Attendance Review" value={complianceRiskStudents.length} hint="students below 80%" tone="warning" />
        <StatCard label="Pending Actions" value="12" hint="advisor follow-ups needed" tone="danger" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Monitoring</div>
              <h2 className="font-serif text-xl mt-1">Attendance & Engagement</h2>
            </div>
            <div className="text-sm px-3 py-1 bg-secondary rounded-full font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[color:var(--success)]"></span> System Healthy
            </div>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ENGAGEMENT_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="week" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} domain={[80, 100]} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="engagement" stroke="var(--color-chart-2)" strokeWidth={2.5} dot={{ r: 4 }} name="Avg Engagement %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="font-serif text-xl mb-4 flex items-center gap-2"><AlertCircle size={18} className="text-destructive"/> Compliance Alerts</h2>
          <div className="space-y-4">
            <div className="p-3 rounded-lg border bg-destructive/5 border-destructive/20 relative">
              <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-destructive animate-pulse"></div>
              <div className="text-sm font-medium text-destructive">Low Attendance Threshold</div>
              <div className="text-xs text-muted-foreground mt-1">3 students have fallen below the 80% UKVI minimum requirement.</div>
              <Button size="sm" variant="outline" className="mt-2 text-xs h-7">Review Cases</Button>
            </div>
            <div className="p-3 rounded-lg border bg-[color:var(--warning)]/10 border-[color:var(--warning)]/20">
              <div className="text-sm font-medium text-[color:var(--warning)]">Missing Documentation</div>
              <div className="text-xs text-muted-foreground mt-1">12 pending BRP collection confirmations for new arrivals.</div>
            </div>
            <div className="p-3 rounded-lg border bg-secondary/30">
              <div className="text-sm font-medium">Missed Check-ins</div>
              <div className="text-xs text-muted-foreground mt-1">5 students missed their scheduled monthly engagement checkpoint.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl">Students Approaching Risk</h2>
            <Button variant="ghost" size="sm" asChild><Link to="/advisor/students">View Directory</Link></Button>
          </div>
          <div className="space-y-3">
            {complianceRiskStudents.map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary/40 transition">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold">{s.avatar}</div>
                  <div>
                    <div className="text-sm font-medium">{s.name} <span className="ml-1">{s.flag}</span></div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <AlertTriangle size={12} className="text-[color:var(--warning)]" /> Attendance: {s.attendance}%
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" asChild><Link to="/advisor/students/$id" params={{ id: s.id }}>Profile</Link></Button>
              </div>
            ))}
            {complianceRiskStudents.length === 0 && <div className="text-sm text-muted-foreground">No students currently at risk.</div>}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="font-serif text-xl mb-4 flex items-center gap-2"><ShieldCheck size={18} className="text-[color:var(--success)]"/> Standard Compliance Timeline</h2>
          <div className="relative border-l-2 border-muted ml-3 pl-6 space-y-6">
            <div className="relative">
              <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-[color:var(--success)] flex items-center justify-center">
                <CheckCircle2 size={10} className="text-white" />
              </div>
              <div className="font-medium text-sm">CAS Issued & Student Onboarded</div>
              <div className="text-xs text-muted-foreground mt-0.5">Automated tracking initialized.</div>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-[color:var(--success)] flex items-center justify-center">
                <CheckCircle2 size={10} className="text-white" />
              </div>
              <div className="font-medium text-sm">Arrival Confirmed & BRP Collected</div>
              <div className="text-xs text-muted-foreground mt-0.5">Documents verified in portal.</div>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-[color:var(--success)] flex items-center justify-center">
                <CheckCircle2 size={10} className="text-white" />
              </div>
              <div className="font-medium text-sm">Orientation Completed</div>
              <div className="text-xs text-muted-foreground mt-0.5">Mandatory sessions attended.</div>
            </div>
            <div className="relative">
              <div className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-background border-2 border-accent" />
              <div className="font-medium text-sm text-accent">Active Attendance Monitoring</div>
              <div className="text-xs text-muted-foreground mt-0.5">Continuous tracking of lectures and seminars.</div>
            </div>
            <div className="relative opacity-60">
              <div className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-background border-2 border-muted" />
              <div className="font-medium text-sm">Monthly Engagement Checkpoints</div>
              <div className="text-xs text-muted-foreground mt-0.5">Ongoing academic progress reviews.</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-xl border bg-card p-6">
        <h2 className="font-serif text-xl mb-4">Audit Reports</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg hover:bg-secondary/20 cursor-pointer transition flex flex-col items-center text-center">
            <FileText size={24} className="text-muted-foreground mb-2" />
            <div className="text-sm font-medium">Monthly Attendance Log</div>
            <div className="text-xs text-muted-foreground mt-1">Generated: 1st of month</div>
          </div>
          <div className="p-4 border rounded-lg hover:bg-secondary/20 cursor-pointer transition flex flex-col items-center text-center">
            <Activity size={24} className="text-muted-foreground mb-2" />
            <div className="text-sm font-medium">Intervention History</div>
            <div className="text-xs text-muted-foreground mt-1">All advisor actions & notes</div>
          </div>
          <div className="p-4 border rounded-lg hover:bg-secondary/20 cursor-pointer transition flex flex-col items-center text-center">
            <ShieldCheck size={24} className="text-[color:var(--success)] mb-2" />
            <div className="text-sm font-medium">Sponsor Licence Summary</div>
            <div className="text-xs text-muted-foreground mt-1">Complete compliance package</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircle2(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
}
