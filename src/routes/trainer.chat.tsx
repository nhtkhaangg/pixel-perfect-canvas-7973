import { createFileRoute } from "@tanstack/react-router";
import { Search, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { seo } from "@/lib/seo";
import { clients } from "@/lib/mock/trainer";
import { Avatar } from "@/components/public/cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trainer/chat")({
  head: () => seo("Client chat", "Real-time chat with your clients."),
  component: Chat,
});

type Msg = { id: string; from: "me" | "client"; text: string; time: string };
const seed: Record<string, Msg[]> = {
  cus_1042: [
    { id: "1", from: "me", text: "Morning Alex! How's the lower back after Monday's deadlifts?", time: "08:12" },
    { id: "2", from: "client", text: "All good — a bit tight but fine after the mobility routine.", time: "08:30" },
    { id: "3", from: "client", text: "Can I move Friday's session to the evening?", time: "09:02" },
  ],
  cus_1088: [{ id: "1", from: "client", text: "Should I cut water before weigh-in?", time: "Yesterday" }],
  cus_1101: [{ id: "1", from: "client", text: "Logged my meals for the week 🥗", time: "Mon" }],
};
const autoReplies = ["Thanks coach!", "Got it 👍", "Will do.", "See you then!"];

function Chat() {
  const [active, setActive] = useState("cus_1042");
  const [threads, setThreads] = useState(seed);
  const [text, setText] = useState("");
  const [q, setQ] = useState("");
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const msgs = threads[active] ?? [];
  const client = clients.find((c) => c.id === active)!;
  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [msgs.length, typing]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const now = new Date().toTimeString().slice(0, 5);
    const id = active;
    setThreads((t) => ({ ...t, [id]: [...(t[id] ?? []), { id: crypto.randomUUID(), from: "me", text, time: now }] }));
    setText(""); setTyping(true);
    setTimeout(() => { setTyping(false); setThreads((t) => ({ ...t, [id]: [...(t[id] ?? []), { id: crypto.randomUUID(), from: "client", text: autoReplies[Math.floor(Math.random() * autoReplies.length)]!, time: now }] })); }, 1400);
  }

  return (
    <div className="grid h-[calc(100vh-9rem)] overflow-hidden rounded-lg border border-border bg-card md:grid-cols-[280px_1fr]">
      <aside className="hidden flex-col border-r border-border md:flex">
        <div className="relative border-b border-border p-3"><Search className="absolute top-1/2 left-6 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder="Search clients" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div className="flex-1 overflow-y-auto">
          {clients.filter((c) => c.name.toLowerCase().includes(q.toLowerCase())).map((c) => {
            const last = threads[c.id]?.at(-1);
            return (
              <button key={c.id} type="button" onClick={() => setActive(c.id)} className={cn("flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted", active === c.id && "bg-muted")}>
                <Avatar name={c.name} />
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{c.name}</p><p className="truncate text-xs text-muted-foreground">{last?.text ?? "No messages yet"}</p></div>
                {last?.from === "client" ? <span className="size-2 rounded-full bg-primary" /> : null}
              </button>
            );
          })}
        </div>
      </aside>
      <div className="flex min-h-0 flex-col">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3"><Avatar name={client.name} /><div><p className="text-sm font-semibold">{client.name}</p><p className="text-xs text-muted-foreground">{client.package} · {client.sessionsLeft} sessions left</p></div></div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {msgs.map((m) => (
            <div key={m.id} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[75%] rounded-lg px-3.5 py-2 text-sm", m.from === "me" ? "bg-primary text-primary-foreground" : "bg-muted")}><p>{m.text}</p><p className={cn("mt-1 text-[10px]", m.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground")}>{m.time}</p></div>
            </div>
          ))}
          {typing ? <p className="text-xs text-muted-foreground">{client.name.split(" ")[0]} is typing…</p> : null}
          <div ref={end} />
        </div>
        <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder={`Message ${client.name.split(" ")[0]}…`} />
          <Button type="submit" size="icon" aria-label="Send"><Send className="size-4" /></Button>
        </form>
      </div>
    </div>
  );
}
