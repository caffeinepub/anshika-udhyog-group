export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  oldPrice: number;
  description: string;
  rating: number;
  reviewCount: number;
  stock: number;
  badge?: string;
  sellerId?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "Pending" | "Packed" | "Shipped" | "Delivered";
  address: Address;
  date: string;
  paymentMethod: string;
  discount?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  referredBy?: string;
  role: "user" | "seller";
  isBlocked?: boolean;
  joinDate: string;
  kyc?: "pending" | "approved" | "rejected";
  bankAccount?: string;
  upiId?: string;
  bankVerified?: boolean;
  upiVerified?: boolean;
  idCardUrl?: string;
  certificateUrl?: string;
  accountStatus?: "pending" | "approved" | "rejected";
  address?: string;
}

export interface WalletTransaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: "percent" | "flat";
  active: boolean;
  minOrder?: number;
}

export interface Slider {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  bgColor: string;
}

export const CATEGORIES = [
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

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Aloe Vera Gel",
    category: "skin-care",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80",
    price: 199,
    oldPrice: 299,
    description:
      "Pure organic aloe vera gel for skin hydration, sunburn relief, and daily moisturizing. Rich in vitamins and minerals for healthy glowing skin.",
    rating: 4.5,
    reviewCount: 128,
    stock: 50,
    badge: "33% OFF",
  },
  {
    id: "p2",
    name: "Herbal Hair Oil",
    category: "hair-care",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80",
    price: 249,
    oldPrice: 399,
    description:
      "Traditional herbal hair oil blend with bhringraj, amla, and neem. Promotes hair growth, reduces dandruff, and strengthens roots.",
    rating: 4.7,
    reviewCount: 215,
    stock: 35,
    badge: "38% OFF",
  },
  {
    id: "p3",
    name: "Neem Face Wash",
    category: "skin-care",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80",
    price: 149,
    oldPrice: 199,
    description:
      "Antibacterial neem face wash that deep cleanses pores, controls oil, and prevents acne. Suitable for all skin types.",
    rating: 4.3,
    reviewCount: 89,
    stock: 60,
    badge: "25% OFF",
  },
  {
    id: "p4",
    name: "Turmeric Capsules",
    category: "herbal-supplements",
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80",
    price: 349,
    oldPrice: 499,
    description:
      "High-potency turmeric capsules with curcumin for anti-inflammation, immunity boost, and joint health. 500mg per capsule, 60 count.",
    rating: 4.8,
    reviewCount: 342,
    stock: 45,
    badge: "30% OFF",
  },
  {
    id: "p5",
    name: "Ashwagandha Powder",
    category: "herbal-supplements",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80",
    price: 449,
    oldPrice: 599,
    description:
      "Pure ashwagandha root powder for stress relief, energy boost, and hormonal balance. 100% organic, no additives. 250g pack.",
    rating: 4.6,
    reviewCount: 198,
    stock: 30,
    badge: "25% OFF",
  },
  {
    id: "p6",
    name: "Coconut Milk Shampoo",
    category: "hair-care",
    image:
      "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400&q=80",
    price: 249,
    oldPrice: 349,
    description:
      "Nourishing coconut milk shampoo with argan oil and keratin. Smooths frizz, adds shine, and strengthens brittle hair. 300ml.",
    rating: 4.4,
    reviewCount: 156,
    stock: 40,
    badge: "29% OFF",
  },
  {
    id: "p7",
    name: "Rose Water Toner",
    category: "skin-care",
    image:
      "https://images.unsplash.com/photo-1631390010024-80dbcb339ade?w=400&q=80",
    price: 179,
    oldPrice: 249,
    description:
      "Pure distilled rose water toner for skin tightening, pore minimizing, and natural fragrance. Alcohol-free, suitable for sensitive skin.",
    rating: 4.5,
    reviewCount: 203,
    stock: 55,
    badge: "28% OFF",
  },
  {
    id: "p8",
    name: "Triphala Churna",
    category: "wellness",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    price: 349,
    oldPrice: 449,
    description:
      "Traditional Ayurvedic Triphala powder blend of amalaki, bibhitaki, and haritaki. Supports digestion, detox, and overall wellness. 200g.",
    rating: 4.7,
    reviewCount: 267,
    stock: 25,
    badge: "22% OFF",
  },
];

export const SLIDERS: Slider[] = [
  {
    id: "s1",
    title: "Nature's Best Herbal Solutions",
    subtitle: "Discover 100% organic products for healthy living",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
    bgColor: "#0b8d4d",
  },
  {
    id: "s2",
    title: "Join Our Network & Earn",
    subtitle: "Earn ₹50,000+ monthly with our direct selling program",
    cta: "Join Now",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    bgColor: "#1a6b3c",
  },
  {
    id: "s3",
    title: "Flat 30% OFF Today!",
    subtitle: "Use code HERBAL30 on your first order",
    cta: "Claim Offer",
    image:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80",
    bgColor: "#c8960c",
  },
];

export const INITIAL_USERS: User[] = [
  {
    id: "u1",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "9876543210",
    referralCode: "AUG-PS001",
    role: "user",
    joinDate: "2024-01-15",
    accountStatus: "approved",
  },
  {
    id: "u2",
    name: "Rahul Kumar",
    email: "rahul@example.com",
    phone: "9765432109",
    referralCode: "AUG-RK002",
    role: "seller",
    joinDate: "2024-02-20",
    kyc: "approved",
    accountStatus: "approved",
  },
  {
    id: "u3",
    name: "Sunita Devi",
    email: "sunita@example.com",
    phone: "9654321098",
    referralCode: "AUG-SD003",
    role: "user",
    joinDate: "2024-03-10",
    accountStatus: "pending",
  },
  {
    id: "u4",
    name: "Amit Singh",
    email: "amit@example.com",
    phone: "9543210987",
    referralCode: "AUG-AS004",
    role: "seller",
    joinDate: "2024-01-05",
    kyc: "pending",
    accountStatus: "pending",
  },
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: "c1",
    code: "HERBAL30",
    discount: 30,
    type: "percent",
    active: true,
    minOrder: 500,
  },
  {
    id: "c2",
    code: "WELCOME50",
    discount: 50,
    type: "flat",
    active: true,
    minOrder: 300,
  },
  {
    id: "c3",
    code: "HEALTH20",
    discount: 20,
    type: "percent",
    active: false,
    minOrder: 400,
  },
];

export const SHG_ITEMS = [
  {
    id: "shg1",
    name: "Kisaan Organic Honey",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&q=80",
    price: 299,
    seller: "Women SHG - Rajasthan",
  },
  {
    id: "shg2",
    name: "Hand-Ground Masalas",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&q=80",
    price: 199,
    seller: "Mahila Mandal - UP",
  },
  {
    id: "shg3",
    name: "Neem Soap Bar",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&q=80",
    price: 89,
    seller: "SHG Group - Bihar",
  },
  {
    id: "shg4",
    name: "Herbal Gulal",
    image:
      "https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=200&q=80",
    price: 149,
    seller: "Rural Craft - MP",
  },
];
