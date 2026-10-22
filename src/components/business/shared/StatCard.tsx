import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "purple" | "blue" | "green" | "amber" | "red" | "cyan";
}

const variantStyles = {
  purple: {
    iconBg: "from-purple-500/20 to-purple-600/10",
    iconColor: "text-purple-400",
    border: "border-purple-500/15",
    glow: "hover:border-purple-500/30 hover:shadow-purple-500/5",
  },
  blue: {
    iconBg: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-400",
    border: "border-blue-500/15",
    glow: "hover:border-blue-500/30 hover:shadow-blue-500/5",
  },
  green: {
    iconBg: "from-emerald-500/20 to-emerald-600/10",
    iconColor: "text-emerald-400",
    border: "border-emerald-500/15",
    glow: "hover:border-emerald-500/30 hover:shadow-emerald-500/5",
  },
  amber: {
    iconBg: "from-amber-500/20 to-amber-600/10",
    iconColor: "text-amber-400",
    border: "border-amber-500/15",
    glow: "hover:border-amber-500/30 hover:shadow-amber-500/5",
  },
  red: {
    iconBg: "from-red-500/20 to-red-600/10",
    iconColor: "text-red-400",
    border: "border-red-500/15",
    glow: "hover:border-red-500/30 hover:shadow-red-500/5",
  },
  cyan: {
    iconBg: "from-cyan-500/20 to-cyan-600/10",
    iconColor: "text-cyan-400",
    border: "border-cyan-500/15",
    glow: "hover:border-cyan-500/30 hover:shadow-cyan-500/5",
  },
};

export function StatCard({ label, value, subtitle, icon: Icon, variant = "purple" }: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "glass-card group relative rounded-xl border p-4 md:p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg",
        styles.border,
        styles.glow
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs md:text-sm font-medium text-gray-400">{label}</p>
          <p className="text-xl md:text-2xl font-bold text-white tracking-tight">{value}</p>
          {subtitle && (
            <p className={cn("text-xs md:text-sm", styles.iconColor)}>{subtitle}</p>
          )}
        </div>
        <div className={cn("rounded-lg bg-gradient-to-br p-2.5", styles.iconBg)}>
          <Icon className={cn("h-5 w-5", styles.iconColor)} />
        </div>
      </div>
    </div>
  );
}
