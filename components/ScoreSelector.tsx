'use client';

import {SCORE_OPTIONS} from '@/lib/config';

// =============================================================
//  COMPONENT: ScoreSelector
//  Dãy nút chọn nhanh điểm 0 → 5 cho một tiêu chí.
//  Màu sắc thay đổi theo mức điểm (đỏ → vàng → xanh).
// =============================================================

interface ScoreSelectorProps {
  label: string;
  value: number | null;
  onChange: (value: number) => void;
}

// Màu nền cho từng mức điểm khi được chọn
const SELECTED_COLOR: Record<number, string> = {
  1: 'bg-orange-500 border-orange-500 text-white',
  2: 'bg-amber-500 border-amber-500 text-white',
  3: 'bg-yellow-500 border-yellow-500 text-white',
  4: 'bg-lime-600 border-lime-600 text-white',
  5: 'bg-emerald-600 border-emerald-600 text-white',
};

export default function ScoreSelector({
  label,
  value,
  onChange,
}: ScoreSelectorProps) {
  return (
    <div className='rounded-xl border border-slate-200 bg-white p-3'>
      <div className='mb-2 flex items-center justify-between'>
        <span className='font-semibold text-slate-800'>{label}</span>
        <span
          className={
            'text-sm font-medium ' +
            (value === null ? 'text-rose-500' : 'text-emerald-600')
          }
        >
          {value === null ? 'Chưa chấm' : `${value} điểm`}
        </span>
      </div>
      <div className='flex flex-wrap gap-2'>
        {SCORE_OPTIONS.map((score) => {
          const isSelected = value === score;
          return (
            <button
              key={score}
              type='button'
              onClick={() => onChange(score)}
              aria-pressed={isSelected}
              className={
                'h-11 w-11 rounded-lg border-2 text-base font-bold transition ' +
                (isSelected
                  ? SELECTED_COLOR[score]
                  : 'border-slate-300 bg-slate-50 text-slate-600 hover:border-slate-400 hover:bg-slate-100')
              }
            >
              {score}
            </button>
          );
        })}
      </div>
    </div>
  );
}
