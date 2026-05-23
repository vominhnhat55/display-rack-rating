'use client';

import {useMemo, useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {STORES} from '@/lib/stores';
import {useScores} from '@/components/useScores';
import ProgressBar from '@/components/ProgressBar';
import {CRITERIA, MAX_TOTAL, SCORE_OPTIONS} from '@/lib/config';
import {buildResultRows, countCompleted, getStoreScore} from '@/lib/storage';
import {exportToExcel} from '@/lib/excel';

// =============================================================
//  TRANG KẾT QUẢ TỔNG HỢP
// =============================================================

export default function ResultPage() {
  const router = useRouter();
  const {ready, scores, setScores, resetScores} = useScores();
  const [filter, setFilter] = useState<'all' | 'incomplete'>('all');

  const rows = useMemo(() => buildResultRows(STORES, scores), [scores]);

  if (!ready) {
    return <p className='py-10 text-center text-slate-500'>Đang tải…</p>;
  }

  if (STORES.length === 0) {
    return (
      <div className='rounded-2xl bg-white p-8 text-center shadow-sm'>
        <p className='text-lg font-semibold text-slate-800'>
          Chưa khai báo điểm bán nào
        </p>
        <p className='mt-2 text-sm text-slate-500'>
          Hãy khai báo danh sách trong{' '}
          <code className='rounded bg-slate-100 px-1.5 py-0.5 text-xs'>
            data/store-list.ts
          </code>
          .
        </p>
      </div>
    );
  }

  const completed = countCompleted(STORES, scores);
  const visibleRows =
    filter === 'all' ? rows : rows.filter((r) => !r.isComplete);

  const updateScore = (storeId: number, criterionId: string, value: number) => {
    setScores((prev) => {
      const key = String(storeId);
      const current = getStoreScore(prev, storeId);
      return {...prev, [key]: {...current, [criterionId]: value}};
    });
  };

  const handleExport = () => {
    exportToExcel(rows, 'ket-qua-cham-diem.xlsx');
  };

  const handleReset = () => {
    if (window.confirm('Xóa toàn bộ điểm đã chấm và bắt đầu lại từ đầu?')) {
      resetScores();
      router.push('/cham-diem');
    }
  };

  return (
    <div className='space-y-5'>
      {/* Tiêu đề + tiến độ */}
      <section className='rounded-2xl bg-white p-5 shadow-sm'>
        <h1 className='text-xl font-bold text-slate-900'>Kết quả chấm điểm</h1>
        <p className='mt-1 text-sm text-slate-500'>
          Bạn có thể sửa điểm trực tiếp trong bảng. Mọi thay đổi được lưu tự
          động.
        </p>
        <div className='mt-4'>
          <ProgressBar completed={completed} total={STORES.length} />
        </div>
      </section>

      {/* Thanh công cụ */}
      <section className='flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm'>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={() => setFilter('all')}
            className={
              'rounded-lg px-3 py-1.5 text-sm font-semibold transition ' +
              (filter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200')
            }
          >
            Tất cả ({rows.length})
          </button>
          <button
            type='button'
            onClick={() => setFilter('incomplete')}
            className={
              'rounded-lg px-3 py-1.5 text-sm font-semibold transition ' +
              (filter === 'incomplete'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200')
            }
          >
            Chưa xong ({rows.filter((r) => !r.isComplete).length})
          </button>
        </div>

        <div className='flex gap-2'>
          <button
            type='button'
            onClick={handleReset}
            className='rounded-lg border border-rose-300 bg-white px-4 py-1.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50'
          >
            Xóa hết điểm
          </button>
          <button
            type='button'
            onClick={handleExport}
            className='rounded-lg bg-[#b52350] px-4 py-1.5 text-sm font-semibold text-white transition hover:opacity-80'
          >
            ⬇ Xuất Excel (.xlsx)
          </button>
        </div>
      </section>

      {/* Bảng kết quả */}
      <section className='overflow-hidden rounded-2xl bg-white shadow-sm'>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse text-sm'>
            <thead>
              <tr className='bg-slate-100 text-left text-slate-600'>
                <th className='px-3 py-3 font-semibold'>ID</th>
                <th className='px-3 py-3 font-semibold'>Tên</th>
                {CRITERIA.map((c) => (
                  <th key={c.id} className='px-3 py-3 font-semibold'>
                    {c.label}
                  </th>
                ))}
                <th className='px-3 py-3 text-right font-semibold'>
                  Tổng (/{MAX_TOTAL})
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.length === 0 && (
                <tr>
                  <td
                    colSpan={CRITERIA.length + 3}
                    className='px-3 py-8 text-center text-slate-400'
                  >
                    Không có điểm bán nào.
                  </td>
                </tr>
              )}
              {visibleRows.map((row) => (
                <tr
                  key={row.id}
                  className='border-t border-slate-100 hover:bg-slate-50'
                >
                  <td className='px-3 py-2 font-medium text-slate-500'>
                    {row.id}
                  </td>
                  <td className='px-3 py-2 font-medium text-slate-800'>
                    <div className='flex items-center gap-2'>{row.name}</div>
                    {!row.isComplete && (
                      <span className='rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700'>
                        chưa xong
                      </span>
                    )}
                  </td>
                  {CRITERIA.map((c) => (
                    <td key={c.id} className='px-3 py-2'>
                      <select
                        value={
                          typeof row.scores[c.id] === 'number'
                            ? String(row.scores[c.id])
                            : ''
                        }
                        onChange={(e) =>
                          updateScore(row.id, c.id, Number(e.target.value))
                        }
                        className={
                          'rounded-md border px-2 py-1 text-sm font-semibold outline-none ' +
                          (typeof row.scores[c.id] === 'number'
                            ? 'border-slate-300 text-slate-800'
                            : 'border-rose-300 text-rose-500')
                        }
                      >
                        <option value='' disabled>
                          —
                        </option>
                        {SCORE_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  ))}
                  <td className='px-3 py-2 text-right'>
                    <span className='font-bold text-slate-900'>
                      {row.total}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quay lại chấm điểm */}
      <div className='text-center gap-3 flex items-center justify-center'>
        <Link
          href='/cham-diem'
          className='inline-block rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50'
        >
          ‹ Quay lại chấm điểm
        </Link>
        <Link
          href='https://forms.gle/YWUsTF8QnMz3LKNW9'
          className='inline-block rounded-lg border border-slate-300 px-5 py-2.5 font-semibold transition  bg-[#b52350] text-white hover:opacity-80'
          target='_blank'
        >
          Nộp kết quả cho ban tổ chức &gt;&gt;
        </Link>
      </div>
    </div>
  );
}
