import { useMemo, useState } from "react";
import { Page } from "zmp-ui";

import BannerCarousel from "@/components/banner-carousel";
import CategoryTabs from "@/components/category-tabs";
import { CoffeeIcon, HoneyDropIcon, LeafIcon } from "@/components/icons";
import ProductCard from "@/components/product-card";
import { useOrders } from "@/context/orders-context";
import { CATEGORIES } from "@/data/categories";

// TODO: thay bằng ảnh banner thật của Sâm Ngọc Linh Tu Mơ Rông.
const bannerSlides = [
  { src: "https://picsum.photos/seed/tumorong1/800/500", alt: "Sâm Ngọc Linh Tu Mơ Rông" },
  { src: "https://picsum.photos/seed/tumorong2/800/500", alt: "Vùng trồng sâm Tu Mơ Rông" },
  { src: "https://picsum.photos/seed/tumorong3/800/500", alt: "Sản phẩm chế biến từ sâm" },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "ca-phe": <CoffeeIcon className="h-6 w-6" />,
  tra: <LeafIcon className="h-6 w-6" />,
  "mat-ong": <HoneyDropIcon className="h-6 w-6" />,
};

function HomePage() {
  const { cart, setQty } = useOrders();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoryItems = CATEGORIES.map((cat) => ({
    id: cat.id,
    label: cat.label,
    icon: CATEGORY_ICONS[cat.id] ?? null,
  }));

  const visibleProducts = useMemo(() => {
    if (!selectedCategory) return cart;
    return cart.filter((item) => item.product.category === selectedCategory);
  }, [cart, selectedCategory]);

  const handleSelectCategory = (id: string) => {
    // Bấm lại category đang chọn -> bỏ chọn, quay về hiển thị tất cả sản phẩm.
    setSelectedCategory((prev) => (prev === id ? null : id));
  };

  return (
    <Page className="flex flex-col bg-[#F5F5F7] dark:bg-black">
      <div
        className="mx-auto w-full max-w-[430px] flex-1 space-y-5 px-4 pb-28"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
      >
        <BannerCarousel slides={bannerSlides} />

        <CategoryTabs
          categories={categoryItems}
          selected={selectedCategory}
          onSelect={handleSelectCategory}
        />

        <div>
          <h2 className="mb-3 text-[19px] font-extrabold text-gray-900 dark:text-white">
            Sản phẩm
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {visibleProducts.map((item) => (
              <ProductCard
                key={item.product.id}
                item={item}
                onQtyChange={(qty) => setQty(item.product.id, qty)}
              />
            ))}
          </div>
          {visibleProducts.length === 0 && (
            <p className="py-10 text-center text-[14px] text-gray-400">
              Chưa có sản phẩm trong danh mục này
            </p>
          )}
        </div>
      </div>
    </Page>
  );
}

export default HomePage;