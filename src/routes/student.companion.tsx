import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { COMPANION_STARTERS, respondToPrompt } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, Bot } from "lucide-react";

export const Route = createFileRoute("/student/companion")({ component: CompanionPage });

interface Msg { role: "user" | "ai"; text: string; time: string }

function CompanionPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi! I'm your SuccessPath companion. Ask me anything about your studies, wellbeing, admin, or life abroad. I know your campus resources.", time: "now" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { role: "user", text, time: "now" }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages(m => [...m, { role: "ai", text: respondToPrompt(text), time: "now" }]);
      setTyping(false);
    }, 700 + Math.random() * 500);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-9rem)]">
      <div>
        <div className="text-xs uppercase tracking-widest text-accent">Always on</div>
        <h1 className="font-serif text-3xl font-semibold mt-1">AI Companion</h1>
        <p className="mt-2 text-muted-foreground">A private space for questions you might not ask an advisor at 2am.</p>
      </div>

      <div ref={scrollRef} className="flex-1 mt-6 rounded-xl border bg-card p-6 overflow-y-auto space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
            {m.role === "ai" && (
              <div className="h-8 w-8 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0"><Bot size={16} /></div>
            )}
            <div className={`max-w-md rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              m.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-secondary rounded-tl-sm"
            }`}>{m.text}</div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0"><Bot size={16} /></div>
            <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3 text-sm">
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.3s]" />
              </span>
            </div>
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="mt-3 flex gap-2 flex-wrap">
          {COMPANION_STARTERS.map(s => (
            <button key={s} onClick={() => send(s)}
              className="text-xs px-3 py-2 rounded-full border bg-card hover:bg-accent/10 hover:border-accent transition">
              <Sparkles size={12} className="inline mr-1 text-accent" /> {s}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={e => { e.preventDefault(); send(input); }} className="mt-4 flex gap-2">
        <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything..." className="flex-1" />
        <Button type="submit"><Send size={16} /></Button>
      </form>
    </div>
  );
}
