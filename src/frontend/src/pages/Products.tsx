import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useStore } from "../store/useStore";

export default function Products() {
  const products = useStore((s) => s.products);
  const categories = useStore((s) => s.categories);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<
    "default" | "price-asc" | "price-desc" | "rating"
  >("default");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = products
    .filter((p) => {
      const matchCat = category === "all" || p.category === category;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="fade-in-up" data-ocid="products.page">
      {/* Header */}
      <div className="bg-brand-green px-3 py-4">
        <h1 className="text-white font-bold text-lg mb-3">All Products</h1>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            placeholder="Search herbal products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white rounded-full text-sm h-9"
            data-ocid="products.search_input"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-brand-cream px-3 py-2">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              category === "all"
                ? "bg-brand-green text-white"
                : "bg-white text-foreground"
            }`}
            data-ocid="products.tab"
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                category === cat.id
                  ? "bg-brand-green text-white"
                  : "bg-white text-foreground"
              }`}
              data-ocid="products.tab"
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort + Count */}
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-xs text-muted-foreground">
          {filtered.length} products
        </span>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 text-xs text-brand-green font-medium"
          data-ocid="products.toggle"
        >
          <SlidersHorizontal size={14} /> Sort
        </button>
      </div>

      {showFilters && (
        <div className="flex gap-2 px-3 pb-2">
          {(["default", "price-asc", "price-desc", "rating"] as const).map(
            (s) => (
              <button
                type="button"
                key={s}
                onClick={() => setSort(s)}
                className={`text-[10px] px-2 py-1 rounded-full border transition-all ${
                  sort === s
                    ? "bg-brand-green text-white border-brand-green"
                    : "border-gray-200 text-foreground"
                }`}
              >
                {s === "default"
                  ? "Default"
                  : s === "price-asc"
                    ? "Price ↑"
                    : s === "price-desc"
                      ? "Price ↓"
                      : "Rating"}
              </button>
            ),
          )}
        </div>
      )}

      {/* Grid */}
      <div className="px-3 py-2">
        {filtered.length === 0 ? (
          <div className="py-16 text-center" data-ocid="products.empty_state">
            <div className="text-4xl mb-2">🌿</div>
            <p className="text-muted-foreground text-sm">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
