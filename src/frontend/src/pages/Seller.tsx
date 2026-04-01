import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Package,
  Plus,
  Trash2,
  TrendingUp,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNav } from "../App";
import { useStore } from "../store/useStore";

export default function Seller() {
  const { navigate } = useNav();
  const { isLoggedIn, user, products, orders, addProduct, deleteProduct } =
    useStore();
  const [form, setForm] = useState({
    name: "",
    price: "",
    oldPrice: "",
    image: "",
    description: "",
    category: "skin-care",
  });
  const [kycFile, setKycFile] = useState("");

  const myProducts = products.filter((p) => p.sellerId === user?.id);
  const myOrders = orders.filter((o) =>
    o.items.some((i) => myProducts.some((p) => p.id === i.product.id)),
  );

  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4 font-poppins"
        data-ocid="seller.page"
      >
        <div className="text-4xl">🏪</div>
        <h2 className="font-bold text-lg">Login to access Seller Panel</h2>
        <Button
          onClick={() => navigate("login")}
          className="bg-brand-green text-white rounded-full"
          data-ocid="seller.primary_button"
        >
          Login Now
        </Button>
        <button
          type="button"
          onClick={() => navigate("home")}
          className="text-sm text-muted-foreground"
          data-ocid="seller.link"
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  const handleAddProduct = () => {
    if (!form.name || !form.price) {
      toast.error("Name and price required");
      return;
    }
    addProduct({
      name: form.name,
      category: form.category,
      image:
        form.image ||
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400",
      price: Number(form.price),
      oldPrice: Number(form.oldPrice) || Number(form.price),
      description: form.description,
      rating: 4.0,
      reviewCount: 0,
      stock: 50,
      sellerId: user?.id,
    });
    toast.success("Product listed successfully!");
    setForm({
      name: "",
      price: "",
      oldPrice: "",
      image: "",
      description: "",
      category: "skin-care",
    });
  };

  const stats = [
    {
      label: "My Products",
      value: myProducts.length,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "My Orders",
      value: myOrders.length,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Revenue",
      value: `₹${myOrders.reduce((s, o) => s + o.total, 0)}`,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "KYC Status",
      value: user?.kyc ?? "Pending",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div
      className="min-h-screen bg-background font-poppins"
      data-ocid="seller.page"
    >
      <div className="bg-brand-green px-3 py-3 flex items-center gap-3 sticky top-0 z-30">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="text-white"
          data-ocid="seller.button"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white font-bold text-lg">Seller Panel</h1>
      </div>

      {/* Welcome */}
      <div className="bg-brand-cream px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center font-bold">
          {user?.name.charAt(0) ?? "S"}
        </div>
        <div>
          <p className="font-semibold text-sm">{user?.name}</p>
          <p className="text-xs text-muted-foreground">Seller Account</p>
        </div>
      </div>

      <div className="px-3 py-3">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`${s.bg} dark:bg-card rounded-xl p-3`}
            >
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
              <p className={`text-lg font-bold ${s.color} mt-0.5`}>{s.value}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="products">
          <TabsList className="w-full mb-4">
            <TabsTrigger
              value="products"
              className="flex-1 text-xs"
              data-ocid="seller.tab"
            >
              <Package size={12} className="mr-1" /> Products
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="flex-1 text-xs"
              data-ocid="seller.tab"
            >
              <TrendingUp size={12} className="mr-1" /> Orders
            </TabsTrigger>
            <TabsTrigger
              value="kyc"
              className="flex-1 text-xs"
              data-ocid="seller.tab"
            >
              <Upload size={12} className="mr-1" /> KYC
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            {/* Add Product Form */}
            <div className="bg-card rounded-xl p-3 shadow-xs space-y-2 mb-3">
              <h3 className="text-xs font-bold flex items-center gap-1">
                <Plus size={12} /> Add New Product
              </h3>
              <Input
                placeholder="Product name *"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="text-xs h-8"
                data-ocid="seller.input"
              />
              <Input
                placeholder="Image URL"
                value={form.image}
                onChange={(e) =>
                  setForm((f) => ({ ...f, image: e.target.value }))
                }
                className="text-xs h-8"
                data-ocid="seller.input"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Price *"
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: e.target.value }))
                  }
                  className="text-xs h-8"
                  data-ocid="seller.input"
                />
                <Input
                  placeholder="MRP"
                  type="number"
                  value={form.oldPrice}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, oldPrice: e.target.value }))
                  }
                  className="text-xs h-8"
                  data-ocid="seller.input"
                />
              </div>
              <Input
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                className="text-xs h-8"
                data-ocid="seller.input"
              />
              <Button
                onClick={handleAddProduct}
                className="w-full bg-brand-green text-white text-xs h-8 rounded-lg"
                data-ocid="seller.primary_button"
              >
                List Product
              </Button>
            </div>

            {myProducts.length === 0 ? (
              <div
                className="text-center py-8 text-muted-foreground"
                data-ocid="seller.empty_state"
              >
                <Package size={40} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No products listed yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {myProducts.map((p, i) => (
                  <div
                    key={p.id}
                    className="bg-card rounded-xl p-3 shadow-xs flex items-center gap-3"
                    data-ocid={`seller.item.${i + 1}`}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold line-clamp-1">
                        {p.name}
                      </p>
                      <p className="text-xs text-green-600 font-bold">
                        ₹{p.price}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        deleteProduct(p.id);
                        toast.success("Product removed");
                      }}
                      className="text-red-400"
                      data-ocid="seller.delete_button"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="orders">
            {myOrders.length === 0 ? (
              <div
                className="text-center py-8 text-muted-foreground"
                data-ocid="seller.empty_state"
              >
                <TrendingUp size={40} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {myOrders.map((o, i) => (
                  <div
                    key={o.id}
                    className="bg-card rounded-xl p-3 shadow-xs"
                    data-ocid={`seller.item.${i + 1}`}
                  >
                    <div className="flex justify-between mb-1">
                      <p className="text-xs font-bold">{o.id}</p>
                      <span className="text-xs font-semibold text-green-600">
                        ₹{o.total}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {o.date} • {o.status} • {o.paymentMethod}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="kyc">
            <div className="bg-card rounded-xl p-4 shadow-xs space-y-3">
              <h3 className="font-semibold text-sm">KYC Verification</h3>
              <div
                className={`p-3 rounded-lg text-xs font-medium ${
                  user?.kyc === "approved"
                    ? "bg-green-100 text-green-700"
                    : user?.kyc === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                Status:{" "}
                {user?.kyc === "approved"
                  ? "✓ KYC Approved"
                  : user?.kyc === "rejected"
                    ? "✗ KYC Rejected"
                    : "⏳ KYC Pending Review"}
              </div>
              <div>
                <Label className="text-xs mb-1 block">
                  Aadhaar Card Number
                </Label>
                <Input
                  placeholder="XXXX XXXX XXXX"
                  className="text-sm"
                  data-ocid="seller.input"
                />
              </div>
              <div>
                <Label className="text-xs mb-1 block">PAN Number</Label>
                <Input
                  placeholder="ABCDE1234F"
                  className="text-sm"
                  data-ocid="seller.input"
                />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Business Name</Label>
                <Input
                  placeholder="Your business name"
                  className="text-sm"
                  data-ocid="seller.input"
                />
              </div>
              <div>
                <Label className="text-xs mb-1 block">
                  Document Upload (URL)
                </Label>
                <Input
                  placeholder="Paste document URL"
                  value={kycFile}
                  onChange={(e) => setKycFile(e.target.value)}
                  className="text-sm"
                  data-ocid="seller.upload_button"
                />
              </div>
              <Button
                onClick={() =>
                  toast.success("KYC documents submitted for review!")
                }
                className="w-full bg-brand-green text-white rounded-full font-bold"
                data-ocid="seller.submit_button"
              >
                Submit KYC
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
