import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CalendarRange, Monitor, Smartphone, Tablet } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { supabase } from "@/integrations/supabase/client";
import BlogAdminLayout from "@/components/admin/blog/BlogAdminLayout";
import { ErrorState, PageHeader, Panel, SectionTitle, StatCard, fmtDuration, pctDelta } from "@/components/admin/blog/ui";
import { localKey, useCategories, usePosts } from "@/hooks/useBlogAdmin";

type View = { post_id: string; viewed_at: string; referrer: string | null; session_hash: string | null; device: string | null; duration_seconds: number | null };
const day = 864e5;

const sourceOf = (ref: string | null) => {
  if (!ref) return "Direct";
  try {
    const h = new URL(ref).hostname.replace(/^www\./, "");
    if (/aiautomatizari\.ro|lovable\.app|localhost/.test(h)) return "Intern (site)";
    if (/google\./.test(h)) return "Google";
    if (/facebook|fb\.|instagram/.test(h)) return "Facebook / Instagram";
    if (/linkedin|lnkd/.test(h)) return "LinkedIn";
    if (/t\.co|twitter|x\.com/.test(h)) return "X / Twitter";
    return h;
  } catch { return "Altele"; }
};

function Bars({ rows, empty }: { rows: { label: React.ReactNode; value: number; key: string }[]; empty: string }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  if (!rows.length) return <p className="px-4 py-10 text-center text-sm text-muted-foreground">{empty}</p>;
  return (
    <ul className="space-y-3 p-4">
      {rows.map((r) => (
        <li key={r.key}>
          <div className="mb-1 flex items-center justify-between gap-3 text-sm"><span className="min-w-0 truncate text-foreground">{r.label}</span><span className="tabular-nums text-muted-foreground">{r.value}</span></div>
          <div className="h-1.5 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-primary transition-[width] duration-200" style={{ width: `${(r.value / max) * 100}%` }} /></div>
        </li>
      ))}
    </ul>
  );
}

