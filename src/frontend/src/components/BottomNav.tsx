import { Home, Package, User, Users, Wallet } from "lucide-react";
import { type Page, useNav } from "../App";

const TABS: { label: string; icon: React.ReactNode; page: Page }[] = [
  { label: "Home", icon: <Home size={20} />, page: "home" },
  { label: "Products", icon: <Package size={20} />, page: "products" },
  { label: "Network", icon: <Users size={20} />, page: "mlm" },
  { label: "Wallet", icon: <Wallet size={20} />, page: "wallet" },
  { label: "Profile", icon: <User size={20} />, page: "profile" },
];

export default function BottomNav() {
  const { currentPage, navigate } = useNav();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 bg-brand-mint border-t border-white/30 shadow-lg"
      data-ocid="bottomnav.section"
    >
      <div className="flex items-center justify-around max-w-2xl mx-auto">
        {TABS.map((tab) => {
          const active = currentPage === tab.page;
          return (
            <button
              type="button"
              key={tab.label}
              onClick={() => navigate(tab.page)}
              className={`flex flex-col items-center gap-0.5 px-3 py-2.5 flex-1 transition-all ${
                active
                  ? "text-brand-green font-bold"
                  : "text-black/60 hover:text-brand-green"
              }`}
              data-ocid="bottomnav.tab"
            >
              <span className={active ? "scale-110" : ""}>{tab.icon}</span>
              <span className="text-[10px] font-medium">{tab.label}</span>
              {active && (
                <span className="w-1 h-1 rounded-full bg-brand-green" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
