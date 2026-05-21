HƯỚNG DẪN ĐẶT ẢNH ĐIỂM BÁN
============================

Mỗi điểm bán = 1 thư mục con đặt trong thư mục này (public/images/).
Bạn TỰ ĐẶT tên thư mục và tên file ảnh tùy ý.

Sau khi đặt ảnh xong, mở file  data/store-list.ts  để KHAI BÁO danh sách.

Ví dụ trên ổ đĩa:

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

Thì trong data/store-list.ts khai báo:

  export const STORE_LIST = [
    { folder: "Điểm bán 1",
      images: ["1.jpg", "2.png", "3.jpeg", "4.jpg"] },
    { folder: "Cua hang ABC",
      images: ["mat-tien.jpg", "quay-1.png", ...] },
  ];

LƯU Ý:
- Tên thư mục / tên file trong store-list.ts phải GIỐNG HỆT trên ổ đĩa
  (phân biệt hoa thường, dấu cách, dấu tiếng Việt).
- Đuôi file ghi kèm theo tên, lẫn lộn .jpg/.png/.jpeg... đều được.
- Có thể xóa file README.txt này, nó không ảnh hưởng gì.
