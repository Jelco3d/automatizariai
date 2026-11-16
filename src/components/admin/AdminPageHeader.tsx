import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

export default function AdminPageHeader({ title, actions }: { title: string; actions?: ReactNode }) {
  return (
    <header className="border-b border-amber-500/20 bg-[#1A1F2C] p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <Link to="/admin/blog"><Button variant="ghost" size="icon" aria-label="Înapoi"><ArrowLeft className="h-5 w-5 text-amber-400" /></Button></Link>
          <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      </div>
    </header>
  );
}
