import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function StatCard({
  label, value, sub, icon, accent = "primary",
}: {
  label: string; value: string | number; sub?: string;
  icon?: React.ReactNode;
  accent?: "primary" | "accent" | "warning";
}) {
  const ring = {
    primary: "shadow-[0_0_0_1px_oklch(0.78_0.18_295_/_0.2),0_20px_60px_-20px_oklch(0.78_0.18_295_/_0.35)]",
    accent: "shadow-[0_0_0_1px_oklch(0.82_0.18_165_/_0.2),0_20px_60px_-20px_oklch(0.82_0.18_165_/_0.35)]",
    warning: "shadow-[0_0_0_1px_oklch(0.82_0.16_80_/_0.2),0_20px_60px_-20px_oklch(0.82_0.16_80_/_0.35)]",
  }[accent];
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn("glass-strong rounded-2xl p-5", ring)}>
      <div className="flex items-start justify-between">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        {icon && <span className="text-accent">{icon}</span>}
      </div>
      <p className="mt-3 font-display text-3xl font-semibold tracking-tight">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}
