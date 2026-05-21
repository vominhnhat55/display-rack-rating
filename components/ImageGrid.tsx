'use client';

import {useCallback, useEffect, useState} from 'react';

// =============================================================
//  COMPONENT: ImageGrid + Lightbox
//  - Hiển thị 4 ảnh dạng lưới 2x2.
//  - Click vào ảnh để phóng to (lightbox), có nút chuyển ảnh.
// =============================================================

interface ImageGridProps {
  images: string[];
  /** Tên điểm bán, dùng cho alt text */
  storeName: string;
}

export default function ImageGrid({images, storeName}: ImageGridProps) {
  // index ảnh đang phóng to, null = đóng lightbox
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);

  const close = useCallback(() => setZoomIndex(null), []);

  const showPrev = useCallback(() => {
    setZoomIndex((i) =>
      i === null ? i : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    setZoomIndex((i) => (i === null ? i : (i + 1) % images.length));
  }, [images.length]);

  // Điều khiển bằng bàn phím khi lightbox mở
  useEffect(() => {
    if (zoomIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKey);
    // Khóa cuộn nền
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [zoomIndex, close, showPrev, showNext]);

  return (
    <>
      {/* Lưới ảnh */}
      <div className='grid grid-cols-2 gap-3'>
        {images.map(
          (src, idx) => (
            console.log('Rendering image:', src), // Debug: log mỗi ảnh được render
            (
              <button
                key={idx}
                type='button'
                onClick={() => setZoomIndex(idx)}
                className='group relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100'
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${storeName} - ảnh ${idx + 1}`}
                  className='h-full w-full object-cover transition duration-200 group-hover:scale-105'
                  loading='lazy'
                />
                <span className='absolute right-2 top-2 rounded-md bg-black/60 px-1.5 py-0.5 text-xs font-medium text-white'>
                  Ảnh {idx + 1}
                </span>
                <span className='pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100'>
                  🔍 Phóng to
                </span>
              </button>
            )
          ),
        )}
      </div>

      {/* Lightbox */}
      {zoomIndex !== null && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4'
          onClick={close}
          role='dialog'
          aria-modal='true'
        >
          {/* Nút đóng */}
          <button
            type='button'
            onClick={close}
            className='absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/30'
            aria-label='Đóng'
          >
            ✕
          </button>

          {/* Nút ảnh trước */}
          {images.length > 1 && (
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className='absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/30'
              aria-label='Ảnh trước'
            >
              ‹
            </button>
          )}

          {/* Ảnh phóng to */}
          <figure
            className='flex max-h-full max-w-full flex-col items-center'
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[zoomIndex]}
              alt={`${storeName} - ảnh ${zoomIndex + 1}`}
              className='max-h-[80vh] max-w-[90vw] rounded-lg object-contain'
            />
            <figcaption className='mt-3 text-sm font-medium text-white'>
              {storeName} — Ảnh {zoomIndex + 1} / {images.length}
            </figcaption>
          </figure>

          {/* Nút ảnh sau */}
          {images.length > 1 && (
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className='absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/30'
              aria-label='Ảnh sau'
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
