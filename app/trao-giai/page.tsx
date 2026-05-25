// ================================================================
//  TRANG CÔNG BỐ KẾT QUẢ
//  ---------------------------------------------------------------
//  Thay nội dung tại các chỗ có chú thích "TODO" bên dưới.
// ================================================================

import Image from 'next/image';
import Link from 'next/link';

// ── CẤU HÌNH GIẢI THƯỞNG ────────────────────────────────────────
// TODO: Điền tên điểm bán và điểm số thực tế vào đây sau khi có kết quả
const WINNERS = [
  {
    rank: 1,
    label: 'GIẢI NHẤT',
    emoji: '🥇',
    storeName: 'Tên điểm bán', // TODO: thay tên thực
    score: '--', // TODO: thay điểm thực (vd: "15/15")
    // TODO: thay đường dẫn hình ảnh thực (đặt file vào /public/images/)
    image: null as string | null,
    note: '', // TODO: ghi chú thêm nếu muốn
  },
  {
    rank: 2,
    label: 'GIẢI NHÌ',
    emoji: '🥈',
    storeName: 'Tên điểm bán',
    score: '--',
    image: null as string | null,
    note: '',
  },
  {
    rank: 3,
    label: 'GIẢI BA',
    emoji: '🥉',
    storeName: 'Tên điểm bán',
    score: '--',
    image: null as string | null,
    note: '',
  },
];

// ── STYLE THEO HẠNG ─────────────────────────────────────────────
const RANK_STYLE = {
  1: {
    card: 'border-yellow-300 bg-gradient-to-b from-yellow-50 to-amber-50',
    badge: 'bg-gradient-to-r from-yellow-400 to-amber-400 text-white',
    glow: 'shadow-yellow-200',
    name: 'text-amber-800',
    podiumH: 'h-36',
    podiumBg: 'bg-gradient-to-t from-yellow-400 to-amber-300',
  },
  2: {
    card: 'border-slate-300 bg-gradient-to-b from-slate-50 to-gray-50',
    badge: 'bg-gradient-to-r from-slate-400 to-gray-500 text-white',
    glow: 'shadow-slate-200',
    name: 'text-slate-700',
    podiumH: 'h-24',
    podiumBg: 'bg-gradient-to-t from-slate-400 to-gray-300',
  },
  3: {
    card: 'border-orange-300 bg-gradient-to-b from-orange-50 to-amber-50',
    badge: 'bg-gradient-to-r from-orange-400 to-amber-500 text-white',
    glow: 'shadow-orange-200',
    name: 'text-orange-800',
    podiumH: 'h-16',
    podiumBg: 'bg-gradient-to-t from-orange-400 to-amber-300',
  },
} as const;

// ── COMPONENT THẺ NGƯỜI THẮNG ────────────────────────────────────
function WinnerCard({w}: {w: (typeof WINNERS)[number]}) {
  const s = RANK_STYLE[w.rank as 1 | 2 | 3];
  return (
    <div
      className={`flex flex-col items-center rounded-3xl border-2 ${s.card} ${s.glow} shadow-xl p-5 gap-3 w-full`}
    >
      {/* Huy chương */}
      <span
        className='text-5xl beach-float'
        style={{animationDelay: `${w.rank * 0.3}s`}}
      >
        {w.emoji}
      </span>

      {/* Badge giải */}
      <span
        className={`text-xs font-extrabold tracking-widest px-4 py-1 rounded-full ${s.badge}`}
      >
        {w.label}
      </span>

      {/* Khung hình — thay bằng <Image> sau khi có ảnh */}
      <div className='w-full aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 bg-white/70 flex items-center justify-center relative'>
        {w.image ? (
          <Image
            src={w.image}
            alt={w.storeName}
            fill
            className='object-cover'
          />
        ) : (
          <div className='flex flex-col items-center gap-1 text-slate-300 select-none'>
            <span className='text-4xl'>📸</span>
            <span className='text-xs'>Hình ảnh sẽ cập nhật sau</span>
          </div>
        )}
      </div>

      {/* Tên điểm bán */}
      <p className={`text-lg font-extrabold text-center ${s.name}`}>
        {w.storeName}
      </p>

      {/* Điểm số */}
      <p className='text-sm text-slate-500 font-semibold'>
        Điểm số: <span className='text-slate-800'>{w.score}</span>
      </p>

      {/* Ghi chú tuỳ chọn */}
      {w.note && (
        <p className='text-xs text-center text-slate-400 italic'>{w.note}</p>
      )}
    </div>
  );
}

