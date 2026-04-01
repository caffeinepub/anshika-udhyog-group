import { ChevronRight, Star } from "lucide-react";
import { motion } from "motion/react";
import { useNav } from "../App";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import { SHG_ITEMS } from "../data/mockData";
import { useStore } from "../store/useStore";

export default function Home() {
  const products = useStore((s) => s.products);
  const sliders = useStore((s) => s.sliders);
  const homeSettings = useStore((s) => s.homeSettings);
  const categories = useStore((s) => s.categories);
  const siteSettings = useStore((s) => s.siteSettings);
  const { navigate } = useNav();
  const featured = products.slice(0, 4);
  const offers = products.filter((p) => p.badge).slice(0, 4);

  return (
    <div className="fade-in-up" data-ocid="home.page">
      {/* Hero */}
      <div className="bg-brand-cream px-3 py-4">
        <HeroSlider slides={sliders} />
      </div>

      {/* Categories */}
      <div className="bg-brand-cream px-3 pb-4">
        <h2 className="text-sm font-bold text-foreground mb-3">
          Shop by Category
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate("products", { category: cat.id })}
              className="flex flex-col items-center gap-1.5 flex-shrink-0"
              data-ocid="home.button"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-sm border border-white"
                style={{ backgroundColor: cat.color }}
              >
                {cat.icon}
              </div>
              <span className="text-[10px] font-medium text-foreground text-center w-16 leading-tight">
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-3 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground">
            Featured Products
          </h2>
          <button
            type="button"
            onClick={() => navigate("products")}
            className="text-xs text-brand-green font-semibold flex items-center gap-0.5"
            data-ocid="home.link"
          >
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* SHG Section */}
      {homeSettings.showSHG && (
        <div className="px-3 py-4 bg-brand-cream">
          <h2 className="text-base font-bold text-foreground mb-1">
            Self Help Group Products
          </h2>
          <p className="text-xs text-muted-foreground mb-3">
            Supporting rural women entrepreneurs
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {SHG_ITEMS.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-36 bg-card rounded-xl shadow-sm overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-24 object-cover"
                  loading="lazy"
                />
                <div className="p-2">
                  <p className="text-xs font-semibold line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">
                    {item.seller}
                  </p>
                  <p className="text-xs font-bold text-green-600 mt-1">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Offers */}
      <div className="px-3 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground">
            🔥 Today's Offers
          </h2>
          <button
            type="button"
            onClick={() => navigate("products")}
            className="text-xs text-brand-green font-semibold flex items-center gap-0.5"
            data-ocid="home.link"
          >
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {offers.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Network Promo */}
      {homeSettings.showMLMPromo && (
        <div className="mx-3 mb-4 rounded-2xl bg-brand-green p-5 text-white">
          <div className="flex items-start gap-3">
            <div className="text-3xl">🌿</div>
            <div className="flex-1">
              <h3 className="font-bold text-base mb-1">
                Earn with {siteSettings.name}
              </h3>
              <p className="text-white/80 text-xs mb-3">
                Join our network and earn ₹50,000+ monthly through direct
                selling and team commissions
              </p>
              <div className="flex gap-3 mb-3">
                <div className="text-center">
                  <div className="font-bold text-brand-yellow text-lg">
                    ₹500
                  </div>
                  <div className="text-[10px] text-white/70">Direct Income</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-brand-yellow text-lg">5</div>
                  <div className="text-[10px] text-white/70">Income Levels</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-brand-yellow text-lg">
                    10k+
                  </div>
                  <div className="text-[10px] text-white/70">Members</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate("mlm")}
                className="bg-brand-yellow text-black font-bold text-xs px-5 py-2 rounded-full hover:opacity-90 transition"
                data-ocid="home.primary_button"
              >
                Join Network →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="px-3 py-4">
        <h2 className="text-base font-bold text-foreground mb-3">
          Customer Reviews
        </h2>
        <div className="space-y-3">
          {homeSettings.reviews.map((r, i) => (
            <div key={r.id ?? i} className="bg-card rounded-xl p-3 shadow-xs">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-brand-green/20 flex items-center justify-center text-xs font-bold text-brand-green">
                  {r.name[0]}
                </div>
                <span className="text-xs font-semibold">{r.name}</span>
                <div className="flex ml-auto">
                  {Array.from({ length: r.rating }, (__, starIdx) => (
                    <Star
                      key={`${r.id}-star-${starIdx}`}
                      size={10}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{r.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
