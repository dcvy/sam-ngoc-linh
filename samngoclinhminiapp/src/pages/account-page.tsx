import { ArrowLeftIcon, UserIcon } from "@/components/icons";

export interface AccountPageProps {
  onBack: () => void;
}

export default function AccountPage({ onBack }: AccountPageProps) {
  return (
    <div className="flex flex-col bg-[#F5F5F7] dark:bg-black">
      <div
        className="mx-auto w-full h-full max-w-[430px] flex-1 px-4 pb-28"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
      >
        <div className="relative flex items-center justify-center py-2">
          <button
            type="button"
            onClick={onBack}
            aria-label="Quay lại"
            className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#E6F4EA] text-[#1B4332]"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-[20px] font-extrabold text-gray-900 dark:text-white">
            Tài khoản
          </h1>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#E6F4EA] text-[#1B4332]">
            <UserIcon className="h-12 w-12" />
          </div>
          <p className="mt-4 text-[18px] font-bold text-gray-900 dark:text-white">
            Đoàn Công Vỹ
          </p>
          <p className="mt-1 text-[14px] text-gray-500">0773975413</p>
        </div>
      </div>
    </div>
  );
}