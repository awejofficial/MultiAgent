import { motion, AnimatePresence } from "framer-motion";
import { Activity, AlertTriangle, CheckCircle2, Info, Zap } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

const levelTone = {
  info: "border-primary/30 text-primary",
  success: "border-accent/30 text-accent",
  warning: "border-warning/40 text-[oklch(0.82_0.16_80)]",
  critical: "border-destructive/40 text-destructive",
} as const;

const LevelIcon = ({ level }: { level?: keyof typeof levelTone }) => {
  if (level === "success") return <CheckCircle2 className="h-3.5 w-3.5" />;
  if (level === "warning") return <AlertTriangle className="h-3.5 w-3.5" />;
  if (level === "critical") return <AlertTriangle className="h-3.5 w-3.5" />;
  return <Info className="h-3.5 w-3.5" />;
};

export function ActivityFeed() {
  const activity = useAppStore((s) => s.activity);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
        <div>
          <h2 className="font-display text-sm font-semibold">Agent activity</h2>
          <p className="text-[10px] text-muted-foreground">Realtime orchestration timeline</p>
        </div>
        <Activity className="h-4 w-4 text-accent pulse-glow rounded-full" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {activity.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Zap className="h-5 w-5 text-muted-foreground" />
            <p className="mt-2 text-xs text-muted-foreground">No activity yet. Send a message to wake the agents.</p>
          </div>
        ) : (
          <ol className="relative space-y-3 border-l border-border/60 pl-4">
            <AnimatePresence initial={false}>
              {activity.map((e) => (
                <motion.li
                  key={e.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="relative"
                >
                  <span className={cn("absolute -left-[21px] flex h-3.5 w-3.5 items-center justify-center rounded-full border bg-background", levelTone[e.level ?? "info"])}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  </span>
                  <div className="glass rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                      <LevelIcon level={e.level} />
                      <span>{e.agentId}</span>
                      <span className="ml-auto opacity-60">{new Date(e.at).toLocaleTimeString()}</span>
                    </div>
                    <p className="mt-1 text-xs text-foreground">{e.title}</p>
                    {e.detail && <p className="mt-0.5 text-[11px] text-muted-foreground">{e.detail}</p>}
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>
        )}
      </div>
    </div>
  );
}
