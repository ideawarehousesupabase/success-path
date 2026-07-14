import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { READINESS_MODULES, READINESS_QUESTIONS, REPORT_STRENGTHS, REPORT_IMPROVE, REPORT_NEXT_STEPS } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Sparkles,
  Clock,
  FileText,
  GraduationCap,
  Languages,
  Wallet,
  Globe2,
  Users,
  Home,
  HeartPulse,
  Heart,
  ShieldCheck,
  Bot,
  Lightbulb,
  ArrowDown,
  ChevronRight,
  Loader2,
  Star,
  TrendingUp,
  Target,
  BookOpen,
} from "lucide-react";

export const Route = createFileRoute("/student/readiness")({ component: ReadinessPage });

// Map assessment question categories to rich metadata (UI only — no data changes)
const CATEGORY_META: Record<
  string,
  { icon: React.ComponentType<{ size?: number; className?: string }>; blurb: string; accent: string }
> = {
  Academic: {
    icon: GraduationCap,
    blurb: "Helps us recommend writing workshops and academic coaching before arrival.",
    accent: "from-amber-500/15 to-amber-500/0",
  },
  Cultural: {
    icon: Globe2,
    blurb: "Guides cultural orientation modules and buddy program matching.",
    accent: "from-emerald-500/15 to-emerald-500/0",
  },
  Financial: {
    icon: Wallet,
    blurb: "Personalises banking setup steps and cost-of-living checklists.",
    accent: "from-sky-500/15 to-sky-500/0",
  },
  Social: {
    icon: Users,
    blurb: "Suggests clubs, events and peer groups that fit your interests.",
    accent: "from-fuchsia-500/15 to-fuchsia-500/0",
  },
  Emotional: {
    icon: Heart,
    blurb: "Unlocks wellbeing tools and counseling resources tailored to you.",
    accent: "from-rose-500/15 to-rose-500/0",
  },
  Practical: {
    icon: Home,
    blurb: "Sequences housing, transport and paperwork tasks for a smooth landing.",
    accent: "from-indigo-500/15 to-indigo-500/0",
  },
  Language: {
    icon: Languages,
    blurb: "Recommends language partners, practice apps and speaking clubs.",
    accent: "from-teal-500/15 to-teal-500/0",
  },
  Health: {
    icon: HeartPulse,
    blurb: "Explains local healthcare, insurance and pharmacy essentials.",
    accent: "from-red-500/15 to-red-500/0",
  },
};

const CHECKLIST = [
  { id: "visa", label: "Visa & Documentation", status: "complete", desc: "Passport, I-20 and visa stamp verified.", progress: 100 },
  { id: "housing", label: "Housing", status: "warn", desc: "Confirm lease start date and roommate details.", progress: 80 },
  { id: "banking", label: "Banking", status: "warn", desc: "Student account and international transfer plan.", progress: 60 },
  { id: "culture", label: "Cultural Orientation", status: "todo", desc: "Complete campus norms module.", progress: 45 },
  { id: "health", label: "Healthcare", status: "todo", desc: "Insurance enrolment and vaccinations.", progress: 30 },
  { id: "language", label: "Language", status: "todo", desc: "Speaking practice and academic writing prep.", progress: 55 },
  { id: "safety", label: "Safety", status: "todo", desc: "Emergency contacts and campus safety walkthrough.", progress: 20 },
] as const;

const AI_TIPS = [
  "Students who prepare accommodation early experience a smoother transition.",
  "Completing your banking setup before arrival reduces first-week stress.",
  "Attending orientation events helps students settle in up to 3× faster.",
  "One weekly video call home lowers reported homesickness by ~40%.",
  "Joining a single club in week one is the strongest predictor of belonging.",
];

const LOADING_STEPS = [
  "Analyzing academic readiness…",
  "Evaluating language confidence…",
  "Checking financial preparedness…",
  "Reviewing cultural adaptation signals…",
  "Preparing personalized recommendations…",
  "Generating your AI Readiness Report…",
];

function ReadinessPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [tipIndex, setTipIndex] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const questionnaireRef = useRef<HTMLDivElement>(null);

  const answeredCount = Object.keys(answers).length;
  const total = READINESS_QUESTIONS.length;
  const percent = Math.round((answeredCount / total) * 100);
  const avg = answeredCount
    ? Math.round((Object.values(answers).reduce((a, b) => a + b, 0) / answeredCount) * 10)
    : 0;
  const timeRemaining = Math.max(1, Math.ceil(((total - answeredCount) * 35) / 60));

  // Group questions by category, preserving order
  const grouped = useMemo(() => {
    const map = new Map<string, typeof READINESS_QUESTIONS>();
    READINESS_QUESTIONS.forEach((q) => {
      const list = map.get(q.category) ?? [];
      list.push(q);
      map.set(q.category, list);
    });
    return Array.from(map.entries());
  }, []);

  const categoryStatus = (category: string) => {
    const qs = READINESS_QUESTIONS.filter((q) => q.category === category);
    const answered = qs.filter((q) => answers[q.id] !== undefined).length;
    if (answered === 0) return "pending";
    if (answered < qs.length) return "in-progress";
    return "complete";
  };

  useEffect(() => {
    const t = setInterval(() => setTipIndex((i) => (i + 1) % AI_TIPS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const scrollToQuestionnaire = () => {
    questionnaireRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleGenerate = () => {
    setGenerating(true);
    setLoadingStep(0);
    setShowReport(false);
    let i = 0;
    const tick = () => {
      i += 1;
      if (i >= LOADING_STEPS.length) {
        setGenerating(false);
        setShowReport(true);
        setTimeout(() => {
          document.getElementById('ai-report')?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
        return;
      }
      setLoadingStep(i);
      setTimeout(tick, 750);
    };
    setTimeout(tick, 750);
  };

  const wizardSteps = [
    { label: "Assessment", active: percent < 100 },
    { label: "AI Analysis", active: percent === 100 && !showReport && !generating },
    { label: "Readiness Report", active: showReport },
  ];
  const currentStep = percent < 100 ? 1 : generating ? 2 : showReport ? 3 : 2;

  return (
    <div className="space-y-10 pb-16">
      {/* WELCOME */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-[color:var(--accent)]/15 via-card to-card p-8 shadow-sm">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[color:var(--accent)]/20 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <Badge variant="secondary" className="mb-4 gap-1.5">
              <Sparkles size={12} /> AI-guided onboarding
            </Badge>
            <h1 className="font-serif text-4xl font-semibold leading-tight">
              👋 Welcome to Your Pre-Arrival Readiness Assessment
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              This assessment takes approximately 5 minutes to complete. We'll evaluate your preparedness
              across eight important areas and generate a personalized AI Readiness Report with
              recommendations to help you transition successfully.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" onClick={scrollToQuestionnaire} className="gap-2">
                Start assessment <ArrowDown size={16} />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <FileText size={16} /> View sample report
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Clock, k: "Estimated time", v: "5 minutes" },
              { icon: GraduationCap, k: "Assessment areas", v: "8 categories" },
              { icon: Bot, k: "Report format", v: "Personalized AI" },
              { icon: ShieldCheck, k: "Uses", v: "University support" },
            ].map((c) => (
              <div key={c.k} className="rounded-xl border bg-background/60 p-4 backdrop-blur-sm">
                <c.icon size={18} className="text-[color:var(--accent)]" />
                <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{c.k}</div>
                <div className="font-serif text-lg font-semibold">{c.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRESS + WIZARD */}
      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Assessment progress · Step {currentStep} of 3
            </div>
            <h2 className="font-serif text-2xl font-semibold mt-1">Your readiness journey</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={14} /> ~{timeRemaining} min remaining
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          {wizardSteps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-3">
              <div
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 ${
                  i + 1 <= currentStep
                    ? "border-[color:var(--accent)] bg-[color:var(--accent)]/10 text-foreground"
                    : "border-border text-muted-foreground"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold ${
                    i + 1 <= currentStep
                      ? "bg-[color:var(--accent)] text-[color:var(--accent-foreground)]"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </span>
                {s.label}
              </div>
              {i < wizardSteps.length - 1 && <ChevronRight size={14} className="text-muted-foreground" />}
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatBlock label="Live readiness score" value={`${avg}`} suffix="/100" />
          <StatBlock label="Questions completed" value={`${answeredCount}`} suffix={`/${total}`} />
          <StatBlock label="Percent complete" value={`${percent}%`} />
        </div>
        <div className="mt-4">
          <Progress value={percent} className="h-2 transition-all" />
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* QUESTIONNAIRE */}
        <div ref={questionnaireRef} className="space-y-8">
          {grouped.map(([category, qs]) => {
            const meta = CATEGORY_META[category] ?? CATEGORY_META.Academic;
            const Icon = meta.icon;
            return (
              <section key={category} className="space-y-4">
                <div
                  className={`rounded-2xl border bg-gradient-to-r ${meta.accent} bg-card p-5`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-background shadow-sm">
                      <Icon size={20} className="text-[color:var(--accent)]" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">Section</div>
                      <h3 className="font-serif text-xl font-semibold">{category} readiness</h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{meta.blurb}</p>
                </div>

                {qs.map((q) => {
                  const value = answers[q.id] ?? 5;
                  const answered = answers[q.id] !== undefined;
                  return (
                    <div
                      key={q.id}
                      className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="max-w-xl">
                          <div className="text-xs uppercase tracking-widest text-[color:var(--accent)]">
                            {category}
                          </div>
                          <div className="mt-1 font-serif text-lg font-medium">{q.text}</div>
                          <div className="mt-1 text-sm text-muted-foreground">{meta.blurb}</div>
                        </div>
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl font-serif text-2xl font-semibold transition-colors ${
                            answered
                              ? "bg-[color:var(--accent)] text-[color:var(--accent-foreground)]"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {answered ? value : "–"}
                        </div>
                      </div>
                      <div className="mt-6">
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          value={[value]}
                          onValueChange={([v]) => setAnswers((a) => ({ ...a, [q.id]: v }))}
                        />
                        <div className="mt-3 flex justify-between text-[11px] uppercase tracking-widest text-muted-foreground">
                          <span>Not confident</span>
                          <span>Moderately confident</span>
                          <span>Very confident</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </section>
            );
          })}

          {/* Completion Benefits */}
          <section className="rounded-2xl border bg-gradient-to-br from-[color:var(--accent)]/15 via-card to-card p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Star size={18} className="text-[color:var(--accent)]" />
              <h3 className="font-serif text-xl font-semibold">After completing this assessment you'll receive</h3>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                "AI Readiness Score",
                "Personalized Preparation Plan",
                "University Resources",
                "Areas of Strength",
                "Areas for Improvement",
                "Recommended Next Actions",
              ].map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-[color:var(--success)]" /> {b}
                </li>
              ))}
            </ul>
          </section>

          {/* Submit */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <Button
              size="lg"
              className="w-full gap-2 py-6 text-base"
              onClick={handleGenerate}
              disabled={generating || showReport}
            >
              {generating ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> {LOADING_STEPS[loadingStep]}
                </>
              ) : showReport ? (
                <>
                  <CheckCircle2 size={18} /> Report Generated
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Generate my AI Readiness Report
                </>
              )}
            </Button>
            {generating && (
              <div className="mt-4 space-y-2">
                {LOADING_STEPS.slice(0, loadingStep + 1).map((s, i) => (
                  <div key={s} className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-in">
                    {i < loadingStep ? (
                      <CheckCircle2 size={14} className="text-[color:var(--success)]" />
                    ) : (
                      <Loader2 size={14} className="animate-spin text-[color:var(--accent)]" />
                    )}
                    {s}
                  </div>
                ))}
              </div>
            )}
            <p className="mt-3 text-center text-xs text-muted-foreground">
              You can revisit this assessment anytime. Your responses are private and used only to personalize
              your journey.
            </p>
          </div>

          {/* Why this matters */}
          <section className="rounded-2xl border bg-card p-6">
            <h3 className="font-serif text-xl font-semibold">Why we ask these questions</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your responses help us understand how prepared you are for studying abroad. This allows the
              platform to recommend university services, preparation resources, and personalized guidance
              before your arrival.
            </p>
            <div className="mt-4 rounded-xl border bg-muted/40 p-4 text-xs text-muted-foreground">
              <ShieldCheck size={14} className="mr-1 inline text-[color:var(--success)]" />
              This assessment does not affect your admission. It is only used to personalize your student
              experience.
            </div>
          </section>
        </div>

        {/* STICKY RIGHT PANEL */}
        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          {/* AI Assistant */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--accent)]/15">
                <Bot size={18} className="text-[color:var(--accent)]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold">AI Readiness Assistant</h3>
                <div className="text-xs text-muted-foreground">Live status of your assessment</div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {Object.keys(CATEGORY_META).map((cat) => {
                const s = categoryStatus(cat);
                return (
                  <div key={cat} className="flex items-center justify-between rounded-lg border bg-background/50 px-3 py-2 text-sm">
                    <span>{cat}</span>
                    <StatusDot status={s} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preparation Checklist */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <h3 className="font-serif text-lg font-semibold">Preparation checklist</h3>
            <div className="mt-3 space-y-3">
              {CHECKLIST.map((item) => (
                <div key={item.id} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <ChecklistIcon status={item.status} /> {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground">{item.progress}%</div>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{item.desc}</div>
                  <Progress value={item.progress} className="mt-2 h-1.5" />
                </div>
              ))}
            </div>
          </div>

          {/* AI Report Preview */}
          <div className="rounded-2xl border bg-gradient-to-br from-primary/95 to-primary p-5 text-[color:var(--primary-foreground)] shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[color:var(--accent)]" />
              <h3 className="font-serif text-lg font-semibold">Your AI report will include</h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                "Overall Readiness Score",
                "Strengths",
                "Areas to improve",
                "Personalized recommendations",
                "University support suggestions",
                "Next steps",
              ].map((r) => (
                <li key={r} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[color:var(--accent)]" /> {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Prep Modules */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <h3 className="font-serif text-lg font-semibold">Prep modules</h3>
            <p className="text-xs text-muted-foreground">Personalized based on your assessment.</p>
            <div className="mt-3 space-y-3">
              {READINESS_MODULES.map((m) => (
                <div key={m.id} className="rounded-lg border p-3 transition-colors hover:bg-muted/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{m.icon}</span>
                      <div>
                        <div className="text-sm font-medium leading-tight">{m.title}</div>
                        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                          {m.status.replace("-", " ")}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={m.progress === 100 ? "default" : "secondary"}
                      className="text-[10px]"
                    >
                      {m.progress}%
                    </Badge>
                  </div>
                  <Progress value={m.progress} className="mt-2 h-1.5" />
                </div>
              ))}
            </div>
          </div>

          {/* AI Tip */}
          <div key={tipIndex} className="animate-fade-in rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Lightbulb size={16} className="text-[color:var(--accent)]" />
              <div className="text-xs uppercase tracking-widest text-muted-foreground">AI tip</div>
            </div>
            <p className="mt-2 text-sm">💡 {AI_TIPS[tipIndex]}</p>
          </div>
        </aside>
      </div>

      {showReport && (
        <section id="ai-report" className="animate-fade-in rounded-2xl border bg-card p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-widest text-[color:var(--accent)]">Your AI Readiness Report</div>
            <Badge variant="secondary" className="gap-1"><Sparkles size={12} /> AI generated</Badge>
          </div>
          <h2 className="mt-2 font-serif text-3xl font-semibold">You're on a promising path 🎯</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Based on your responses, we've built a personalized preparation plan. Focus on the recommended
            actions to lift your readiness score before arrival.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border bg-background/60 p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Overall score</div>
              <div className="mt-2 font-serif text-4xl font-semibold">{avg}<span className="text-lg text-muted-foreground">/100</span></div>
              <Progress value={avg} className="mt-4 h-2" />
            </div>
            <div className="rounded-xl border bg-background/60 p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Percentile</div>
              <div className="mt-2 font-serif text-4xl font-semibold">Top 35%</div>
              <div className="mt-2 text-xs text-muted-foreground">vs. international cohort</div>
            </div>
            <div className="rounded-xl border bg-background/60 p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Recommended focus</div>
              <div className="mt-2 font-serif text-2xl font-semibold">Culture & Finance</div>
              <div className="mt-2 text-xs text-muted-foreground">Highest impact areas</div>
            </div>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card icon={<TrendingUp size={16} className="text-[color:var(--success)]" />} title="Strengths">
              {REPORT_STRENGTHS.map((s) => <Row key={s} label={s} />)}
            </Card>
            <Card icon={<Target size={16} className="text-[color:var(--warning)]" />} title="Areas to improve">
              {REPORT_IMPROVE.map((s) => <Row key={s} label={s} />)}
            </Card>
          </div>
          <div className="mt-8 rounded-2xl border bg-muted/40 p-6">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-[color:var(--accent)]" />
              <h3 className="font-serif text-xl font-semibold">Recommended next steps</h3>
            </div>
            <ol className="mt-4 space-y-3">
              {REPORT_NEXT_STEPS.map((step, i) => (
                <li key={step} className="flex items-start gap-3 rounded-xl border bg-background/80 p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)] text-sm font-semibold text-[color:var(--accent-foreground)]">
                    {i + 1}
                  </div>
                  <div className="text-sm pt-1">{step}</div>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild><Link to="/student/journey">Open my journey plan</Link></Button>
              <Button variant="outline" asChild><Link to="/student/companion">Ask the AI companion</Link></Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function StatBlock({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="rounded-xl border bg-background/60 p-4">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 font-serif text-3xl font-semibold">
        {value}
        {suffix && <span className="text-base text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    pending: { label: "Pending", className: "bg-muted text-muted-foreground" },
    "in-progress": { label: "In progress", className: "bg-[color:var(--warning)]/20 text-[color:var(--warning)]" },
    complete: { label: "Completed", className: "bg-[color:var(--success)]/15 text-[color:var(--success)]" },
  };
  const m = map[status] ?? map.pending;
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${m.className}`}>{m.label}</span>
  );
}

function ChecklistIcon({ status }: { status: string }) {
  if (status === "complete") return <CheckCircle2 size={14} className="text-[color:var(--success)]" />;
  if (status === "warn") return <span className="text-[color:var(--warning)]">⚠</span>;
  return <span className="text-muted-foreground">○</span>;
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
