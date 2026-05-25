import type {Metadata} from 'next';
import Link from 'next/link';
import './globals.css';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'SUMMER ENERGY 2026',
  description: 'SUMMER ENERGY 2026',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='vi'>
      <body
        className='min-h-screen text-slate-800 antialiased flex flex-col relative overflow-x-hidden'
        style={{
          background:
            'linear-gradient(160deg, #e0f2fe 0%, #bae6fd 30%, #cffafe 60%, #e0f7fa 100%)',
        }}
      >
        {/* Animated ocean wave strip at very bottom of viewport */}
        <div className='fixed bottom-0 left-0 right-0 h-16 overflow-hidden pointer-events-none z-0 opacity-40'>
          <div className='wave-scroll flex h-full'>
            <svg
              viewBox='0 0 1200 80'
              preserveAspectRatio='none'
              className='w-1/2 h-full fill-sky-400/60'
            >
              <path d='M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 L1200,80 L0,80 Z' />
            </svg>
            <svg
              viewBox='0 0 1200 80'
              preserveAspectRatio='none'
              className='w-1/2 h-full fill-sky-400/60'
            >
              <path d='M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 L1200,80 L0,80 Z' />
            </svg>
          </div>
        </div>
        <div className='fixed bottom-0 left-0 right-0 h-10 overflow-hidden pointer-events-none z-0 opacity-50'>
          <div
            className='wave-scroll flex h-full'
            style={{animationDuration: '6s', animationDirection: 'reverse'}}
          >
            <svg
              viewBox='0 0 1200 60'
              preserveAspectRatio='none'
              className='w-1/2 h-full fill-cyan-500/50'
            >
              <path d='M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z' />
            </svg>
            <svg
              viewBox='0 0 1200 60'
              preserveAspectRatio='none'
              className='w-1/2 h-full fill-cyan-500/50'
            >
              <path d='M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z' />
            </svg>
          </div>
        </div>

        <header className='sticky top-0 z-20 border-b border-sky-200/60 bg-white/70 backdrop-blur-md shadow-sm'>
          <nav className='mx-auto flex max-w-5xl items-center justify-between px-4 py-3'>
            <Link
              href='/'
              className='text-lg font-bold text-sky-800 flex gap-3 items-center'
            >
              <Image
                src='/images/nutty.png'
                alt='Logo'
                width={90}
                height={90}
              />
            </Link>
            <div className='flex gap-1 text-sm font-medium'>
              <Link
                href='/cham-diem'
                className='rounded-xl px-3 py-1.5 text-sky-700 transition hover:bg-sky-100 hover:text-sky-900 font-semibold'
              >
                Chấm điểm
              </Link>
              <Link
                href='/ket-qua'
                className='rounded-xl px-3 py-1.5 text-sky-700 transition hover:bg-sky-100 hover:text-sky-900 font-semibold'
              >
                Kết quả
              </Link>
              <Link
                href='/trao-giai'
                className='rounded-xl px-3 py-1.5 font-semibold text-white transition hover:opacity-85'
                style={{background: 'linear-gradient(135deg,#f59e0b,#f97316)'}}
              >
                🏆 Trao giải
              </Link>
            </div>
          </nav>
        </header>

        <main className='relative z-10 mx-auto max-w-5xl px-4 py-6 flex-1 w-full'>
          {children}
        </main>

        <footer className='relative z-10 border-t border-sky-200/60 bg-white/60 backdrop-blur-md py-6 mt-auto'>
          <div className='mx-auto max-w-5xl px-4 text-center text-sm text-sky-700 my-auto'>
            © {new Date().getFullYear()} ☀️ All rights reserved.
            <br />
            developed by {"NUTTY'S DP TEAM"} 🌊
          </div>
        </footer>
      </body>
    </html>
  );
}
