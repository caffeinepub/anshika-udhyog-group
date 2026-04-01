import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { useNav } from "../App";
import type { Product } from "../data/mockData";
import { useStore } from "../store/useStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { navigate } = useNav();
  const addToCart = useStore((s) => s.addToCart);
  const wishlist = useStore((s) => s.wishlist);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const inWishlist = wishlist.includes(product.id);
  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100,
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, { duration: 2000 });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
    toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist", {
      duration: 1500,
    });
  };

  return (
    <div
      className="bg-card rounded-2xl shadow-card overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
      onClick={() => navigate("product-detail", { id: product.id })}
      onKeyDown={(e) =>
        e.key === "Enter" && navigate("product-detail", { id: product.id })
      }
      data-ocid="products.item.1"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={handleWishlist}
          className={`absolute top-2 right-2 p-1.5 rounded-full shadow transition-all ${
            inWishlist
              ? "bg-red-500 text-white"
              : "bg-white/90 text-gray-400 hover:text-red-500"
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={14} fill={inWishlist ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Info */}
      <div className="p-2.5">
        <h3 className="font-semibold text-xs text-card-foreground line-clamp-2 leading-tight mb-1.5">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-1.5">
          <div className="flex">
            {Array.from({ length: 5 }, (__, starI) => (
              <Star
                key={`${product.id}-star-${starI}`}
                size={10}
                className={
                  starI < Math.floor(product.rating)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="font-bold text-sm text-green-600">
            ₹{product.price}
          </span>
          <span className="text-[10px] text-muted-foreground line-through">
            ₹{product.oldPrice}
          </span>
          <span className="text-[10px] text-red-500 font-medium">
            {discount}%
          </span>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full bg-brand-yellow text-black font-bold text-xs py-1.5 rounded-full flex items-center justify-center gap-1 hover:opacity-90 active:scale-95 transition-all"
          data-ocid="products.primary_button"
        >
          <ShoppingCart size={12} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
