interface CartSummaryBarProps {
  itemCount: number;
  subtotal: number;
  total: number;
  primaryLabel: string;
  onPrimary: () => void;
  primaryDisabled?: boolean;
  secondaryLabel?: string;
  onSecondary?: () => void;
}

function formatCurrency(n: number) {
  return `${n.toLocaleString("vi-VN")}đ`;
}

export default function CartSummaryBar({
  itemCount,
  subtotal,
  total,
  primaryLabel,
  onPrimary,
  primaryDisabled,
  secondaryLabel,
  onSecondary,
}: CartSummaryBarProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-[430px] rounded-t-3xl bg-white px-5 pt-4 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
    >
      <p className="text-[14px] text-gray-500">Sản phẩm ({itemCount} mặt hàng)</p>

      <div className="mt-1 flex items-center justify-between text-[14px]">
        <span className="text-gray-500">Tạm tính</span>
        <span className="font-semibold text-gray-900">{formatCurrency(subtotal)}</span>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-[16px] font-bold text-gray-900">Thành tiền</span>
        <span className="text-[20px] font-bold text-[#1B4332]">{formatCurrency(total)}</span>
      </div>

      <div className="mt-4 flex gap-3">
        {secondaryLabel && (
          <button
            type="button"
            onClick={onSecondary}
            className="flex-1 rounded-2xl border border-gray-200 py-3.5 text-[15px] font-bold text-gray-700"
          >
            {secondaryLabel}
          </button>
        )}
        <button
          type="button"
          onClick={onPrimary}
          disabled={primaryDisabled}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#1B4332] to-[#2F9E58] py-3.5 text-[15px] font-bold text-white disabled:opacity-50"
        >
          <span aria-hidden>→</span> {primaryLabel}
        </button>
      </div>
    </div>
  );
}