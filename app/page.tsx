'use client';

import Link from 'next/link';
import {STORES} from '@/lib/stores';
import {useScores} from '@/components/useScores';
import ProgressBar from '@/components/ProgressBar';
import {countCompleted} from '@/lib/storage';
import Image from 'next/image';
import RuleScore from '@/components/RuleScore';

export default function HomePage() {
  const {ready, scores} = useScores();
  const completed = ready ? countCompleted(STORES, scores) : 0;
  const hasData = STORES.length > 0;

  return (
    <div className='relative'>

      {/* Floating beach decorations */}
      <span className='absolute -top-2 right-6 text-5xl beach-float select-none pointer-events-none' style={{animationDelay:'0s'}}>☀️</span>
      <span className='absolute top-16 -left-2 text-3xl beach-float-slow select-none pointer-events-none' style={{animationDelay:'0.5s'}}>🌴</span>
      <span className='absolute top-36 right-0 text-2xl beach-float-mid select-none pointer-events-none' style={{animationDelay:'1s'}}>🐚</span>
      <span className='absolute bottom-24 -left-1 text-2xl beach-float select-none pointer-events-none' style={{animationDelay:'1.5s'}}>🌊</span>
      <span className='absolute bottom-20 right-4 text-xl beach-float-slow select-none pointer-events-none' style={{animationDelay:'0.8s'}}>🐠</span>

      {/* Main card */}
      <section className='relative rounded-3xl overflow-hidden shadow-2xl' style={{background:'rgba(255,255,255,0.78)', backdropFilter:'blur(12px)', border:'1.5px solid rgba(186,230,253,0.7)'}}>

        {/* Top gradient bar */}
        <div className='h-2 w-full' style={{background:'linear-gradient(90deg,#38bdf8,#06b6d4,#0ea5e9,#67e8f9,#38bdf8)'}}/>

        {/* Wave background decoration inside card */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]'>
          <svg viewBox='0 0 800 400' className='w-full h-full' preserveAspectRatio='xMidYMid slice'>
            <path d='M0,200 C100,120 200,280 300,200 C400,120 500,280 600,200 C700,120 800,280 800,200 L800,400 L0,400 Z' fill='#0ea5e9'/>
            <path d='M0,280 C133,200 267,360 400,280 C533,200 667,360 800,280 L800,400 L0,400 Z' fill='#0284c7'/>
          </svg>
        </div>

        <div className='relative px-6 pb-6 pt-4'>

          {/* Summer Energy badge */}
          <div className='flex justify-center mb-4'>
            <span className='inline-flex items-center gap-2 text-xs font-bold px-5 py-1.5 rounded-full text-white shadow-lg'
              style={{background:'linear-gradient(90deg,#f59e0b,#f97316,#fb923c)'}}>
              🌊 SUMMER ENERGY 2025 🌊
            </span>
          </div>

          {/* Logo with sun glow */}
          <div className='flex w-full justify-center'>
            <div className='relative'>
              <div className='absolute inset-0 rounded-full blur-2xl opacity-40 scale-125' style={{background:'radial-gradient(circle,#fde68a,#fb923c,transparent)'}}/>
              <Image
                src='/images/nutty.png'
                alt='Logo'
                width={240}
                height={240}
                className='relative z-10 drop-shadow-xl'
              />
            </div>
          </div>

          {/* Title */}
          <h1 className='summer-title text-2xl font-extrabold mt-5 text-center tracking-wide'>
            THI ĐUA TRANG TRÍ QUẦY KỆ
          </h1>

          {/* Sub text */}
          <p className='mt-2 text-sky-700/80 text-center font-medium'>
            {hasData
              ? `Bao gồm : ${STORES.length} điểm bán`
              : 'Chưa khai báo điểm bán nào. Xem hướng dẫn bên dưới.'}
          </p>

          {/* Divider wave */}
          <div className='my-5 overflow-hidden h-3 opacity-30'>
            <svg viewBox='0 0 400 20' preserveAspectRatio='none' className='w-full h-full'>
              <path d='M0,10 C50,20 100,0 150,10 C200,20 250,0 300,10 C350,20 400,0 400,10' stroke='#0ea5e9' strokeWidth='2' fill='none'/>
            </svg>
          </div>

          <RuleScore />

          {hasData && (
            <>
              <div className='mt-5'>
                {ready ? (
                  <ProgressBar completed={completed} total={STORES.length} />
                ) : (
                  <p className='text-sm text-sky-400'>Đang tải tiến độ…</p>
                )}
              </div>

              <div className='mt-6 flex flex-wrap gap-3 justify-center'>
                <Link
                  href='/ket-qua'
                  className='rounded-2xl border-2 border-sky-300 bg-white/90 px-6 py-2.5 font-bold text-sky-700 transition hover:bg-sky-50 hover:border-sky-400 shadow-sm'
                >
                  🏆 Xem kết quả
                </Link>
                <Link
                  href='/cham-diem'
                  className='rounded-2xl px-6 py-2.5 font-bold text-white transition hover:opacity-85 shadow-lg'
                  style={{background:'linear-gradient(135deg,#0ea5e9,#0284c7)'}}
                >
                  {completed > 0 ? '⚡ Tiếp tục chấm điểm' : '🌊 Bắt đầu chấm điểm'}
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Bottom gradient bar */}
        <div className='h-2 w-full' style={{background:'linear-gradient(90deg,#0284c7,#06b6d4,#38bdf8,#67e8f9,#0284c7)'}}/>
      </section>

      {/* Bottom beach emoji row */}
      <div className='flex justify-center mt-5 gap-5 text-2xl select-none pointer-events-none'>
        <span className='beach-float opacity-70' style={{animationDelay:'0s'}}>🌊</span>
        <span className='beach-float-slow opacity-60' style={{animationDelay:'0.4s'}}>🏖️</span>
        <span className='beach-float-mid opacity-70' style={{animationDelay:'0.8s'}}>🐠</span>
        <span className='beach-float-slow opacity-60' style={{animationDelay:'1.2s'}}>🌴</span>
        <span className='beach-float opacity-70' style={{animationDelay:'1.6s'}}>⭐</span>
        <span className='beach-float-mid opacity-60' style={{animationDelay:'2s'}}>🌊</span>
      </div>

    </div>
  );
}
