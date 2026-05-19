import type { Agent } from "@/types";
import { cn } from "@/lib/utils";

const tone: Record<Agent["status"], string> = {
  idle: "bg-muted-foreground/40",
  working: "bg-primary pulse-glow",
  done: "bg-accent",
  error: "bg-destructive",
};

export function AgentBadge({ agent }: { agent: Agent }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 transition-colors hover:bg-secondary/60">
      <span className={cn("h-2 w-2 shrink-0 rounded-full", tone[agent.status])} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-foreground">{agent.name}</p>
        <p className="truncate text-[10px] text-muted-foreground">
          {agent.currentTask ?? agent.description}
        </p>
      </div>
    </div>
  );
}
