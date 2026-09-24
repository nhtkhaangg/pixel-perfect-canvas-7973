import { createFileRoute } from "@tanstack/react-router";
import { Paperclip, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { seo } from "@/lib/seo";
import { chatMessages, me } from "@/lib/mock/customer";
import { Avatar } from "@/components/public/cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/chat")({
  head: () => seo("Chat with your trainer", "Message your GymFit coach in real time."),
  component: Chat,
});

const replies = ["Got it 👍", "Nice work — keep logging your RPE.", "Let's review that on Friday.", "Make sure you get 8 hours tonight!"];
const contacts = [
  { name: me.trainerName, last: "Send a reschedule request…", online: true },
  { name: "Front desk · Downtown", last: "Your locker is renewed.", online: false },
];

function Chat() {
  const [msgs, setMsgs] = useState(chatMessages);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [msgs, typing]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const now = new Date().toTimeString().slice(0, 5);
    setMsgs((m) => [...m, { id: crypto.randomUUID(), from: "me", text, time: now }]);
    setText("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { id: crypto.randomUUID(), from: "trainer", text: replies[Math.floor(Math.random() * replies.length)]!, time: now }]);
    }, 1500);
  }

  return (
    <div className="grid h-[calc(100vh-9rem)] overflow-hidden rounded-lg border border-border bg-card md:grid-cols-[260px_1fr]">
      <aside className="hidden border-r border-border md:block">
        <p className="border-b border-border px-4 py-3 text-sm font-semibold">Messages</p>
        {contacts.map((c, i) => (
          <div key={c.name} className={cn("flex items-center gap-3 px-4 py-3", i === 0 && "bg-muted")}>
            <div className="relative"><Avatar name={c.name} />{c.online ? <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-card bg-primary" /> : null}</div>
            <div className="min-w-0"><p className="truncate text-sm font-medium">{c.name}</p><p className="truncate text-xs text-muted-foreground">{c.last}</p></div>
          </div>
        ))}
      </aside>
      <div className="flex min-h-0 flex-col">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Avatar name={me.trainerName} />
          <div><p className="text-sm font-semibold">{me.trainerName}</p><p className="text-xs text-primary">Online</p></div>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {msgs.map((m) => (
            <div key={m.id} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[75%] rounded-lg px-3.5 py-2 text-sm", m.from === "me" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                <p>{m.text}</p>
                <p className={cn("mt-1 text-[10px]", m.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground")}>{m.time}</p>
              </div>
            </div>
          ))}
          {typing ? <p className="text-xs text-muted-foreground">Maya is typing…</p> : null}
          <div ref={end} />
        </div>
        <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
          <Button type="button" variant="ghost" size="icon" aria-label="Attach"><Paperclip className="size-4" /></Button>
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a message…" />
          <Button type="submit" size="icon" aria-label="Send"><Send className="size-4" /></Button>
        </form>
      </div>
    </div>
  );
}
