import { useState, type ChangeEvent, type ReactNode } from "react";
import { Page } from "zmp-ui";

import { ArrowLeftIcon, CashIcon } from "@/components/icons";
import CartSummaryBar from "@/components/order/cart-summary-bar";
import { useOrders, type CustomerInfo } from "@/context/orders-context";

export interface CustomerInfoPageProps {
  onBack: () => void;
  onSubmit: () => void;
}

const emptyInfo: CustomerInfo = {
  phone: "",
  name: "",
  email: "",
  province: "",
  ward: "",
  address: "",
};

const inputClass =
  "mt-1.5 w-full rounded-xl bg-gray-100 px-4 py-3.5 text-[15px] text-gray-900 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#1B4332]/30";

function Field({
  label,
  children,
  last,
}: {
  label: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <div className={last ? "" : "mb-4"}>
      <label className="text-[13px] font-semibold text-gray-600">{label}</label>
      {children}
    </div>
  );
}

export default function CustomerInfoPage({ onBack, onSubmit }: CustomerInfoPageProps) {
  const { cartCount, cartTotal, submitOrder } = useOrders();
  const [form, setForm] = useState<CustomerInfo>(emptyInfo);

  const isValid = form.phone.trim().length >= 9 && form.name.trim().length > 0;

  const update =
    (field: keyof CustomerInfo) => (e: ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = () => {
    if (!isValid) return;
    submitOrder(form);
    onSubmit();
  };

  return (
    <Page className="flex flex-col bg-[#F5F5F7]">
      <div
        className="mx-auto w-full max-w-[430px] flex-1 px-4 pb-72"
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

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm shadow-black/5">
          <p className="mb-3 text-[16px] font-bold text-gray-900">Thông tin khách hàng</p>

          <Field label="Số điện thoại">
            <input
              value={form.phone}
              onChange={update("phone")}
              inputMode="tel"
              placeholder="Nhập số điện thoại"
              className={inputClass}
            />
          </Field>

          <Field label="Tên khách hàng">
            <input
              value={form.name}
              onChange={update("name")}
              placeholder="Nhập tên khách hàng"
              className={inputClass}
            />
          </Field>

          <Field label="Email (không bắt buộc)">
            <input
              value={form.email}
              onChange={update("email")}
              placeholder="Nhập email"
              className={inputClass}
            />
          </Field>

          <Field label="Tỉnh/Thành phố (không bắt buộc)">
            <input
              value={form.province}
              onChange={update("province")}
              placeholder="Nhập để chọn tỉnh"
              className={inputClass}
            />
          </Field>

          <Field label="Phường/Xã (không bắt buộc)">
            <input
              value={form.ward}
              onChange={update("ward")}
              placeholder="Chọn tỉnh trước"
              className={inputClass}
            />
          </Field>

          <Field label="Địa chỉ giao hàng (không bắt buộc)" last>
            <input
              value={form.address}
              onChange={update("address")}
              placeholder="Số nhà, tên đường..."
              className={inputClass}
            />
          </Field>
        </div>

        {/* Phương thức thanh toán — hiện chỉ hỗ trợ COD nên hiển thị dạng đã chọn sẵn, không cho đổi */}
        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm shadow-black/5">
          <p className="mb-3 text-[16px] font-bold text-gray-900">Phương thức thanh toán</p>
          <div className="flex items-center gap-3 rounded-2xl border-2 border-[#1B4332] bg-[#d6f9e3]/40 p-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d6f9e3] text-[#1B4332]">
              <CashIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold text-gray-900">
                Thanh toán khi nhận hàng (COD)
              </p>
              <p className="text-[12px] text-gray-500">Hiện chỉ hỗ trợ hình thức này</p>
            </div>
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B4332] text-[11px] font-bold text-white">
              ✓
            </span>
          </div>
        </div>
      </div>

      <CartSummaryBar
        itemCount={cartCount}
        subtotal={cartTotal}
        total={cartTotal}
        primaryLabel="TIẾP TỤC"
        onPrimary={handleSubmit}
        primaryDisabled={!isValid}
        secondaryLabel="QUAY LẠI"
        onSecondary={onBack}
      />
    </Page>
  );
}