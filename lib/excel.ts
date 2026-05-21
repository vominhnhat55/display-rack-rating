import * as XLSX from "xlsx";
import type { ResultRow } from "./types";
import { CRITERIA, MAX_TOTAL } from "./config";

// =============================================================
//  XUẤT FILE EXCEL (.xlsx)
//  Cột: ID | Tên | <từng tiêu chí> | Tổng
// =============================================================

export function exportToExcel(rows: ResultRow[], fileName = "ket-qua-cham-diem.xlsx"): void {
  // Tạo dòng tiêu đề
  const header = ["ID", "Tên", ...CRITERIA.map((c) => c.label), `Tổng (/${MAX_TOTAL})`];

  // Tạo các dòng dữ liệu
  const body = rows.map((row) => {
    const cells: (string | number)[] = [row.id, row.name];
    for (const c of CRITERIA) {
      const v = row.scores[c.id];
      cells.push(typeof v === "number" ? v : "");
    }
    cells.push(row.total);
    return cells;
  });

  const aoa = [header, ...body];
  const worksheet = XLSX.utils.aoa_to_sheet(aoa);

  // Đặt độ rộng cột cho dễ nhìn
  worksheet["!cols"] = [
    { wch: 8 }, // ID
    { wch: 28 }, // Tên
    ...CRITERIA.map(() => ({ wch: 16 })),
    { wch: 14 }, // Tổng
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Kết quả");

  XLSX.writeFile(workbook, fileName);
}
