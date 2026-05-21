import type {Metadata} from 'next';
import Link from 'next/link';
import './globals.css';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Website Chấm Điểm Quầy Kệ',
  description: 'Chấm điểm trưng bày sản phẩm tại các điểm bán',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='vi'>
      <body className='min-h-screen bg-slate-100 text-slate-800 antialiased'>
        <header className='sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur'>
          <nav className='mx-auto flex max-w-5xl items-center justify-between px-4 py-3'>
            <Link
              href='/'
              className='text-lg font-bold text-slate-900 flex gap-3'
            >
              <Image
                src='/images/nutty.png'
                alt='Logo'
                width={80}
                height={80}
              />
              Chấm Điểm Quầy Kệ
            </Link>

            <div className='flex gap-1 text-sm font-medium'>
              <Link
                href='/cham-diem'
                className='rounded-lg px-3 py-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900'
              >
                Chấm điểm
              </Link>
              <Link
                href='/ket-qua'
                className='rounded-lg px-3 py-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900'
              >
                Kết quả
              </Link>
            </div>
          </nav>
        </header>
        <main className='mx-auto max-w-5xl px-4 py-6'>{children}</main>
      </body>
    </html>
  );
}
