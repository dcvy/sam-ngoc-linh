import { BoxIcon } from "@/components/icons";
import type { CartItem } from "@/context/orders-context";

export interface ProductCardProps {
  item: CartItem;
  onQtyChange: (qty: number) => void;
}

function formatCurrency(n: number) {
  return `${n.toLocaleString("vi-VN")}đ`;
}

export default function ProductCard({ item, onQtyChange }: ProductCardProps) {
  const { product, qty } = item;
  const atMax = qty >= product.stock;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm shadow-black/5">
      <div className="aspect-square w-full overflow-hidden bg-[#E6F4EA]">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#1B4332]">
            <BoxIcon className="h-10 w-10" />
          </div>
        )}
      </div>

      <div className="p-3">
        <p className="line-clamp-2 min-h-[2.6em] text-[14px] font-bold leading-tight text-gray-900">
          {product.name}
        </p>
        <p className="mt-1.5 text-[15px] font-bold text-[#1F7A3D]">
          {formatCurrency(product.price)}
        </p>

        <div className="mt-2.5">
          {qty > 0 ? (
            <div className="flex items-center justify-between rounded-xl bg-gray-100 px-1 py-1">
              <button
                type="button"
                onClick={() => onQtyChange(qty - 1)}
                aria-label="Giảm số lượng"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-lg font-bold text-gray-500 shadow-sm"
              >
                –
              </button>
              <span className="text-[14px] font-bold text-gray-900">{qty}</span>
              <button
                type="button"
                onClick={() => onQtyChange(qty + 1)}
                disabled={atMax}
                aria-label="Tăng số lượng"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#1B4332] to-[#2F9E58] text-lg font-bold text-white shadow-sm disabled:opacity-40"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onQtyChange(1)}
              className="w-full rounded-xl bg-[#DCF3E3] py-2 text-[13px] font-bold text-[#1B4332]"
            >
              Thêm vào giỏ
            </button>
          )}
        </div>
      </div>
    </div>
  );
}