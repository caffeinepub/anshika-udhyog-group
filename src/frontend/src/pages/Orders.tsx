import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Clock, Package, Truck } from "lucide-react";
import { useNav } from "../App";
import { useStore } from "../store/useStore";

const STATUS_CONFIG = {
  Pending: {
    color: "bg-yellow-100 text-yellow-700",
    icon: <Clock size={14} />,
  },
  Packed: { color: "bg-blue-100 text-blue-700", icon: <Package size={14} /> },
  Shipped: {
    color: "bg-purple-100 text-purple-700",
    icon: <Truck size={14} />,
  },
  Delivered: {
    color: "bg-green-100 text-green-700",
    icon: <CheckCircle size={14} />,
  },
};

export default function Orders() {
  const { navigate } = useNav();
  const orders = useStore((s) => s.orders);

  return (
    <div className="fade-in-up" data-ocid="orders.page">
      <div className="bg-brand-green px-3 py-3 flex items-center gap-3 sticky top-0 z-30">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="text-white"
          data-ocid="orders.button"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white font-bold text-lg">My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center min-h-[60vh] gap-4"
          data-ocid="orders.empty_state"
        >
          <Package size={64} className="text-brand-green/30" />
          <p className="text-muted-foreground">No orders yet</p>
          <button
            type="button"
            onClick={() => navigate("products")}
            className="bg-brand-green text-white px-6 py-2 rounded-full text-sm font-bold"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="px-3 py-3 space-y-3">
          {orders.map((order, idx) => {
            const cfg = STATUS_CONFIG[order.status];
            return (
              <div
                key={order.id}
                className="bg-card rounded-xl p-4 shadow-xs"
                data-ocid={`orders.item.${idx + 1}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.date}
                    </p>
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${cfg.color}`}
                  >
                    {cfg.icon} {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-2 mb-3">
                  {order.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-2"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-xs font-bold">
                        ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between mb-3">
                  {["Pending", "Packed", "Shipped", "Delivered"].map((s, i) => {
                    const idx2 = [
                      "Pending",
                      "Packed",
                      "Shipped",
                      "Delivered",
                    ].indexOf(order.status);
                    const done = i <= idx2;
                    return (
                      <div
                        key={s}
                        className="flex flex-col items-center gap-1 flex-1"
                      >
                        <div
                          className={`w-3 h-3 rounded-full border-2 ${
                            done
                              ? "bg-brand-green border-brand-green"
                              : "bg-white border-gray-300"
                          }`}
                        />
                        <span
                          className={`text-[8px] text-center ${done ? "text-brand-green font-semibold" : "text-muted-foreground"}`}
                        >
                          {s}
                        </span>
                        {i < 3 && (
                          <div
                            className={`absolute h-0.5 ${done ? "bg-brand-green" : "bg-gray-200"}`}
                            style={{ width: "20%" }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between text-sm border-t border-border pt-2">
                  <span className="text-muted-foreground">
                    {order.paymentMethod}
                  </span>
                  <span className="font-bold">₹{order.total}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
