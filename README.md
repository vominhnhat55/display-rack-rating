# Website Chấm Điểm Quầy Kệ Trưng Bày

Ứng dụng web chấm điểm trưng bày sản phẩm tại các điểm bán, xây dựng bằng
**Next.js 14 (App Router) + React + TypeScript + TailwindCSS**.

## Tính năng

- Hiển thị lần lượt từng điểm bán: tên + các hình ảnh quầy kệ dạng lưới 2×2.
- Click vào ảnh để **phóng to** (lightbox), chuyển ảnh bằng nút hoặc phím mũi tên.
- Chấm điểm theo **3 tiêu chí**, mỗi tiêu chí **0 → 5 điểm** bằng nút chọn nhanh.
- Nút **Trước / Tiếp theo** và bảng "Chuyển nhanh" để di chuyển giữa các điểm bán.
- **Tự động lưu vào localStorage** — không mất dữ liệu khi refresh hoặc tắt trình duyệt.
- Hiển thị **tiến độ**: "Đã chấm 12 / 52".
- Trang **Kết quả tổng hợp**: bảng ID / Tên / điểm từng tiêu chí / tổng điểm,
  cho phép **sửa điểm trực tiếp**.
- **Xuất file Excel (.xlsx)** toàn bộ kết quả.

## Cài đặt & chạy

```bash
npm install
npm run dev      # http://localhost:3000
```

Build bản production:

```bash
npm run build
npm run start
```

## Nạp dữ liệu điểm bán  ⭐ QUAN TRỌNG

Gồm 2 bước:

### Bước 1 — Đặt ảnh vào public/images/

Mỗi điểm bán một thư mục con. Bạn **tự đặt tên** thư mục và tên file ảnh
tùy ý:

```
public/images/
  Điểm bán 1/
    1.jpg
    2.png
    3.jpeg
    4.jpg
  Cua hang ABC/
    mat-tien.jpg
    quay-1.png
    ...
```

### Bước 2 — Khai báo trong data/store-list.ts

Mở file `data/store-list.ts` và liệt kê các điểm bán. Với mỗi điểm bán ghi
tên thư mục (`folder`) và danh sách tên file ảnh (`images`):

```ts
export const STORE_LIST: StoreInput[] = [
  {
    folder: "Điểm bán 1",
    images: ["1.jpg", "2.png", "3.jpeg", "4.jpg"],
  },
  {
    folder: "Cua hang ABC",
    images: ["mat-tien.jpg", "quay-1.png", "quay-2.jpg", "tong-quan.png"],
  },
  // ... tới đủ 52 điểm bán
];
```

Quy ước:

- **ID** điểm bán = thứ tự khai báo (phần tử đầu tiên = ID 1).
- **Tên** điểm bán hiển thị trên web = giá trị `folder`.
- Tên file ảnh ghi **kèm đuôi** — lẫn lộn `.jpg .png .jpeg .webp...` đều được.
- Tên thư mục / tên file trong `store-list.ts` phải **khớp chính xác** với
  trên ổ đĩa (phân biệt hoa thường, dấu cách, dấu tiếng Việt).
- Số ảnh mỗi điểm bán không bắt buộc là 4 — lưới ảnh tự co giãn.

## Tùy chỉnh tiêu chí chấm điểm

Mở file `lib/config.ts` và sửa mảng `CRITERIA`:

```ts
export const CRITERIA: Criterion[] = [
  { id: "c1", label: "Trưng bày" },
  { id: "c2", label: "Vị trí" },
  { id: "c3", label: "Vệ sinh" },
];
```

Có thể thêm / bớt tiêu chí tùy ý. **Lưu ý:** không đổi `id` sau khi đã chấm
điểm, vì điểm cũ trong localStorage gắn theo `id` này.

## Cấu trúc thư mục

```
app/
  layout.tsx           Layout chung + thanh điều hướng
  page.tsx             Trang chủ
  cham-diem/page.tsx   Trang chấm điểm
  ket-qua/page.tsx     Trang kết quả tổng hợp + xuất Excel
components/
  useScores.ts         Hook quản lý điểm số + localStorage
  ImageGrid.tsx        Lưới ảnh + lightbox phóng to
  ScoreSelector.tsx    Dãy nút chấm điểm 0-5
  ProgressBar.tsx      Thanh tiến độ
lib/
  types.ts             Định nghĩa kiểu dữ liệu
  config.ts            Cấu hình tiêu chí (SỬA Ở ĐÂY)
  stores.ts            Dựng danh sách điểm bán từ khai báo
  storage.ts           Lưu điểm & tính toán
  excel.ts             Xuất file Excel
data/
  store-list.ts        KHAI BÁO 52 ĐIỂM BÁN (SỬA Ở ĐÂY)
public/
  images/              ĐẶT ẢNH ĐIỂM BÁN Ở ĐÂY
```

## Công nghệ

- Next.js 14.2 (App Router)
- React 18 · TypeScript 5 · TailwindCSS 3
- xlsx (SheetJS) — xuất file Excel
