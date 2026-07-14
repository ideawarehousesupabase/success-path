import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/student/profile")({ component: ProfilePage });

interface ProfileExtras {
  country: string;
  flag: string;
  program: string;
  university: string;
  phase: string;
  arrivalDate: string;
  languages: string; // comma separated
  interests: string; // comma separated
}

const EMPTY: ProfileExtras = {
  country: "", flag: "", program: "", university: "",
  phase: "", arrivalDate: "", languages: "", interests: "",
};

function ProfilePage() {
  const { user } = useAuth();
  const storageKey = user ? `sp_profile_${user.id}` : "";
  const [extras, setExtras] = useState<ProfileExtras>(EMPTY);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ProfileExtras>(EMPTY);

  useEffect(() => {
    if (!storageKey) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setExtras({ ...EMPTY, ...JSON.parse(raw) });
    } catch { /* noop */ }
  }, [storageKey]);

  if (!user) return null;

  const initials = user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const languages = extras.languages.split(",").map(s => s.trim()).filter(Boolean);
  const interests = extras.interests.split(",").map(s => s.trim()).filter(Boolean);

  const startEdit = () => { setDraft(extras); setEditing(true); };
  const save = () => {
    localStorage.setItem(storageKey, JSON.stringify(draft));
    setExtras(draft);
    setEditing(false);
  };

  const fields: [keyof ProfileExtras, string][] = [
    ["country", "Country"], ["flag", "Flag emoji"],
    ["program", "Program"], ["university", "University"],
    ["phase", "Phase"], ["arrivalDate", "Arrival date"],
    ["languages", "Languages (comma separated)"],
    ["interests", "Interests (comma separated)"],
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-accent">Profile</div>
          <h1 className="font-serif text-3xl font-semibold mt-1">Your profile</h1>
        </div>
        {!editing && <Button variant="outline" onClick={startEdit}>Edit profile</Button>}
      </div>

      <div className="rounded-xl border bg-card p-6 flex items-center gap-5">
        <div className="h-20 w-20 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-serif text-2xl font-semibold">
          {initials}
        </div>
        <div className="flex-1">
          <div className="font-serif text-2xl">
            {user.name} {extras.flag && <span className="ml-1">{extras.flag}</span>}
          </div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
          {(extras.program || extras.university) && (
            <div className="mt-1 text-sm">
              {[extras.program, extras.university].filter(Boolean).join(" · ")}
            </div>
          )}
          <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
            {user.role}
          </div>
        </div>
      </div>

      {editing ? (
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map(([key, label]) => (
              <div key={key} className="space-y-1.5">
                <Label htmlFor={key}>{label}</Label>
                <Input
                  id={key}
                  value={draft[key]}
                  onChange={e => setDraft(d => ({ ...d, [key]: e.target.value }))}
                  placeholder={label}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
            <Button onClick={save}>Save changes</Button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ["Country", extras.country],
              ["Arrival", extras.arrivalDate],
              ["Phase", extras.phase],
              ["Program", extras.program],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border bg-card p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{k}</div>
                <div className="mt-1 capitalize">{v || <span className="text-muted-foreground/60 normal-case">Not set</span>}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border bg-card p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Languages</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {languages.length
                ? languages.map(l => <span key={l} className="px-3 py-1 rounded-full bg-secondary text-sm">{l}</span>)
                : <span className="text-sm text-muted-foreground">Add languages by editing your profile.</span>}
            </div>
            <div className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">Interests</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {interests.length
                ? interests.map(i => <span key={i} className="px-3 py-1 rounded-full bg-accent/15 text-accent-foreground/90 text-sm">{i}</span>)
                : <span className="text-sm text-muted-foreground">Add interests by editing your profile.</span>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
