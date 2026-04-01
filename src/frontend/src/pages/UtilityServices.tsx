import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Building2,
  CheckCircle,
  Flame,
  Shield,
  Smartphone,
  Tv,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNav } from "../App";

const SERVICES = [
  {
    id: "mobile",
    name: "Mobile Recharge",
    icon: <Smartphone size={28} />,
    color: "bg-blue-500",
    desc: "Prepaid & Postpaid",
  },
  {
    id: "electricity",
    name: "Electricity Bill",
    icon: <Zap size={28} />,
    color: "bg-yellow-500",
    desc: "All boards",
  },
  {
    id: "dth",
    name: "DTH Recharge",
    icon: <Tv size={28} />,
    color: "bg-purple-500",
    desc: "Tata, Dish, Sun",
  },
  {
    id: "gas",
    name: "Gas Booking",
    icon: <Flame size={28} />,
    color: "bg-orange-500",
    desc: "HP, Indane, Bharat",
  },
  {
    id: "insurance",
    name: "Insurance",
    icon: <Shield size={28} />,
    color: "bg-green-500",
    desc: "Life & Health",
  },
  {
    id: "banking",
    name: "Banking",
    icon: <Building2 size={28} />,
    color: "bg-teal-500",
    desc: "Money transfer",
  },
];

const TELECOM_OPERATORS = [
  { id: "jio", name: "Jio", color: "#0070ba" },
  { id: "airtel", name: "Airtel", color: "#e40000" },
  { id: "vi", name: "Vi (Vodafone Idea)", color: "#e4008c" },
  { id: "bsnl", name: "BSNL", color: "#f7931e" },
];

const RECHARGE_PLANS: Record<
  string,
  {
    amount: number;
    validity: string;
    data: string;
    calls: string;
    sms: string;
  }[]
