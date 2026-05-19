import type { Agent, DocumentRecord } from "@/types";

export const AGENTS: Agent[] = [
  { id: "classifier", name: "Classifier", description: "Detects document category", status: "idle" },
  { id: "research", name: "Research", description: "RAG over non-medical corpus", status: "idle" },
  { id: "diagnosis", name: "Diagnosis", description: "Full-context medical reasoning", status: "idle" },
  { id: "triage", name: "Triage", description: "Severity & urgency", status: "idle" },
  { id: "summary", name: "Summary", description: "Patient & doctor summaries", status: "idle" },
  { id: "memory", name: "Memory", description: "Long-term context store", status: "idle" },
];

export const MOCK_DOCUMENTS: DocumentRecord[] = [
  { id: "d1", name: "CBC_Report_2026.pdf", category: "medical", uploadedAt: Date.now() - 1000 * 60 * 12, pages: 4, status: "ready", summary: "Mild anemia. Recommend B12 panel." },
  { id: "d2", name: "Hypertension_Study.pdf", category: "research", uploadedAt: Date.now() - 1000 * 60 * 60 * 3, pages: 28, status: "ready", summary: "Meta-analysis of ACE inhibitors." },
  { id: "d3", name: "MRI_Brain.pdf", category: "medical", uploadedAt: Date.now() - 1000 * 60 * 60 * 26, pages: 2, status: "ready" },
  { id: "d4", name: "Clinical_Trial_NCT.pdf", category: "academic", uploadedAt: Date.now() - 1000 * 60 * 60 * 48, pages: 12, status: "ready" },
  { id: "d5", name: "Patient_Consent.pdf", category: "legal", uploadedAt: Date.now() - 1000 * 60 * 60 * 72, pages: 3, status: "ready" },
];

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/workspace", label: "Workspace" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/documents", label: "Documents" },
  { to: "/settings", label: "Settings" },
] as const;
