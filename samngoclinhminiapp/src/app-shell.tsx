import { useState } from "react";

import BottomNav, { type NavItem } from "@/components/bottom-nav";
import { CartIcon, HomeIcon, ListIcon, UserIcon } from "@/components/icons";
import { OrdersProvider } from "@/context/orders-context";

import HomePage from "@/pages/index";
import CustomerInfoPage from "@/pages/order/customer-info-page";
import OrderHistoryPage from "@/pages/order/order-history-page";
import OrderSuccessPage from "@/pages/order/order-success-page";
import ProductSelectPage from "@/pages/order/product-select-page";
import PlaceholderPage from "@/pages/placeholder-page";

type MainTab = "home" | "orders" | "account";
type FlowStep = null | "product-select" | "customer-info" | "success";

const navItems: NavItem[] = [
  { key: "home", label: "Trang chủ", icon: <HomeIcon className="h-full w-full" /> },
  { key: "orders", label: "Đơn hàng", icon: <ListIcon className="h-full w-full" /> },
  // "Giỏ hàng" không phải 1 tab nội dung — bấm vào là nhảy thẳng sang luồng tạo đơn hàng
  // (xem handleNavChange bên dưới), nên không cần key này trong MainTab.
  { key: "cart", label: "Giỏ hàng", icon: <CartIcon className="h-full w-full" /> },
  { key: "account", label: "Tài khoản", icon: <UserIcon className="h-full w-full" /> },
];

function ShellInner() {
  const [activeTab, setActiveTab] = useState<MainTab>("home");
  // flowStep khác null nghĩa là đang ở luồng tạo đơn hàng toàn màn hình — ẩn bottom nav,
  // đúng với hành vi trong ảnh chụp màn hình (bước chọn hàng / nhập thông tin không có navbar).
  const [flowStep, setFlowStep] = useState<FlowStep>(null);

  if (flowStep === "product-select") {
    return (
      <ProductSelectPage
        onBack={() => setFlowStep(null)}
        onContinue={() => setFlowStep("customer-info")}
      />
    );
  }

  if (flowStep === "customer-info") {
    return (
      <CustomerInfoPage
        onBack={() => setFlowStep("product-select")}
        onSubmit={() => setFlowStep("success")}
      />
    );
  }

  if (flowStep === "success") {
    return (
      <OrderSuccessPage
        onDone={() => {
          setFlowStep(null);
          setActiveTab("home");
        }}
      />
    );
  }

  const handleNavChange = (key: string) => {
    if (key === "cart") {
      // "Giỏ hàng" ở bottom nav = lối tắt vào luồng tạo đơn hàng (trang chọn sản phẩm),
      // không phải một tab nội dung riêng.
      setFlowStep("product-select");
      return;
    }
    setActiveTab(key as MainTab);
  };

  return (
    <>
      {activeTab === "home" && <HomePage />}
      {activeTab === "orders" && <OrderHistoryPage />}
      {activeTab === "account" && <PlaceholderPage title="Tài khoản" />}

      <BottomNav
        items={navItems}
        activeKey={activeTab}
        onChange={handleNavChange}
        onScan={() => console.log("Quét mã")}
      />
    </>
  );
}

export default function AppShell() {
  return (
    <OrdersProvider>
      <ShellInner />
    </OrdersProvider>
  );
}