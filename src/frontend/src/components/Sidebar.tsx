import {
  Grid3X3,
  HeadphonesIcon,
  Home,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  Store,
  Tag,
  User,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type Page, useNav } from "../App";
import { useStore } from "../store/useStore";

const MENU_ITEMS: { label: string; icon: React.ReactNode; page: Page }[] = [
  { label: "Home", icon: <Home size={20} />, page: "home" },
  { label: "Products", icon: <Package size={20} />, page: "products" },
  { label: "Categories", icon: <Grid3X3 size={20} />, page: "products" },
  { label: "Offers", icon: <Tag size={20} />, page: "products" },
  { label: "MLM Network", icon: <Users size={20} />, page: "mlm" },
  { label: "Profile", icon: <User size={20} />, page: "profile" },
  { label: "My Orders", icon: <ShoppingBag size={20} />, page: "orders" },
  { label: "Wallet", icon: <Wallet size={20} />, page: "wallet" },
  { label: "Utility Services", icon: <Zap size={20} />, page: "utility" },
  { label: "Seller Panel", icon: <Store size={20} />, page: "seller" },
  { label: "Admin Panel", icon: <Settings size={20} />, page: "admin" },
  { label: "Support", icon: <HeadphonesIcon size={20} />, page: "home" },
];

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, navigate } = useNav();
  const logout = useStore((s) => s.logout);
  const isLoggedIn = useStore((s) => s.isLoggedIn);
  const user = useStore((s) => s.user);

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setSidebarOpen(false)}
            data-ocid="sidebar.modal"
          />
          {/* Drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed left-0 top-0 h-full w-72 bg-brand-green z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/file_00000000ee8c7208b7195e3f0161d038-019d4889-394f-703e-b731-55c3d4643d69.png"
                  alt="Logo"
                  className="h-10 w-10 rounded-full border-2 border-brand-yellow object-cover"
                />
                <div>
                  <div className="text-white font-bold text-sm">AUG</div>
                  {isLoggedIn && user ? (
                    <div className="text-white/80 text-xs">{user.name}</div>
                  ) : (
                    <div className="text-white/80 text-xs">Guest User</div>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="text-white p-1 hover:bg-white/10 rounded-lg"
                data-ocid="sidebar.close_button"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto py-2">
              {MENU_ITEMS.map((item) => (
                <button
                  type="button"
                  key={item.label}
                  onClick={() => navigate(item.page)}
                  className="w-full flex items-center gap-3 px-5 py-3 text-white hover:bg-white/10 transition-colors text-sm font-medium"
                  data-ocid="sidebar.link"
                >
                  <span className="text-brand-yellow">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/20">
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium"
                  data-ocid="sidebar.button"
                >
                  <LogOut size={18} className="text-brand-yellow" />
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate("login")}
                  className="w-full bg-brand-yellow text-black rounded-full py-2.5 font-bold text-sm hover:opacity-90 transition"
                  data-ocid="sidebar.primary_button"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
