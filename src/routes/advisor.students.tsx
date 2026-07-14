import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MOCK_STUDENTS } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/advisor/students")({ component: StudentsList });

const RISKS = ["all", "low", "medium", "high"] as const;

function StudentsList() {
  const [q, setQ] = useState("");
  const [risk, setRisk] = useState<(typeof RISKS)[number]>("all");
  const filtered = MOCK_STUDENTS.filter(s =>
    (risk === "all" || s.riskLevel === risk) &&
    (s.name.toLowerCase().includes(q.toLowerCase()) || s.country.toLowerCase().includes(q.toLowerCase()) || s.program.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-accent">Roster</div>
        <h1 className="font-serif text-3xl font-semibold mt-1">Students</h1>
        <p className="mt-2 text-muted-foreground">All students assigned to your caseload.</p>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-64 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search name, country, program..." className="pl-9" />
        </div>
        <div className="flex gap-1 rounded-lg border p-1 bg-secondary">
          {RISKS.map(r => (
            <button key={r} onClick={() => setRisk(r)}
              className={`text-xs px-3 py-1.5 rounded-md capitalize transition ${risk === r ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left px-5 py-3">Student</th>
              <th className="text-left px-5 py-3">Program</th>
              <th className="text-left px-5 py-3">Phase</th>
              <th className="text-left px-5 py-3">Readiness</th>
              <th className="text-left px-5 py-3">GPA</th>
              <th className="text-left px-5 py-3">Attend.</th>
              <th className="text-left px-5 py-3">Risk</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-secondary/30 transition">
                <td className="px-5 py-3">
                  <Link to="/advisor/students/$id" params={{ id: s.id }} className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold">{s.avatar}</div>
                    <div>
                      <div className="font-medium">{s.name} <span>{s.flag}</span></div>
                      <div className="text-xs text-muted-foreground">{s.country}</div>
                    </div>
                  </Link>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{s.program}</td>
                <td className="px-5 py-3 capitalize text-muted-foreground">{s.phase.replace("-"," ")}</td>
                <td className="px-5 py-3 font-medium">{s.readinessScore}</td>
                <td className="px-5 py-3">{s.gpa || "—"}</td>
                <td className="px-5 py-3">{s.attendance ? `${s.attendance}%` : "—"}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${
                    s.riskLevel === "high" ? "bg-destructive/10 text-destructive" :
                    s.riskLevel === "medium" ? "bg-[color:var(--warning)]/15 text-[color:var(--warning)]" :
                    "bg-[color:var(--success)]/10 text-[color:var(--success)]"
                  }`}>{s.riskLevel}</span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-5 py-12 text-center text-muted-foreground">No matches</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
