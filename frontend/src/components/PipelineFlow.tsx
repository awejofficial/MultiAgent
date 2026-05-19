import { cn } from "@/lib/utils";
import { FileSearch, Stethoscope, Database, Sparkles, ArrowRight } from "lucide-react";

interface Props {
  active?: "idle" | "classifying" | "medical" | "rag" | "done";
  pipeline?: "medical" | "rag";
}

export function PipelineFlow({ active = "idle", pipeline }: Props) {
  const step = (on: boolean) =>
    cn(
      "flex items-center gap-3 rounded-xl border bg-card px-4 py-3 transition-all",
      on
        ? "border-primary text-foreground"
        : "border-border text-muted-foreground opacity-60",
    );

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
      <div className={step(active !== "idle")}>
        <FileSearch className="h-4 w-4 text-primary" />
        <span className="font-medium">Classifier</span>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground" />
      <div className={step(pipeline === "medical" || active === "medical")}>
        <Stethoscope className="h-4 w-4 text-primary" />
        <span className="font-medium">Medical · Full Context LLM</span>
      </div>
      <span className="text-muted-foreground">or</span>
      <div className={step(pipeline === "rag" || active === "rag")}>
        <Database className="h-4 w-4 text-primary" />
        <span className="font-medium">RAG · Chunk + Retrieve</span>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground" />
      <div className={step(active === "done")}>
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="font-medium">Insights</span>
      </div>
    </div>
  );
}