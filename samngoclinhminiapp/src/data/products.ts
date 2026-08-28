export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string; // khớp với Category.id trong data/categories.ts
  imageUrl?: string;
}

// TODO: thay ảnh placeholder bằng ảnh sản phẩm thật của Sâm Ngọc Linh Tu Mơ Rông.
export const PRODUCTS: Product[] = [
  {
    id: "ca-phe-hoa-tan-nho",
    name: "Cà Phê Hòa Tan Sâm Ngọc Linh hộp nhỏ 8 gói",
    price: 180500,
    stock: 40,
    category: "ca-phe",
    imageUrl: "../../public/assets/image/cf1.jpg",
  },
  {
    id: "ca-phe-hoa-tan-lon",
    name: "Cà Phê Hòa Tan Sâm Ngọc Linh hộp lớn 20 gói",
    price: 385000,
    stock: 18,
    category: "ca-phe",
    imageUrl: "../../public/assets/image/cf2.jpg",
  },
  {
    id: "sam-ngam-mat-ong-450",
    name: "Sâm Ngọc Linh Ngâm Mật Ong 450ml",
    price: 6400000,
    stock: 8,
    category: "mat-ong",
    imageUrl: "../../public/assets/image/mo1.jpg",
  },
  {
    id: "mat-ong-rung-sam",
    name: "Mật Ong Rừng Ngâm Sâm Ngọc Linh 250ml",
    price: 890000,
    stock: 12,
    category: "mat-ong",
    imageUrl: "../../assets/image/mo2.jpg",
  },
  {
    id: "tra-sam-tui-loc",
    name: "Trà Sâm Ngọc Linh túi lọc hộp 20 gói",
    price: 145000,
    stock: 25,
    category: "tra",
    imageUrl: "../../public/assets/image/tra1.jpg",
  },
  {
    id: "tra-sam-la",
    name: "Trà Lá Sâm Ngọc Linh sấy khô 100g",
    price: 320000,
    stock: 15,
    category: "tra",
    imageUrl: "../../public/assets/image/tra2.jpg",
  },
];