// ── TRANG CHÍNH ──────────────────────────────────────────────────
export default function TraoGiaiPage() {
  // Podium: giải Nhì — Nhất — Ba
  const podiumOrder = [WINNERS[1], WINNERS[0], WINNERS[2]];

  return (
    <div className='space-y-8'>
      {/* ── Hero banner ── */}
      <section
        className='relative rounded-3xl overflow-hidden shadow-2xl text-center px-6 py-12'
        style={{
          background:
            'linear-gradient(135deg,#0ea5e9 0%,#06b6d4 40%,#38bdf8 70%,#67e8f9 100%)',
        }}
      >
        {/* Sóng nền trang trí */}
        <div className='absolute bottom-0 left-0 right-0 opacity-20 pointer-events-none'>
          <svg
            viewBox='0 0 1200 80'
            preserveAspectRatio='none'
            className='w-full h-16 fill-white'
          >
            <path d='M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 L1200,80 L0,80 Z' />
          </svg>
        </div>

        <div className='relative z-10'>
          <p className='text-white/80 text-sm font-bold tracking-widest uppercase mb-2'>
            🌊 Summer Energy 2026 🌊
          </p>
          <h1 className='text-3xl md:text-4xl font-black text-white drop-shadow-lg leading-tight'>
            CÔNG BỐ KẾT QUẢ
          </h1>
          <h2 className='text-xl font-bold text-white/90 mt-1'>
            Thi Đua Trang Trí Quầy Kệ
          </h2>

          {/* TODO: thay ngày tháng thực tế */}
          <p className='mt-4 text-white/70 text-sm'>
            📅 Ngày công bố:{' '}
            <span className='font-semibold text-white'>01/06/2026</span>
          </p>

          <div className='mt-4 flex justify-center gap-3 text-3xl'>
            <span className='beach-float' style={{animationDelay: '0s'}}>
              🏆
            </span>
            <span className='beach-float-slow' style={{animationDelay: '0.4s'}}>
              ☀️
            </span>
            <span className='beach-float-mid' style={{animationDelay: '0.8s'}}>
              🌊
            </span>
          </div>
        </div>
      </section>

      {/* ── Bục podium ── */}
      <section className='rounded-3xl bg-white/70 backdrop-blur-sm border border-sky-100 shadow-xl p-6'>
        <h3 className='text-center text-sm font-extrabold tracking-widest text-sky-500 uppercase mb-6'>
          🎖️ Top 3 điểm bán xuất sắc
        </h3>

        {/* Thẻ winner (mobile: stack, desktop: 3 cột theo thứ tự podium) */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 items-end'>
          {podiumOrder.map((w) => (
            <WinnerCard key={w.rank} w={w} />
          ))}
        </div>

        {/* Bục podium minh hoạ */}
        <div className='hidden md:flex items-end justify-center gap-0 mt-6 h-16'>
          {podiumOrder.map((w) => {
            const s = RANK_STYLE[w.rank as 1 | 2 | 3];
            return (
              <div
                key={w.rank}
                className={`flex-1 ${s.podiumH} ${s.podiumBg} flex items-center justify-center rounded-t-xl mx-0.5 shadow-inner`}
              >
                <span className='text-white font-black text-lg drop-shadow'>
                  {w.rank}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Lời cảm ơn / nội dung bổ sung ── */}
      <section className='rounded-3xl bg-white/70 backdrop-blur-sm border border-sky-100 shadow-xl p-6 text-center space-y-3'>
        <div className='text-3xl'>🎉</div>
        {/* TODO: thay nội dung lời chúc / cảm ơn thực tế */}
        <h3 className='text-lg font-extrabold text-sky-700'>
          Chúc mừng các đơn vị đoạt giải!
        </h3>
        <p className='text-slate-500 text-sm max-w-xl mx-auto'>
          {/* TODO: thay đoạn văn bản thực tế */}
          {/* Nội dung lời chúc và cảm ơn sẽ được cập nhật sau khi kết thúc cuộc
          thi. */}
        </p>
      </section>

      {/* ── Nút điều hướng ── */}
      {/* <div className='flex justify-center gap-3'>
        <Link
          href='/'
          className='rounded-2xl border-2 border-sky-300 bg-white/90 px-5 py-2.5 font-bold text-sky-700 transition hover:bg-sky-50 text-sm'
        >
          ← Trang chủ
        </Link>
        <Link
          href='/ket-qua'
          className='rounded-2xl px-5 py-2.5 font-bold text-white transition hover:opacity-85 shadow-lg text-sm'
          style={{background: 'linear-gradient(135deg,#0ea5e9,#0284c7)'}}
        >
          Bảng điểm chi tiết →
        </Link>
      </div> */}
    </div>
  );
}
