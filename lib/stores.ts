import type {Store} from './types';
import {STORE_LIST} from '@/data/store-list';

// =============================================================
//  XÂY DỰNG DANH SÁCH ĐIỂM BÁN TỪ KHAI BÁO THỦ CÔNG
//  ----------------------------------------------------------
//  Đọc data/store-list.ts (do người dùng khai báo) và:
//   - Gán ID theo thứ tự (1, 2, 3, ...).
//   - Dùng tên folder làm tên điểm bán.
//   - Sinh đường dẫn ảnh công khai: /images/<folder>/<file>
//     (có encodeURI để an toàn với dấu cách / tiếng Việt).
// =============================================================

/** Ghép đường dẫn ảnh công khai từ tên folder + tên file */
function buildImagePath(folder: string, fileName: string): string {
  return `/images/${encodeURIComponent(folder)}/${encodeURIComponent(
    fileName,
  )}`;
}

/** Danh sách điểm bán đã chuẩn hóa, dùng chung cho mọi trang */
export const STORES: Store[] = STORE_LIST.map((item, index) => ({
  id: index + 1,
  name: item.folder,
  images: item.images.map((fileName) => buildImagePath(item.folder, fileName)),
}));
