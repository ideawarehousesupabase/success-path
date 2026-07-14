import { Link } from "@tanstack/react-router";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <span className="relative flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-foreground font-serif text-lg font-bold shadow-sm">
        S
        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
      </span>
      <div className="leading-tight">
        <div className={`font-serif text-lg font-semibold tracking-tight ${light ? "text-sidebar-foreground" : "text-foreground"}`}>
          SuccessPath <span className="text-accent">AI</span>
        </div>
      </div>
    </Link>
  );
}
