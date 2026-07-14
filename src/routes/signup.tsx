import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth, type UserRole } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/brand";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({ component: SignupPage });

function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>("student");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await signup({ ...form, role });
      toast.success(`Account created — welcome, ${u.name.split(" ")[0]}!`);
      navigate({ to: u.role === "advisor" ? "/advisor" : "/student" });
    } catch (err: any) {
      toast.error(err.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between bg-sidebar text-sidebar-foreground p-10">
        <Logo light />
        <div>
          <div className="text-xs uppercase tracking-widest text-sidebar-foreground/60">Your next chapter starts here</div>
          <div className="mt-4 font-serif text-3xl leading-tight">
            Guided from acceptance letter to graduation cap.
          </div>
          <p className="mt-4 text-sm text-sidebar-foreground/70 max-w-sm">
            Readiness assessments, AI companion, cultural community, and a support network that notices when you're struggling.
          </p>
        </div>
        <div className="text-xs text-sidebar-foreground/50">© SuccessPath AI</div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="md:hidden mb-8"><Logo /></div>
          <h1 className="font-serif text-3xl font-semibold">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Choose the experience that fits you.</p>

          <div className="mt-6 grid grid-cols-2 rounded-lg border p-1 bg-secondary">
            {(["student","advisor"] as const).map(r => (
              <button key={r} type="button" onClick={() => setRole(r)}
                className={`px-3 py-2 text-sm rounded-md capitalize transition ${role === r ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`}>
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="pw">Password</Label>
              <Input id="pw" type="password" required minLength={6} value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="mt-1.5" />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating..." : "Create account"}</Button>
          </form>
          <div className="mt-6 text-sm text-muted-foreground">
            Have an account? <Link to="/login" className="text-foreground font-medium underline underline-offset-4">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
