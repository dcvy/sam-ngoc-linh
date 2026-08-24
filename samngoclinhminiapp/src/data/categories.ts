export interface Category {
  id: string;
  label: string;
}

// TODO: chỉnh lại danh sách/tên category cho khớp đúng ngành hàng thật của bạn.
export const CATEGORIES: Category[] = [
  { id: "ca-phe", label: "Cà Phê" },
  { id: "tra", label: "Trà" },
  { id: "mat-ong", label: "Mật Ong" },
];