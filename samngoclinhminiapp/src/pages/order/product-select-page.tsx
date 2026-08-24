import { useState } from "react";
import { Page } from "zmp-ui";

import { ArrowLeftIcon, ScanIcon, SearchIcon } from "@/components/icons";
import CartSummaryBar from "@/components/order/cart-summary-bar";
import ProductRow from "@/components/order/product-row";
import { useOrders } from "@/context/orders-context";

export interface ProductSelectPageProps {
  onBack: () => void;
  onContinue: () => void;
}

export default function ProductSelectPage({ onBack, onContinue }: ProductSelectPageProps) {
  const { cart, setQty, cartCount, cartTotal } = useOrders();
  const [query, setQuery] = useState("");

  const filtered = cart.filter((item) =>
    item.product.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <Page className="flex flex-col bg-[#F5F5F7]">
      <div
        className="mx-auto w-full max-w-[430px] flex-1 px-4 pb-56"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
      >
        <div className="relative flex items-center justify-center py-2">
          <button
            type="button"
            onClick={onBack}
            aria-label="Quay lại"
            className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#d6f9e3] text-[#1B4332]"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-[20px] font-extrabold text-gray-900">Tạo đơn hàng</h1>
        </div>

        {/* Thanh bước 1-2-3-4 đã được bỏ theo yêu cầu — trang này đi thẳng vào chọn hàng */}

        <div className="mt-4 flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm shadow-black/5">
            <SearchIcon className="h-5 w-5 shrink-0 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm sản phẩm"
              className="w-full bg-transparent text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>
          <button
            type="button"
            aria-label="Quét mã"
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border border-[#1B4332]/30 text-[#1F7A3D]"
          >
            <ScanIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {filtered.map((item) => (
            <ProductRow
              key={item.product.id}
              item={item}
              onQtyChange={(qty) => setQty(item.product.id, qty)}
            />
          ))}
          {filtered.length === 0 && (
            <p className="py-10 text-center text-[14px] text-gray-400">
              Không tìm thấy sản phẩm phù hợp
            </p>
          )}
        </div>
      </div>

      <CartSummaryBar
        itemCount={cartCount}
        subtotal={cartTotal}
        total={cartTotal}
        primaryLabel="TIẾP TỤC"
        onPrimary={onContinue}
        primaryDisabled={cartCount === 0}
      />
    </Page>
  );
}