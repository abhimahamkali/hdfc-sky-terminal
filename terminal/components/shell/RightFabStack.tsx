"use client";

import { ThemeQuickToggleFab } from "@/components/shell/ThemeQuickToggleFab";

/** Fixed quick actions — rendered in-tree (no portal) so the FAB always paints. */
export function RightFabStack() {
  return (
    <div className="right-fab-stack" aria-label="Quick actions">
      <ThemeQuickToggleFab />
    </div>
  );
}
