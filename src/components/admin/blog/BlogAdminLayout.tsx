import { ReactNode, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ExternalLink, LogOut, Menu, Moon, PanelLeftClose, PanelLeftOpen, PenSquare, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { useMe, usePendingCount } from "@/hooks/useBlogAdmin";
import { cn } from "@/lib/utils";
import { CommandPalette, NAV } from "./CommandPalette";
import { useApplyBlogAdminTheme, useBlogAdminTheme } from "./theme";

const COLLAPSE_KEY = "blog-admin-collapsed";

function SidebarBody({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const { data: pending = 0 } = usePendingCount();
  const { data: me } = useMe();
  const { theme, toggle } = useBlogAdminTheme();
  const navigate = useNavigate();
  const signOut = async () => { await supabase.auth.signOut(); navigate("/auth"); };
  const initials = (me?.name || "?").slice(0, 2).toUpperCase();

  const item = (content: ReactNode, label: string) => collapsed ? (
    <Tooltip><TooltipTrigger asChild>{content}</TooltipTrigger><TooltipContent side="right">{label}</TooltipContent></Tooltip>
  ) : content;

  return (
    <div className="flex h-full flex-col gap-6 p-3">
      <Link to="/admin/blog" onClick={onNavigate} className={cn("flex items-center gap-2.5 rounded-lg px-2 py-1.5", collapsed && "justify-center px-0")}>
        <img src="/lovable-uploads/logo-256.webp" alt="" width={32} height={32} className="h-8 w-8 rounded-lg object-cover" />
        {!collapsed && <span className="font-serif text-base font-semibold text-foreground">Blog AI Automatizări</span>}
      </Link>

      {item(
        <Button asChild className={cn("w-full gap-2", collapsed && "px-0")} aria-label="Postare nouă">
          <Link to="/admin/blog/new" onClick={onNavigate}><PenSquare className="h-4 w-4" />{!collapsed && "Postare nouă"}</Link>
        </Button>, "Postare nouă")}

      <nav className="flex flex-1 flex-col gap-0.5" aria-label="Navigare blog">
        {NAV.map((n) => item(
          <NavLink key={n.to} to={n.to} end={n.to === "/admin/blog"} onClick={onNavigate} aria-label={collapsed ? n.label : undefined}
            className={({ isActive }) => cn(
              "relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              collapsed && "justify-center px-0",
              isActive ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}>
            <n.icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="flex-1">{n.label}</span>}
            {n.to.endsWith("comments") && pending > 0 && (
              <span className={cn("rounded-full bg-primary px-1.5 text-[10px] font-semibold leading-4 text-primary-foreground", collapsed && "absolute right-1 top-1")}>{pending}</span>
            )}
          </NavLink>, n.label))}
      </nav>

      <div className="flex flex-col gap-0.5 border-t border-border pt-3">
        {item(
          <a href="/blog" target="_blank" rel="noopener noreferrer" className={cn("flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground", collapsed && "justify-center px-0")} aria-label="Vezi blogul">
            <ExternalLink className="h-4 w-4" />{!collapsed && "Vezi blogul"}
          </a>, "Vezi blogul")}
        {item(
          <button type="button" onClick={toggle} className={cn("flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", collapsed && "justify-center px-0")} aria-label={theme === "dark" ? "Mod luminos" : "Mod închis"}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}{!collapsed && (theme === "dark" ? "Mod luminos" : "Mod închis")}
          </button>, theme === "dark" ? "Mod luminos" : "Mod închis")}
        <DropdownMenu>
          <DropdownMenuTrigger className={cn("mt-1 flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", collapsed && "justify-center px-0")} aria-label="Meniul contului">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">{initials}</span>
            {!collapsed && <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-foreground">{me?.name}</span><span className="block truncate text-xs text-muted-foreground">{me?.isAdmin ? "Administrator" : "Editor"}</span></span>}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="top" className="w-56">
            <DropdownMenuLabel className="truncate font-normal text-muted-foreground">{me?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link to="/business-dashboard">Panoul de business</Link></DropdownMenuItem>
            <DropdownMenuItem onClick={signOut}><LogOut className="mr-2 h-4 w-4" />Deconectare</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default function BlogAdminLayout({ children }: { children: ReactNode }) {
  useApplyBlogAdminTheme();
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(COLLAPSE_KEY) === "1");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const toggleCollapse = () => { setCollapsed((c) => { localStorage.setItem(COLLAPSE_KEY, c ? "0" : "1"); return !c; }); };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex min-h-screen w-full bg-surface font-sans text-foreground">
        <aside className={cn("sticky top-0 hidden h-screen shrink-0 border-r border-border bg-background transition-[width] duration-200 lg:block", collapsed ? "w-16" : "w-60")}>
          <SidebarBody collapsed={collapsed} />
        </aside>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <SheetTitle className="sr-only">Meniu</SheetTitle>
            <SidebarBody collapsed={false} onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-background/85 px-4 backdrop-blur lg:px-8">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Deschide meniul"><Menu className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="hidden lg:inline-flex" onClick={toggleCollapse} aria-label={collapsed ? "Extinde meniul" : "Restrânge meniul"}>
              {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </Button>
            <button type="button" onClick={() => setCmdOpen(true)} className="ml-auto flex h-9 w-full max-w-xs items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Caută (Ctrl+K)">
              <Search className="h-4 w-4" /><span className="flex-1 text-left">Caută…</span>
              <kbd className="hidden rounded border border-border bg-background px-1.5 text-[10px] font-medium sm:inline">⌘K</kbd>
            </button>
          </div>
          <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
        </div>
        <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
      </div>
    </TooltipProvider>
  );
}
