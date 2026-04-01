import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Heart,
  RotateCcw,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNav } from "../App";
import { useStore } from "../store/useStore";

export default function ProductDetail() {
  const { navigate, params } = useNav();
  const products = useStore((s) => s.products);
  const addToCart = useStore((s) => s.addToCart);
  const wishlist = useStore((s) => s.wishlist);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === params.id) ?? products[0];
  const inWishlist = wishlist.includes(product.id);
  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100,
  );

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    toast.success(`${qty}x ${product.name} added to cart!`);
  };

  const reviews = [
    {
      name: "Priya S.",
      rating: 5,
      comment: "Excellent product! Very effective.",
      date: "Dec 10, 2025",
    },
    {
      name: "Rahul K.",
      rating: 4,
      comment: "Good quality, authentic herbal.",
      date: "Dec 5, 2025",
    },
  ];

  return (
    <div className="fade-in-up" data-ocid="product-detail.page">
      {/* Back header */}
      <div className="sticky top-0 z-30 bg-brand-green px-3 py-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("products")}
          className="text-white p-1"
          data-ocid="product-detail.button"
        >
          <ArrowLeft size={22} />
        </button>
        <span className="text-white font-semibold text-sm line-clamp-1 flex-1">
          {product.name}
        </span>
        <button
          type="button"
          onClick={() => {
            toggleWishlist(product.id);
          }}
          className={inWishlist ? "text-red-400" : "text-white"}
        >
          <Heart size={22} fill={inWishlist ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Image */}
      <div
        className="relative bg-brand-cream"
        style={{ aspectRatio: "1/1", maxHeight: 320 }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="px-4 py-4">
        <h1 className="font-bold text-lg text-foreground mb-1">
          {product.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {["s1", "s2", "s3", "s4", "s5"].map((sk, sI) => (
              <Star
                key={sk}
                size={14}
                className={
                  sI < Math.floor(product.rating)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-200"
                }
              />
            ))}
          </div>
          <span className="text-sm font-bold">{product.rating}</span>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-2xl font-bold text-green-600">
            ₹{product.price}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            ₹{product.oldPrice}
          </span>
          <span className="text-sm font-bold text-red-500">
            {discount}% OFF
          </span>
        </div>

        {/* Qty selector */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-medium">Quantity:</span>
          <div className="flex items-center border border-border rounded-full overflow-hidden">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 py-1 text-lg font-bold hover:bg-muted transition"
            >
              -
            </button>
            <span className="px-3 text-sm font-bold">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="px-3 py-1 text-lg font-bold hover:bg-muted transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h3 className="font-semibold text-sm mb-1">About this product</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Benefits */}
        <div className="flex gap-3 mb-6">
          {[
            { icon: <Truck size={14} />, text: "Free Delivery" },
            { icon: <Shield size={14} />, text: "100% Authentic" },
            { icon: <RotateCcw size={14} />, text: "Easy Returns" },
          ].map((b) => (
            <div
              key={b.text}
              className="flex-1 flex flex-col items-center gap-1 bg-brand-cream rounded-lg p-2"
            >
              <span className="text-brand-green">{b.icon}</span>
              <span className="text-[10px] text-center font-medium">
                {b.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-brand-yellow text-black font-bold hover:opacity-90 rounded-full"
            data-ocid="product-detail.primary_button"
          >
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </Button>
          <Button
            onClick={() => {
              handleAddToCart();
              navigate("checkout");
            }}
            className="flex-1 bg-brand-green text-white font-bold hover:opacity-90 rounded-full"
            data-ocid="product-detail.secondary_button"
          >
            Buy Now
          </Button>
        </div>
      </div>

      {/* Reviews */}
      <div className="px-4 py-4 border-t border-border">
        <h3 className="font-bold text-sm mb-3">Customer Reviews</h3>
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.name} className="bg-card rounded-xl p-3 shadow-xs">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-brand-green/20 flex items-center justify-center text-xs font-bold text-brand-green">
                  {r.name[0]}
                </div>
                <span className="text-xs font-semibold">{r.name}</span>
                <span className="text-[10px] text-muted-foreground ml-auto">
                  {r.date}
                </span>
              </div>
              <div className="flex mb-1">
                {"★★★★★"
                  .slice(0, r.rating)
                  .split("")
                  .map((_, rJ) => (
                    <Star
                      key={`${r.name}-s${rJ}`}
                      size={10}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
              </div>
              <p className="text-xs text-muted-foreground">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
