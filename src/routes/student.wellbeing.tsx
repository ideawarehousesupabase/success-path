import { createFileRoute } from "@tanstack/react-router";
import { WELLBEING_TIPS } from "@/lib/mock-data";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Heart, Moon, Users, Brain } from "lucide-react";

export const Route = createFileRoute("/student/wellbeing")({ component: WellbeingPage });

const MOODS = ["😞", "😕", "😐", "🙂", "😄"] as const;
const DIMENSIONS = [
  { key: "mood", label: "Mood", icon: Heart, score: 72 },
  { key: "sleep", label: "Sleep", icon: Moon, score: 58 },
  { key: "social", label: "Social", icon: Users, score: 65 },
  { key: "focus", label: "Focus", icon: Brain, score: 80 },
];

function WellbeingPage() {
  const [mood, setMood] = useState<number | null>(null);
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <div className="text-xs uppercase tracking-widest text-accent">Take care</div>
        <h1 className="font-serif text-3xl font-semibold mt-1">Wellbeing</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">A gentle weekly check-in. Your responses are private and help tune your support.</p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h2 className="font-serif text-xl">Today's check-in</h2>
        <p className="text-sm text-muted-foreground">How are you feeling right now?</p>
        <div className="mt-4 flex gap-3">
          {MOODS.map((m, i) => (
            <button key={i} onClick={() => setMood(i)}
              className={`text-3xl h-14 w-14 rounded-full border-2 transition ${mood === i ? "border-accent bg-accent/10 scale-110" : "border-border hover:border-accent/50"}`}>
              {m}
            </button>
          ))}
        </div>
        {mood !== null && (
          <Button className="mt-4" onClick={() => toast.success("Check-in saved. Nice work showing up for yourself.")}>Log check-in</Button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DIMENSIONS.map(d => (
          <div key={d.key} className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between">
              <div className="h-9 w-9 rounded-md bg-accent/15 text-accent flex items-center justify-center"><d.icon size={18} /></div>
              <div className={`text-xs font-medium ${d.score >= 70 ? "text-[color:var(--success)]" : d.score >= 50 ? "text-[color:var(--warning)]" : "text-destructive"}`}>
                {d.score >= 70 ? "Good" : d.score >= 50 ? "Fair" : "Low"}
              </div>
            </div>
            <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{d.label}</div>
            <div className="font-serif text-3xl font-semibold">{d.score}</div>
            <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: `${d.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-serif text-xl">Suggested for you</h2>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {WELLBEING_TIPS.map(t => (
            <div key={t.id} className="rounded-xl border bg-card p-5">
              <div className="text-xs uppercase tracking-widest text-accent">{t.tag}</div>
              <div className="mt-1 font-serif text-lg">{t.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => toast.success("Added to today's plan")}>Try today</Button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border-2 border-destructive/30 bg-destructive/5 p-5">
        <div className="text-xs uppercase tracking-widest text-destructive">Need immediate support?</div>
        <div className="mt-1 font-serif text-lg">24/7 confidential counseling is one click away.</div>
        <Button className="mt-3" variant="destructive">Connect with counselor</Button>
      </div>
    </div>
  );
}
