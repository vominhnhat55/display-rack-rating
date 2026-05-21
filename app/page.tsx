"use client";

import Link from "next/link";
import { STORES } from "@/lib/stores";
import { useScores } from "@/components/useScores";
import ProgressBar from "@/components/ProgressBar";
import { countCompleted } from "@/lib/storage";

// =============================================================
//  TRANG CHỦ
// =============================================================

export default function HomePage() {
  const { ready, scores } = useScores();
  const completed = ready ? countCompleted(STORES, scores) : 0;
  const hasData = STORES.length > 0;

  return (
    <div className="space-y-6">
      {/* Tổng quan */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Website Chấm Điểm Quầy Kệ Trưng Bày
        </h1>
        <p className="mt-2 text-slate-600">
          {hasData
            ? `Chấm điểm ${STORES.length} điểm bán theo 3 tiêu chí. Dữ liệu được tự động lưu trên trình duyệt — bạn có thể tắt và quay lại bất cứ lúc nào.`
            : "Chưa khai báo điểm bán nào. Xem hướng dẫn bên dưới."}
        </p>

        {hasData && (
          <>
            <div className="mt-5">
              {ready ? (
                <ProgressBar completed={completed} total={STORES.length} />
              ) : (
                <p className="text-sm text-slate-400">Đang tải tiến độ…</p>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/cham-diem"
                className="rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-700"
              >
                {completed > 0 ? "Tiếp tục chấm điểm" : "Bắt đầu chấm điểm"}
              </Link>
              <Link
                href="/ket-qua"
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Xem kết quả
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Hướng dẫn khai báo dữ liệu */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="font-bold text-slate-900">Cách thêm dữ liệu điểm bán</h2>
        <p className="mt-2 text-sm text-slate-600">
          <span className="font-semibold">Bước 1.</span> Bỏ ảnh vào thư mục{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
            public/images/
          </code>
          , mỗi điểm bán một thư mục con. Bạn tự đặt tên thư mục và tên file
          ảnh tùy ý.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          <span className="font-semibold">Bước 2.</span> Mở file{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
            data/store-list.ts
          </code>{" "}
          và khai báo danh sách: với mỗi điểm bán ghi tên thư mục (
          <code className="rounded bg-slate-100 px-1 text-xs">folder</code>) và
          danh sách tên file ảnh (
          <code className="rounded bg-slate-100 px-1 text-xs">images</code>).
        </p>

        <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">
{`// data/store-list.ts
export const STORE_LIST = [
  {
    folder: "Điểm bán 1",
    images: ["1.jpg", "2.png", "3.jpeg", "4.jpg"],
  },
  {
    folder: "Điểm bán 2",
    images: ["mat-tien.jpg", "quay-1.png", ...],
  },
  // ... tới đủ 52 điểm bán
];`}
        </pre>

        <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
          <li>• Tên file ảnh ghi kèm đuôi — lẫn lộn .jpg/.png/.jpeg đều được.</li>
          <li>
            • Tên thư mục / file phải khớp <strong>chính xác</strong> với trên ổ
            đĩa (phân biệt hoa thường, dấu cách, dấu tiếng Việt).
          </li>
          <li>• ID điểm bán = thứ tự khai báo. Tên điểm bán = tên thư mục.</li>
          <li>• Số ảnh mỗi điểm bán không bắt buộc là 4.</li>
        </ul>

        <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-sm">
          {hasData ? (
            <p className="text-slate-600">
              ✅ Đang khai báo <strong>{STORES.length}</strong> điểm bán.{" "}
              <span className="text-slate-500">
                Ví dụ: {STORES.slice(0, 3).map((s) => s.name).join(", ")}
                {STORES.length > 3 ? "…" : ""}
              </span>
            </p>
          ) : (
            <p className="text-amber-700">
              ⚠️ Mảng STORE_LIST trong data/store-list.ts đang rỗng.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
