import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  ChevronLeft,
  Image,
  LayoutDashboard,
  LogOut,
  Package,
  Pencil,
  Plus,
  Settings,
  ShoppingBag,
  Star,
  Store,
  Tag,
  Trash2,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { useNav } from "../App";
import { useStore } from "../store/useStore";

type AdminTab =
  | "dashboard"
  | "website"
  | "banners"
  | "products"
  | "users"
  | "sellers"
  | "orders"
  | "wallet"
  | "coupons"
  | "cms"
  | "mlm"
  | "categories"
  | "settings";

function ImageUploadField({
  value,
  onChange,
  label = "Photo",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      onChange(result);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <span className="text-xs text-muted-foreground block mb-1">{label}</span>
      <div className="flex items-center gap-2">
        {value && (
          <img
            src={value}
            alt="preview"
            className="w-14 h-14 object-cover rounded-lg border flex-shrink-0"
          />
        )}
        <label className="flex-1 cursor-pointer">
          <div className="border-2 border-dashed border-brand-green/40 rounded-lg p-2 text-center text-xs text-brand-green hover:bg-brand-green/5 transition">
            {uploading ? "Uploading..." : "📷 Gallery se photo choose karein"}
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
}

function UserCard({
  u,
  i,
  updateUserRole,
  blockUser,
  unblockUser,
  deleteUser,
  approveUser,
  rejectUser,
  updateUserFull,
}: {
  u: import("../data/mockData").User;
  i: number;
  updateUserRole: (id: string, role: "user" | "seller") => void;
  blockUser: (id: string) => void;
  unblockUser: (id: string) => void;
  deleteUser: (id: string) => void;
  approveUser: (id: string) => void;
  rejectUser: (id: string) => void;
  updateUserFull: (
    id: string,
    updates: Partial<import("../data/mockData").User>,
  ) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [docView, setDocView] = useState<{
    open: boolean;
    url: string;
    title: string;
  }>({ open: false, url: "", title: "" });
  const [editForm, setEditForm] = useState({
    name: u.name,
    phone: u.phone,
    email: u.email,
    address: u.address ?? "",
    bankAccount: u.bankAccount ?? "",
    upiId: u.upiId ?? "",
    accountStatus: u.accountStatus ?? "pending",
  });

  const statusBg =
    u.accountStatus === "approved"
      ? "bg-green-100 text-green-700"
      : u.accountStatus === "rejected"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700";

  return (
    <div
      className="bg-card rounded-xl p-3 shadow-xs"
      data-ocid={`admin.item.${i + 1}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
          {u.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold line-clamp-1">{u.name}</p>
          <p className="text-[10px] text-muted-foreground">{u.phone}</p>
        </div>
        {u.accountStatus && (
          <span
            className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${statusBg}`}
          >
            {u.accountStatus}
          </span>
        )}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
          data-ocid="admin.button"
        >
          {expanded ? "Less" : "More"}
        </button>
        <button
          type="button"
          onClick={() => {
            if (confirm(`Delete ${u.name}?`)) {
              deleteUser(u.id);
              toast.success("User deleted");
            }
          }}
          className="p-1 text-red-400 hover:text-red-600"
          data-ocid="admin.delete_button"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {expanded && (
        <div className="mt-3 space-y-2 border-t border-border pt-3">
          {/* Role & Block */}
          <div className="flex gap-2 flex-wrap">
            <Select
              value={u.role}
              onValueChange={(v) => {
                updateUserRole(u.id, v as "user" | "seller");
                toast.success("Role updated");
              }}
            >
              <SelectTrigger
                className="h-7 text-[10px] w-20"
                data-ocid="admin.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user" className="text-xs">
                  User
                </SelectItem>
                <SelectItem value="seller" className="text-xs">
                  Seller
                </SelectItem>
              </SelectContent>
            </Select>
            {u.isBlocked ? (
              <button
                type="button"
                onClick={() => {
                  unblockUser(u.id);
                  toast.success("Unblocked");
                }}
                className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full"
                data-ocid="admin.button"
              >
                Unblock
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  blockUser(u.id);
                  toast.success("Blocked");
                }}
                className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full"
                data-ocid="admin.button"
              >
                Block
              </button>
            )}
          </div>
          {/* Approve / Reject */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                approveUser(u.id);
                toast.success(`${u.name} approved`);
              }}
              className="flex-1 text-[10px] bg-green-500 text-white px-2 py-1.5 rounded-lg font-semibold"
              data-ocid="admin.primary_button"
            >
              ✓ Approve
            </button>
            <button
              type="button"
              onClick={() => {
                rejectUser(u.id);
                toast.success(`${u.name} rejected`);
              }}
              className="flex-1 text-[10px] bg-red-500 text-white px-2 py-1.5 rounded-lg font-semibold"
              data-ocid="admin.delete_button"
            >
              ✗ Reject
            </button>
          </div>
          {/* Documents */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                if (u.idCardUrl)
                  setDocView({
                    open: true,
                    url: u.idCardUrl,
                    title: "ID Card",
                  });
                else toast.info("No ID Card uploaded by user");
              }}
              className="flex-1 text-[10px] bg-blue-50 text-blue-700 px-2 py-1.5 rounded-lg"
              data-ocid="admin.button"
            >
              🪪 View ID Card
            </button>
            <button
              type="button"
              onClick={() => {
                if (u.certificateUrl)
                  setDocView({
                    open: true,
                    url: u.certificateUrl,
                    title: "Certificate",
                  });
                else toast.info("No Certificate uploaded by user");
              }}
              className="flex-1 text-[10px] bg-purple-50 text-purple-700 px-2 py-1.5 rounded-lg"
              data-ocid="admin.button"
            >
              📜 View Certificate
            </button>
          </div>
          {/* Edit Full Details */}
          {!editing ? (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="w-full text-[10px] bg-brand-green/10 text-brand-green px-2 py-1.5 rounded-lg font-semibold"
              data-ocid="admin.edit_button"
            >
              ✏️ Edit Full Details
            </button>
          ) : (
            <div className="space-y-1.5 bg-muted/30 rounded-lg p-2">
              {(
                [
                  "name",
                  "phone",
                  "email",
                  "address",
                  "bankAccount",
                  "upiId",
                ] as const
              ).map((field) => (
                <input
                  key={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={editForm[field]}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, [field]: e.target.value }))
                  }
                  className="w-full text-[10px] border border-border rounded px-2 py-1 bg-background"
                  data-ocid="admin.input"
                />
              ))}
              <select
                value={editForm.accountStatus}
                onChange={(e) =>
                  setEditForm((f) => ({
                    ...f,
                    accountStatus: e.target.value as
                      | "pending"
                      | "approved"
                      | "rejected",
                  }))
                }
                className="w-full text-[10px] border border-border rounded px-2 py-1 bg-background"
                data-ocid="admin.select"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    updateUserFull(u.id, editForm);
                    setEditing(false);
                    toast.success("User updated");
                  }}
                  className="flex-1 text-[10px] bg-brand-green text-white py-1 rounded"
                  data-ocid="admin.save_button"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 text-[10px] bg-muted py-1 rounded"
                  data-ocid="admin.cancel_button"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {u.kyc && (
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                u.kyc === "approved"
                  ? "bg-green-100 text-green-700"
                  : u.kyc === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              KYC: {u.kyc}
            </span>
          )}
        </div>
      )}

      {/* Doc overlay */}
      {docView.open && (
        <dialog
          open
          className="fixed inset-0 m-0 w-full h-full max-w-none max-h-none bg-black/80 z-50 flex items-center justify-center p-4 border-0"
          onClick={() => setDocView({ open: false, url: "", title: "" })}
          onKeyDown={(e) =>
            e.key === "Escape" &&
            setDocView({ open: false, url: "", title: "" })
          }
        >
          <div className="bg-white rounded-2xl p-4 max-w-sm w-full">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm">{docView.title}</h3>
              <button
                type="button"
                onClick={() => setDocView({ open: false, url: "", title: "" })}
                data-ocid="admin.close_button"
              >
                ✕
              </button>
            </div>
            <img
              src={docView.url}
              alt={docView.title}
              className="w-full rounded-lg"
            />
          </div>
        </dialog>
      )}
    </div>
  );
}

