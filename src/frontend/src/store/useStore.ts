import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type CartItem,
  type Coupon,
  INITIAL_COUPONS,
  INITIAL_USERS,
  type Order,
  PRODUCTS,
  type Product,
  SLIDERS,
  type Slider,
  type User,
  type WalletTransaction,
} from "../data/mockData";

interface SiteSettings {
  name: string;
  tagline: string;
  logoUrl: string;
  phone: string;
  whatsapp: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
  email: string;
}

interface HomeSettings {
  showSHG: boolean;
  showMLMPromo: boolean;
  reviews: Array<{ id: string; name: string; review: string; rating: number }>;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface AppStore {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (id: string) => void;

  // User
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;

  // Orders
  orders: Order[];
  placeOrder: (
    items: CartItem[],
    address: Order["address"],
    payment: string,
    discount?: number,
  ) => string;
  updateOrderStatus: (id: string, status: Order["status"]) => void;

  // Wallet
  walletBalance: number;
  walletTxns: WalletTransaction[];
  addWalletFunds: (amount: number, desc: string) => void;
  deductWallet: (amount: number, desc: string) => boolean;

  // Admin
  adminLoggedIn: boolean;
  adminLogin: (username: string, password: string) => boolean;
  adminLogout: () => void;

  // Products (admin managed)
  products: Product[];
  addProduct: (p: Omit<Product, "id">) => void;
  editProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;

  // Categories (admin managed)
  categories: Category[];
  addCategory: (c: Omit<Category, "id">) => void;
  editCategory: (c: Category) => void;
  deleteCategory: (id: string) => void;

  // Users (admin view)
  users: User[];
  blockUser: (id: string) => void;
  unblockUser: (id: string) => void;
  updateUserBalance: (
    id: string,
    amount: number,
    type: "add" | "deduct",
  ) => void;
  updateUserRole: (id: string, role: "user" | "seller") => void;
  addUser: (
    u: Omit<User, "id" | "referralCode" | "joinDate"> &
      Partial<Pick<User, "id" | "referralCode" | "joinDate">>,
  ) => void;
  deleteUser: (id: string) => void;
  approveKYC: (id: string) => void;
  rejectKYC: (id: string) => void;
  approveUser: (id: string) => void;
  rejectUser: (id: string) => void;
  updateUserFull: (id: string, updates: Partial<User>) => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (c: Omit<Coupon, "id">) => void;
  editCoupon: (c: Coupon) => void;
  deleteCoupon: (id: string) => void;
  toggleCoupon: (id: string) => void;
  validateCoupon: (code: string, total: number) => Coupon | null;

  // Announcements / CMS
  announcementText: string;
  setAnnouncementText: (text: string) => void;
  siteTagline: string;
  setSiteTagline: (t: string) => void;

  // Site Settings
  siteSettings: SiteSettings;
  updateSiteSettings: (s: Partial<SiteSettings>) => void;

  // Sliders
  sliders: Slider[];
  addSlider: (s: Omit<Slider, "id">) => void;
  editSlider: (s: Slider) => void;
  deleteSlider: (id: string) => void;

  // Home Settings
  homeSettings: HomeSettings;
  updateHomeSettings: (h: Partial<HomeSettings>) => void;
  addReview: (r: Omit<HomeSettings["reviews"][0], "id">) => void;
  deleteReview: (id: string) => void;
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: "skin-care", name: "Skin Care", icon: "✨", color: "#e8f5e9" },
  { id: "hair-care", name: "Hair Care", icon: "💆", color: "#f3e5f5" },
  { id: "wellness", name: "Wellness", icon: "🌿", color: "#e0f7fa" },
  { id: "organic-food", name: "Organic Food", icon: "🥗", color: "#fff8e1" },
  {
    id: "herbal-supplements",
    name: "Supplements",
    icon: "💊",
    color: "#fce4ec",
  },
];

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (product) =>
        set((s) => {
          const existing = s.cart.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              cart: s.cart.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
            };
          }
          return { cart: [...s.cart, { product, quantity: 1 }] };
        }),
      removeFromCart: (id) =>
        set((s) => ({ cart: s.cart.filter((i) => i.product.id !== id) })),
      updateQty: (id, qty) =>
        set((s) => ({
          cart:
            qty <= 0
              ? s.cart.filter((i) => i.product.id !== id)
              : s.cart.map((i) =>
                  i.product.id === id ? { ...i, quantity: qty } : i,
                ),
        })),
      clearCart: () => set({ cart: [] }),

      // Wishlist
      wishlist: [],
      toggleWishlist: (id) =>
        set((s) => ({
          wishlist: s.wishlist.includes(id)
            ? s.wishlist.filter((w) => w !== id)
            : [...s.wishlist, id],
        })),

      // User
      user: null,
      isLoggedIn: false,
      login: (user) => set({ user, isLoggedIn: true }),
      logout: () =>
        set({ user: null, isLoggedIn: false, cart: [], wishlist: [] }),
      updateUser: (updates) =>
        set((s) => ({ user: s.user ? { ...s.user, ...updates } : s.user })),

      // Orders
      orders: [
        {
          id: "ORD-001",
          items: [
            { product: PRODUCTS[0], quantity: 2 },
            { product: PRODUCTS[3], quantity: 1 },
          ],
          total: 747,
          status: "Delivered",
          address: {
            name: "Demo User",
            phone: "9876543210",
            street: "123 Green Lane",
            city: "Lucknow",
            state: "Uttar Pradesh",
            pincode: "226001",
          },
          date: "2025-12-15",
          paymentMethod: "UPI",
        },
        {
          id: "ORD-002",
          items: [{ product: PRODUCTS[1], quantity: 1 }],
          total: 249,
          status: "Shipped",
          address: {
            name: "Demo User",
            phone: "9876543210",
            street: "123 Green Lane",
            city: "Lucknow",
            state: "Uttar Pradesh",
            pincode: "226001",
          },
          date: "2025-12-28",
          paymentMethod: "Wallet",
        },
      ],
      placeOrder: (items, address, payment, discount = 0) => {
        const total =
          items.reduce((s, i) => s + i.product.price * i.quantity, 0) -
          discount;
        const id = `ORD-${Date.now()}`;
        const order: Order = {
          id,
          items,
          total: Math.max(total, 0),
          status: "Pending",
          address,
          date: new Date().toISOString().split("T")[0],
          paymentMethod: payment,
          discount,
        };
        set((s) => ({ orders: [order, ...s.orders] }));
        return id;
      },
      updateOrderStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),

      // Wallet
      walletBalance: 500,
      walletTxns: [
        {
          id: "wt1",
          type: "credit",
          amount: 500,
          description: "Welcome Bonus",
          date: "2025-12-01",
        },
        {
          id: "wt2",
          type: "credit",
          amount: 200,
          description: "Referral Bonus - AUG-RK002",
          date: "2025-12-10",
        },
        {
          id: "wt3",
          type: "debit",
          amount: 200,
          description: "Order ORD-002 Payment",
          date: "2025-12-28",
        },
      ],
      addWalletFunds: (amount, desc) =>
        set((s) => ({
          walletBalance: s.walletBalance + amount,
          walletTxns: [
            {
              id: `wt${Date.now()}`,
              type: "credit",
              amount,
              description: desc,
              date: new Date().toISOString().split("T")[0],
            },
            ...s.walletTxns,
          ],
        })),
      deductWallet: (amount, desc) => {
        const { walletBalance } = get();
        if (walletBalance < amount) return false;
        set((s) => ({
          walletBalance: s.walletBalance - amount,
          walletTxns: [
            {
              id: `wt${Date.now()}`,
              type: "debit",
              amount,
              description: desc,
              date: new Date().toISOString().split("T")[0],
            },
            ...s.walletTxns,
          ],
        }));
        return true;
      },

      // Admin
      adminLoggedIn:
        typeof window !== "undefined" &&
        localStorage.getItem("adminLoggedIn") === "true",
      adminLogin: (username, password) => {
        if (username === "admin" && password === "504560@AUC") {
          localStorage.setItem("adminLoggedIn", "true");
          set({ adminLoggedIn: true });
          return true;
        }
        return false;
      },
      adminLogout: () => {
        localStorage.removeItem("adminLoggedIn");
        set({ adminLoggedIn: false });
      },

      // Products
      products: PRODUCTS,
      addProduct: (p) =>
        set((s) => ({
          products: [...s.products, { ...p, id: `p${Date.now()}` }],
        })),
      editProduct: (p) =>
        set((s) => ({
          products: s.products.map((x) => (x.id === p.id ? p : x)),
        })),
      deleteProduct: (id) =>
        set((s) => ({ products: s.products.filter((x) => x.id !== id) })),

      // Categories
      categories: DEFAULT_CATEGORIES,
      addCategory: (c) =>
        set((s) => ({
          categories: [...s.categories, { ...c, id: `cat${Date.now()}` }],
        })),
      editCategory: (c) =>
        set((s) => ({
          categories: s.categories.map((x) => (x.id === c.id ? c : x)),
        })),
      deleteCategory: (id) =>
        set((s) => ({ categories: s.categories.filter((x) => x.id !== id) })),

      // Users
      users: INITIAL_USERS,
      blockUser: (id) =>
        set((s) => ({
          users: s.users.map((u) =>
            u.id === id ? { ...u, isBlocked: true } : u,
          ),
        })),
      unblockUser: (id) =>
        set((s) => ({
          users: s.users.map((u) =>
            u.id === id ? { ...u, isBlocked: false } : u,
          ),
        })),
      updateUserBalance: (id, amount, type) => {
        const desc = `Admin ${type === "add" ? "credit" : "debit"} - User ${id}`;
        if (type === "add") get().addWalletFunds(amount, desc);
        else get().deductWallet(amount, desc);
      },
      updateUserRole: (id, role) =>
        set((s) => ({
          users: s.users.map((u) => (u.id === id ? { ...u, role } : u)),
        })),
      addUser: (u) =>
        set((s) => {
          // Prevent duplicate phone signups
          const exists = s.users.find(
            (x) => x.phone === u.phone || (u.email && x.email === u.email),
          );
          if (exists) return {};
          return {
            users: [
              ...s.users,
              {
                accountStatus: "pending" as const,
                kyc: "pending" as const,
                walletBalance: 0,
                ...u,
                id: u.id || `u${Date.now()}`,
                referralCode:
                  u.referralCode || `AUG-${Date.now().toString().slice(-4)}`,
                joinDate: u.joinDate || new Date().toISOString().split("T")[0],
              },
            ],
          };
        }),
      deleteUser: (id) =>
        set((s) => ({ users: s.users.filter((u) => u.id !== id) })),
      approveKYC: (id) =>
        set((s) => ({
          users: s.users.map((u) =>
            u.id === id ? { ...u, kyc: "approved" as const } : u,
          ),
        })),
      rejectKYC: (id) =>
        set((s) => ({
          users: s.users.map((u) =>
            u.id === id ? { ...u, kyc: "rejected" as const } : u,
          ),
        })),
      approveUser: (id) =>
        set((s) => ({
          users: s.users.map((u) =>
            u.id === id ? { ...u, accountStatus: "approved" as const } : u,
          ),
        })),
      rejectUser: (id) =>
        set((s) => ({
          users: s.users.map((u) =>
            u.id === id ? { ...u, accountStatus: "rejected" as const } : u,
          ),
        })),
      updateUserFull: (id, updates) =>
        set((s) => ({
          users: s.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
        })),

      // Coupons
      coupons: INITIAL_COUPONS,
      addCoupon: (c) =>
        set((s) => ({
          coupons: [...s.coupons, { ...c, id: `c${Date.now()}` }],
        })),
      editCoupon: (c) =>
        set((s) => ({
          coupons: s.coupons.map((x) => (x.id === c.id ? c : x)),
        })),
      deleteCoupon: (id) =>
        set((s) => ({ coupons: s.coupons.filter((c) => c.id !== id) })),
      toggleCoupon: (id) =>
        set((s) => ({
          coupons: s.coupons.map((c) =>
            c.id === id ? { ...c, active: !c.active } : c,
          ),
        })),
      validateCoupon: (code, total) => {
        const coupon = get().coupons.find(
          (c) => c.code.toUpperCase() === code.toUpperCase() && c.active,
        );
        if (!coupon) return null;
        if (coupon.minOrder && total < coupon.minOrder) return null;
        return coupon;
      },

      // CMS
      announcementText:
        "\ud83c\udf3f Free delivery on orders above \u20b9500 | Use code HERBAL30 for 30% OFF | New products added daily!",
      setAnnouncementText: (text) => set({ announcementText: text }),
      siteTagline: "Herbal Solutions for Healthy Life",
      setSiteTagline: (t) => set({ siteTagline: t }),

      // Site Settings
      siteSettings: {
        name: "ANSHIKA UDHYOG GROUP",
        tagline: "Herbal Solutions for Healthy Life",
        logoUrl:
          "/assets/file_00000000ee8c7208b7195e3f0161d038-019d4889-394f-703e-b731-55c3d4643d69.png",
        phone: "+91 888-123-4567",
        whatsapp: "919999999999",
        address: "Old Bus Stand Bilaspur, Chhattisgarh",
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        youtube: "https://youtube.com",
        email: "info@anshikagroup.co.in",
      },
      updateSiteSettings: (s) =>
        set((st) => ({ siteSettings: { ...st.siteSettings, ...s } })),

      // Sliders
      sliders: SLIDERS,
      addSlider: (s) =>
        set((st) => ({
          sliders: [...st.sliders, { ...s, id: `sl${Date.now()}` }],
        })),
      editSlider: (s) =>
        set((st) => ({
          sliders: st.sliders.map((x) => (x.id === s.id ? s : x)),
        })),
      deleteSlider: (id) =>
        set((st) => ({ sliders: st.sliders.filter((s) => s.id !== id) })),

      // Home Settings
      homeSettings: {
        showSHG: true,
        showMLMPromo: true,
        reviews: [
          {
            id: "r1",
            name: "Priya S.",
            review:
              "Amazing quality products! Ashwagandha powder has changed my health.",
            rating: 5,
          },
          {
            id: "r2",
            name: "Rahul K.",
            review:
              "Fast delivery and genuine herbal products. Highly recommended!",
            rating: 5,
          },
          {
            id: "r3",
            name: "Anita M.",
            review:
              "Great income earning. Earning \u20b930k/month with team of 50!",
            rating: 4,
          },
        ],
      },
      updateHomeSettings: (h) =>
        set((s) => ({ homeSettings: { ...s.homeSettings, ...h } })),
      addReview: (r) =>
        set((s) => ({
          homeSettings: {
            ...s.homeSettings,
            reviews: [
              ...s.homeSettings.reviews,
              { ...r, id: `r${Date.now()}` },
            ],
          },
        })),
      deleteReview: (id) =>
        set((s) => ({
          homeSettings: {
            ...s.homeSettings,
            reviews: s.homeSettings.reviews.filter((r) => r.id !== id),
          },
        })),
    }),
    {
      name: "aug-store-v2",
      partialize: (s) => ({
        cart: s.cart,
        wishlist: s.wishlist,
        orders: s.orders,
        walletBalance: s.walletBalance,
        walletTxns: s.walletTxns,
        user: s.user,
        isLoggedIn: s.isLoggedIn,
        users: s.users,
        coupons: s.coupons,
        products: s.products,
        categories: s.categories,
        announcementText: s.announcementText,
        siteTagline: s.siteTagline,
        siteSettings: s.siteSettings,
        sliders: s.sliders,
        homeSettings: s.homeSettings,
      }),
    },
  ),
);
