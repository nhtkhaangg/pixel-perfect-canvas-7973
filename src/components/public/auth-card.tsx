import type { ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function AuthCard({
  title,
  description,
  children,
  footer,
  aside,
}: {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-12 lg:grid-cols-[1fr_1fr] lg:px-6 lg:py-16">
      <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        <div className="mt-6">{children}</div>
        {footer ? <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div> : null}
      </div>
      <div className="hidden rounded-lg bg-surface p-8 text-surface-foreground lg:flex lg:flex-col lg:justify-end">
        {aside}
      </div>
    </section>
  );
}

export function OAuthButtons() {
  const notice = () => toast.info("Đăng nhập mạng xã hội chưa được kết nối", { description: "Đây là bản mô phỏng giao diện." });
  return (
    <>
      <div className="grid gap-2">
        <Button type="button" variant="outline" onClick={notice}>
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
            <path fill="currentColor" d="M21.35 11.1H12v2.98h5.35c-.23 1.4-1.64 4.1-5.35 4.1-3.22 0-5.85-2.67-5.85-5.96S8.78 6.26 12 6.26c1.83 0 3.06.78 3.76 1.45l2.56-2.47C16.68 3.7 14.54 2.75 12 2.75 6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25c5.34 0 8.88-3.75 8.88-9.04 0-.6-.07-1.06-.15-1.51z" />
          </svg>
          Tiếp tục với Google
        </Button>
        <Button type="button" variant="outline" onClick={notice}>
          Tiếp tục với SSO / OAuth
        </Button>
      </div>
      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> hoặc dùng email <span className="h-px flex-1 bg-border" />
      </div>
    </>
  );
}

export function AuthAside({ quote, author }: { quote: string; author: string }) {
  return (
    <>
      <p className="text-xs font-semibold tracking-wider text-primary uppercase">GymFit members</p>
      <p className="mt-4 text-2xl leading-snug font-semibold">"{quote}"</p>
      <p className="mt-4 text-sm text-surface-foreground/60">— {author}</p>
    </>
  );
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
