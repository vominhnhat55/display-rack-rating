"use client";

import { useCallback, useEffect, useState } from "react";
import type { AllScores } from "@/lib/types";
import { loadScores, saveScores } from "@/lib/storage";

// =============================================================
//  HOOK: useScores
//  Quản lý điểm số (scores) và đồng bộ với localStorage.
//  Danh sách điểm bán (stores) được truyền từ Server Component
//  xuống qua props, KHÔNG quản lý ở đây.
// =============================================================

interface UseScores {
  /** Đã đọc xong localStorage chưa (tránh nhấp nháy khi hydrate) */
  ready: boolean;
  scores: AllScores;
  /** Cập nhật toàn bộ điểm số */
  setScores: (updater: AllScores | ((prev: AllScores) => AllScores)) => void;
  /** Xóa toàn bộ điểm đã chấm */
  resetScores: () => void;
}

export function useScores(): UseScores {
  const [ready, setReady] = useState(false);
  const [scores, setScoresState] = useState<AllScores>({});

  // Đọc localStorage 1 lần khi mount
  useEffect(() => {
    setScoresState(loadScores());
    setReady(true);
  }, []);

  // Đồng bộ xuống localStorage mỗi khi scores đổi
  useEffect(() => {
    if (ready) saveScores(scores);
  }, [scores, ready]);

  const setScores = useCallback(
    (updater: AllScores | ((prev: AllScores) => AllScores)) => {
      setScoresState((prev) =>
        typeof updater === "function"
          ? (updater as (p: AllScores) => AllScores)(prev)
          : updater
      );
    },
    []
  );

  const resetScores = useCallback(() => {
    setScoresState({});
  }, []);

  return { ready, scores, setScores, resetScores };
}
