import type { SVGProps } from "react";

/**
 * Small hand-rolled icon set used across the MLHub landing page.
 * Kept as plain inline SVG (no lucide-react / icon-font dependency) so the
 * page renders identically no matter which zmp-ui version is installed.
 * Swap any of these for zmp-ui's <Icon icon="zi-..." /> later if you'd
 * rather use Zalo's native icon font once you've confirmed the exact glyph
 * names available in your zmp-ui version.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ChartIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 20V10M12 20V4M20 20v-6" />
  </svg>
);

export const ChevronRightIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const CartIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" />
    <circle cx="10" cy="20" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="17" cy="20" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

export const ReceiptIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M6 3h12v17l-2.5-1.5L13 20l-2.5-1.5L8 20l-2-1.5V3Z" />
    <path d="M9 8h6M9 12h6" />
  </svg>
);

export const BoxIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M3 8l9-4 9 4-9 4-9-4Z" />
    <path d="M3 8v8l9 4 9-4V8" />
    <path d="M12 12v8" />
  </svg>
);

export const LayersIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 3l9 5-9 5-9-5 9-5Z" />
    <path d="M3 13l9 5 9-5" />
  </svg>
);

export const HomeIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 11.5 12 4l8 7.5" />
    <path d="M6 10v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-9" />
  </svg>
);

export const ListIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M8.5 6h11M8.5 12h11M8.5 18h11" />
    <circle cx="4.5" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="4.5" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="4.5" cy="18" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const UserIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
  </svg>
);

export const ScanIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
  </svg>
);

export const SearchIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-3.6-3.6" />
  </svg>
);

export const TrashIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 7h16" />
    <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    <path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

export const CashIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="2.5" y="6" width="19" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M6 9v0M18 15v0" />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M5 12.5 10 17.5 19 6.5" />
  </svg>
);

export const FilterIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 6h16M7 12h10M10 18h4" />
  </svg>
);

export const ArrowLeftIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const CoffeeIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 9h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Z" />
    <path d="M17 10.5h1.2a2.5 2.5 0 0 1 0 5H17" />
    <path d="M7.2 6c.3-.7-.3-1-.3-1.8M10.5 6c.3-.7-.3-1-.3-1.8" />
  </svg>
);

export const LeafIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M5 13c0-5.5 4.5-10 10-10 4 0 4 10-1 10H5Z" />
    <path d="M5 13c0 3.5 2.5 7 7 7" />
  </svg>
);

export const HoneyDropIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 3c3.2 4.3 5.5 7.6 5.5 10.5a5.5 5.5 0 0 1-11 0C6.5 10.6 8.8 7.3 12 3Z" />
  </svg>
);