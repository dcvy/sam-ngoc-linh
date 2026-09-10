import type { ReactNode } from "react";
import { ScanIcon } from "./icons";

export interface NavItem {
  key: string;
  label: string;
  icon: ReactNode;
}

export interface BottomNavProps {
  items: NavItem[];
  activeKey: string;
  onChange: (key: string) => void;
  onScan?: () => void;
}

/**
 * Renders `items` split evenly around a floating center scan button
 * (works for the 4-item layout in the screenshot: 2 items, button, 2 items).
 */
export default function BottomNav({
  items,
  activeKey,
  onChange,
  onScan,
}: BottomNavProps) {
  const half = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, half);
  const rightItems = items.slice(half);

  const renderItem = (item: NavItem) => {
    const isActive = item.key === activeKey;
    return (
      <button
        key={item.key}
        type="button"
        onClick={() => onChange(item.key)}
        className="flex flex-1 flex-col items-center justify-center gap-1 py-2"
      >
        <span
          className={`h-6 w-6 ${
            isActive ? "text-[#1B4332]" : "text-gray-400 dark:text-white/40"
          }`}
        >
          {item.icon}
        </span>
        <span
          className={`text-[11px] font-semibold ${
            isActive ? "text-[#1B4332]" : "text-gray-400 dark:text-white/40"
          }`}
        >
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 mx-auto my-0 w-full max-w-[430px] border-x border-black/10 dark:border-white/10 bg-white dark:bg-black90"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="relative border-t border-black/5 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-black/90">
        <div className="flex items-stretch">
          {leftItems.map(renderItem)}
          {/* spacer so labels don't sit under the floating button */}
          <div className="w-16 shrink-0" />
          {rightItems.map(renderItem)}
        </div>

        <button
          type="button"
          aria-label="Quét mã"
          onClick={onScan}
          className="absolute left-1/2 top-0 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#1B4332] to-[#2F9E58] shadow-lg shadow-emerald-300/50 ring-4 ring-white active:scale-95 transition-transform dark:ring-black"
        >
          <ScanIcon className="h-7 w-7 text-white" />
        </button>
      </div>
    </nav>
  );
}