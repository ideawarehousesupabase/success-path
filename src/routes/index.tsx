import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand";
import { ArrowRight, Sparkles, Users, LineChart, ShieldCheck, GraduationCap, HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  const { user, ready } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (ready && user) navigate({ to: user.role === "advisor" ? "/advisor" : "/student" });
  }, [ready, user, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Platform</a>
            <a href="#flow" className="hover:text-foreground">Student journey</a>
            <a href="#advisor" className="hover:text-foreground">For advisors</a>
          </nav>
          <div className="flex gap-2">
            <Button asChild variant="ghost"><Link to="/login">Sign in</Link></Button>
            <Button asChild><Link to="/signup">Get started</Link></Button>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
              <Sparkles size={12} className="text-accent" /> AI readiness & retention
            </div>
            <h1 className="mt-6 text-5xl md:text-6xl font-serif font-semibold leading-[1.05] tracking-tight">
              Every international student, <span className="text-accent">supported</span> from offer to graduation.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              SuccessPath AI blends pre-arrival readiness, an always-on AI companion, and predictive retention insights — so advisors intervene before students slip through the cracks.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild><Link to="/signup">Start as a student <ArrowRight size={16} className="ml-1" /></Link></Button>
              <Button size="lg" variant="outline" asChild><Link to="/login">Advisor sign in</Link></Button>
            </div>
            <div className="mt-6 text-xs text-muted-foreground">
              Demo accounts pre-seeded: <code className="text-foreground">student@demo.com</code> / <code className="text-foreground">advisor@demo.com</code> — password <code className="text-foreground">demo1234</code>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
            <div className="relative rounded-2xl border bg-card p-6 shadow-xl">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Cohort health</div>
                  <div className="font-serif text-2xl mt-1">Spring 2026</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-serif font-semibold text-[color:var(--success)]">92%</div>
                  <div className="text-xs text-muted-foreground">retention</div>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  { name: "Aditi Sharma 🇮🇳", risk: "Low", tone: "success", score: 82 },
                  { name: "Chen Wei 🇨🇳", risk: "Medium", tone: "warning", score: 61 },
                  { name: "Miguel Santos 🇧🇷", risk: "High", tone: "danger", score: 44 },
                ].map(s => (
                  <div key={s.name} className="flex items-center justify-between rounded-md border bg-background px-4 py-3">
                    <div>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-muted-foreground">Readiness {s.score}/100</div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      s.tone === "success" ? "bg-[color:var(--success)]/10 text-[color:var(--success)]" :
                      s.tone === "warning" ? "bg-[color:var(--warning)]/15 text-[color:var(--warning)]" :
                      "bg-destructive/10 text-destructive"
                    }`}>{s.risk} risk</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-y bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-accent">The platform</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-serif font-semibold">One journey, two experiences.</h2>
            <p className="mt-3 text-muted-foreground">Students get a warm, guided experience. Advisors get a predictive command center. Everything shares the same source of truth.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { icon: GraduationCap, title: "Pre-arrival readiness", body: "Adaptive assessment across academic, cultural, financial, and emotional dimensions with tailored prep modules." },
              { icon: HeartHandshake, title: "AI companion", body: "24/7 conversational guidance for homesickness, coursework, admin — trained on institutional resources." },
              { icon: Users, title: "Community & mentorship", body: "Peer groups, cultural affinity spaces, and structured mentorship matching." },
              { icon: LineChart, title: "Predictive retention", body: "Weighted risk model surfaces at-risk students weeks before traditional early-warning systems." },
              { icon: ShieldCheck, title: "Advisor console", body: "Case management, intervention tracking, and cohort analytics in one workspace." },
              { icon: Sparkles, title: "Wellbeing tracking", body: "Lightweight check-ins detect burnout, isolation, and financial stress early." },
            ].map(f => (
              <div key={f.title} className="rounded-xl border bg-card p-6 hover:shadow-md transition">
                <div className="h-10 w-10 rounded-md bg-accent/15 text-accent flex items-center justify-center"><f.icon size={20} /></div>
                <div className="mt-4 font-serif text-lg font-semibold">{f.title}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo />
          <div className="text-xs text-muted-foreground">© 2026 SuccessPath AI · Prototype MVP</div>
        </div>
      </footer>
    </div>
  );
}
