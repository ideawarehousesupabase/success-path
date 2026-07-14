import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useAuth, type UserRole } from "@/lib/auth";
import { Logo } from "./brand";
import { Button } from "@/components/ui/button";
import { LogOut, Bell } from "lucide-react";

interface NavItem { to: string; label: string; icon: ReactNode }

export function AppShell({
  role, nav, children, title,
}: { role: UserRole; nav: NavItem[]; children: ReactNode; title?: string }) {
  const { user, ready, logout } = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: s => s.location.pathname });

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login" });
    else if (ready && user && user.role !== role) {
      navigate({ to: user.role === "advisor" ? "/advisor" : "/student" });
    }
  }, [ready, user, role, navigate]);

  if (!ready || !user) return null;

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden md:flex md:w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="p-5 border-b border-sidebar-border">
          <Logo light />
          <div className="mt-1 text-xs uppercase tracking-widest text-sidebar-foreground/60">
            {role === "advisor" ? "Advisor console" : "Student portal"}
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {nav.map(item => {
            const active = path === item.to || (item.to !== `/${role}` && path.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-sidebar-primary"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                }`}
              >
                <span className="text-sidebar-primary">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-2">
            <div className="h-9 w-9 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center text-sm font-semibold">
              {user.name.split(" ").map(n => n[0]).join("").slice(0,2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <div className="text-xs text-sidebar-foreground/60 truncate">{user.email}</div>
            </div>
            <button onClick={() => { logout(); navigate({ to: "/login" }); }}
              className="text-sidebar-foreground/60 hover:text-sidebar-foreground p-1" aria-label="Sign out">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 flex flex-col">
        <header className="border-b bg-card/60 backdrop-blur px-6 py-4 flex items-center justify-between">
          <div>
            {title && <h1 className="text-xl md:text-2xl font-serif font-semibold">{title}</h1>}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell size={18} />
            </Button>
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => { logout(); navigate({ to: "/login" }); }}>
                Sign out
              </Button>
            </div>
          </div>
        </header>
        <div className="flex-1 p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}

export function StatCard({ label, value, hint, tone = "default" }: {
  label: string; value: ReactNode; hint?: string;
  tone?: "default" | "success" | "warning" | "danger" | "accent";
}) {
  const toneMap = {
    default: "border-border",
    success: "border-l-4 border-l-[color:var(--success)]",
    warning: "border-l-4 border-l-[color:var(--warning)]",
    danger: "border-l-4 border-l-destructive",
    accent: "border-l-4 border-l-accent",
  } as const;
  return (
    <div className={`rounded-lg border bg-card p-5 ${toneMap[tone]}`}>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl md:text-3xl font-serif font-semibold">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}
