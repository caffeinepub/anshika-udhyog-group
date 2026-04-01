import { Menu, Moon, ShoppingCart, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useNav } from "../App";
import { useStore } from "../store/useStore";

export default function Header() {
  const { navigate, setSidebarOpen } = useNav();
  const cart = useStore((s) => s.cart);
  const siteSettings = useStore((s) => s.siteSettings);
  const { theme, setTheme } = useTheme();
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <header
      className="sticky top-0 z-40 bg-brand-green shadow-md"
      data-ocid="header.section"
    >
      <div className="flex items-center justify-between px-3 py-2 max-w-2xl mx-auto">
        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Open menu"
          data-ocid="header.open_modal_button"
        >
          <Menu size={24} />
        </button>

        {/* Center: Logo + Title */}
        <button
          type="button"
          onClick={() => navigate("home")}
          className="flex flex-col items-center gap-0.5 flex-1 mx-2"
          data-ocid="header.link"
        >
          <div className="flex items-center gap-2">
            <img
              src={siteSettings.logoUrl}
              alt="Logo"
              className="h-9 w-9 rounded-full object-cover border-2 border-brand-yellow"
            />
            <div className="text-left">
              <div className="text-white font-bold text-sm leading-tight">
                {siteSettings.name}
              </div>
              <div className="text-white/80 text-[10px] leading-tight">
                {siteSettings.tagline}
              </div>
            </div>
          </div>
        </button>

        {/* Right: Cart + Profile + Dark mode */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
            data-ocid="header.toggle"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            onClick={() => navigate("cart")}
            className="relative p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Cart"
            data-ocid="header.button"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-brand-yellow text-black text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("profile")}
            className="p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Profile"
            data-ocid="header.link"
          >
            <User size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
