"use client";

// =============================================================
//  COMPONENT: ProgressBar
//  Hiển thị tiến độ "Đã chấm X / Y" kèm thanh tiến độ.
// =============================================================

interface ProgressBarProps {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-sm font-medium text-slate-600">
        <span>
          Đã chấm{" "}
          <span className="font-bold text-slate-900">
            {completed} / {total}
          </span>
        </span>
        <span className="text-slate-500">{percent}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
