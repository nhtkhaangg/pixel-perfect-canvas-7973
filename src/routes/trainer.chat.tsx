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
  head: () => seo("Trò chuyện với hội viên", "Trò chuyện trực tiếp với hội viên của bạn."),
  component: Chat,
});

type Msg = { id: string; from: "me" | "client"; text: string; time: string };
const seed: Record<string, Msg[]> = {
  cus_1042: [
    { id: "1", from: "me", text: "Chào Khánh! Lưng dưới sau bài deadlift hôm thứ Hai thế nào rồi?", time: "08:12" },
    { id: "2", from: "client", text: "Ổn cả — hơi căng nhưng đỡ hơn sau bài giãn cơ.", time: "08:30" },
    { id: "3", from: "client", text: "Em đổi buổi tập thứ Sáu sang buổi tối được không ạ?", time: "09:02" },
  ],
  cus_1088: [{ id: "1", from: "client", text: "Em có nên hạn chế uống nước trước khi cân không ạ?", time: "Hôm qua" }],
  cus_1101: [{ id: "1", from: "client", text: "Em đã ghi lại bữa ăn trong tuần rồi 🥗", time: "Thứ 2" }],
};
const autoReplies = ["Cảm ơn huấn luyện viên!", "Dạ em rõ 👍", "Em sẽ làm ạ.", "Hẹn gặp lại!"];

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
        <div className="relative border-b border-border p-3"><Search className="absolute top-1/2 left-6 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder="Tìm hội viên" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div className="flex-1 overflow-y-auto">
          {clients.filter((c) => c.name.toLowerCase().includes(q.toLowerCase())).map((c) => {
            const last = threads[c.id]?.at(-1);
            return (
              <button key={c.id} type="button" onClick={() => setActive(c.id)} className={cn("flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted", active === c.id && "bg-muted")}>
                <Avatar name={c.name} />
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{c.name}</p><p className="truncate text-xs text-muted-foreground">{last?.text ?? "Chưa có tin nhắn"}</p></div>
                {last?.from === "client" ? <span className="size-2 rounded-full bg-primary" /> : null}
              </button>
            );
          })}
        </div>
      </aside>
      <div className="flex min-h-0 flex-col">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3"><Avatar name={client.name} /><div><p className="text-sm font-semibold">{client.name}</p><p className="text-xs text-muted-foreground">{client.package} · còn {client.sessionsLeft} buổi</p></div></div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {msgs.map((m) => (
            <div key={m.id} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[75%] rounded-lg px-3.5 py-2 text-sm", m.from === "me" ? "bg-primary text-primary-foreground" : "bg-muted")}><p>{m.text}</p><p className={cn("mt-1 text-[10px]", m.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground")}>{m.time}</p></div>
            </div>
          ))}
          {typing ? <p className="text-xs text-muted-foreground">{client.name.split(" ").at(-1)} đang nhập…</p> : null}
          <div ref={end} />
        </div>
        <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder={`Nhắn tin cho ${client.name.split(" ").at(-1)}…`} />
          <Button type="submit" size="icon" aria-label="Gửi"><Send className="size-4" /></Button>
        </form>
      </div>
    </div>
  );
}
