// =============================================================
//  ĐỊNH NGHĨA KIỂU DỮ LIỆU (TYPES)
// =============================================================

/** Một điểm bán / folder dữ liệu đầu vào */
export interface Store {
  id: number;
  name: string;
  images: string[];
}

/**
 * Điểm số của một điểm bán.
 * Key là id của tiêu chí (criterion.id), value là điểm 0-5 hoặc null nếu chưa chấm.
 */
export type ScoreMap = Record<string, number | null>;

/**
 * Toàn bộ dữ liệu chấm điểm lưu trong localStorage.
 * Key ngoài cùng là store.id (dạng chuỗi).
 */
export type AllScores = Record<string, ScoreMap>;

/** Một tiêu chí chấm điểm */
export interface Criterion {
  id: string;
  label: string;
}

/** Một dòng trong bảng tổng hợp kết quả */
export interface ResultRow {
  id: number;
  name: string;
  scores: ScoreMap;
  total: number;
  isComplete: boolean;
}
