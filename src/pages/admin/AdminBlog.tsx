import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Check, Eye, FileText, MessageSquare, PenSquare, Reply } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { supabase } from "@/integrations/supabase/client";
import BlogAdminLayout from "@/components/admin/blog/BlogAdminLayout";
import { EmptyState, ErrorState, Panel, SectionTitle, StatCard, fmtDuration, pctDelta, timeAgo } from "@/components/admin/blog/ui";
import { blogKeys, dailySeries, useInvalidateBlog, useMe, usePosts } from "@/hooks/useBlogAdmin";

type ViewRow = { post_id: string; viewed_at: string; duration_seconds: number | null };
type CommentRow = { id: string; post_id: string; author_name: string; content: string; created_at: string; status: string };

export function useDashboardData() {
  return useQuery({
    queryKey: ["blog-admin", "dashboard"],
    queryFn: async () => {
      const since = new Date(Date.now() - 180 * 864e5).toISOString();
      const [v, c] = await Promise.all([
        supabase.from("blog_post_views").select("post_id,viewed_at,duration_seconds").gte("viewed_at", since).limit(20000),
        supabase.from("blog_comments").select("id,post_id,author_name,content,created_at,status").neq("status", "trash").order("created_at", { ascending: false }).limit(500),
      ]);
      if (v.error) throw v.error;
      if (c.error) throw c.error;
      return { views: (v.data ?? []) as ViewRow[], comments: (c.data ?? []) as CommentRow[] };
    },
  });
}

const inRange = (iso: string, fromDaysAgo: number, toDaysAgo: number) => {
  const t = new Date(iso).getTime(), now = Date.now();
  return t >= now - fromDaysAgo * 864e5 && t < now - toDaysAgo * 864e5;
};
const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

