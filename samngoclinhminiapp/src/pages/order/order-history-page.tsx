import { useState } from "react";

import { FilterIcon, SearchIcon } from "@/components/icons";
import { useOrders, type Order } from "@/context/orders-context";

function formatCurrency(n: number) {
  return `${n.toLocaleString("vi-VN")}đ`;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.toLocaleDateString("vi-VN")} ${d.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

const orderStatusLabel: Record<Order["status"], { text: string; className: string }> = {
  thanh_cong: { text: "Đơn hàng: Tạo thành công", className: "bg-emerald-100 text-emerald-700" },
  da_huy: { text: "Đơn hàng: Đã huỷ", className: "bg-red-100 text-red-600" },
};

const paymentStatusLabel: Record<
  Order["paymentStatus"],
  { text: string; className: string }
> = {
  da_thanh_toan: { text: "Thanh toán: Đã thanh toán", className: "bg-emerald-100 text-emerald-700" },
  chua_thanh_toan: { text: "Thanh toán: Chưa thanh toán", className: "bg-amber-100 text-amber-700" },
  da_huy: { text: "Thanh toán: Đã huỷ", className: "bg-red-100 text-red-600" },
};

export default function OrderHistoryPage() {
  const { orders } = useOrders();
  const [query, setQuery] = useState("");

  const filtered = orders.filter((order) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      order.id.toLowerCase().includes(q) ||
      order.customer.name.toLowerCase().includes(q) ||
      order.customer.phone.includes(q)
    );
  });

  return (
    <div className="flex flex-col bg-[#F5F5F7]">
      <div
        className="mx-auto w-full max-w-[430px] flex-1 px-4 pb-28"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
      >
        <div className="flex items-center justify-between py-2">
          <h1 className="text-[20px] font-extrabold text-gray-900">Lịch sử đơn hàng</h1>
          <button
            type="button"
            aria-label="Lọc đơn hàng"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm shadow-black/5"
          >
            <FilterIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="mt-2 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm shadow-black/5">
          <SearchIcon className="h-5 w-5 shrink-0 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo id, tên khách, SĐT"
            className="w-full bg-transparent text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="mt-4 space-y-3">
          {filtered.map((order) => (
            <div
              key={order.id}
              className="relative overflow-hidden rounded-2xl bg-white p-4 pl-5 shadow-sm shadow-black/5"
            >
              <span className="absolute left-0 top-0 h-full w-1.5 bg-[#1F7A3D]" />

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[16px] font-bold text-gray-900">Đơn hàng {order.id}</p>
                  <p className="mt-0.5 truncate text-[13px] text-gray-500">
                    {order.customer.name} · {order.customer.phone}
                  </p>
                </div>
                <span className="shrink-0 text-[16px] font-bold text-[#1F7A3D]">
                  {formatCurrency(order.total)}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-[12px] text-gray-500">
                <span className="rounded-full bg-gray-100 px-3 py-1">
                  {formatDate(order.createdAt)}
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1">
                  {order.items.length} sản phẩm
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-[12px] font-semibold ${orderStatusLabel[order.status].className}`}
                >
                  {orderStatusLabel[order.status].text}
                </span>
                {/* <span
                  className={`rounded-full px-3 py-1 text-[12px] font-semibold ${paymentStatusLabel[order.paymentStatus].className}`}
                >
                  {paymentStatusLabel[order.paymentStatus].text}
                </span> */}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="py-16 text-center text-[14px] text-gray-400">
              {orders.length === 0 ? "Chưa có đơn hàng nào" : "Không tìm thấy đơn hàng phù hợp"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}