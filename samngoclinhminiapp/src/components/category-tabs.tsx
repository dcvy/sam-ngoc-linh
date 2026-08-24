import type { ReactNode } from "react";

export interface CategoryTabItem {
  id: string;
  label: string;
  icon: ReactNode;
}

export interface CategoryTabsProps {
  categories: CategoryTabItem[];
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function CategoryTabs({ categories, selected, onSelect }: CategoryTabsProps) {
  return (
    <div
      className="flex gap-5 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: "none" }}
    >
      {categories.map((cat) => {
        const active = cat.id === selected;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className="flex shrink-0 flex-col items-center gap-1.5"
          >
            <span
              className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-colors ${
                active
                  ? "border-[#1B4332] bg-[#E6F4EA] text-[#1B4332]"
                  : "border-transparent bg-gray-100 text-gray-400"
              }`}
            >
              {cat.icon}
            </span>
            <span
              className={`text-[12px] font-semibold ${active ? "text-[#1B4332]" : "text-gray-500"}`}
            >
              {cat.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}