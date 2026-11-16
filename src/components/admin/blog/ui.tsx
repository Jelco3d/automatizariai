import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowDownRight, ArrowUpRight, ChevronRight, X } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; to?: string };

export function PageHeader({ title, description, actions, crumbs }: { title: string; description?: string; actions?: ReactNode; crumbs?: Crumb[] }) {
  return (
    <header className="mb-8">
      {crumbs && crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3" aria-hidden />}
              {c.to ? <Link to={c.to} className="hover:text-foreground">{c.label}</Link> : <span className="text-foreground">{c.label}</span>}
            </span>
          ))}
        </nav>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}

export const SectionTitle = ({ children, action }: { children: ReactNode; action?: ReactNode }) => (
  <div className="mb-3 flex items-center justify-between">
    <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{children}</h2>
    {action}
  </div>
);

export const Panel = ({ className, children }: { className?: string; children: ReactNode }) => (
  <section className={cn("rounded-xl border border-border bg-card", className)}>{children}</section>
);

export function Sparkline({ data }: { data: number[] }) {
  if (data.length < 2 || data.every((d) => d === 0)) return <div className="h-8" />;
  const points = data.map((v, i) => ({ i, v }));
  return (
    <div className="h-8 w-full" aria-hidden>
      <ResponsiveContainer>
        <AreaChart data={points} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
          <Area type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={1.5} fill="hsl(var(--primary) / 0.12)" isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function StatCard({ label, value, delta, spark, hint, loading }: { label: string; value: ReactNode; delta?: number | null; spark?: number[]; hint?: string; loading?: boolean }) {
  return (
    <Panel className="p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      {loading ? <Skeleton className="mt-2 h-8 w-20" /> : <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">{value}</p>}
      <div className="mt-1 flex h-5 items-center gap-1 text-xs">
        {delta != null && !loading && (
          <span className={cn("inline-flex items-center gap-0.5 font-medium", delta >= 0 ? "text-status-published" : "text-status-spam")}>
            {delta >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{Math.abs(delta)}%
          </span>
        )}
        {hint && <span className="text-muted-foreground">{hint}</span>}
      </div>
      {spark && <div className="mt-2"><Sparkline data={spark} /></div>}
    </Panel>
  );
}

const STATUS: Record<string, { label: string; cls: string }> = {
  published: { label: "Publicat", cls: "text-status-published bg-status-published/10" },
  draft: { label: "Ciornă", cls: "text-status-draft bg-status-draft/10" },
  scheduled: { label: "Programat", cls: "text-status-scheduled bg-status-scheduled/10" },
  archived: { label: "Arhivat", cls: "text-muted-foreground bg-muted" },
  pending: { label: "În așteptare", cls: "text-status-draft bg-status-draft/10" },
  approved: { label: "Aprobat", cls: "text-status-published bg-status-published/10" },
  spam: { label: "Spam", cls: "text-status-spam bg-status-spam/10" },
  trash: { label: "Coș", cls: "text-muted-foreground bg-muted" },
};
export function StatusBadge({ status }: { status: string }) {
  const s = STATUS[status] ?? { label: status, cls: "bg-muted text-muted-foreground" };
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap", s.cls)}><span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />{s.label}</span>;
}

export function EmptyState({ icon: Icon, title, description, action }: { icon: React.ElementType; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="relative mb-4">
        <div className="absolute inset-0 -m-3 rounded-full bg-primary/10" aria-hidden />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card"><Icon className="h-5 w-5 text-primary" /></div>
      </div>
      <h3 className="font-serif text-lg font-semibold text-foreground">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ onRetry, message }: { onRetry: () => void; message?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
      <AlertCircle className="h-6 w-6 text-status-spam" />
      <p className="text-sm text-muted-foreground">{message ?? "Nu am putut încărca datele."}</p>
      <Button variant="outline" size="sm" onClick={onRetry}>Încearcă din nou</Button>
    </div>
  );
}

export const ListSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="divide-y divide-border">{Array.from({ length: rows }).map((_, i) => (
    <div key={i} className="flex items-center gap-4 p-4"><Skeleton className="h-12 w-16 rounded-md" /><div className="flex-1 space-y-2"><Skeleton className="h-4 w-2/3" /><Skeleton className="h-3 w-1/3" /></div></div>
  ))}</div>
);

export function ConfirmDialog({ open, onOpenChange, title, description, confirmLabel = "Șterge", onConfirm }: { open: boolean; onOpenChange: (o: boolean) => void; title: string; description?: ReactNode; confirmLabel?: string; onConfirm: () => void }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anulează</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">{confirmLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function SlideOverPanel({ open, onOpenChange, title, description, children }: { open: boolean; onOpenChange: (o: boolean) => void; title: string; description?: string; children: ReactNode }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader className="mb-6 text-left">
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}

export const FieldLabel = ({ children, hint, htmlFor }: { children: ReactNode; hint?: ReactNode; htmlFor?: string }) => (
  <div className="mb-1.5 flex items-center justify-between gap-2">
    <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">{children}</label>
    {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
  </div>
);

export const CloseIcon = X;

export function pctDelta(cur: number, prev: number): number | null {
  if (prev === 0) return cur === 0 ? 0 : null;
  return Math.round(((cur - prev) / prev) * 100);
}

export function timeAgo(iso: string) {
  const s = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return `acum ${s}s`;
  const m = Math.round(s / 60); if (m < 60) return `acum ${m} min`;
  const h = Math.round(m / 60); if (h < 24) return `acum ${h} h`;
  const d = Math.round(h / 24); if (d < 30) return `acum ${d} ${d === 1 ? "zi" : "zile"}`;
  return new Date(iso).toLocaleDateString("ro-RO", { day: "numeric", month: "short", year: "numeric" });
}

export const fmtDate = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("ro-RO", { day: "numeric", month: "short", year: "numeric" }) : "—");
export const fmtDuration = (sec: number | null) => (sec == null ? "—" : sec < 60 ? `${Math.round(sec)}s` : `${Math.floor(sec / 60)}m ${Math.round(sec % 60)}s`);
