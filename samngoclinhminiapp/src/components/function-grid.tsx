import type { ReactNode } from "react";

export interface FunctionItem {
  key: string;
  icon: ReactNode;
  iconBgClassName: string;
  title: string;
  subtitle: string;
  onClick?: () => void;
}

export default function FunctionGrid({ items }: { items: FunctionItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={item.onClick}
          className="flex flex-col items-start gap-3 rounded-2xl bg-white p-4 text-left shadow-sm shadow-black/5 transition-transform active:scale-[0.97] dark:bg-white/5"
        >
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBgClassName}`}
          >
            {item.icon}
          </span>
          <span className="min-w-0">
            <span className="block text-[15px] font-bold leading-tight text-gray-900 dark:text-white">
              {item.title}
            </span>
            <span className="mt-0.5 block truncate text-[12px] text-gray-400">
              {item.subtitle}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
