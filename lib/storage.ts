import type { AllScores, ScoreMap, Store, ResultRow } from "./types";
import { CRITERIA, STORAGE_KEY_SCORES } from "./config";

// =============================================================
//  TIỆN ÍCH LƯU TRỮ ĐIỂM SỐ (localStorage) & TÍNH TOÁN KẾT QUẢ
// =============================================================

/** Tạo một ScoreMap rỗng (tất cả tiêu chí = null) */
export function emptyScoreMap(): ScoreMap {
  const map: ScoreMap = {};
  for (const c of CRITERIA) map[c.id] = null;
  return map;
}

/** ---------------- ĐIỂM SỐ ---------------- */

export function loadScores(): AllScores {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_SCORES);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as AllScores;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveScores(scores: AllScores): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY_SCORES, JSON.stringify(scores));
  } catch {
    // localStorage đầy hoặc bị chặn - bỏ qua an toàn
  }
}

/** Lấy ScoreMap của 1 điểm bán, trả về map rỗng nếu chưa có */
export function getStoreScore(scores: AllScores, storeId: number): ScoreMap {
  const existing = scores[String(storeId)];
  if (!existing) return emptyScoreMap();
  // Đảm bảo đủ key theo CRITERIA hiện tại
  const map = emptyScoreMap();
  for (const c of CRITERIA) {
    if (typeof existing[c.id] === "number") map[c.id] = existing[c.id];
  }
  return map;
}

/** ---------------- TÍNH TOÁN ---------------- */

/** Tổng điểm của 1 ScoreMap (null tính là 0) */
export function totalOf(map: ScoreMap): number {
  let sum = 0;
  for (const c of CRITERIA) {
    const v = map[c.id];
    if (typeof v === "number") sum += v;
  }
  return sum;
}

/** Một điểm bán được coi là đã chấm xong khi tất cả tiêu chí có điểm */
export function isComplete(map: ScoreMap): boolean {
  return CRITERIA.every((c) => typeof map[c.id] === "number");
}

/** Đếm số điểm bán đã chấm xong */
export function countCompleted(stores: Store[], scores: AllScores): number {
  return stores.reduce((acc, s) => {
    const map = getStoreScore(scores, s.id);
    return acc + (isComplete(map) ? 1 : 0);
  }, 0);
}

/** Tạo các dòng kết quả cho trang tổng hợp */
export function buildResultRows(stores: Store[], scores: AllScores): ResultRow[] {
  return stores.map((s) => {
    const map = getStoreScore(scores, s.id);
    return {
      id: s.id,
      name: s.name,
      scores: map,
      total: totalOf(map),
      isComplete: isComplete(map),
    };
  });
}
