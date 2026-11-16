import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, ExternalLink, FileText, FolderOpen, LayoutDashboard, MessageSquare, PenSquare, Settings } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { usePosts } from "@/hooks/useBlogAdmin";

export const NAV = [
  { to: "/admin/blog", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/blog/posts", label: "Articole", icon: FileText },
  { to: "/admin/blog/categories", label: "Categorii", icon: FolderOpen },
  { to: "/admin/blog/comments", label: "Comentarii", icon: MessageSquare },
  { to: "/admin/blog/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/blog/settings", label: "Setări", icon: Settings },
];

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const navigate = useNavigate();
  const { data: posts = [] } = usePosts();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); onOpenChange(!open); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);
  const go = (to: string) => { onOpenChange(false); navigate(to); };
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Caută articole, pagini sau acțiuni…" />
      <CommandList>
        <CommandEmpty>Niciun rezultat.</CommandEmpty>
        <CommandGroup heading="Acțiuni">
          <CommandItem onSelect={() => go("/admin/blog/new")}><PenSquare className="mr-2 h-4 w-4" />Postare nouă</CommandItem>
          <CommandItem onSelect={() => { onOpenChange(false); window.open("/blog", "_blank"); }}><ExternalLink className="mr-2 h-4 w-4" />Vezi blogul</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Pagini">
          {NAV.map((n) => <CommandItem key={n.to} onSelect={() => go(n.to)}><n.icon className="mr-2 h-4 w-4" />{n.label}</CommandItem>)}
        </CommandGroup>
        {posts.length > 0 && <>
          <CommandSeparator />
          <CommandGroup heading="Articole">
            {posts.slice(0, 50).map((p) => <CommandItem key={p.id} value={`${p.title} ${p.slug}`} onSelect={() => go(`/admin/blog/edit/${p.id}`)}><FileText className="mr-2 h-4 w-4" /><span className="truncate">{p.title}</span></CommandItem>)}
          </CommandGroup>
        </>}
      </CommandList>
    </CommandDialog>
  );
}
