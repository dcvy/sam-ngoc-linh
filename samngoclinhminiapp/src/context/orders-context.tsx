import { PRODUCTS, type Product } from "@/data/products";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  product: Product;
  qty: number;
}

export interface CustomerInfo {
  phone: string;
  name: string;
  email?: string;
  province?: string;
  ward?: string;
  address?: string;
}

export type OrderStatus = "thanh_cong" | "da_huy";
export type PaymentStatus = "da_thanh_toan" | "chua_thanh_toan" | "da_huy";
// Hiện chỉ hỗ trợ 1 hình thức: thanh toán khi nhận hàng (COD).
// Thêm option khác (chuyển khoản, ví điện tử...) thì mở rộng union này.
export type PaymentMethod = "cod";

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  paymentMethod: PaymentMethod;
  total: number;
  createdAt: string; // ISO string
  status: OrderStatus;
  paymentStatus: PaymentStatus;
}

interface OrdersContextValue {
  cart: CartItem[];
  setQty: (productId: string, qty: number) => void;
  cartCount: number;
  cartTotal: number;
  clearCart: () => void;
  orders: Order[];
  submitOrder: (customer: CustomerInfo) => Order;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

const STORAGE_KEY = "mlhub_orders_v1";
const STARTING_ORDER_NUMBER = 435; // khớp với đơn mẫu DH-0435 trong dữ liệu demo

function emptyCart(): CartItem[] {
  return PRODUCTS.map((product) => ({ product, qty: 0 }));
}

function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(emptyCart);
  const [orders, setOrders] = useState<Order[]>(loadOrders);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // bỏ qua lỗi quota / private mode — không chặn luồng chính
    }
  }, [orders]);

  const setQty = (productId: string, qty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, qty: Math.max(0, Math.min(qty, item.product.stock)) }
          : item
      )
    );
  };

  const clearCart = () => setCart(emptyCart());

  const cartCount = useMemo(
    () => cart.filter((item) => item.qty > 0).length,
    [cart]
  );
  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty * item.product.price, 0),
    [cart]
  );

  const submitOrder = (customer: CustomerInfo): Order => {
    const nextNumber =
      orders.reduce((max, o) => {
        const n = parseInt(o.id.replace("DH-", ""), 10);
        return Number.isNaN(n) ? max : Math.max(max, n);
      }, STARTING_ORDER_NUMBER) + 1;

    const order: Order = {
      id: `DH-${String(nextNumber).padStart(4, "0")}`,
      items: cart.filter((item) => item.qty > 0),
      customer,
      paymentMethod: "cod",
      total: cartTotal,
      createdAt: new Date().toISOString(),
      status: "thanh_cong",
      // COD -> chưa thu tiền lúc tạo đơn, sẽ thu khi giao hàng.
      paymentStatus: "chua_thanh_toan",
    };

    setOrders((prev) => [order, ...prev]);
    clearCart();
    return order;
  };

  return (
    <OrdersContext.Provider
      value={{ cart, setQty, cartCount, cartTotal, clearCart, orders, submitOrder }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) {
    throw new Error("useOrders phải được gọi bên trong <OrdersProvider>");
  }
  return ctx;
}