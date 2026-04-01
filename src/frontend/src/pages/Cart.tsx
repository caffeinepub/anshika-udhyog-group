import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ShoppingBag, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNav } from "../App";
import { useStore } from "../store/useStore";

export default function Cart() {
  const { navigate } = useNav();
  const cart = useStore((s) => s.cart);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const updateQty = useStore((s) => s.updateQty);
  const validateCoupon = useStore((s) => s.validateCoupon);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState("");

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const delivery = subtotal >= 500 ? 0 : 49;
  const total = subtotal + delivery - discount;

  const applyCoupon = () => {
    const coupon = validateCoupon(couponCode.toUpperCase(), subtotal);
    if (!coupon) {
      toast.error("Invalid or expired coupon code");
      return;
    }
    const d =
      coupon.type === "percent"
        ? Math.round((subtotal * coupon.discount) / 100)
        : coupon.discount;
    setDiscount(d);
    setCouponApplied(coupon.code);
    toast.success(`Coupon applied! You saved ₹${d}`);
  };

  if (cart.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4"
        data-ocid="cart.empty_state"
      >
        <ShoppingBag size={64} className="text-brand-green/30" />
        <h2 className="text-lg font-bold text-foreground">
          Your Cart is Empty
        </h2>
        <p className="text-sm text-muted-foreground text-center">
          Add some herbal products to get started!
        </p>
        <Button
          onClick={() => navigate("products")}
          className="bg-brand-green text-white rounded-full"
          data-ocid="cart.primary_button"
        >
          Shop Now
        </Button>
      </div>
    );
  }

  return (
    <div className="fade-in-up" data-ocid="cart.page">
      {/* Header */}
      <div className="bg-brand-green px-3 py-3 flex items-center gap-3 sticky top-0 z-30">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="text-white"
          data-ocid="cart.button"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white font-bold text-lg">
          My Cart ({cart.length})
        </h1>
      </div>

      <div className="px-3 py-3 space-y-3">
        {cart.map((item, idx) => (
          <div
            key={item.product.id}
            className="bg-card rounded-xl p-3 shadow-xs flex gap-3"
            data-ocid={`cart.item.${idx + 1}`}
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold line-clamp-2 leading-tight">
                {item.product.name}
              </p>
              <p className="text-xs text-green-600 font-bold mt-1">
                ₹{item.product.price}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center border border-border rounded-full overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      updateQty(item.product.id, item.quantity - 1)
                    }
                    className="px-2 py-0.5 text-sm font-bold hover:bg-muted"
                  >
                    -
                  </button>
                  <span className="px-2 text-xs font-bold">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQty(item.product.id, item.quantity + 1)
                    }
                    className="px-2 py-0.5 text-sm font-bold hover:bg-muted"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs font-bold text-foreground ml-auto">
                  ₹{item.product.price * item.quantity}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                removeFromCart(item.product.id);
                toast.success("Item removed");
              }}
              className="text-red-400 hover:text-red-600 p-1"
              data-ocid="cart.delete_button"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Coupon */}
      <div className="px-3 py-2">
        <div className="bg-card rounded-xl p-3 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Tag size={14} className="text-brand-green" />
            <span className="text-sm font-semibold">Apply Coupon</span>
          </div>
          {couponApplied ? (
            <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
              <span className="text-xs font-bold text-green-600">
                {couponApplied} applied! -₹{discount}
              </span>
              <button
                type="button"
                onClick={() => {
                  setDiscount(0);
                  setCouponApplied("");
                  setCouponCode("");
                }}
                className="text-xs text-red-500"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1 text-xs h-9"
                data-ocid="cart.input"
              />
              <Button
                onClick={applyCoupon}
                className="bg-brand-green text-white text-xs h-9 px-3 rounded-lg"
                data-ocid="cart.secondary_button"
              >
                Apply
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Order Summary */}
      <div className="px-3 py-2 mb-4">
        <div className="bg-card rounded-xl p-4 shadow-xs">
          <h3 className="font-bold text-sm mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span
                className={delivery === 0 ? "text-green-600 font-medium" : ""}
              >
                {delivery === 0 ? "FREE" : `₹${delivery}`}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="border-t border-border pt-2 flex justify-between font-bold text-base">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
          {delivery > 0 && (
            <p className="text-[10px] text-muted-foreground mt-2">
              Add ₹{500 - subtotal} more for free delivery
            </p>
          )}
        </div>
      </div>

      {/* Checkout button */}
      <div className="px-3 pb-4">
        <Button
          onClick={() => navigate("checkout")}
          className="w-full bg-brand-green text-white font-bold rounded-full h-12 text-base hover:opacity-90"
          data-ocid="cart.submit_button"
        >
          Proceed to Checkout • ₹{total}
        </Button>
      </div>
    </div>
  );
}
