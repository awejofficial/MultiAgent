import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { MOCK_DOCUMENTS } from "@/lib/constants";
import { FileText, Search, Stethoscope, BookOpen, Scale, GraduationCap, FileQuestion, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DocumentRecord } from "@/types";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents — Nexus" },
      { name: "description", content: "Browse and analyze every uploaded document." },
    ],
  }),
  component: DocsPage,
});

const catIcon = {
  medical: Stethoscope, research: BookOpen, legal: Scale,
  academic: GraduationCap, financial: FileQuestion, general: FileText,
};

function DocsPage() {
  const [active, setActive] = useState<DocumentRecord>(MOCK_DOCUMENTS[0]);
  const [query, setQuery] = useState("");
  const list = MOCK_DOCUMENTS.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()));
  const Icon = catIcon[active.category];

  return (
    <AppShell>
      <div className="grid h-screen grid-cols-[320px_1fr]">
        <div className="border-r border-border/60 bg-background/40 backdrop-blur-xl">
          <div className="border-b border-border/60 p-4">
            <h2 className="font-display text-base font-semibold">Documents</h2>
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-3 py-2">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            </div>
          </div>
          <ul className="space-y-1 p-2">
            {list.map((d) => {
              const C = catIcon[d.category];
              return (
                <li key={d.id}>
                  <button onClick={() => setActive(d)} className={cn("flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors", active.id === d.id ? "bg-secondary" : "hover:bg-secondary/60")}>
                    <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><C className="h-4 w-4" /></div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{d.name}</p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{d.category} · {d.pages}p</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="overflow-y-auto p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-accent">{active.category} document</p>
              <h1 className="font-display mt-1 text-2xl font-semibold">{active.name}</h1>
              <p className="text-xs text-muted-foreground">Uploaded {new Date(active.uploadedAt).toLocaleString()}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "var(--gradient-hero)" }}>
              <Icon className="h-5 w-5 text-background" />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="glass-strong rounded-2xl p-6">
              <h3 className="font-display text-sm font-semibold">Document preview</h3>
              <div className="mt-4 aspect-[3/4] rounded-xl border border-border bg-background/60 p-6">
                <div className="space-y-2">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className="shimmer h-2 rounded" style={{ width: `${60 + Math.random() * 40}%`, background: "oklch(1 0 0 / 0.05)" }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass-strong rounded-2xl p-6">
                <h3 className="font-display text-sm font-semibold">AI insights</h3>
                <p className="mt-2 text-sm text-muted-foreground">{active.summary ?? "Run analysis from the workspace to generate insights."}</p>
              </div>
              <div className="glass-strong rounded-2xl p-6">
                <h3 className="font-display text-sm font-semibold">Extracted entities</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Hemoglobin","BP 142/91","Glucose","B12","Cholesterol"].map(t => (
                    <span key={t} className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs">{t}</span>
                  ))}
                </div>
              </div>
              <div className="glass-strong rounded-2xl p-6">
                <h3 className="font-display flex items-center gap-2 text-sm font-semibold"><AlertTriangle className="h-4 w-4 text-[oklch(0.82_0.16_80)]" /> Abnormal values</h3>
                <ul className="mt-3 divide-y divide-border text-sm">
                  <li className="flex items-center justify-between py-2"><span>Hemoglobin</span><span className="text-muted-foreground">10.2 g/dL <span className="text-[oklch(0.82_0.16_80)]">(low)</span></span></li>
                  <li className="flex items-center justify-between py-2"><span>Systolic BP</span><span className="text-muted-foreground">142 mmHg <span className="text-destructive">(high)</span></span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
