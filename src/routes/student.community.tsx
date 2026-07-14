import { createFileRoute } from "@tanstack/react-router";
import { COMMUNITY_POSTS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/student/community")({ component: CommunityPage });

const GROUPS = [
  { name: "Indian Student Association", members: 84, tag: "Cultural" },
  { name: "CS Grad Study Circle", members: 42, tag: "Academic" },
  { name: "Women in STEM", members: 61, tag: "Support" },
  { name: "Weekend Hikers", members: 29, tag: "Social" },
];

type Post = typeof COMMUNITY_POSTS[number];

function CommunityPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(COMMUNITY_POSTS);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("Social");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      toast.error("Add a title and a message");
      return;
    }
    const initials = (user?.name || "You").split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
    const newPost: Post = {
      id: "p" + Date.now(),
      author: user?.name || "You",
      avatar: initials,
      flag: "🌍",
      time: "now",
      title: title.trim(),
      body: body.trim(),
      likes: 0,
      comments: 0,
      tag,
    };
    setPosts([newPost, ...posts]);
    setTitle("");
    setBody("");
    toast.success("Posted to community");
  };

  const toggleLike = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-accent">Belong</div>
          <h1 className="font-serif text-3xl font-semibold mt-1">Community</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">Find your people. Cultural affinity spaces, study groups, mentorship, and social events.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <form onSubmit={submit} className="rounded-xl border bg-card p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-accent/15 text-accent flex items-center justify-center font-semibold">
                {(user?.name || "You").split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="font-medium">{user?.name || "You"}</div>
                <div className="text-xs text-muted-foreground">Share something with the community</div>
              </div>
            </div>
            <Input placeholder="Post title" value={title} onChange={e => setTitle(e.target.value)} />
            <Textarea placeholder="What's on your mind?" value={body} onChange={e => setBody(e.target.value)} rows={3} />
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-2 flex-wrap">
                {["Social", "Academic", "Life", "Support"].map(t => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTag(t)}
                    className={`px-3 py-1 rounded-full text-xs border transition ${tag === t ? "bg-accent text-accent-foreground border-accent" : "border-border hover:bg-secondary"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <Button type="submit"><Send size={14} className="mr-1" /> Post</Button>
            </div>
          </form>

          {posts.map(p => (
            <article key={p.id} className="rounded-xl border bg-card p-5 hover:shadow-sm transition">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent/15 text-accent flex items-center justify-center font-semibold">
                  {p.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{p.author} <span className="ml-1">{p.flag}</span></div>
                  <div className="text-xs text-muted-foreground">{p.time} ago · <span className="text-accent">{p.tag}</span></div>
                </div>
              </div>
              <h3 className="mt-3 font-serif text-lg">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <button onClick={() => toggleLike(p.id)} className="flex items-center gap-1.5 hover:text-accent"><Heart size={16} /> {p.likes}</button>
                <button className="flex items-center gap-1.5 hover:text-accent"><MessageSquare size={16} /> {p.comments}</button>
              </div>
            </article>
          ))}
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border bg-card p-5">
            <h2 className="font-serif text-lg">Groups for you</h2>
            <p className="text-xs text-muted-foreground">Matched to your interests & background</p>
            <div className="mt-4 space-y-3">
              {GROUPS.map(g => (
                <div key={g.name} className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium">{g.name}</div>
                    <div className="text-xs text-muted-foreground">{g.members} members · {g.tag}</div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => toast.success(`Joined ${g.name}`)}>Join</Button>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border bg-sidebar text-sidebar-foreground p-5">
            <div className="text-xs uppercase tracking-widest text-sidebar-foreground/60">Mentor match</div>
            <div className="mt-2 font-serif text-lg">Meet your matched mentor</div>
            <p className="mt-1 text-sm text-sidebar-foreground/70">Priya, PhD Chemistry (Year 3) 🇮🇳 — same country, same campus, one year ahead.</p>
            <Button className="mt-3 bg-accent hover:bg-accent/90 text-accent-foreground w-full" onClick={() => toast.success("Intro request sent")}>Request intro</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
