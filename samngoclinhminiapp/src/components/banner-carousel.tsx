import { useEffect, useRef, useState } from "react";

export interface BannerSlide {
  src: string;
  alt?: string;
}

export interface BannerCarouselProps {
  slides: BannerSlide[];
  /** Autoplay interval in ms. Set to 0 to disable. */
  autoplayInterval?: number;
}

/**
 * Horizontal swipe carousel built with native CSS scroll-snap, so it works
 * with a plain finger swipe (left/right) with no extra runtime dependency.
 * Dots below the image track the active slide and are also tappable.
 *
 * NOTE: the screenshot's dots sit in a row, which is the standard
 * convention for a horizontally-paged carousel — this implementation swipes
 * left/right. If what you actually need is vertical (up/down) paging
 * instead, flip `flex-row`→`flex-col`, `overflow-x-auto`→`overflow-y-auto`,
 * `snap-x`→`snap-y`, and swap `scrollLeft`/`clientWidth` for
 * `scrollTop`/`clientHeight` below.
 */
export default function BannerCarousel({
  slides,
  autoplayInterval = 4000,
}: BannerCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isUserInteracting = useRef(false);

  const scrollToIndex = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const slideWidth = el.children[0]?.clientWidth ?? el.clientWidth;
    el.scrollTo({ left: index * slideWidth, behavior: "smooth" });
  };

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const slideWidth = el.children[0]?.clientWidth ?? el.clientWidth;
    const index = Math.round(el.scrollLeft / slideWidth);
    setActiveIndex(Math.min(Math.max(index, 0), slides.length - 1));
  };

  useEffect(() => {
    if (!autoplayInterval) return;
    const timer = setInterval(() => {
      if (isUserInteracting.current) return;
      setActiveIndex((prev) => {
        const next = (prev + 1) % slides.length;
        scrollToIndex(next);
        return next;
      });
    }, autoplayInterval);
    return () => clearInterval(timer);
  }, [autoplayInterval, slides.length]);

  return (
    <div className="w-full">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onTouchStart={() => (isUserInteracting.current = true)}
        onTouchEnd={() => (isUserInteracting.current = false)}
        className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="aspect-[16/10] w-[88%] shrink-0 snap-center overflow-hidden rounded-2xl bg-gray-100 dark:bg-white/5"
          >
            <img
              src={slide.src}
              alt={slide.alt ?? `Banner ${i + 1}`}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Đi tới banner ${i + 1}`}
            onClick={() => {
              setActiveIndex(i);
              scrollToIndex(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-4 bg-[#1F7A3D]"
                : "w-1.5 bg-gray-300 dark:bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
