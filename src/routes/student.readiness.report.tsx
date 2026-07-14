import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Sparkles, ArrowLeft, TrendingUp, Target, BookOpen } from "lucide-react";
import { REPORT_STRENGTHS, REPORT_IMPROVE, REPORT_NEXT_STEPS } from "@/lib/mock-data";

export const Route = createFileRoute("/student/readiness/report")({ component: ReportPage });



function ReportPage() {
  const score = 74;
  return (
    <div className="space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <Link to="/student/readiness" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={14} /> Back to assessment
        </Link>
        <Badge variant="secondary" className="gap-1"><Sparkles size={12} /> AI generated</Badge>
      </div>

      <section className="rounded-2xl border bg-gradient-to-br from-[color:var(--accent)]/15 via-card to-card p-8 shadow-sm">
        <div className="text-xs uppercase tracking-widest text-[color:var(--accent)]">Your AI Readiness Report</div>
        <h1 className="mt-1 font-serif text-4xl font-semibold">You're on a promising path 🎯</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Based on your responses, we've built a personalized preparation plan. Focus on the recommended
          actions to lift your readiness score before arrival.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-background/60 p-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Overall score</div>
            <div className="mt-1 font-serif text-4xl font-semibold">{score}<span className="text-lg text-muted-foreground">/100</span></div>
            <Progress value={score} className="mt-3 h-2" />
          </div>
          <div className="rounded-xl border bg-background/60 p-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Percentile</div>
            <div className="mt-1 font-serif text-4xl font-semibold">Top 35%</div>
            <div className="mt-2 text-xs text-muted-foreground">vs. international cohort</div>
          </div>
          <div className="rounded-xl border bg-background/60 p-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Recommended focus</div>
            <div className="mt-1 font-serif text-2xl font-semibold">Culture & Finance</div>
            <div className="mt-2 text-xs text-muted-foreground">Highest impact areas</div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card icon={<TrendingUp size={16} className="text-[color:var(--success)]" />} title="Strengths">
          {REPORT_STRENGTHS.map((s) => <Row key={s} label={s} />)}
        </Card>
        <Card icon={<Target size={16} className="text-[color:var(--warning)]" />} title="Areas to improve">
          {REPORT_IMPROVE.map((s) => <Row key={s} label={s} />)}
        </Card>
      </div>

      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-[color:var(--accent)]" />
          <h2 className="font-serif text-xl font-semibold">Recommended next steps</h2>
        </div>
        <ol className="mt-4 space-y-3">
          {REPORT_NEXT_STEPS.map((step, i) => (
            <li key={step} className="flex items-start gap-3 rounded-xl border bg-background/50 p-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--accent)] text-sm font-semibold text-[color:var(--accent-foreground)]">
                {i + 1}
              </div>
              <div className="text-sm">{step}</div>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild><Link to="/student/journey">Open my journey plan</Link></Button>
          <Button variant="outline" asChild><Link to="/student/companion">Ask the AI companion</Link></Button>
        </div>
      </section>
    </div>
  );
}

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2">{icon}<h2 className="font-serif text-xl font-semibold">{title}</h2></div>
      <div className="mt-4 space-y-2">{children}</div>
    </div>
  );
}
function Row({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border bg-background/50 px-3 py-2 text-sm">
      <CheckCircle2 size={14} className="text-[color:var(--success)]" /> {label}
    </div>
  );
}