> = {
  jio: [
    {
      amount: 149,
      validity: "28 days",
      data: "2GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 299,
      validity: "28 days",
      data: "3GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 399,
      validity: "56 days",
      data: "2.5GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 599,
      validity: "84 days",
      data: "2GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 999,
      validity: "84 days",
      data: "3GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 2999,
      validity: "365 days",
      data: "2.5GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
  ],
  airtel: [
    {
      amount: 155,
      validity: "28 days",
      data: "2GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 299,
      validity: "28 days",
      data: "2.5GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 409,
      validity: "56 days",
      data: "2GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 599,
      validity: "84 days",
      data: "2GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 839,
      validity: "84 days",
      data: "3GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 3359,
      validity: "365 days",
      data: "2.5GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
  ],
  vi: [
    {
      amount: 149,
      validity: "28 days",
      data: "2GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 269,
      validity: "28 days",
      data: "2GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 399,
      validity: "56 days",
      data: "1.5GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 479,
      validity: "70 days",
      data: "2GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 699,
      validity: "84 days",
      data: "2GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 2899,
      validity: "365 days",
      data: "1.5GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
  ],
  bsnl: [
    {
      amount: 107,
      validity: "30 days",
      data: "1GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 187,
      validity: "30 days",
      data: "2GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 347,
      validity: "60 days",
      data: "1.5GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 485,
      validity: "90 days",
      data: "2GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 797,
      validity: "180 days",
      data: "1GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
    {
      amount: 1999,
      validity: "365 days",
      data: "2GB/day",
      calls: "Unlimited",
      sms: "100/day",
    },
  ],
};

const DTH_OPERATORS = [
  { id: "tataplay", name: "Tata Play" },
  { id: "dishd2h", name: "Dish D2H" },
  { id: "sundir", name: "Sun Direct" },
  { id: "airtel_dth", name: "Airtel Digital TV" },
];

const DTH_PLANS: Record<
  string,
  { amount: number; validity: string; channels: string }[]
> = {
  tataplay: [
    { amount: 149, validity: "30 days", channels: "200+ channels" },
    { amount: 249, validity: "30 days", channels: "300+ channels (HD)" },
    { amount: 399, validity: "30 days", channels: "500+ channels (4K)" },
  ],
  dishd2h: [
    { amount: 129, validity: "30 days", channels: "180+ channels" },
    { amount: 229, validity: "30 days", channels: "280+ channels (HD)" },
    { amount: 349, validity: "30 days", channels: "400+ channels (HD+)" },
  ],
  sundir: [
    { amount: 119, validity: "30 days", channels: "150+ channels" },
    { amount: 199, validity: "30 days", channels: "250+ channels (HD)" },
  ],
  airtel_dth: [
    { amount: 159, validity: "30 days", channels: "200+ channels" },
    { amount: 279, validity: "30 days", channels: "350+ channels (HD)" },
    { amount: 449, validity: "30 days", channels: "500+ channels (4K)" },
  ],
};

const INSURANCE_COMPANIES = [
  {
    id: "lic",
    name: "LIC of India",
    logo: "🏛️",
    plans: [
      {
        name: "Jeevan Anand",
        premium: "₹5,000/yr",
        cover: "₹5 Lakh",
        type: "Life",
      },
      {
        name: "Jeevan Umang",
        premium: "₹7,500/yr",
        cover: "₹10 Lakh",
        type: "Life",
      },
      {
        name: "Tech Term",
        premium: "₹2,000/yr",
        cover: "₹50 Lakh",
        type: "Term",
      },
      {
        name: "Aarogya Rakshak",
        premium: "₹3,500/yr",
        cover: "₹5 Lakh",
        type: "Health",
      },
    ],
  },
  {
    id: "hdfc",
    name: "HDFC Life",
    logo: "🏦",
    plans: [
      {
        name: "Click 2 Protect",
        premium: "₹1,800/yr",
        cover: "₹1 Crore",
        type: "Term",
      },
      {
        name: "Sanchay Plus",
        premium: "₹10,000/yr",
        cover: "₹20 Lakh",
        type: "Life",
      },
      {
        name: "Health Guard",
        premium: "₹4,000/yr",
        cover: "₹5 Lakh",
        type: "Health",
      },
    ],
  },
  {
    id: "sbi",
    name: "SBI Life",
    logo: "🏪",
    plans: [
      {
        name: "eShield Next",
        premium: "₹1,500/yr",
        cover: "₹50 Lakh",
        type: "Term",
      },
      {
        name: "Smart Wealth Builder",
        premium: "₹12,000/yr",
        cover: "₹25 Lakh",
        type: "ULIP",
      },
      {
        name: "Arogya Shield",
        premium: "₹3,200/yr",
        cover: "₹3 Lakh",
        type: "Health",
      },
    ],
  },
  {
    id: "bajaj",
    name: "Bajaj Allianz",
    logo: "⭐",
    plans: [
      {
        name: "Life Smart Protect",
        premium: "₹2,100/yr",
        cover: "₹50 Lakh",
        type: "Term",
      },
      {
        name: "Health Guard",
        premium: "₹5,000/yr",
        cover: "₹10 Lakh",
        type: "Health",
      },
      {
        name: "iSecure Loan",
        premium: "₹3,800/yr",
        cover: "₹20 Lakh",
        type: "Life",
      },
    ],
  },
  {
    id: "icici",
    name: "ICICI Prudential",
    logo: "💎",
    plans: [
      {
        name: "iProtect Smart",
        premium: "₹1,600/yr",
        cover: "₹1 Crore",
        type: "Term",
      },
      {
        name: "Savings Suraksha",
        premium: "₹8,000/yr",
        cover: "₹15 Lakh",
        type: "Life",
      },
      {
        name: "Health Saver",
        premium: "₹4,500/yr",
        cover: "₹5 Lakh",
        type: "Health",
      },
    ],
  },
];

export default function UtilityServices() {
  const { navigate } = useNav();
  const [selected, setSelected] = useState<string | null>(null);
  const [operator, setOperator] = useState("");
  const [dthOperator, setDthOperator] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    number: "",
    amount: "",
    customAmt: "",
  });
  const [step, setStep] = useState<"form" | "plans" | "confirm">("form");
  const [insCompany, setInsCompany] = useState("");

  const service = SERVICES.find((s) => s.id === selected);

  const openService = (id: string) => {
    setSelected(id);
    setStep("form");
    setOperator("");
    setDthOperator("");
    setSelectedPlan(null);
    setFormData({ number: "", amount: "", customAmt: "" });
    setInsCompany("");
  };

  const handleSubmit = () => {
    const upiLink = `upi://pay?pa=8349600835@UPI&pn=ANSHIKA UDHYOG GROUP&am=${formData.amount || formData.customAmt}&cu=INR`;
    window.location.href = upiLink;
    toast.success(
      `${service?.name} request submitted! Redirecting to payment...`,
    );
    setSelected(null);
  };

  const plans = operator ? (RECHARGE_PLANS[operator] ?? []) : [];
  const dthPlans = dthOperator ? (DTH_PLANS[dthOperator] ?? []) : [];

  return (
    <div className="fade-in-up" data-ocid="utility.page">
      <div className="bg-brand-green px-3 py-3 flex items-center gap-3 sticky top-0 z-30">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="text-white"
          data-ocid="utility.button"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white font-bold text-lg">Utility Services</h1>
      </div>

      <div className="px-3 py-4">
        <p className="text-sm text-muted-foreground mb-4">
          Pay bills and recharge instantly
        </p>

        <div className="grid grid-cols-3 gap-3">
          {SERVICES.map((svc) => (
            <button
              type="button"
              key={svc.id}
              onClick={() => openService(svc.id)}
              className="bg-card rounded-2xl p-3 shadow-xs flex flex-col items-center gap-2 hover:shadow-md transition-shadow active:scale-95"
              data-ocid="utility.button"
            >
              <div
                className={`${svc.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center`}
              >
                {svc.icon}
              </div>
              <span className="text-[10px] font-semibold text-center leading-tight">
                {svc.name}
              </span>
              <span className="text-[9px] text-muted-foreground text-center">
                {svc.desc}
              </span>
            </button>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="mt-6">
          <h3 className="font-bold text-sm mb-3">Recent Transactions</h3>
          <div className="space-y-2">
            {[
              {
                service: "Mobile Recharge",
                detail: "9876543210 - Jio ₹299",
                date: "Today",
                status: "Success",
              },
              {
                service: "Electricity Bill",
                detail: "Consumer: 12345678",
                date: "Dec 25",
                status: "Success",
              },
              {
                service: "LIC Premium",
                detail: "Jeevan Anand - ₹5,000",
                date: "Dec 20",
                status: "Success",
              },
            ].map((t) => (
              <div
                key={t.service}
                className="bg-card rounded-xl p-3 shadow-xs flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <Zap size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold">{t.service}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {t.detail} • {t.date}
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === MOBILE RECHARGE DIALOG === */}
      <Dialog
        open={selected === "mobile"}
        onOpenChange={(o) => !o && setSelected(null)}
      >
        <DialogContent
          className="max-w-sm max-h-[90vh] overflow-y-auto"
          data-ocid="utility.dialog"
        >
          <DialogHeader>
            <DialogTitle>📱 Mobile Recharge</DialogTitle>
          </DialogHeader>

          {step === "form" && (
            <div className="space-y-3 pt-2">
              <div>
                <Label className="text-xs mb-1 block">Mobile Number</Label>
                <Input
                  placeholder="Enter 10-digit number"
                  maxLength={10}
                  value={formData.number}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, number: e.target.value }))
                  }
                  data-ocid="utility.input"
                />
              </div>
              <div>
                <Label className="text-xs mb-2 block">Select Operator</Label>
                <div className="grid grid-cols-2 gap-2">
                  {TELECOM_OPERATORS.map((op) => (
                    <button
                      key={op.id}
                      type="button"
                      onClick={() => setOperator(op.id)}
                      className={`p-2 rounded-xl border-2 text-xs font-semibold transition-all ${
                        operator === op.id
                          ? "border-brand-green bg-brand-green/10"
                          : "border-border"
                      }`}
                      style={{
                        borderColor: operator === op.id ? op.color : undefined,
                      }}
                    >
                      <span style={{ color: op.color }}>{op.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              {operator && (
                <Button
                  onClick={() => setStep("plans")}
                  className="w-full bg-brand-green text-white rounded-full font-bold"
                  disabled={!formData.number || formData.number.length < 10}
                  data-ocid="utility.submit_button"
                >
                  View Recharge Plans
                </Button>
              )}
            </div>
          )}

          {step === "plans" && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold">
                  Plans for{" "}
                  {TELECOM_OPERATORS.find((o) => o.id === operator)?.name}
                </span>
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="text-xs text-brand-green"
                >
                  ← Change
                </button>
              </div>
              {plans.map((plan, idx) => (
                <button
                  key={`plan-${idx}-${plan.amount}`}
                  type="button"
                  onClick={() => {
                    setSelectedPlan(idx);
                    setFormData((f) => ({ ...f, amount: String(plan.amount) }));
                  }}
                  className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                    selectedPlan === idx
                      ? "border-brand-green bg-brand-green/5"
                      : "border-border"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-sm text-brand-green">
                        ₹{plan.amount}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {plan.data} • {plan.calls}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        SMS: {plan.sms}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        {plan.validity}
                      </span>
                      {selectedPlan === idx && (
                        <CheckCircle
                          size={16}
                          className="text-brand-green mt-1 ml-auto"
                        />
                      )}
                    </div>
                  </div>
                </button>
              ))}
              <div>
                <Label className="text-[10px] text-muted-foreground">
                  Or enter custom amount
                </Label>
                <Input
                  placeholder="Custom amount"
                  type="number"
                  value={formData.customAmt}
                  onChange={(e) => {
                    setFormData((f) => ({
                      ...f,
                      customAmt: e.target.value,
                      amount: e.target.value,
                    }));
                    setSelectedPlan(null);
                  }}
                  className="h-9 text-sm mt-1"
                />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={!formData.amount}
                className="w-full bg-brand-green text-white rounded-full font-bold"
              >
                Pay ₹{formData.amount || "--"} via UPI
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* === DTH DIALOG === */}
      <Dialog
        open={selected === "dth"}
        onOpenChange={(o) => !o && setSelected(null)}
      >
        <DialogContent
          className="max-w-sm max-h-[90vh] overflow-y-auto"
          data-ocid="utility.dialog"
        >
          <DialogHeader>
            <DialogTitle>📺 DTH Recharge</DialogTitle>
          </DialogHeader>
          {step === "form" && (
            <div className="space-y-3 pt-2">
              <div>
                <Label className="text-xs mb-1 block">Customer ID / RMN</Label>
                <Input
                  placeholder="Enter customer ID"
                  value={formData.number}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, number: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs mb-2 block">
                  Select DTH Operator
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {DTH_OPERATORS.map((op) => (
                    <button
                      key={op.id}
                      type="button"
                      onClick={() => setDthOperator(op.id)}
                      className={`p-2 rounded-xl border-2 text-xs font-semibold transition-all ${
                        dthOperator === op.id
                          ? "border-brand-green bg-brand-green/10 text-brand-green"
                          : "border-border"
                      }`}
                    >
                      {op.name}
                    </button>
                  ))}
                </div>
              </div>
              {dthOperator && (
                <Button
                  onClick={() => setStep("plans")}
                  className="w-full bg-brand-green text-white rounded-full font-bold"
                  disabled={!formData.number}
                >
                  View Plans
                </Button>
              )}
            </div>
          )}
          {step === "plans" && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold">
                  {DTH_OPERATORS.find((o) => o.id === dthOperator)?.name} Plans
                </span>
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="text-xs text-brand-green"
                >
                  ← Change
                </button>
              </div>
              {dthPlans.map((plan, idx) => (
                <button
                  key={`dth-${idx}-${plan.amount}`}
                  type="button"
                  onClick={() => {
                    setSelectedPlan(idx);
                    setFormData((f) => ({ ...f, amount: String(plan.amount) }));
                  }}
                  className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                    selectedPlan === idx
                      ? "border-brand-green bg-brand-green/5"
                      : "border-border"
                  }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold text-sm text-brand-green">
                        ₹{plan.amount}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {plan.channels}
                      </p>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full h-fit">
                      {plan.validity}
                    </span>
                  </div>
                </button>
              ))}
              <Button
                onClick={handleSubmit}
                disabled={!formData.amount}
                className="w-full bg-brand-green text-white rounded-full font-bold"
              >
                Pay ₹{formData.amount || "--"} via UPI
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* === INSURANCE DIALOG === */}
      <Dialog
        open={selected === "insurance"}
        onOpenChange={(o) => !o && setSelected(null)}
      >
        <DialogContent
          className="max-w-sm max-h-[90vh] overflow-y-auto"
          data-ocid="utility.dialog"
        >
          <DialogHeader>
            <DialogTitle>🛡️ Insurance Plans</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            {!insCompany ? (
              <>
                <p className="text-xs text-muted-foreground">
                  Select an insurance company to view plans
                </p>
                <div className="space-y-2">
                  {INSURANCE_COMPANIES.map((co) => (
                    <button
                      key={co.id}
                      type="button"
                      onClick={() => setInsCompany(co.id)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-border hover:border-brand-green hover:bg-brand-green/5 transition-all text-left"
                    >
                      <span className="text-2xl">{co.logo}</span>
                      <span className="font-semibold text-sm">{co.name}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">
                    {INSURANCE_COMPANIES.find((c) => c.id === insCompany)?.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setInsCompany("")}
                    className="text-xs text-brand-green"
                  >
                    ← Back
                  </button>
                </div>
                <div className="space-y-2">
                  {INSURANCE_COMPANIES.find(
                    (c) => c.id === insCompany,
                  )?.plans.map((plan) => (
                    <div
                      key={plan.name}
                      className="p-3 rounded-xl border border-border bg-card"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-sm">{plan.name}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            Premium: {plan.premium}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Cover: {plan.cover}
                          </p>
                        </div>
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${
                            plan.type === "Health"
                              ? "bg-green-100 text-green-700"
                              : plan.type === "Term"
                                ? "bg-blue-100 text-blue-700"
                                : plan.type === "ULIP"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {plan.type}
                        </span>
                      </div>
                      <Button
                        onClick={() => {
                          toast.success(
                            `Interest registered for ${plan.name}. Our agent will contact you soon!`,
                          );
                          setSelected(null);
                        }}
                        size="sm"
                        className="w-full mt-2 bg-brand-green text-white rounded-full text-xs h-8"
                      >
                        Apply / Pay Premium
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* === ELECTRICITY / GAS / BANKING DIALOG === */}
      <Dialog
        open={
          selected === "electricity" ||
          selected === "gas" ||
          selected === "banking"
        }
        onOpenChange={(o) => !o && setSelected(null)}
      >
        <DialogContent className="max-w-sm" data-ocid="utility.dialog">
          <DialogHeader>
            <DialogTitle>{service?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <div>
              <Label className="text-xs mb-1 block">
                {selected === "electricity"
                  ? "Consumer Number"
                  : selected === "gas"
                    ? "Customer ID"
                    : "Account / Mobile Number"}
              </Label>
              <Input
                placeholder="Enter number"
                value={formData.number}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, number: e.target.value }))
                }
                data-ocid="utility.input"
              />
            </div>
            <div>
              <Label className="text-xs mb-1 block">Amount (₹)</Label>
              <Input
                placeholder="Enter amount"
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, amount: e.target.value }))
                }
                data-ocid="utility.input"
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!formData.number || !formData.amount}
              className="w-full bg-brand-green text-white rounded-full font-bold"
              data-ocid="utility.submit_button"
            >
              Pay via UPI
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
