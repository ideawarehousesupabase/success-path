import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { INTERVENTIONS, MOCK_STUDENTS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/advisor/interventions")({ component: InterventionsPage });

const COLUMNS = ["open", "scheduled", "in-progress", "completed"] as const;

function InterventionsPage() {
  const [items, setItems] = useState(INTERVENTIONS);
  const move = (id: string, status: (typeof COLUMNS)[number]) => {
    setItems(items.map(i => i.id === id ? { ...i, status } : i));
    toast.success("Status updated");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-accent">Case management</div>
          <h1 className="font-serif text-3xl font-semibold mt-1">Intervention Center</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">Track outreach, tutoring, counseling referrals, and mentor pairings.</p>
        </div>
        <Button onClick={() => toast.success("New intervention drafted")}><Plus size={16} className="mr-1" /> New</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLUMNS.map(col => {
          const list = items.filter(i => i.status === col);
          return (
            <div key={col} className="rounded-xl border bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs uppercase tracking-widest text-muted-foreground capitalize">{col.replace("-"," ")}</div>
                <div className="text-xs px-2 py-0.5 rounded-full bg-secondary">{list.length}</div>
              </div>
              <div className="space-y-2">
                {list.map(i => {
                  const s = MOCK_STUDENTS.find(m => m.id === i.studentId);
                  return (
                    <div key={i.id} className="rounded-lg border bg-background p-3">
                      <div className="text-sm font-medium">{i.type}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{s?.name} {s?.flag}</div>
                      <div className="text-xs text-muted-foreground mt-1">{i.date}</div>
                      <p className="mt-2 text-xs">{i.note}</p>
                      <div className="mt-2 flex gap-1 flex-wrap">
                        {COLUMNS.filter(c => c !== i.status).map(c => (
                          <button key={c} onClick={() => move(i.id, c)}
                            className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border hover:bg-accent hover:text-accent-foreground hover:border-accent transition">
                            → {c.replace("-"," ")}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
