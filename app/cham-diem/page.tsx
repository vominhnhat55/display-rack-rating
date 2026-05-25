'use client';

import {useState} from 'react';
import Link from 'next/link';
import {STORES} from '@/lib/stores';
import {useScores} from '@/components/useScores';
import ProgressBar from '@/components/ProgressBar';
import ImageGrid from '@/components/ImageGrid';
import ScoreSelector from '@/components/ScoreSelector';
import {CRITERIA, MAX_TOTAL} from '@/lib/config';
import {
  countCompleted,
  getStoreScore,
  isComplete,
  totalOf,
} from '@/lib/storage';

// =============================================================
//  TRANG CHẤM ĐIỂM
// =============================================================

export default function ScoringPage() {
  const {ready, scores, setScores, resetScores} = useScores();
  const [index, setIndex] = useState(0);
  if (!ready) {
    return <p className='py-10 text-center text-slate-500'>Đang tải…</p>;
  }
  if (STORES.length === 0) {
    return <NoDataNotice />;
  }
  const safeIndex = Math.min(index, STORES.length - 1);
  const store = STORES[safeIndex];
  console.log('Current store:', STORES[safeIndex]);
  const storeScore = getStoreScore(scores, store.id);
  const completed = countCompleted(STORES, scores);
  const done = isComplete(storeScore);
  const handleScore = (criterionId: string, value: number) => {
    setScores((prev) => {
      const key = String(store.id);
      const current = getStoreScore(prev, store.id);
      return {...prev, [key]: {...current, [criterionId]: value}};
    });
  };
  const goPrev = () => setIndex(Math.max(0, safeIndex - 1));
  const goNext = () => setIndex(Math.min(STORES.length - 1, safeIndex + 1));
  const handleReset = () => {
    if (window.confirm('Xóa toàn bộ điểm đã chấm và bắt đầu lại từ đầu?')) {
      resetScores();
      setIndex(0);
    }
  };

  return (
    <div className='space-y-5'>
      {/* Tiến độ */}
      <section className='rounded-2xl bg-white p-4 shadow-sm'>
        <div className='mb-3 flex items-center justify-between gap-2'>
          <ProgressBar completed={completed} total={STORES.length} />
          <button
            type='button'
            onClick={handleReset}
            className='shrink-0 rounded-lg border border-rose-300 bg-white px-3 py-1.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50'
          >
            Chấm lại từ đầu
          </button>
        </div>
      </section>

      {/* Thông tin điểm bán */}
      <section className='rounded-2xl bg-white p-5 shadow-sm'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <div>
            <span className='text-sm font-medium text-slate-500'>
              Điểm bán {safeIndex + 1} / {STORES.length} · ID {store.id}
            </span>
            <h1 className='text-xl font-bold text-slate-900'>{store.name}</h1>
          </div>
          <span
            className={
              'rounded-full px-3 py-1 text-sm font-semibold ' +
              (done
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-amber-100 text-amber-700')
            }
          >
            {done ? '✓ Đã chấm xong' : 'Chưa chấm xong'}
          </span>
        </div>

        <div className='mt-4'>
          <ImageGrid images={store.images} storeName={store.name} />
        </div>
      </section>

      {/* Chấm điểm theo tiêu chí */}
      <section className='rounded-2xl bg-white p-5 shadow-sm'>
        <div className='mb-3 flex items-center justify-between'>
          <h2 className='font-bold text-slate-900'>Chấm điểm</h2>
          <span className='text-sm font-medium text-slate-600'>
            Tổng:{' '}
            <span className='font-bold text-slate-900'>
              {totalOf(storeScore)} / {MAX_TOTAL}
            </span>
          </span>
        </div>

        <div className='space-y-3'>
          {CRITERIA.map((c) => (
            <ScoreSelector
              key={c.id}
              label={c.label}
              value={storeScore[c.id] ?? null}
              onChange={(value) => handleScore(c.id, value)}
            />
          ))}
        </div>
      </section>

      {/* Điều hướng */}
      <section className='flex items-center justify-between gap-3'>
        <button
          type='button'
          onClick={goPrev}
          disabled={safeIndex === 0}
          className='rounded-2xl border-2 border-sky-300 bg-white/90 px-6 py-2.5 font-bold text-sky-700 transition hover:bg-sky-50 hover:border-sky-400 shadow-sm'
        >
          ‹ Trước
        </button>

        <span className='text-sm text-slate-500'>
          {safeIndex + 1} / {STORES.length}
        </span>

        {safeIndex === STORES.length - 1 ? (
          <Link
            href='/ket-qua'
            className='rounded-lg bg-[#b52350] px-5 py-2.5 font-semibold text-white transition hover:opacity-80'
          >
            Xem kết quả ›
          </Link>
        ) : (
          <button
            type='button'
            onClick={goNext}
            className='rounded-2xl px-6 py-2.5 font-bold text-white transition hover:opacity-85 shadow-lg'
            style={{background: 'linear-gradient(135deg,#0ea5e9,#0284c7)'}}
          >
            Tiếp theo ›
          </button>
        )}
      </section>

      {/* Chuyển nhanh */}
      <section className='rounded-2xl bg-white p-4 shadow-sm'>
        <h3 className='mb-2 text-sm font-semibold text-slate-700'>
          Chuyển nhanh
        </h3>
        <div className='flex flex-wrap gap-1.5'>
          {STORES.map((s, i) => {
            const sc = getStoreScore(scores, s.id);
            const isDone = isComplete(sc);
            const isCurrent = i === safeIndex;
            return (
              <button
                key={s.id}
                type='button'
                onClick={() => setIndex(i)}
                title={s.name}
                className={
                  'h-9 w-9 rounded-md text-xs font-bold transition ' +
                  (isCurrent
                    ? 'bg-slate-900 text-white ring-2 ring-slate-900 ring-offset-1'
                    : isDone
                      ? 'bg-[#d46788] text-[#b52350] hover:bg-emerald-200'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200')
                }
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/** Thông báo khi chưa khai báo điểm bán nào */
function NoDataNotice() {
  return (
    <div className='rounded-2xl bg-white p-8 text-center shadow-sm'>
      <p className='text-lg font-semibold text-slate-800'>
        Chưa khai báo điểm bán nào
      </p>
      <p className='mt-2 text-sm text-slate-500'>
        Hãy mở file{' '}
        <code className='rounded bg-slate-100 px-1.5 py-0.5 text-xs'>
          data/store-list.ts
        </code>{' '}
        và khai báo danh sách điểm bán.
      </p>
    </div>
  );
}
