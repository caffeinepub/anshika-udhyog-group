import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  Smartphone,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNav } from "../App";
import type { Address } from "../data/mockData";
import { useStore } from "../store/useStore";

export default function Checkout() {
  const { navigate } = useNav();
  const cart = useStore((s) => s.cart);
  const placeOrder = useStore((s) => s.placeOrder);
  const walletBalance = useStore((s) => s.walletBalance);
  const deductWallet = useStore((s) => s.deductWallet);
  const clearCart = useStore((s) => s.clearCart);

  const [address, setAddress] = useState<Address>({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [payment, setPayment] = useState<"UPI" | "COD" | "Wallet" | "Card">(
    "UPI",
  );
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const delivery = subtotal >= 500 ? 0 : 49;
  const total = subtotal + delivery;

  const updateAddress = (key: keyof Address, val: string) =>
    setAddress((a) => ({ ...a, [key]: val }));

  const handleOrder = () => {
    if (
      !address.name ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.pincode
    ) {
      toast.error("Please fill all address fields");
      return;
    }
    if (payment === "Wallet" && walletBalance < total) {
      toast.error(`Insufficient wallet balance. Available: ₹${walletBalance}`);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (payment === "Wallet") deductWallet(total, "Order payment");
      const orderId = placeOrder(cart, address, payment);
      clearCart();
      setLoading(false);
      toast.success(`Order ${orderId} placed successfully!`);
      navigate("orders");
    }, 1500);
  };

  return (
    <div className="fade-in-up" data-ocid="checkout.page">
      <div className="bg-brand-green px-3 py-3 flex items-center gap-3 sticky top-0 z-30">
        <button
          type="button"
          onClick={() => navigate("cart")}
          className="text-white"
          data-ocid="checkout.button"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white font-bold text-lg">Checkout</h1>
      </div>

      <div className="px-3 py-4 space-y-4">
        {/* Address */}
        <div className="bg-card rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-brand-green" />
            <h3 className="font-bold text-sm">Delivery Address</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                {
                  key: "name",
                  label: "Full Name",
                  placeholder: "Priya Sharma",
                  colSpan: true,
                },
                {
                  key: "phone",
                  label: "Phone",
                  placeholder: "9876543210",
                  colSpan: false,
                },
                {
                  key: "pincode",
                  label: "Pincode",
                  placeholder: "226001",
                  colSpan: false,
                },
                {
                  key: "street",
                  label: "Street/Area",
                  placeholder: "123 Green Lane, Near Park",
                  colSpan: true,
                },
                {
                  key: "city",
                  label: "City",
                  placeholder: "Lucknow",
                  colSpan: false,
                },
                {
                  key: "state",
                  label: "State",
                  placeholder: "Uttar Pradesh",
                  colSpan: false,
                },
              ] as const
            ).map((field) => (
              <div
                key={field.key}
                className={field.colSpan ? "col-span-2" : ""}
              >
                <Label className="text-xs text-muted-foreground mb-1 block">
                  {field.label}
                </Label>
                <Input
                  placeholder={field.placeholder}
                  value={address[field.key as keyof Address]}
                  onChange={(e) =>
                    updateAddress(field.key as keyof Address, e.target.value)
                  }
                  className="text-xs h-9"
                  data-ocid="checkout.input"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="bg-card rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard size={16} className="text-brand-green" />
            <h3 className="font-bold text-sm">Payment Method</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                {
                  value: "UPI",
                  label: "UPI Payment",
                  icon: <Smartphone size={16} />,
                },
                {
                  value: "Card",
                  label: "Debit/Credit Card",
                  icon: <CreditCard size={16} />,
                },
                {
                  value: "COD",
                  label: "Cash on Delivery",
                  icon: <MapPin size={16} />,
                },
                {
                  value: "Wallet",
                  label: `Wallet (₹${walletBalance})`,
                  icon: <Wallet size={16} />,
                },
              ] as const
            ).map((p) => (
              <button
                type="button"
                key={p.value}
                onClick={() => setPayment(p.value)}
                className={`flex items-center gap-2 p-2.5 rounded-lg border-2 text-xs font-medium transition-all ${
                  payment === p.value
                    ? "border-brand-green bg-brand-green/5 text-brand-green"
                    : "border-border"
                }`}
                data-ocid="checkout.radio"
              >
                <span
                  className={
                    payment === p.value
                      ? "text-brand-green"
                      : "text-muted-foreground"
                  }
                >
                  {p.icon}
                </span>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-card rounded-xl p-4 shadow-xs">
          <h3 className="font-bold text-sm mb-3">Order Summary</h3>
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between text-xs mb-1"
            >
              <span className="text-muted-foreground line-clamp-1 flex-1">
                {item.product.name} × {item.quantity}
              </span>
              <span className="font-medium ml-2">
                ₹{item.product.price * item.quantity}
              </span>
            </div>
          ))}
          <div className="border-t border-border mt-2 pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-brand-green">₹{total}</span>
          </div>
        </div>

        <Button
          onClick={handleOrder}
          disabled={loading}
          className="w-full bg-brand-green text-white font-bold rounded-full h-12 text-base hover:opacity-90"
          data-ocid="checkout.submit_button"
        >
          {loading ? "Placing Order..." : `Place Order • ₹${total}`}
        </Button>
      </div>
    </div>
  );
}
