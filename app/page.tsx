'use client';

import Link from 'next/link';
import {STORES} from '@/lib/stores';
import {useScores} from '@/components/useScores';
import ProgressBar from '@/components/ProgressBar';
import {countCompleted} from '@/lib/storage';
import Image from 'next/image';
import RuleScore from '@/components/RuleScore';

// =============================================================
//  TRANG CHỦ
// =============================================================

export default function HomePage() {
  const {ready, scores} = useScores();
  const completed = ready ? countCompleted(STORES, scores) : 0;
  const hasData = STORES.length > 0;

  return (
    <div className='space-y-6'>
      {/* Tổng quan */}
      <section className='rounded-2xl bg-white p-6 shadow-sm'>
        <div className='flex w-full justify-center'>
          <Image
            src='/images/nutty.png'
            alt='Logo'
            width={240}
            height={240}
            className='block'
          />
        </div>
        <h1 className='text-2xl font-bold text-slate-900 mt-6 text-center'>
          Chấm Điểm Quầy Kệ Trưng Bày
        </h1>
        <div className='flex items-center gap-2 w-full'></div>
        <p className='mt-2 text-slate-600'>
          {hasData
            ? `Bao gồm : ${STORES.length} điểm bán`
            : 'Chưa khai báo điểm bán nào. Xem hướng dẫn bên dưới.'}
        </p>

        <RuleScore />
        {hasData && (
          <>
            <div className='mt-5'>
              {ready ? (
                <ProgressBar completed={completed} total={STORES.length} />
              ) : (
                <p className='text-sm text-slate-400'>Đang tải tiến độ…</p>
              )}
            </div>

            <div className='mt-5 flex flex-wrap gap-3 justify-center '>
              <Link
                href='/ket-qua'
                className='rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50'
              >
                Xem kết quả
              </Link>
              <Link
                href='/cham-diem'
                className='rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-700'
              >
                {completed > 0 ? 'Tiếp tục chấm điểm' : 'Bắt đầu chấm điểm'}
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