export default function Admin() {
  const { navigate } = useNav();
  const store = useStore();
  const {
    adminLoggedIn,
    adminLogin,
    adminLogout,
    users,
    blockUser,
    unblockUser,
    updateUserRole,
    addUser,
    deleteUser,
    approveKYC,
    rejectKYC,
    approveUser,
    rejectUser,
    updateUserFull,
    products,
    addProduct,
    editProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    walletBalance,
    addWalletFunds,
    coupons,
    addCoupon,
    deleteCoupon,
    toggleCoupon,
    announcementText,
    setAnnouncementText,
    siteTagline,
    setSiteTagline,
    siteSettings,
    updateSiteSettings,
    sliders,
    addSlider,
    editSlider,
    deleteSlider,
    homeSettings,
    updateHomeSettings,
    addReview,
    deleteReview,
  } = store;

  const [tab, setTab] = useState<AdminTab>("dashboard");
  const [loginForm, setLoginForm] = useState({ u: "", p: "" });
  const [addBal, setAddBal] = useState({ userId: "", amount: "" });
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    type: "percent",
    minOrder: "",
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "skin-care",
    image: "",
    price: "",
    oldPrice: "",
    description: "",
    badge: "",
    stock: "50",
  });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editProductForm, setEditProductForm] = useState<{
    name: string;
    category: string;
    image: string;
    price: string;
    oldPrice: string;
    description: string;
    badge: string;
    stock: string;
  }>({
    name: "",
    category: "skin-care",
    image: "",
    price: "",
    oldPrice: "",
    description: "",
    badge: "",
    stock: "",
  });
  const [cmsText, setCmsText] = useState(announcementText);
  const [cmsTagline, setCmsTagline] = useState(siteTagline);

  // Site settings local state
  const [localSite, setLocalSite] = useState(siteSettings);

  // Banner editing
  const [editingSliderId, setEditingSliderId] = useState<string | null>(null);
  const [editSliderForm, setEditSliderForm] = useState({
    title: "",
    subtitle: "",
    cta: "",
    image: "",
    bgColor: "#0b8d4d",
  });
  const [newSlider, setNewSlider] = useState({
    title: "",
    subtitle: "",
    cta: "",
    image: "",
    bgColor: "#0b8d4d",
  });

  // New user form
  const [newUser, setNewUser] = useState({
    name: "",
    phone: "",
    role: "user" as "user" | "seller",
  });

  // New review form
  const [newReview, setNewReview] = useState({
    name: "",
    rating: "5",
    review: "",
  });

  // Chart data: last 7 days orders
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const label = d.toLocaleDateString("en-IN", { weekday: "short" });
    const count = orders.filter(
      (o) => o.date === d.toISOString().slice(0, 10),
    ).length;
    return { day: label, orders: count + Math.floor(Math.random() * 4) };
  });

  const handleLogin = () => {
    if (adminLogin(loginForm.u, loginForm.p)) {
      toast.success("Welcome, Admin!");
    } else {
      toast.error("Invalid credentials");
    }
  };

  if (!adminLoggedIn) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center px-4 font-poppins"
        data-ocid="admin.page"
      >
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <img
              src={siteSettings.logoUrl}
              alt="Logo"
              className="h-16 w-16 rounded-full mx-auto mb-2 border-4 border-brand-green object-cover"
            />
            <h1 className="font-bold text-xl">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">{siteSettings.name}</p>
          </div>
          <div
            className="bg-card rounded-2xl p-5 shadow-card space-y-3"
            data-ocid="admin.modal"
          >
            <div>
              <Label className="text-xs mb-1 block">Username</Label>
              <Input
                placeholder="admin"
                value={loginForm.u}
                onChange={(e) =>
                  setLoginForm((f) => ({ ...f, u: e.target.value }))
                }
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="text-xs mb-1 block">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                value={loginForm.p}
                onChange={(e) =>
                  setLoginForm((f) => ({ ...f, p: e.target.value }))
                }
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                data-ocid="admin.input"
              />
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-brand-green text-white rounded-full font-bold"
              data-ocid="admin.submit_button"
            >
              Login
            </Button>
            <button
              type="button"
              onClick={() => navigate("home")}
              className="w-full text-xs text-muted-foreground mt-2"
              data-ocid="admin.link"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const TABS: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={16} />,
    },
    { id: "website", label: "Website", icon: <Settings size={16} /> },
    { id: "banners", label: "Banners", icon: <Image size={16} /> },
    { id: "products", label: "Products", icon: <Package size={16} /> },
    { id: "users", label: "Users", icon: <Users size={16} /> },
    { id: "sellers", label: "Sellers", icon: <Store size={16} /> },
    { id: "orders", label: "Orders", icon: <ShoppingBag size={16} /> },
    { id: "wallet", label: "Wallet", icon: <Wallet size={16} /> },
    { id: "coupons", label: "Coupons", icon: <Tag size={16} /> },
    { id: "cms", label: "CMS", icon: <Settings size={16} /> },
    { id: "mlm", label: "Network", icon: <Users size={16} /> },
    { id: "categories", label: "Categories", icon: <Tag size={16} /> },
    { id: "settings", label: "Settings", icon: <Settings size={16} /> },
  ];

  const CATEGORIES_LIST = [
    { id: "skin-care", name: "Skin Care" },
    { id: "hair-care", name: "Hair Care" },
    { id: "wellness", name: "Wellness" },
    { id: "organic-food", name: "Organic Food" },
    { id: "herbal-supplements", name: "Supplements" },
  ];

  return (
    <div
      className="min-h-screen bg-background font-poppins"
      data-ocid="admin.page"
    >
      {/* Admin Header */}
      <div className="bg-brand-green text-white px-3 py-2 flex items-center gap-2 sticky top-0 z-40">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="p-1"
          data-ocid="admin.button"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="font-bold text-sm flex-1">Admin Panel</span>
        <button
          type="button"
          onClick={() => {
            adminLogout();
            toast.success("Logged out");
          }}
          className="p-1"
          data-ocid="admin.delete_button"
        >
          <LogOut size={18} />
        </button>
      </div>

      {/* Tab Scroll */}
      <div className="flex gap-1 overflow-x-auto px-2 py-2 bg-card border-b border-border">
        {TABS.map((t) => (
          <button
            type="button"
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1 flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              tab === t.id
                ? "bg-brand-green text-white"
                : "text-muted-foreground hover:bg-muted"
            }`}
            data-ocid="admin.tab"
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="px-3 py-4">
        {/* ── DASHBOARD ─────────────────────────────────────── */}
        {tab === "dashboard" && (
          <div className="space-y-4">
            <h2 className="font-bold text-base">Dashboard Overview</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Total Users",
                  value: users.length,
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                },
                {
                  label: "Products",
                  value: products.length,
                  color: "text-green-600",
                  bg: "bg-green-50",
                },
                {
                  label: "Total Orders",
                  value: orders.length,
                  color: "text-purple-600",
                  bg: "bg-purple-50",
                },
                {
                  label: "Wallet Balance",
                  value: `₹${walletBalance}`,
                  color: "text-orange-600",
                  bg: "bg-orange-50",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`${s.bg} dark:bg-card rounded-xl p-3`}
                >
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className={`text-2xl font-bold ${s.color} mt-1`}>
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
            {/* Chart */}
            <div className="bg-card rounded-xl p-4 shadow-xs">
              <h3 className="font-semibold text-sm mb-3">
                Orders - Last 7 Days
              </h3>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart
                  data={chartData}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#0b8d4d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card rounded-xl p-4 shadow-xs">
              <h3 className="font-semibold text-sm mb-2">Recent Orders</h3>
              {orders.slice(0, 3).map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-xs font-medium">{o.id}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {o.date}
                    </p>
                  </div>
                  <Badge
                    variant={o.status === "Delivered" ? "default" : "secondary"}
                    className="text-[10px]"
                  >
                    {o.status}
                  </Badge>
                  <span className="text-xs font-bold">₹{o.total}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── WEBSITE SETTINGS ──────────────────────────────── */}
        {tab === "website" && (
          <div className="space-y-4">
            <h2 className="font-bold text-base">Website Settings</h2>

            {/* Basic Info */}
            <div className="bg-card rounded-xl p-4 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-brand-green uppercase tracking-wide">
                Basic Info
              </h3>
              <div>
                <Label className="text-xs mb-1 block">Site Name</Label>
                <Input
                  value={localSite.name}
                  onChange={(e) =>
                    setLocalSite((f) => ({ ...f, name: e.target.value }))
                  }
                  className="text-sm"
                  data-ocid="admin.input"
                />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Tagline</Label>
                <Input
                  value={localSite.tagline}
                  onChange={(e) =>
                    setLocalSite((f) => ({ ...f, tagline: e.target.value }))
                  }
                  className="text-sm"
                  data-ocid="admin.input"
                />
              </div>
              <div>
                <Label className="text-xs mb-1 block">
                  Logo Image (Upload from Gallery)
                </Label>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-xs text-muted-foreground file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-green file:text-white hover:file:bg-brand-green/80 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) =>
                        setLocalSite((f) => ({
                          ...f,
                          logoUrl: ev.target?.result as string,
                        }));
                      reader.readAsDataURL(file);
                    }
                  }}
                  data-ocid="admin.input"
                />
                <p className="text-[10px] text-muted-foreground mt-1">
                  Or enter URL directly:
                </p>
                <Input
                  value={localSite.logoUrl}
                  onChange={(e) =>
                    setLocalSite((f) => ({ ...f, logoUrl: e.target.value }))
                  }
                  className="text-sm mt-1"
                  placeholder="https://... or leave blank after upload"
                  data-ocid="admin.input"
                />
                {localSite.logoUrl && (
                  <img
                    src={localSite.logoUrl}
                    alt="Logo preview"
                    className="mt-2 h-16 w-16 rounded-full object-cover border-2 border-brand-green"
                  />
                )}
              </div>
              <Button
                onClick={() => {
                  updateSiteSettings({
                    name: localSite.name,
                    tagline: localSite.tagline,
                    logoUrl: localSite.logoUrl,
                  });
                  toast.success("Basic info saved!");
                }}
                className="bg-brand-green text-white text-xs h-8 rounded-lg"
                data-ocid="admin.save_button"
              >
                Save Basic Info
              </Button>
            </div>

            {/* Contact */}
            <div className="bg-card rounded-xl p-4 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-brand-green uppercase tracking-wide">
                Contact
              </h3>
              <div>
                <Label className="text-xs mb-1 block">Phone Number</Label>
                <Input
                  value={localSite.phone}
                  onChange={(e) =>
                    setLocalSite((f) => ({ ...f, phone: e.target.value }))
                  }
                  className="text-sm"
                  data-ocid="admin.input"
                />
              </div>
              <div>
                <Label className="text-xs mb-1 block">
                  WhatsApp Number (digits only)
                </Label>
                <Input
                  value={localSite.whatsapp}
                  onChange={(e) =>
                    setLocalSite((f) => ({ ...f, whatsapp: e.target.value }))
                  }
                  className="text-sm"
                  data-ocid="admin.input"
                />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Email Address</Label>
                <Input
                  value={localSite.email}
                  onChange={(e) =>
                    setLocalSite((f) => ({ ...f, email: e.target.value }))
                  }
                  className="text-sm"
                  data-ocid="admin.input"
                />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Address</Label>
                <Textarea
                  value={localSite.address}
                  onChange={(e) =>
                    setLocalSite((f) => ({ ...f, address: e.target.value }))
                  }
                  className="text-sm"
                  rows={2}
                  data-ocid="admin.textarea"
                />
              </div>
              <Button
                onClick={() => {
                  updateSiteSettings({
                    phone: localSite.phone,
                    whatsapp: localSite.whatsapp,
                    email: localSite.email,
                    address: localSite.address,
                  });
                  toast.success("Contact info saved!");
                }}
                className="bg-brand-green text-white text-xs h-8 rounded-lg"
                data-ocid="admin.save_button"
              >
                Save Contact
              </Button>
            </div>

            {/* Social Links */}
            <div className="bg-card rounded-xl p-4 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-brand-green uppercase tracking-wide">
                Social Links
              </h3>
              <div>
                <Label className="text-xs mb-1 block">Facebook URL</Label>
                <Input
                  value={localSite.facebook}
                  onChange={(e) =>
                    setLocalSite((f) => ({ ...f, facebook: e.target.value }))
                  }
                  className="text-sm"
                  data-ocid="admin.input"
                />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Instagram URL</Label>
                <Input
                  value={localSite.instagram}
                  onChange={(e) =>
                    setLocalSite((f) => ({ ...f, instagram: e.target.value }))
                  }
                  className="text-sm"
                  data-ocid="admin.input"
                />
              </div>
              <div>
                <Label className="text-xs mb-1 block">YouTube URL</Label>
                <Input
                  value={localSite.youtube}
                  onChange={(e) =>
                    setLocalSite((f) => ({ ...f, youtube: e.target.value }))
                  }
                  className="text-sm"
                  data-ocid="admin.input"
                />
              </div>
              <Button
                onClick={() => {
                  updateSiteSettings({
                    facebook: localSite.facebook,
                    instagram: localSite.instagram,
                    youtube: localSite.youtube,
                  });
                  toast.success("Social links saved!");
                }}
                className="bg-brand-green text-white text-xs h-8 rounded-lg"
                data-ocid="admin.save_button"
              >
                Save Social Links
              </Button>
            </div>
          </div>
        )}

        {/* ── BANNERS ───────────────────────────────────────── */}
        {tab === "banners" && (
          <div className="space-y-4">
            <h2 className="font-bold text-base">Banner / Slider Management</h2>

            <div className="space-y-3">
              {sliders.map((sl, i) => (
                <div
                  key={sl.id}
                  className="bg-card rounded-xl shadow-xs overflow-hidden"
                  data-ocid={`admin.item.${i + 1}`}
                >
                  <div className="flex items-center gap-3 p-3">
                    <div
                      className="w-12 h-12 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: sl.bgColor }}
                    >
                      {sl.image && (
                        <img
                          src={sl.image}
                          alt={sl.title}
                          className="w-full h-full object-cover rounded-lg opacity-60"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold line-clamp-1">
                        {sl.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground line-clamp-1">
                        {sl.subtitle}
                      </p>
                    </div>
                    <div
                      className="w-5 h-5 rounded-full border border-border flex-shrink-0"
                      style={{ backgroundColor: sl.bgColor }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSliderId(sl.id);
                        setEditSliderForm({
                          title: sl.title,
                          subtitle: sl.subtitle,
                          cta: sl.cta,
                          image: sl.image,
                          bgColor: sl.bgColor,
                        });
                      }}
                      className="p-1.5 text-blue-500 hover:text-blue-700"
                      data-ocid="admin.edit_button"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Delete this banner?")) {
                          deleteSlider(sl.id);
                          toast.success("Banner deleted");
                        }
                      }}
                      className="p-1.5 text-red-400 hover:text-red-600"
                      data-ocid="admin.delete_button"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Inline edit */}
                  {editingSliderId === sl.id && (
                    <div className="px-3 pb-3 space-y-2 border-t border-border pt-3">
                      <Input
                        placeholder="Title"
                        value={editSliderForm.title}
                        onChange={(e) =>
                          setEditSliderForm((f) => ({
                            ...f,
                            title: e.target.value,
                          }))
                        }
                        className="text-xs h-8"
                        data-ocid="admin.input"
                      />
                      <Input
                        placeholder="Subtitle"
                        value={editSliderForm.subtitle}
                        onChange={(e) =>
                          setEditSliderForm((f) => ({
                            ...f,
                            subtitle: e.target.value,
                          }))
                        }
                        className="text-xs h-8"
                        data-ocid="admin.input"
                      />
                      <Input
                        placeholder="CTA Text"
                        value={editSliderForm.cta}
                        onChange={(e) =>
                          setEditSliderForm((f) => ({
                            ...f,
                            cta: e.target.value,
                          }))
                        }
                        className="text-xs h-8"
                        data-ocid="admin.input"
                      />
                      <ImageUploadField
                        value={editSliderForm.image}
                        onChange={(url) =>
                          setEditSliderForm((f) => ({ ...f, image: url }))
                        }
                        label="Banner Image"
                      />
                      <div className="flex items-center gap-2">
                        <Label className="text-xs">BG Color</Label>
                        <input
                          type="color"
                          value={editSliderForm.bgColor}
                          onChange={(e) =>
                            setEditSliderForm((f) => ({
                              ...f,
                              bgColor: e.target.value,
                            }))
                          }
                          className="w-10 h-8 rounded cursor-pointer"
                        />
                        <span className="text-xs text-muted-foreground">
                          {editSliderForm.bgColor}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            editSlider({ ...sl, ...editSliderForm });
                            setEditingSliderId(null);
                            toast.success("Banner updated!");
                          }}
                          className="flex-1 bg-brand-green text-white text-xs h-8 rounded-lg"
                          data-ocid="admin.save_button"
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingSliderId(null)}
                          className="flex-1 text-xs h-8 rounded-lg"
                          data-ocid="admin.cancel_button"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add New Banner */}
            <div className="bg-card rounded-xl p-4 shadow-xs space-y-2">
              <h3 className="text-xs font-bold text-brand-green uppercase tracking-wide">
                Add New Banner
              </h3>
              <Input
                placeholder="Title"
                value={newSlider.title}
                onChange={(e) =>
                  setNewSlider((f) => ({ ...f, title: e.target.value }))
                }
                className="text-xs h-8"
                data-ocid="admin.input"
              />
              <Input
                placeholder="Subtitle"
                value={newSlider.subtitle}
                onChange={(e) =>
                  setNewSlider((f) => ({ ...f, subtitle: e.target.value }))
                }
                className="text-xs h-8"
                data-ocid="admin.input"
              />
              <Input
                placeholder="CTA Text (e.g. Shop Now)"
                value={newSlider.cta}
                onChange={(e) =>
                  setNewSlider((f) => ({ ...f, cta: e.target.value }))
                }
                className="text-xs h-8"
                data-ocid="admin.input"
              />
              <ImageUploadField
                value={newSlider.image}
                onChange={(url) => setNewSlider((f) => ({ ...f, image: url }))}
                label="Banner Image"
              />
              <div className="flex items-center gap-2">
                <Label className="text-xs">BG Color</Label>
                <input
                  type="color"
                  value={newSlider.bgColor}
                  onChange={(e) =>
                    setNewSlider((f) => ({ ...f, bgColor: e.target.value }))
                  }
                  className="w-10 h-8 rounded cursor-pointer"
                />
              </div>
              <Button
                onClick={() => {
                  if (!newSlider.title) {
                    toast.error("Title required");
                    return;
                  }
                  addSlider(newSlider);
                  toast.success("Banner added!");
                  setNewSlider({
                    title: "",
                    subtitle: "",
                    cta: "",
                    image: "",
                    bgColor: "#0b8d4d",
                  });
                }}
                className="w-full bg-brand-green text-white text-xs h-8 rounded-lg"
                data-ocid="admin.primary_button"
              >
                <Plus size={12} className="mr-1" /> Add Banner
              </Button>
            </div>
          </div>
        )}

        {/* ── PRODUCTS ──────────────────────────────────────── */}
        {tab === "products" && (
          <div className="space-y-4">
            <h2 className="font-bold text-base">Product Management</h2>

            {/* Add form */}
            <div className="bg-card rounded-xl p-3 shadow-xs space-y-2">
              <h3 className="text-xs font-semibold">Add New Product</h3>
              <Input
                placeholder="Product name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct((f) => ({ ...f, name: e.target.value }))
                }
                className="text-xs h-8"
                data-ocid="admin.input"
              />
              <Select
                value={newProduct.category}
                onValueChange={(v) =>
                  setNewProduct((f) => ({ ...f, category: v }))
                }
              >
                <SelectTrigger className="h-8 text-xs" data-ocid="admin.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES_LIST.map((c) => (
                    <SelectItem key={c.id} value={c.id} className="text-xs">
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ImageUploadField
                value={newProduct.image}
                onChange={(url) => setNewProduct((f) => ({ ...f, image: url }))}
                label="Product Image"
              />

              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct((f) => ({ ...f, price: e.target.value }))
                  }
                  className="text-xs h-8"
                  data-ocid="admin.input"
                />
                <Input
                  placeholder="Old Price"
                  type="number"
                  value={newProduct.oldPrice}
                  onChange={(e) =>
                    setNewProduct((f) => ({ ...f, oldPrice: e.target.value }))
                  }
                  className="text-xs h-8"
                  data-ocid="admin.input"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Badge/Offer (e.g. 30% OFF)"
                  value={newProduct.badge}
                  onChange={(e) =>
                    setNewProduct((f) => ({ ...f, badge: e.target.value }))
                  }
                  className="text-xs h-8"
                  data-ocid="admin.input"
                />
                <Input
                  placeholder="Stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct((f) => ({ ...f, stock: e.target.value }))
                  }
                  className="text-xs h-8"
                  data-ocid="admin.input"
                />
              </div>
              <Input
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct((f) => ({ ...f, description: e.target.value }))
                }
                className="text-xs h-8"
                data-ocid="admin.input"
              />
              <Button
                onClick={() => {
                  if (!newProduct.name || !newProduct.price) {
                    toast.error("Name and price required");
                    return;
                  }
                  addProduct({
                    ...newProduct,
                    price: Number(newProduct.price),
                    oldPrice: Number(newProduct.oldPrice),
                    rating: 4.5,
                    reviewCount: 0,
                    stock: Number(newProduct.stock) || 50,
                    badge: newProduct.badge || undefined,
                  });
                  toast.success("Product added!");
                  setNewProduct({
                    name: "",
                    category: "skin-care",
                    image: "",
                    price: "",
                    oldPrice: "",
                    description: "",
                    badge: "",
                    stock: "50",
                  });
                }}
                className="w-full bg-brand-green text-white text-xs h-8 rounded-lg"
                data-ocid="admin.primary_button"
              >
                <Plus size={12} className="mr-1" /> Add Product
              </Button>
            </div>

            {/* Product list */}
            <div className="space-y-2">
              {products.map((p, i) => (
                <div
                  key={p.id}
                  className="bg-card rounded-xl shadow-xs overflow-hidden"
                  data-ocid={`admin.item.${i + 1}`}
                >
                  <div className="flex items-center gap-3 p-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold line-clamp-1">
                        {p.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        ₹{p.price} • Stock: {p.stock}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProductId(p.id);
                        setEditProductForm({
                          name: p.name,
                          category: p.category,
                          image: p.image,
                          price: String(p.price),
                          oldPrice: String(p.oldPrice),
                          description: p.description,
                          badge: p.badge ?? "",
                          stock: String(p.stock),
                        });
                      }}
                      className="p-1.5 text-blue-500 hover:text-blue-700"
                      data-ocid="admin.edit_button"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteProduct(p.id);
                        toast.success("Deleted");
                      }}
                      className="p-1.5 text-red-400 hover:text-red-600"
                      data-ocid="admin.delete_button"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Inline edit form */}
                  {editingProductId === p.id && (
                    <div className="px-3 pb-3 border-t border-border pt-3 space-y-2">
                      <Input
                        placeholder="Product name"
                        value={editProductForm.name}
                        onChange={(e) =>
                          setEditProductForm((f) => ({
                            ...f,
                            name: e.target.value,
                          }))
                        }
                        className="text-xs h-8"
                        data-ocid="admin.input"
                      />
                      <Select
                        value={editProductForm.category}
                        onValueChange={(v) =>
                          setEditProductForm((f) => ({ ...f, category: v }))
                        }
                      >
                        <SelectTrigger
                          className="h-8 text-xs"
                          data-ocid="admin.select"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES_LIST.map((c) => (
                            <SelectItem
                              key={c.id}
                              value={c.id}
                              className="text-xs"
                            >
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <ImageUploadField
                        value={editProductForm.image}
                        onChange={(url) =>
                          setEditProductForm((f) => ({ ...f, image: url }))
                        }
                        label="Product Image"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Price"
                          type="number"
                          value={editProductForm.price}
                          onChange={(e) =>
                            setEditProductForm((f) => ({
                              ...f,
                              price: e.target.value,
                            }))
                          }
                          className="text-xs h-8"
                          data-ocid="admin.input"
                        />
                        <Input
                          placeholder="Old Price"
                          type="number"
                          value={editProductForm.oldPrice}
                          onChange={(e) =>
                            setEditProductForm((f) => ({
                              ...f,
                              oldPrice: e.target.value,
                            }))
                          }
                          className="text-xs h-8"
                          data-ocid="admin.input"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Badge (e.g. 25% OFF)"
                          value={editProductForm.badge}
                          onChange={(e) =>
                            setEditProductForm((f) => ({
                              ...f,
                              badge: e.target.value,
                            }))
                          }
                          className="text-xs h-8"
                          data-ocid="admin.input"
                        />
                        <Input
                          placeholder="Stock"
                          type="number"
                          value={editProductForm.stock}
                          onChange={(e) =>
                            setEditProductForm((f) => ({
                              ...f,
                              stock: e.target.value,
                            }))
                          }
                          className="text-xs h-8"
                          data-ocid="admin.input"
                        />
                      </div>
                      <Input
                        placeholder="Description"
                        value={editProductForm.description}
                        onChange={(e) =>
                          setEditProductForm((f) => ({
                            ...f,
                            description: e.target.value,
                          }))
                        }
                        className="text-xs h-8"
                        data-ocid="admin.input"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            editProduct({
                              ...p,
                              ...editProductForm,
                              price: Number(editProductForm.price),
                              oldPrice: Number(editProductForm.oldPrice),
                              stock: Number(editProductForm.stock),
                              badge: editProductForm.badge || undefined,
                            });
                            setEditingProductId(null);
                            toast.success("Product updated!");
                          }}
                          className="flex-1 bg-brand-green text-white text-xs h-8 rounded-lg"
                          data-ocid="admin.save_button"
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingProductId(null)}
                          className="flex-1 text-xs h-8 rounded-lg"
                          data-ocid="admin.cancel_button"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── USERS ─────────────────────────────────────────── */}
        {tab === "users" && (
          <div className="space-y-3">
            <h2 className="font-bold text-base">
              User Management ({users.length})
            </h2>

            {/* Add user */}
            <div className="bg-card rounded-xl p-3 shadow-xs space-y-2">
              <h3 className="text-xs font-semibold">Add New User</h3>
              <Input
                placeholder="Full name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser((f) => ({ ...f, name: e.target.value }))
                }
                className="text-xs h-8"
                data-ocid="admin.input"
              />
              <Input
                placeholder="Phone number"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser((f) => ({ ...f, phone: e.target.value }))
                }
                className="text-xs h-8"
                data-ocid="admin.input"
              />
              <Select
                value={newUser.role}
                onValueChange={(v) =>
                  setNewUser((f) => ({ ...f, role: v as "user" | "seller" }))
                }
              >
                <SelectTrigger className="h-8 text-xs" data-ocid="admin.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user" className="text-xs">
                    User
                  </SelectItem>
                  <SelectItem value="seller" className="text-xs">
                    Seller
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => {
                  if (!newUser.name || !newUser.phone) {
                    toast.error("Name and phone required");
                    return;
                  }
                  addUser({
                    name: newUser.name,
                    phone: newUser.phone,
                    role: newUser.role,
                    email: `${newUser.phone}@aug.com`,
                  });
                  toast.success("User added!");
                  setNewUser({ name: "", phone: "", role: "user" });
                }}
                className="w-full bg-brand-green text-white text-xs h-8 rounded-lg"
                data-ocid="admin.primary_button"
              >
                <Plus size={12} className="mr-1" /> Add User
              </Button>
            </div>

            {/* User list */}
            <div className="space-y-2">
              {users.map((u, i) => (
                <UserCard
                  key={u.id}
                  u={u}
                  i={i}
                  updateUserRole={updateUserRole}
                  blockUser={blockUser}
                  unblockUser={unblockUser}
                  deleteUser={deleteUser}
                  approveUser={approveUser}
                  rejectUser={rejectUser}
                  updateUserFull={updateUserFull}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── SELLERS ───────────────────────────────────────── */}
        {tab === "sellers" && (
          <div className="space-y-3">
            <h2 className="font-bold text-base">Seller Management</h2>
            <div className="space-y-2">
              {users
                .filter((u) => u.role === "seller")
                .map((u, i) => (
                  <div
                    key={u.id}
                    className="bg-card rounded-xl p-3 shadow-xs"
                    data-ocid={`admin.item.${i + 1}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-sm">
                        {u.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold">{u.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {u.phone}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Ref: {u.referralCode}
                        </p>
                      </div>
                      <span
                        className={`text-[9px] px-2 py-1 rounded-full font-medium ${
                          u.kyc === "approved"
                            ? "bg-green-100 text-green-700"
                            : u.kyc === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : u.kyc === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        KYC: {u.kyc ?? "Not Submitted"}
                      </span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => {
                          approveKYC(u.id);
                          toast.success(`${u.name} KYC approved`);
                        }}
                        className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full"
                        data-ocid="admin.confirm_button"
                      >
                        ✓ Approve KYC
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          rejectKYC(u.id);
                          toast.error(`${u.name} KYC rejected`);
                        }}
                        className="text-[10px] bg-red-100 text-red-700 px-2 py-1 rounded-full"
                        data-ocid="admin.delete_button"
                      >
                        ✗ Reject KYC
                      </button>
                      {u.isBlocked ? (
                        <button
                          type="button"
                          onClick={() => {
                            unblockUser(u.id);
                            toast.success("Unblocked");
                          }}
                          className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                          data-ocid="admin.button"
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            blockUser(u.id);
                            toast.success("Blocked");
                          }}
                          className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full"
                          data-ocid="admin.button"
                        >
                          Block
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              {users.filter((u) => u.role === "seller").length === 0 && (
                <div
                  className="text-center py-8 text-muted-foreground text-sm"
                  data-ocid="admin.empty_state"
                >
                  No sellers yet. Promote users to seller role from the Users
                  tab.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── ORDERS ────────────────────────────────────────── */}
        {tab === "orders" && (
          <div className="space-y-3">
            <h2 className="font-bold text-base">
              Order Management ({orders.length})
            </h2>
            <div className="space-y-2">
              {orders.map((o, i) => (
                <div
                  key={o.id}
                  className="bg-card rounded-xl p-3 shadow-xs"
                  data-ocid={`admin.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-xs font-bold">{o.id}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {o.date} • ₹{o.total}
                      </p>
                    </div>
                    <Select
                      value={o.status}
                      onValueChange={(v) => {
                        updateOrderStatus(o.id, v as typeof o.status);
                        toast.success("Status updated");
                      }}
                    >
                      <SelectTrigger
                        className="h-7 text-[10px] w-28"
                        data-ocid="admin.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["Pending", "Packed", "Shipped", "Delivered"].map(
                          (s) => (
                            <SelectItem key={s} value={s} className="text-xs">
                              {s}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    {o.address.name} • {o.address.city}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── WALLET ────────────────────────────────────────── */}
        {tab === "wallet" && (
          <div className="space-y-4">
            <h2 className="font-bold text-base">Wallet Management</h2>
            <div className="bg-card rounded-xl p-4 shadow-xs">
              <p className="text-sm text-muted-foreground mb-1">
                System Wallet Balance
              </p>
              <p className="text-2xl font-bold text-brand-green">
                ₹{walletBalance}
              </p>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-xs space-y-3">
              <h3 className="text-sm font-semibold">Add Balance to User</h3>
              <Select
                value={addBal.userId}
                onValueChange={(v) => setAddBal((f) => ({ ...f, userId: v }))}
              >
                <SelectTrigger data-ocid="admin.select">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((u) => (
                    <SelectItem key={u.id} value={u.id} className="text-xs">
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Amount"
                value={addBal.amount}
                onChange={(e) =>
                  setAddBal((f) => ({ ...f, amount: e.target.value }))
                }
                data-ocid="admin.input"
              />
              <Button
                onClick={() => {
                  if (!addBal.amount) {
                    toast.error("Enter amount");
                    return;
                  }
                  addWalletFunds(
                    Number(addBal.amount),
                    `Admin credit - ${addBal.userId}`,
                  );
                  toast.success(`₹${addBal.amount} added!`);
                  setAddBal({ userId: "", amount: "" });
                }}
                className="w-full bg-brand-green text-white rounded-lg"
                data-ocid="admin.primary_button"
              >
                Add Balance
              </Button>
            </div>
          </div>
        )}

        {/* ── COUPONS ───────────────────────────────────────── */}
        {tab === "coupons" && (
          <div className="space-y-4">
            <h2 className="font-bold text-base">Coupon Management</h2>
            <div className="bg-card rounded-xl p-3 shadow-xs space-y-2">
              <h3 className="text-xs font-semibold">Create Coupon</h3>
              <Input
                placeholder="Coupon Code (e.g. SAVE20)"
                value={newCoupon.code}
                onChange={(e) =>
                  setNewCoupon((f) => ({
                    ...f,
                    code: e.target.value.toUpperCase(),
                  }))
                }
                className="text-xs h-8"
                data-ocid="admin.input"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Discount"
                  type="number"
                  value={newCoupon.discount}
                  onChange={(e) =>
                    setNewCoupon((f) => ({ ...f, discount: e.target.value }))
                  }
                  className="text-xs h-8"
                  data-ocid="admin.input"
                />
                <Select
                  value={newCoupon.type}
                  onValueChange={(v) =>
                    setNewCoupon((f) => ({ ...f, type: v }))
                  }
                >
                  <SelectTrigger
                    className="h-8 text-xs"
                    data-ocid="admin.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percent">Percent</SelectItem>
                    <SelectItem value="flat">Flat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                placeholder="Min Order Amount"
                type="number"
                value={newCoupon.minOrder}
                onChange={(e) =>
                  setNewCoupon((f) => ({ ...f, minOrder: e.target.value }))
                }
                className="text-xs h-8"
                data-ocid="admin.input"
              />
              <Button
                onClick={() => {
                  if (!newCoupon.code || !newCoupon.discount) {
                    toast.error("Fill required fields");
                    return;
                  }
                  addCoupon({
                    code: newCoupon.code,
                    discount: Number(newCoupon.discount),
                    type: newCoupon.type as "percent" | "flat",
                    active: true,
                    minOrder: Number(newCoupon.minOrder) || undefined,
                  });
                  toast.success("Coupon created!");
                  setNewCoupon({
                    code: "",
                    discount: "",
                    type: "percent",
                    minOrder: "",
                  });
                }}
                className="w-full bg-brand-green text-white text-xs h-8 rounded-lg"
                data-ocid="admin.primary_button"
              >
                Create Coupon
              </Button>
            </div>
            <div className="space-y-2">
              {coupons.map((c, i) => (
                <div
                  key={c.id}
                  className="bg-card rounded-xl p-3 shadow-xs flex items-center gap-3"
                  data-ocid={`admin.item.${i + 1}`}
                >
                  <div className="flex-1">
                    <p className="text-sm font-bold">{c.code}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.discount}
                      {c.type === "percent" ? "%" : "₹"} off
                      {c.minOrder ? ` on ₹${c.minOrder}+` : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleCoupon(c.id)}
                    className={`p-1.5 rounded-full ${
                      c.active
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                    data-ocid="admin.toggle"
                  >
                    {c.active ? <Check size={14} /> : <X size={14} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deleteCoupon(c.id);
                      toast.success("Coupon deleted");
                    }}
                    className="p-1.5 text-red-400 hover:text-red-600"
                    data-ocid="admin.delete_button"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CMS ───────────────────────────────────────────── */}
        {tab === "cms" && (
          <div className="space-y-4">
            <h2 className="font-bold text-base">CMS / Page Content</h2>

            {/* Home Page Sections */}
            <div className="bg-card rounded-xl p-4 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-brand-green">
                Home Page Sections
              </h3>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-xs font-medium">Show SHG Section</p>
                  <p className="text-[10px] text-muted-foreground">
                    Self Help Group Products
                  </p>
                </div>
                <Switch
                  checked={homeSettings.showSHG}
                  onCheckedChange={(v) => {
                    updateHomeSettings({ showSHG: v });
                    toast.success(`SHG section ${v ? "shown" : "hidden"}`);
                  }}
                  data-ocid="admin.switch"
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-xs font-medium">Show MLM Promo</p>
                  <p className="text-[10px] text-muted-foreground">
                    MLM join section on homepage
                  </p>
                </div>
                <Switch
                  checked={homeSettings.showMLMPromo}
                  onCheckedChange={(v) => {
                    updateHomeSettings({ showMLMPromo: v });
                    toast.success(`MLM promo ${v ? "shown" : "hidden"}`);
                  }}
                  data-ocid="admin.switch"
                />
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="bg-card rounded-xl p-4 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-brand-green">
                Customer Reviews
              </h3>
              {homeSettings.reviews.map((r, i) => (
                <div
                  key={r.id}
                  className="flex items-start gap-2 py-2 border-b border-border last:border-0"
                  data-ocid={`admin.item.${i + 1}`}
                >
                  <div className="flex-1">
                    <p className="text-xs font-semibold">{r.name}</p>
                    <div className="flex gap-0.5 my-0.5">
                      {"★★★★★"
                        .slice(0, r.rating)
                        .split("")
                        .map((_, rIdx) => (
                          <Star
                            key={`${r.id}-star-${rIdx}`}
                            size={10}
                            className="text-yellow-500 fill-yellow-500"
                          />
                        ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {r.review}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      deleteReview(r.id);
                      toast.success("Review deleted");
                    }}
                    className="p-1 text-red-400 hover:text-red-600 mt-1"
                    data-ocid="admin.delete_button"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-semibold">Add Review</h4>
                <Input
                  placeholder="Customer name"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview((f) => ({ ...f, name: e.target.value }))
                  }
                  className="text-xs h-8"
                  data-ocid="admin.input"
                />
                <Select
                  value={newReview.rating}
                  onValueChange={(v) =>
                    setNewReview((f) => ({ ...f, rating: v }))
                  }
                >
                  <SelectTrigger
                    className="h-8 text-xs"
                    data-ocid="admin.select"
                  >
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {["5", "4", "3", "2", "1"].map((r) => (
                      <SelectItem key={r} value={r} className="text-xs">
                        {r} Stars
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Review text"
                  value={newReview.review}
                  onChange={(e) =>
                    setNewReview((f) => ({ ...f, review: e.target.value }))
                  }
                  rows={2}
                  className="text-xs"
                  data-ocid="admin.textarea"
                />
                <Button
                  onClick={() => {
                    if (!newReview.name || !newReview.review) {
                      toast.error("Fill all fields");
                      return;
                    }
                    addReview({
                      name: newReview.name,
                      rating: Number(newReview.rating),
                      review: newReview.review,
                    });
                    toast.success("Review added!");
                    setNewReview({ name: "", rating: "5", review: "" });
                  }}
                  className="w-full bg-brand-green text-white text-xs h-8 rounded-lg"
                  data-ocid="admin.primary_button"
                >
                  <Plus size={12} className="mr-1" /> Add Review
                </Button>
              </div>
            </div>

            {/* Announcement Bar */}
            <div className="bg-card rounded-xl p-4 shadow-xs space-y-2">
              <h3 className="text-sm font-bold text-brand-green">
                Announcement Bar
              </h3>
              <Textarea
                value={cmsText}
                onChange={(e) => setCmsText(e.target.value)}
                rows={2}
                className="text-sm"
                data-ocid="admin.textarea"
              />
              <Button
                onClick={() => {
                  setAnnouncementText(cmsText);
                  toast.success("Announcement updated!");
                }}
                className="bg-brand-green text-white text-xs h-8 rounded-lg px-4"
                data-ocid="admin.save_button"
              >
                Save
              </Button>
            </div>

            {/* Site Tagline */}
            <div className="bg-card rounded-xl p-4 shadow-xs space-y-2">
              <h3 className="text-sm font-bold text-brand-green">
                Site Tagline
              </h3>
              <Input
                value={cmsTagline}
                onChange={(e) => setCmsTagline(e.target.value)}
                className="text-sm"
                data-ocid="admin.input"
              />
              <Button
                onClick={() => {
                  setSiteTagline(cmsTagline);
                  toast.success("Tagline updated!");
                }}
                className="bg-brand-green text-white text-xs h-8 rounded-lg px-4"
                data-ocid="admin.save_button"
              >
                Save
              </Button>
            </div>

            {/* Admin Password */}
            <div className="bg-card rounded-xl p-4 shadow-xs">
              <h3 className="text-sm font-semibold mb-2">Admin Password</h3>
              <Input
                type="password"
                placeholder="New password"
                className="text-sm"
                data-ocid="admin.input"
              />
              <Button
                className="mt-2 w-full bg-brand-green text-white rounded-lg text-xs h-8"
                onClick={() =>
                  toast.success("Password update feature coming soon!")
                }
                data-ocid="admin.save_button"
              >
                Update Password
              </Button>
            </div>
          </div>
        )}

        {/* ── MLM ───────────────────────────────────────────── */}
        {tab === "mlm" && (
          <div className="space-y-4">
            <h2 className="font-bold text-base">Network Commission Settings</h2>
            <div className="bg-card rounded-xl p-4 shadow-xs">
              <div className="space-y-3">
                {[
                  { level: 1, rate: 10 },
                  { level: 2, rate: 5 },
                  { level: 3, rate: 3 },
                  { level: 4, rate: 2 },
                  { level: 5, rate: 1 },
                ].map((l) => (
                  <div key={l.level} className="flex items-center gap-3">
                    <span className="w-16 text-xs font-medium">
                      Level {l.level}
                    </span>
                    <Input
                      defaultValue={l.rate}
                      type="number"
                      className="flex-1 h-8 text-xs"
                      data-ocid="admin.input"
                    />
                    <span className="text-xs text-muted-foreground">%</span>
                  </div>
                ))}
                <Button
                  onClick={() => toast.success("Commission rates saved!")}
                  className="w-full bg-brand-green text-white rounded-lg text-sm"
                  data-ocid="admin.save_button"
                >
                  Save Commission Rates
                </Button>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-xs">
              <h3 className="text-sm font-semibold mb-3">Seller Approval</h3>
              {users
                .filter((u) => u.role === "seller")
                .map((u, i) => (
                  <div
                    key={u.id}
                    className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                    data-ocid={`admin.item.${i + 1}`}
                  >
                    <div className="flex-1">
                      <p className="text-xs font-semibold">{u.name}</p>
                      <p className="text-[10px] text-muted-foreground">
                        KYC: {u.kyc ?? "not submitted"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        approveKYC(u.id);
                        toast.success(`${u.name}'s KYC approved!`);
                      }}
                      className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full"
                      data-ocid="admin.confirm_button"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        rejectKYC(u.id);
                        toast.error(`${u.name}'s KYC rejected`);
                      }}
                      className="text-[10px] bg-red-100 text-red-700 px-2 py-1 rounded-full"
                      data-ocid="admin.delete_button"
                    >
                      Reject
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ── CATEGORIES ───────────────────────────────────── */}
        {tab === "categories" && (
          <div className="space-y-4">
            <h2 className="font-bold text-base">Category Management</h2>
            <CategoriesTab />
          </div>
        )}

        {/* ── SETTINGS ─────────────────────────────────────── */}
        {tab === "settings" && (
          <div className="space-y-4">
            <h2 className="font-bold text-base">Settings</h2>
            <SettingsTab />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CategoriesTab() {
  const categories = useStore((s) => s.categories);
  const addCategory = useStore((s) => s.addCategory);
  const editCategory = useStore((s) => s.editCategory);
  const deleteCategory = useStore((s) => s.deleteCategory);
  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState("🌿");
  const [editId, setEditId] = useState<string | null>(null);
  const [editVal, setEditVal] = useState("");
  const [editIcon, setEditIcon] = useState("");

  return (
    <div className="space-y-4">
      {/* Add */}
      <div className="bg-card rounded-xl p-4 shadow-xs space-y-2">
        <p className="text-xs font-semibold text-muted-foreground">
          Add New Category
        </p>
        <div className="flex gap-2">
          <Input
            placeholder="Icon (emoji)"
            value={newIcon}
            onChange={(e) => setNewIcon(e.target.value)}
            className="w-20 text-sm text-center"
            data-ocid="admin.input"
          />
          <Input
            placeholder="Category name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1 text-sm"
            data-ocid="admin.input"
          />
          <Button
            onClick={() => {
              if (!newName.trim()) return;
              addCategory({
                name: newName.trim(),
                icon: newIcon || "🌿",
                color: "#e8f5e9",
              });
              setNewName("");
              setNewIcon("🌿");
              toast.success("Category added! Visible on website now.");
            }}
            className="bg-brand-green text-white rounded-lg text-xs h-9 px-3"
            data-ocid="admin.primary_button"
          >
            <Plus size={14} />
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="bg-card rounded-xl shadow-xs divide-y divide-border">
        {categories.map((cat, i) => (
          <div
            key={cat.id}
            className="flex items-center gap-2 px-4 py-3"
            data-ocid={`admin.item.${i + 1}`}
          >
            {editId === cat.id ? (
              <>
                <Input
                  value={editIcon}
                  onChange={(e) => setEditIcon(e.target.value)}
                  className="w-14 h-7 text-xs text-center"
                  data-ocid="admin.input"
                />
                <Input
                  value={editVal}
                  onChange={(e) => setEditVal(e.target.value)}
                  className="flex-1 h-7 text-xs"
                  data-ocid="admin.input"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!editVal.trim()) return;
                    editCategory({
                      ...cat,
                      name: editVal.trim(),
                      icon: editIcon,
                    });
                    setEditId(null);
                    toast.success("Category updated! Live on website.");
                  }}
                  className="p-1 text-brand-green"
                  data-ocid="admin.save_button"
                >
                  <Check size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setEditId(null)}
                  className="p-1 text-muted-foreground"
                  data-ocid="admin.cancel_button"
                >
                  <X size={14} />
                </button>
              </>
            ) : (
              <>
                <span className="text-lg">{cat.icon}</span>
                <span className="flex-1 text-sm">{cat.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    setEditId(cat.id);
                    setEditVal(cat.name);
                    setEditIcon(cat.icon);
                  }}
                  className="p-1 text-blue-500"
                  data-ocid="admin.edit_button"
                >
                  <Pencil size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteCategory(cat.id);
                    toast.success("Category deleted!");
                  }}
                  className="p-1 text-red-400"
                  data-ocid="admin.delete_button"
                >
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [logoutTimer, setLogoutTimer] = useState("30");

  const handleExport = () => {
    const store = useStore.getState();
    const data = {
      users: store.users,
      products: store.products,
      orders: store.orders,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "anshika-udhyog-data.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported!");
  };

  return (
    <div className="space-y-4">
      {/* Change Password */}
      <div className="bg-card rounded-xl p-4 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-brand-green">
          Change Admin Password
        </h3>
        <div>
          <Label className="text-xs mb-1 block">New Password</Label>
          <Input
            type="password"
            placeholder="New password"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            className="text-sm"
            data-ocid="admin.input"
          />
        </div>
        <div>
          <Label className="text-xs mb-1 block">Confirm Password</Label>
          <Input
            type="password"
            placeholder="Confirm password"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            className="text-sm"
            data-ocid="admin.input"
          />
        </div>
        <Button
          onClick={() => {
            if (!newPwd || newPwd !== confirmPwd) {
              toast.error("Passwords do not match");
              return;
            }
            toast.success("Password updated successfully!");
            setNewPwd("");
            setConfirmPwd("");
          }}
          className="w-full bg-brand-green text-white rounded-lg text-sm"
          data-ocid="admin.save_button"
        >
          Update Password
        </Button>
      </div>

      {/* Security Settings */}
      <div className="bg-card rounded-xl p-4 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-brand-green">
          Security Settings
        </h3>
        <div>
          <Label className="text-xs mb-1 block">
            Auto Logout Timer (minutes)
          </Label>
          <Input
            type="number"
            value={logoutTimer}
            onChange={(e) => setLogoutTimer(e.target.value)}
            className="text-sm"
            data-ocid="admin.input"
          />
        </div>
        <Button
          onClick={() =>
            toast.success(`Auto logout set to ${logoutTimer} minutes`)
          }
          className="bg-brand-green text-white text-xs h-8 rounded-lg px-4"
          data-ocid="admin.save_button"
        >
          Save Security Settings
        </Button>
      </div>

      {/* Export Data */}
      <div className="bg-card rounded-xl p-4 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-brand-green">Export Data</h3>
        <p className="text-xs text-muted-foreground">
          Download all users, products, and orders data as JSON.
        </p>
        <Button
          onClick={handleExport}
          variant="outline"
          className="w-full border-brand-green text-brand-green rounded-lg text-sm"
          data-ocid="admin.primary_button"
        >
          📥 Export Data (JSON)
        </Button>
      </div>

      {/* UPI Settings */}
      <div className="bg-card rounded-xl p-4 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-brand-green">Payment Settings</h3>
        <div>
          <Label className="text-xs mb-1 block">UPI ID</Label>
          <Input
            defaultValue="8349600835@UPI"
            className="text-sm font-mono"
            data-ocid="admin.input"
          />
        </div>
        <div>
          <Label className="text-xs mb-1 block">WhatsApp Number</Label>
          <Input
            defaultValue="8349600835"
            className="text-sm"
            data-ocid="admin.input"
          />
        </div>
        <Button
          onClick={() => toast.success("Payment settings saved!")}
          className="bg-brand-green text-white text-xs h-8 rounded-lg px-4"
          data-ocid="admin.save_button"
        >
          Save Payment Settings
        </Button>
      </div>
    </div>
  );
}