export default function AdminBlog() {
  const { data: me } = useMe();
  const posts = usePosts();
  const dash = useDashboardData();
  const invalidate = useInvalidateBlog();
  const [days, setDays] = useState("30");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  const kpi = useMemo(() => {
    const views = dash.data?.views ?? [], comments = dash.data?.comments ?? [], ps = posts.data ?? [];
    const cur = views.filter((v) => inRange(v.viewed_at, 30, 0)), prev = views.filter((v) => inRange(v.viewed_at, 60, 30));
    const pub = ps.filter((p) => p.status === "published");
    const pubCur = pub.filter((p) => p.published_at && inRange(p.published_at, 30, 0)).length;
    const pubPrev = pub.filter((p) => p.published_at && inRange(p.published_at, 60, 30)).length;
    const cCur = comments.filter((c) => inRange(c.created_at, 30, 0)).length, cPrev = comments.filter((c) => inRange(c.created_at, 60, 30)).length;
    const dCur = avg(cur.map((v) => v.duration_seconds).filter((d): d is number => d != null));
    const dPrev = avg(prev.map((v) => v.duration_seconds).filter((d): d is number => d != null));
    const sparkViews = dailySeries(cur, (v) => v.viewed_at, 30).map((d) => d.value);
    const sparkComments = dailySeries(comments.filter((c) => inRange(c.created_at, 30, 0)), (c) => c.created_at, 30).map((d) => d.value);
    return {
      views: cur.length, viewsDelta: pctDelta(cur.length, prev.length), sparkViews,
      published: pub.length, pubDelta: pctDelta(pubCur, pubPrev),
      comments: cCur, commentsDelta: pctDelta(cCur, cPrev), sparkComments,
      duration: dCur, durationDelta: dCur != null && dPrev != null ? pctDelta(Math.round(dCur), Math.round(dPrev)) : null,
    };
  }, [dash.data, posts.data]);

  const series = useMemo(() => dailySeries(dash.data?.views ?? [], (v) => v.viewed_at, Number(days)), [dash.data, days]);
  const drafts = (posts.data ?? []).filter((p) => p.status === "draft").slice(0, 3);
  const top = [...(posts.data ?? [])].filter((p) => p.status === "published").sort((a, b) => b.views - a.views).slice(0, 5);
  const titleOf = (id: string) => posts.data?.find((p) => p.id === id)?.title ?? "Articol";
  const recent = (dash.data?.comments ?? []).slice(0, 5);

  const approve = async (id: string) => {
    const { error } = await supabase.from("blog_comments").update({ status: "approved" }).eq("id", id);
    if (error) return toast.error("Nu am putut aproba comentariul");
    toast.success("Comentariu aprobat"); invalidate();
  };
  const sendReply = async (c: CommentRow) => {
    if (reply.trim().length < 2 || !me) return;
    const { error } = await supabase.from("blog_comments").insert({
      post_id: c.post_id, parent_id: c.id, author_name: me.name || "Autor", author_email: me.email, content: reply.trim().slice(0, 3000), status: "approved", is_staff_reply: true,
    });
    if (error) return toast.error("Răspunsul nu s-a trimis");
    if (c.status === "pending") await supabase.from("blog_comments").update({ status: "approved" }).eq("id", c.id);
    toast.success("Răspuns publicat"); setReply(""); setReplyTo(null); invalidate();
  };

  const hello = me?.name ? `Bună, ${me.name.split(" ")[0]}` : "Bună";
  const loading = dash.isLoading || posts.isLoading;

  return (
    <BlogAdminLayout>
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">{hello} 👋</h1>
          <p className="mt-1 text-sm text-muted-foreground">Iată ce se întâmplă pe blogul tău.</p>
        </div>
        <Button asChild className="gap-2"><Link to="/admin/blog/new"><PenSquare className="h-4 w-4" />Scrie o postare nouă</Link></Button>
      </header>

      {dash.isError ? <Panel><ErrorState onRetry={() => dash.refetch()} /></Panel> : (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          <StatCard label="Vizualizări (30 zile)" value={kpi.views} delta={kpi.viewsDelta} hint="vs. 30 zile anterioare" spark={kpi.sparkViews} loading={loading} />
          <StatCard label="Articole publicate" value={kpi.published} delta={kpi.pubDelta} hint="publicări noi vs. înainte" loading={loading} />
          <StatCard label="Comentarii noi" value={kpi.comments} delta={kpi.commentsDelta} hint="în 30 zile" spark={kpi.sparkComments} loading={loading} />
          <StatCard label="Timp mediu de citire" value={fmtDuration(kpi.duration)} delta={kpi.durationDelta} hint={kpi.duration == null ? "se măsoară de acum" : "pe vizită"} loading={loading} />
        </div>
      )}

      <Panel className="mt-6 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <SectionTitle>Vizualizări în timp</SectionTitle>
          <ToggleGroup type="single" value={days} onValueChange={(v) => v && setDays(v)} size="sm" aria-label="Perioadă">
            {["7", "30", "90"].map((d) => <ToggleGroupItem key={d} value={d} className="px-3 text-xs data-[state=on]:bg-primary/10 data-[state=on]:text-primary">{d} zile</ToggleGroupItem>)}
          </ToggleGroup>
        </div>
        {loading ? <Skeleton className="h-64 w-full" /> : (
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={series} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <defs><linearGradient id="vg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} /><stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} minTickGap={24} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12, color: "hsl(var(--popover-foreground))" }} formatter={(v: number) => [v, "Vizualizări"]} />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#vg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </Panel>

      <section className="mt-8">
        <SectionTitle action={<Link to="/admin/blog/posts?tab=draft" className="text-xs text-primary hover:underline">Toate ciornele</Link>}>Continuă să scrii</SectionTitle>
        {loading ? <div className="grid gap-3 sm:grid-cols-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-28 rounded-xl" />)}</div>
          : drafts.length === 0 ? <Panel><EmptyState icon={PenSquare} title="Nicio ciornă" description="Începe o idee nouă — se salvează automat." action={<Button asChild size="sm"><Link to="/admin/blog/new">Scrie o postare</Link></Button>} /></Panel>
          : (
            <div className="grid gap-3 sm:grid-cols-3">
              {drafts.map((d) => (
                <Link key={d.id} to={`/admin/blog/edit/${d.id}`} className="group rounded-xl border border-border bg-card p-4 transition-colors duration-150 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <p className="line-clamp-2 font-serif text-base font-semibold text-foreground group-hover:text-primary">{d.title || "Fără titlu"}</p>
                  <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">{d.subtitle || d.excerpt || "—"}</p>
                  <p className="mt-3 text-xs text-muted-foreground">Editat {timeAgo(d.updated_at)}</p>
                </Link>
              ))}
            </div>
          )}
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <SectionTitle action={<Link to="/admin/blog/analytics" className="text-xs text-primary hover:underline">Analytics</Link>}>Cele mai citite</SectionTitle>
          <Panel>
            {loading ? <div className="space-y-3 p-4">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-6" />)}</div>
              : top.length === 0 ? <EmptyState icon={FileText} title="Niciun articol publicat" />
              : (
                <ol className="divide-y divide-border">
                  {top.map((p, i) => (
                    <li key={p.id} className="flex items-center gap-3 px-4 py-3">
                      <span className="w-4 text-sm tabular-nums text-muted-foreground">{i + 1}</span>
                      <Link to={`/admin/blog/edit/${p.id}`} className="min-w-0 flex-1 truncate font-serif text-[15px] font-medium text-foreground hover:text-primary">{p.title}</Link>
                      <span className="flex items-center gap-1 text-sm tabular-nums text-muted-foreground"><Eye className="h-3.5 w-3.5" />{p.views}</span>
                    </li>
                  ))}
                </ol>
              )}
          </Panel>
        </section>
        <section className="lg:col-span-2">
          <SectionTitle action={<Link to="/admin/blog/comments" className="text-xs text-primary hover:underline">Toate</Link>}>Activitate recentă</SectionTitle>
          <Panel>
            {loading ? <div className="space-y-3 p-4">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-10" />)}</div>
              : recent.length === 0 ? <EmptyState icon={MessageSquare} title="Niciun comentariu încă" />
              : (
                <ul className="divide-y divide-border">
                  {recent.map((c) => (
                    <li key={c.id} className="px-4 py-3">
                      <p className="text-sm"><span className="font-medium text-foreground">{c.author_name}</span> <span className="text-muted-foreground">la</span> <span className="text-foreground">{titleOf(c.post_id)}</span></p>
                      <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{c.content}</p>
                      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="mr-auto">{timeAgo(c.created_at)}</span>
                        {c.status === "pending" && <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs" onClick={() => approve(c.id)}><Check className="h-3.5 w-3.5" />Aprobă</Button>}
                        <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs" onClick={() => { setReplyTo(replyTo === c.id ? null : c.id); setReply(""); }}><Reply className="h-3.5 w-3.5" />Răspunde</Button>
                      </div>
                      {replyTo === c.id && (
                        <div className="mt-2 space-y-2">
                          <Textarea autoFocus rows={2} value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Răspunsul tău…" aria-label="Răspuns" />
                          <div className="flex justify-end gap-2"><Button size="sm" variant="ghost" onClick={() => setReplyTo(null)}>Anulează</Button><Button size="sm" onClick={() => sendReply(c)}>Trimite</Button></div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
          </Panel>
        </section>
      </div>
    </BlogAdminLayout>
  );
}
