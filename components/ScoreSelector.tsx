'use client';

import {useEffect, useState} from 'react';
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
// Màu nền của bong bóng bình luận theo điểm
const COMMENT_COLOR: Record<number, string> = {
  1: 'bg-orange-50 border-orange-200 text-orange-700',
  2: 'bg-amber-50 border-amber-200 text-amber-700',
  3: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  4: 'bg-lime-50 border-lime-200 text-lime-700',
  5: 'bg-emerald-50 border-emerald-200 text-emerald-700',
};

// Danh sách câu bình luận vui theo từng mức điểm
const SCORE_COMMENTS: Record<number, string[]> = {
  1: [
    'Quầy đẹp vậy mà cho có 1 điểm 😢',
    '1 điểm thôi ư? Chắc quầy này làm phật lòng bạn rồi! 😤',
    'Ôi 1 điểm... Khắt khe quá đi bạn ơi! 🥺',
    '1 điểm à? Hôm nay quạo z sao! 😅',
  ],
  2: [
    '2 điểm à? Chưa đủ cà phê sáng nay hả? ☕',
    'Cố thêm chút nữa đi quầy ơi, mới có 2 điểm thôi! 😅',
    '2 điểm... Tưởng nhiều hơn chứ nhỉ? 🤔',
    'Chỉ 2 điểm? Quầy này chưa chinh phục được bạn rồi! 😬',
  ],
  3: [
    '3 điểm — không khen không chê, chuẩn "tạm được"! 😐',
    'Điểm trung bình! Quầy này... ổn thôi 🙃',
    '3 điểm đúng kiểu "cũng được, cũng không được" 😑',
    'Không xuất sắc, không tệ — đúng 3 điểm luôn! 🤷',
  ],
  4: [
    '4 điểm! Gần hoàn hảo rồi, thêm 1 nữa đi! 🌟',
    'Ồ 4 điểm! Quầy này không tệ chút nào! 👍',
    '4 điểm — tiếc thật, sao không cho 5 luôn? 😉',
    'Suýt 5 sao rồi đó, tiếc quá! ✨',
  ],
  5: [
    '5 điểm toàn hảo! Quầy này phải mời bạn cà phê rồi! ☕🎊',
    'PERFECT! 5 điểm tròn trịa! Xuất sắc! 🥳',
    '5 điểm! Quầy này đẹp dữ vại sao! 🏆',
    'Wow 5 điểm! hào phóng đấy! 😄🎉',
  ],
};

function pickComment(score: number): string {
  const list = SCORE_COMMENTS[score] ?? [];
  return list[Math.floor(Math.random() * list.length)] ?? '';
}

export default function ScoreSelector({
  label,
  value,
  onChange,
}: ScoreSelectorProps) {
  const [comment, setComment] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  // Khi value thay đổi từ bên ngoài (load lại), ẩn comment
  useEffect(() => {
    setComment(null);
    setVisible(false);
  }, [label]);
  const handleClick = (score: number) => {
    onChange(score);
    setComment(pickComment(score));
    setVisible(true);
  };
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
              onClick={() => handleClick(score)}
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

      {/* Bình luận vui khi chọn điểm */}
      {visible && comment && value !== null && (
        <div
          key={comment}
          className={
            'score-comment-enter mt-2.5 rounded-lg border px-3 py-2 text-sm font-medium ' +
            COMMENT_COLOR[value]
          }
        >
          {comment}
        </div>
      )}
    </div>
  );
}
