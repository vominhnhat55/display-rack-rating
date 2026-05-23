'use client';
import React from 'react';

export default function RuleScore() {
  return (
    <div>
      <h1 className='mb-5 text-2xl font-bold text-slate-900'>
        Hướng dẫn chấm điểm
      </h1>

      <div className='space-y-4'>
        <div className='flex items-start gap-4 rounded-xl bg-slate-100 p-4'>
          <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#b52350] text-sm font-bold text-white'>
            1
          </div>

          <div>
            <h2 className='font-semibold text-slate-900'>Bắt đầu chấm điểm</h2>

            <p className='mt-1 text-sm leading-6 text-slate-600'>
              Nhấn vào nút{' '}
              <span className='font-semibold text-[#b52350]'>
                "Bắt đầu chấm điểm"
              </span>{' '}
              để tiến hành đánh giá quầy kệ.
            </p>
          </div>
        </div>

        <div className='flex items-start gap-4 rounded-xl bg-slate-100 p-4'>
          <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#b52350] text-sm font-bold text-white'>
            2
          </div>

          <div>
            <h2 className='font-semibold text-slate-900'>
              Xuất file và kiểm tra kết quả
            </h2>

            <p className='mt-1 text-sm leading-6 text-slate-600'>
              Sau khi hoàn tất chấm điểm, vui lòng xuất file Excel và đối chiếu
              lại số điểm để đảm bảo chính xác.
            </p>
          </div>
        </div>

        <div className='flex items-start gap-4 rounded-xl bg-slate-100 p-4'>
          <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#b52350] text-sm font-bold text-white'>
            3
          </div>

          <div>
            <h2 className='font-semibold text-slate-900'>
              Nộp kết quả chấm điểm
            </h2>

            <p className='mt-1 text-sm leading-6 text-slate-600'>
              Sau khi kiểm tra hoàn tất, nhấn vào{' '}
              <span className='font-semibold text-[#b52350]'>
                "Nộp kết quả chấm điểm"{' '}
                <span className='font-semibold text-slate-800'>
                  (Nút màu xanh nằm cuối trang)
                </span>
              </span>{' '}
              tại trang{' '}
              <span className='font-semibold text-slate-800'>
                "Kết quả chấm điểm"
              </span>
              .
            </p>
          </div>
        </div>
      </div>
      <div className='mb-6 mt-4 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-[1px] shadow-lg'>
        <div className='rounded-2xl bg-white/95 px-6 py-5 backdrop-blur'>
          <p className='text-center text-2xl font-extrabold tracking-wide text-slate-800'>
            🏆 Chúc đội / zone của bạn đạt giải cao trong cuộc thi ✨
          </p>

          <p className='mt-2 text-center text-sm text-slate-700'>
            “Chấm đâu trúng đó — điểm cao khỏi ngó!” 😎
          </p>
          <p className='mt-2 text-center text-sm text-slate-700'>
            “Chấm có tâm — nhận giải xứng tầm!” 🔥
          </p>
          <p className='mt-2 text-center text-sm text-[#b52350]'>
            “Quầy kệ sáng ngời, số về đời đời ✨” 🔥
          </p>
        </div>
      </div>
    </div>
  );
}
