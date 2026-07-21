import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand";
import { ArrowRight, Sparkles, Users, LineChart, ShieldCheck, GraduationCap, HeartHandshake, ShieldAlert, Activity, FileText } from "lucide-react";

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
            <a href="#features" className="hover:text-foreground">Platform Capabilities</a>
            <a href="#demo" className="hover:text-foreground">Demo Walkthrough</a>
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
              <Sparkles size={12} className="text-accent" /> Institutional Operating System
            </div>
            <h1 className="mt-6 text-5xl md:text-6xl font-serif font-semibold leading-[1.05] tracking-tight">
              AI-powered <span className="text-accent">Readiness-to-Retention</span> platform.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              SuccessPath AI blends pre-arrival readiness, an always-on AI companion, and predictive retention insights — empowering universities to support international students and maintain UKVI compliance.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild><a href="#demo">Start full demo <ArrowRight size={16} className="ml-1" /></a></Button>
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
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Predictive Retention</div>
                  <div className="font-serif text-2xl mt-1">Spring 2026 Cohort</div>
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
            <div className="text-xs uppercase tracking-widest text-accent">Platform Capabilities</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-serif font-semibold">One connected system.</h2>
            <p className="mt-3 text-muted-foreground">Students get a warm, guided experience. Advisors get a predictive command center and compliance dashboard.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: "Pre-arrival Readiness", body: "Adaptive assessment across academic, cultural, financial, and emotional dimensions.", link: "/student/readiness" },
              { icon: HeartHandshake, title: "AI Companion", body: "24/7 conversational guidance for homesickness, coursework, and admin.", link: "/student/companion" },
              { icon: Users, title: "Community & Mentorship", body: "Peer groups, cultural affinity spaces, and structured mentorship matching.", link: "/student/community" },
              { icon: LineChart, title: "Predictive Retention", body: "Weighted risk model surfaces at-risk students before traditional systems.", link: "/advisor/retention" },
              { icon: ShieldCheck, title: "Advisor Console", body: "Case management, intervention tracking, and cohort analytics in one workspace.", link: "/advisor" },
              { icon: ShieldAlert, title: "UKVI & Sponsor Licence Compliance", body: "Automated attendance tracking, visa condition monitoring, and audit reports.", link: "/advisor/compliance" },
              { icon: Activity, title: "Wellbeing Tracking", body: "Lightweight check-ins detect burnout, isolation, and financial stress early.", link: "/student/wellbeing" },
            ].map(f => (
              <Link key={f.title} to={f.link} className="rounded-xl border bg-card p-6 hover:shadow-md transition block">
                <div className="h-10 w-10 rounded-md bg-accent/15 text-accent flex items-center justify-center"><f.icon size={20} /></div>
                <div className="mt-4 font-serif text-lg font-semibold">{f.title}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-widest text-accent">Demo flow</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-serif font-semibold">Complete Platform Walkthrough</h2>
          <p className="mt-3 text-muted-foreground">Follow this sequence to experience the full capabilities of SuccessPath AI for both students and university staff.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          <div>
            <h3 className="font-serif text-2xl border-b pb-2 mb-6 flex items-center gap-2"><GraduationCap className="text-accent"/> 1. The Student Experience</h3>
            <div className="space-y-3 relative border-l border-border ml-3 pl-6">
              {[
                { title: "Landing Page", link: "/", desc: "Where it all begins." },
                { title: "Student Dashboard", link: "/student", desc: "The student's personal command center." },
                { title: "Pre-arrival Readiness Assessment", link: "/student/readiness", desc: "Multi-dimensional onboarding questionnaire." },
                { title: "AI Readiness Report", link: "/student/readiness/report", desc: "Personalized action plan generated by AI." },
                { title: "Journey Map", link: "/student/journey", desc: "Interactive timeline of milestones." },
                { title: "AI Companion", link: "/student/companion", desc: "24/7 institutional knowledge bot." },
                { title: "Community & Mentorship", link: "/student/community", desc: "Peer connections and social support." },
                { title: "Wellbeing Tracking", link: "/student/wellbeing", desc: "Mental health and stress check-ins." },
              ].map((step, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-background border-2 border-accent" />
                  <Link to={step.link} className="block group">
                    <div className="font-medium group-hover:text-accent transition">{i+1}. {step.title}</div>
                    <div className="text-sm text-muted-foreground">{step.desc}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-2xl border-b pb-2 mb-6 flex items-center gap-2"><ShieldCheck className="text-accent"/> 2. The Institutional Experience</h3>
            <div className="space-y-3 relative border-l border-border ml-3 pl-6">
              {[
                { title: "Predictive Retention Dashboard", link: "/advisor/retention", desc: "Institution-wide risk monitoring." },
                { title: "Advisor Console", link: "/advisor", desc: "Operational workload and case management." },
                { title: "UKVI & Sponsor Licence Compliance", link: "/advisor/compliance", desc: "Attendance and regulatory monitoring." },
                { title: "Reports & Institutional Analytics", link: "/advisor/reports", desc: "High-level performance data." },
                { title: "Platform Impact Summary", link: "/", desc: "Return to homepage overview." },
              ].map((step, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-background border-2 border-accent" />
                  <Link to={step.link} className="block group">
                    <div className="font-medium group-hover:text-accent transition">{i+9}. {step.title}</div>
                    <div className="text-sm text-muted-foreground">{step.desc}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo />
          <div className="text-xs text-muted-foreground">© 2026 SuccessPath AI · Built for UK Universities</div>
        </div>
      </footer>
    </div>
  );
}
