import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { createContext, useContext, useState } from "react";
import AnnouncementBar from "./components/AnnouncementBar";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import UpiPaymentModal from "./components/UpiPaymentModal";
import WhatsAppButton from "./components/WhatsAppButton";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MLMDashboard from "./pages/MLMDashboard";
import Orders from "./pages/Orders";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Seller from "./pages/Seller";
import UtilityServices from "./pages/UtilityServices";
import Wallet from "./pages/Wallet";

export type Page =
  | "home"
  | "products"
  | "product-detail"
  | "cart"
  | "checkout"
  | "orders"
  | "mlm"
  | "wallet"
  | "utility"
  | "profile"
  | "login"
  | "admin"
  | "seller";

interface NavContextType {
  currentPage: Page;
  navigate: (page: Page, params?: Record<string, string>) => void;
  params: Record<string, string>;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const NavContext = createContext<NavContextType>({
  currentPage: "home",
  navigate: () => {},
  params: {},
  sidebarOpen: false,
  setSidebarOpen: () => {},
});

export const useNav = () => useContext(NavContext);

const queryClient = new QueryClient();

const NO_LAYOUT: Page[] = ["login", "admin", "seller"];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [params, setParams] = useState<Record<string, string>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [upiModal, setUpiModal] = useState<{
    open: boolean;
    amount: number;
    orderId?: string;
  }>({ open: false, amount: 0 });

  const navigate = (page: Page, newParams: Record<string, string> = {}) => {
    setCurrentPage(page);
    setParams(newParams);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showLayout = !NO_LAYOUT.includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "products":
        return <Products />;
      case "product-detail":
        return <ProductDetail />;
      case "cart":
        return <Cart />;
      case "checkout":
        return <Checkout />;
      case "orders":
        return <Orders />;
      case "mlm":
        return <MLMDashboard />;
      case "wallet":
        return <Wallet />;
      case "utility":
        return <UtilityServices />;
      case "profile":
        return <Profile />;
      case "login":
        return <Login />;
      case "admin":
        return <Admin />;
      case "seller":
        return <Seller />;
      default:
        return <Home />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <NavContext.Provider
          value={{ currentPage, navigate, params, sidebarOpen, setSidebarOpen }}
        >
          <div className="min-h-screen bg-background font-poppins">
            {showLayout && (
              <>
                <AnnouncementBar />
                <Header />
                <Sidebar />
              </>
            )}
            <main className={showLayout ? "pb-24" : ""}>{renderPage()}</main>
            {showLayout && (
              <>
                <Footer />
                <BottomNav />
                <WhatsAppButton />
              </>
            )}
          </div>
          <UpiPaymentModal
            isOpen={upiModal.open}
            amount={upiModal.amount}
            orderId={upiModal.orderId}
            onClose={() => setUpiModal({ open: false, amount: 0 })}
            onSuccess={() => setUpiModal({ open: false, amount: 0 })}
          />
          <Toaster position="top-center" />
        </NavContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
