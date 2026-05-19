import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { ActivityFeed } from "@/components/agents/ActivityFeed";

export const Route = createFileRoute("/workspace")({
  head: () => ({
    meta: [
      { title: "Workspace — Nexus" },
      { name: "description", content: "Realtime multi-agent intelligence workspace." },
    ],
  }),
  component: WorkspacePage,
});

function WorkspacePage() {
  return (
    <AppShell right={<ActivityFeed />}>
      <ChatPanel />
    </AppShell>
  );
}
