"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ThemeQuickToggleFab } from "@/components/shell/ThemeQuickToggleFab";
import { ThemeToggleFab } from "@/components/shell/ThemeToggleFab";

export function RightFabStack() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="right-fab-stack" aria-label="Quick actions">
      <ThemeQuickToggleFab />
      <ThemeToggleFab />
    </div>,
    document.body,
  );
}