export default function BlogAnalytics() {
  const [preset, setPreset] = useState("30");
  const [custom, setCustom] = useState({ from: localKey(new Date(Date.now() - 30 * day)), to: localKey(new Date()) });
  const range = useMemo(() => {
    if (preset !== "custom") { const to = new Date(); const from = new Date(to.getTime() - Number(preset) * day); return { from, to }; }
    const from = new Date(`${custom.from}T00:00:00`), to = new Date(`${custom.to}T23:59:59`);
    return { from, to: to < from ? from : to };
  }, [preset, custom]);
  const span = range.to.getTime() - range.from.getTime();
  const prevFrom = new Date(range.from.getTime() - span);

  const posts = usePosts();
  const { data: categories = [] } = useCategories();
  const q = useQuery({
    queryKey: ["blog-admin", "analytics", prevFrom.toISOString().slice(0, 13), range.to.toISOString().slice(0, 13)],
    queryFn: async () => {
      const [v, c] = await Promise.all([
        supabase.from("blog_post_views").select("post_id,viewed_at,referrer,session_hash,device,duration_seconds").gte("viewed_at", prevFrom.toISOString()).lte("viewed_at", range.to.toISOString()).limit(50000),
        supabase.from("blog_comments").select("created_at,status").gte("created_at", prevFrom.toISOString()).lte("created_at", range.to.toISOString()).neq("status", "trash").eq("is_staff_reply", false),
      ]);
      if (v.error) throw v.error;
      if (c.error) throw c.error;
      return { views: (v.data ?? []) as View[], comments: c.data ?? [] };
    },
  });

  const s = useMemo(() => {
    const all = q.data?.views ?? [], cm = q.data?.comments ?? [];
    const cur = all.filter((v) => new Date(v.viewed_at) >= range.from), prev = all.filter((v) => new Date(v.viewed_at) < range.from);
    const uniq = (xs: View[]) => new Set(xs.map((v) => v.session_hash ?? v.viewed_at)).size;
    const avgD = (xs: View[]) => { const d = xs.map((v) => v.duration_seconds).filter((x): x is number => x != null); return d.length ? d.reduce((a, b) => a + b, 0) / d.length : null; };
    const cCur = cm.filter((c) => new Date(c.created_at) >= range.from).length, cPrev = cm.length - cCur;
    const rate = (c: number, v: number) => (v ? (c / v) * 100 : 0);
    const days = Math.max(1, Math.round(span / day));
    const series: { label: string; value: number; key: string }[] = [];
    const idx: Record<string, number> = {};
    for (let i = 0; i <= days; i++) {
      const d = new Date(range.from.getTime() + i * day); const k = localKey(d);
      if (k in idx) continue; idx[k] = series.length;
      series.push({ key: k, label: d.toLocaleDateString("ro-RO", { day: "numeric", month: "short" }), value: 0 });
    }
    cur.forEach((v) => { const k = localKey(new Date(v.viewed_at)); if (k in idx) series[idx[k]].value++; });
    const group = (fn: (v: View) => string | null) => { const m: Record<string, number> = {}; cur.forEach((v) => { const k = fn(v); if (k) m[k] = (m[k] ?? 0) + 1; }); return Object.entries(m).sort((a, b) => b[1] - a[1]); };
    const dCur = avgD(cur), dPrev = avgD(prev);
    return {
      views: cur.length, viewsD: pctDelta(cur.length, prev.length),
      uniq: uniq(cur), uniqD: pctDelta(uniq(cur), uniq(prev)),
      dur: dCur, durD: dCur != null && dPrev != null ? pctDelta(Math.round(dCur), Math.round(dPrev)) : null,
      rate: rate(cCur, cur.length), rateD: pctDelta(Math.round(rate(cCur, cur.length) * 10), Math.round(rate(cPrev, prev.length) * 10)),
      series,
      byPost: group((v) => v.post_id),
      bySource: group((v) => sourceOf(v.referrer)),
      byDevice: group((v) => v.device),
      byCategory: group((v) => posts.data?.find((p) => p.id === v.post_id)?.category_id ?? "none"),
    };
  }, [q.data, range, span, posts.data]);

  const postOf = (id: string) => posts.data?.find((p) => p.id === id);
  const catLabel = (id: string) => { if (id === "none") return "Fără categorie"; const c = categories.find((x) => x.id === id); return c ? <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: c.color }} />{c.name}</span> : "—"; };
  const devIcon = { mobile: Smartphone, tablet: Tablet, desktop: Monitor } as Record<string, React.ElementType>;
  const devLabel = { mobile: "Telefon", tablet: "Tabletă", desktop: "Desktop" } as Record<string, string>;
  const loading = q.isLoading || posts.isLoading;
  const tracked = (q.data?.views ?? []).some((v) => v.device || v.duration_seconds != null);

  return (
    <BlogAdminLayout>
      <PageHeader title="Analytics" description="Citirile reale ale articolelor, comparate cu perioada anterioară." actions={
        <div className="flex flex-wrap items-center gap-2">
          <ToggleGroup type="single" value={preset} onValueChange={(v) => v && setPreset(v)} size="sm" aria-label="Perioadă" className="rounded-lg border border-border bg-card p-0.5">
            {["7", "30", "90"].map((d) => <ToggleGroupItem key={d} value={d} className="px-3 text-xs data-[state=on]:bg-primary/10 data-[state=on]:text-primary">{d}z</ToggleGroupItem>)}
          </ToggleGroup>
          <Popover>
            <PopoverTrigger asChild><Button variant={preset === "custom" ? "default" : "outline"} size="sm" className="gap-1.5"><CalendarRange className="h-4 w-4" />{preset === "custom" ? `${custom.from} – ${custom.to}` : "Personalizat"}</Button></PopoverTrigger>
            <PopoverContent align="end" className="w-72 space-y-3">
              <label className="block text-sm">De la<Input type="date" value={custom.from} max={custom.to} onChange={(e) => setCustom((c) => ({ ...c, from: e.target.value }))} className="mt-1" /></label>
              <label className="block text-sm">Până la<Input type="date" value={custom.to} min={custom.from} max={localKey(new Date())} onChange={(e) => setCustom((c) => ({ ...c, to: e.target.value }))} className="mt-1" /></label>
              <Button size="sm" className="w-full" onClick={() => setPreset("custom")}>Aplică</Button>
            </PopoverContent>
          </Popover>
        </div>} />

      {q.isError ? <Panel><ErrorState onRetry={() => q.refetch()} /></Panel> : <>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          <StatCard label="Vizualizări" value={s.views} delta={s.viewsD} loading={loading} />
          <StatCard label="Vizitatori unici" value={s.uniq} delta={s.uniqD} loading={loading} />
          <StatCard label="Timp mediu pe articol" value={fmtDuration(s.dur)} delta={s.durD} hint={s.dur == null ? "se măsoară de acum" : undefined} loading={loading} />
          <StatCard label="Rată comentarii" value={`${s.rate.toFixed(1)}%`} delta={s.views ? s.rateD : null} hint="comentarii / vizualizări" loading={loading} />
        </div>

        <Panel className="mt-6 p-5">
          <SectionTitle>Vizualizări pe zile</SectionTitle>
          {loading ? <Skeleton className="h-72 w-full" /> : (
            <div className="h-72">
              <ResponsiveContainer>
                <AreaChart data={s.series} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} /><stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} minTickGap={24} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12, color: "hsl(var(--popover-foreground))" }} formatter={(v: number) => [v, "Vizualizări"]} />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#ag)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </Panel>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div><SectionTitle>Top articole</SectionTitle><Panel>{loading ? <Skeleton className="m-4 h-40" /> : <Bars empty="Nicio vizualizare în perioada aleasă." rows={s.byPost.slice(0, 8).map(([id, n]) => ({ key: id, value: n, label: postOf(id) ? <Link to={`/admin/blog/edit/${id}`} className="font-serif hover:text-primary">{postOf(id)!.title}</Link> : "Articol șters" }))} />}</Panel></div>
          <div><SectionTitle>Surse de trafic</SectionTitle><Panel>{loading ? <Skeleton className="m-4 h-40" /> : <Bars empty="Nicio sursă încă." rows={s.bySource.slice(0, 8).map(([k, n]) => ({ key: k, value: n, label: k }))} />}</Panel></div>
          <div><SectionTitle>Categorii performante</SectionTitle><Panel>{loading ? <Skeleton className="m-4 h-40" /> : <Bars empty="Nicio vizualizare încă." rows={s.byCategory.map(([k, n]) => ({ key: k, value: n, label: catLabel(k) }))} />}</Panel></div>
          <div><SectionTitle>Dispozitive</SectionTitle><Panel>{loading ? <Skeleton className="m-4 h-40" /> : <Bars empty={tracked ? "Nicio vizită cu dispozitiv cunoscut." : "Dispozitivele se măsoară de acum înainte — vor apărea după primele citiri."} rows={s.byDevice.map(([k, n]) => { const I = devIcon[k] ?? Monitor; return { key: k, value: n, label: <span className="inline-flex items-center gap-2"><I className="h-4 w-4 text-muted-foreground" />{devLabel[k] ?? k}</span> }; })} />}</Panel></div>
        </div>
      </>}
    </BlogAdminLayout>
  );
}
