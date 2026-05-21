import type { Criterion } from "./types";

// =============================================================
//  CẤU HÌNH TIÊU CHÍ CHẤM ĐIỂM
//  ----------------------------------------------------------
//  Muốn đổi TÊN tiêu chí: sửa thuộc tính `label`.
//  Muốn THÊM / BỚT tiêu chí: thêm / xóa phần tử trong mảng.
//  `id` phải là duy nhất và KHÔNG nên đổi sau khi đã chấm điểm
//  (vì điểm cũ trong localStorage gắn theo `id` này).
//  Mỗi tiêu chí chấm từ 0 đến 5 điểm.
// =============================================================

export const CRITERIA: Criterion[] = [
  { id: "c1", label: "Trưng bày" },
  { id: "c2", label: "Vị trí" },
  { id: "c3", label: "Vệ sinh" },
];

/** Thang điểm cho mỗi tiêu chí: 1, 2, 3, 4, 5 */
export const SCORE_OPTIONS: number[] = [1, 2, 3, 4, 5];

/** Điểm tối đa của một điểm bán */
export const MAX_TOTAL: number = CRITERIA.length * 5;

/** Key dùng để lưu điểm số vào localStorage */
export const STORAGE_KEY_SCORES = "scoring-app:scores";
