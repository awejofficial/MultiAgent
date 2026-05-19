import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Key, Cpu, Database, Palette, Save } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Nexus" },
      { name: "description", content: "Configure your agent OS." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gpt-5.2");
  const [embed, setEmbed] = useState("text-embedding-3-large");
  const [vdb, setVdb] = useState("pgvector");
  const [theme, setTheme] = useState("dark");

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="font-display text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure model providers and vector storage.</p>

        <div className="mt-8 space-y-4">
          <Section icon={<Key className="h-4 w-4" />} title="API keys" desc="Stored locally in your browser for demos.">
            <Field label="LLM API key" value={apiKey} onChange={setApiKey} placeholder="sk-…" type="password" />
          </Section>

          <Section icon={<Cpu className="h-4 w-4" />} title="Models">
            <Select label="LLM model" value={model} onChange={setModel} options={["gpt-5.2", "claude-opus-4", "gemini-2.5-pro", "llama-4-scout"]} />
            <Select label="Embedding model" value={embed} onChange={setEmbed} options={["text-embedding-3-large", "text-embedding-3-small", "nomic-embed-text"]} />
          </Section>

          <Section icon={<Database className="h-4 w-4" />} title="Vector store">
            <Select label="Provider" value={vdb} onChange={setVdb} options={["pgvector", "Qdrant", "Pinecone", "Weaviate", "Chroma"]} />
          </Section>

          <Section icon={<Palette className="h-4 w-4" />} title="Appearance">
            <Select label="Theme" value={theme} onChange={setTheme} options={["dark", "light", "system"]} />
          </Section>

          <button className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
            <Save className="h-4 w-4" /> Save changes
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function Section({ icon, title, desc, children }: { icon: React.ReactNode; title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="glass-strong rounded-2xl p-6">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-accent">{icon}</span>
        <h2 className="font-display font-semibold">{title}</h2>
      </div>
      {desc && <p className="mt-1 text-xs text-muted-foreground">{desc}</p>}
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary/50" />
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary/50">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
