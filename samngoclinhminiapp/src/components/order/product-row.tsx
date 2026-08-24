import { BoxIcon, TrashIcon } from "@/components/icons";
import type { CartItem } from "@/context/orders-context";

interface ProductRowProps {
  item: CartItem;
  onQtyChange: (qty: number) => void;
}

function formatCurrency(n: number) {
  return `${n.toLocaleString("vi-VN")}đ`;
}

export default function ProductRow({ item, onQtyChange }: ProductRowProps) {
  const { product, qty } = item;
  const atMax = qty >= product.stock;

  return (
    <div className="relative rounded-2xl bg-white p-4 shadow-sm shadow-black/5">
      {qty > 0 && (
        <button
          type="button"
          onClick={() => onQtyChange(0)}
          aria-label={`Xoá ${product.name} khỏi giỏ hàng`}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-[#d6f9e3] text-[#1B4332]"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      )}

      <div className="flex gap-3 pr-10">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#FCE3E6]">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <BoxIcon className="h-7 w-7 text-[#32f258]" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[16px] font-bold text-gray-900">{product.name}</p>
          <p className="mt-0.5 text-[14px] text-gray-500">
            {formatCurrency(product.price)} / đơn vị
          </p>
          <p className="mt-0.5 text-[13px] font-semibold text-emerald-600">
            Tồn: {product.stock} đơn vị
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4">
        <button
          type="button"
          onClick={() => onQtyChange(qty - 1)}
          disabled={qty === 0}
          aria-label="Giảm số lượng"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-500 disabled:opacity-40"
        >
          –
        </button>
        <span className="w-6 text-center text-[16px] font-bold text-gray-900">{qty}</span>
        <button
          type="button"
          onClick={() => onQtyChange(qty + 1)}
          disabled={atMax}
          aria-label="Tăng số lượng"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#1B4332] to-[#2F9E58] text-lg font-bold text-white disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  );
}