import { CheckIcon } from "@/components/icons";

export interface OrderSuccessPageProps {
  onDone: () => void;
}

export default function OrderSuccessPage({ onDone }: OrderSuccessPageProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-[#F5F5F7] px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#1B4332] to-[#2F9E58] text-white">
        <CheckIcon className="h-10 w-10" />
      </div>
      <h1 className="mt-6 text-[20px] font-extrabold text-gray-900">Đặt hàng thành công!</h1>
      <p className="mt-2 max-w-[280px] text-[14px] text-gray-500">
        Đơn hàng của bạn đã được tạo. Vào tab{" "}
        <span className="font-semibold text-gray-700">Đơn hàng</span> ở thanh điều hướng bên
        dưới để xem chi tiết.
      </p>
      <button
        type="button"
        onClick={onDone}
        className="mt-8 w-full max-w-[280px] rounded-2xl bg-gradient-to-br from-[#1B4332] to-[#2F9E58] py-3.5 text-[15px] font-bold text-white"
      >
        Về trang chủ
      </button>
    </div>
  );
}