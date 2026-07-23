import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/brand";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<"student" | "advisor">("student");
  const [email, setEmail] = useState("student@demo.com");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (role === "student") {
      setEmail("student@demo.com");
      setPassword("demo1234");
    } else {
      setEmail("advisor@demo.com");
      setPassword("demo1234");
    }
  }, [role]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await login(email, password);
      toast.success(`Welcome back, ${u.name}`);
      navigate({ to: u.role === "advisor" ? "/advisor" : "/student" });
    } catch (err: any) {
      toast.error(err.message);
    } finally { setLoading(false); }
  };



  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between bg-sidebar text-sidebar-foreground p-10">
        <Logo light />
        {role === "advisor" ? (
          <div>
            <div className="text-xs uppercase tracking-widest text-sidebar-foreground/60">Trusted by advisors at</div>
            <div className="mt-4 font-serif text-3xl leading-tight">
              "We spotted three at-risk students in week two — before midterms. That's never happened before."
            </div>
            <div className="mt-4 text-sm text-sidebar-foreground/70">— Dr. Elena Ross, Director of International Programs</div>
          </div>
        ) : (
          <div>
            <div className="text-xs uppercase tracking-widest text-sidebar-foreground/60">Your next chapter starts here</div>
            <div className="mt-4 font-serif text-3xl leading-tight">
              Guided from acceptance letter to graduation cap.
            </div>
            <p className="mt-4 text-sm text-sidebar-foreground/70 max-w-sm">
              Readiness assessments, AI companion, cultural community, and a support network that notices when you're struggling.
            </p>
          </div>
        )}
        <div className="text-xs text-sidebar-foreground/50">© SuccessPath AI</div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="md:hidden mb-8"><Logo /></div>
          <h1 className="font-serif text-3xl font-semibold">
            {role === "advisor" ? "Advisor Portal" : "Student Login"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {role === "advisor" ? "Manage your students and insights." : "Sign in to continue your journey."}
          </p>

          <div className="mt-6 grid grid-cols-2 rounded-lg border p-1 bg-secondary">
            {(["student","advisor"] as const).map(r => (
              <button key={r} type="button" onClick={() => setRole(r)}
                className={`px-3 py-2 text-sm rounded-md capitalize transition ${role === r ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`}>
                {r === "advisor" ? "Advisor" : "Student"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="pw">Password</Label>
              <Input id="pw" type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1.5" />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button>
          </form>

          <div className="mt-6 text-sm text-muted-foreground">
            No account? <Link to="/signup" className="text-foreground font-medium underline underline-offset-4">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
