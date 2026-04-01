import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle, Eye, EyeOff, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNav } from "../App";
import type { User } from "../data/mockData";
import { useStore } from "../store/useStore";

export default function Login() {
  const { navigate } = useNav();
  const login = useStore((s) => s.login);
  const addUser = useStore((s) => s.addUser);
  const addWalletFunds = useStore((s) => s.addWalletFunds);
  const siteSettings = useStore((s) => s.siteSettings);
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    referral: "",
  });
  const [loading, setLoading] = useState(false);
  // OTP flow
  const [otpStep, setOtpStep] = useState<"form" | "otp" | "done">("form");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const sendOtp = () => {
    if (!form.phone || form.phone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    setOtpStep("otp");
    toast.success(`OTP sent to +91 ${form.phone} (Demo OTP: ${code})`);
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setOtpStep("done");
      toast.success("Mobile verified successfully!");
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const handleLogin = () => {
    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user: User = {
        id: `u${Date.now()}`,
        name: form.email.split("@")[0],
        email: form.email,
        phone: form.phone || "9999999999",
        referralCode: `AUG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        referredBy: form.referral || undefined,
        role: "user",
        joinDate: new Date().toISOString().split("T")[0],
      };
      login(user);
      setLoading(false);
      toast.success(`Welcome back, ${user.name}!`);
      navigate("home");
    }, 1000);
  };

  const handleSignup = () => {
    if (!form.name || !form.phone || !form.password) {
      toast.error("Please fill all required fields");
      return;
    }
    if (otpStep !== "done") {
      toast.error("Please verify your mobile number with OTP first");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const userId = `u${Date.now()}`;
      const newUser: User = {
        id: userId,
        name: form.name,
        email: form.email || `${form.phone}@aug.user`,
        phone: form.phone,
        referralCode: `AUG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        referredBy: form.referral || undefined,
        role: "user",
        joinDate: new Date().toISOString().split("T")[0],
        accountStatus: "pending",
        kyc: "pending",
      };
      addUser(newUser);
      login(newUser);
      addWalletFunds(500, "Welcome bonus - New registration");
      setLoading(false);
      toast.success(
        `Welcome to AUG, ${newUser.name}! ₹500 welcome bonus added.`,
      );
      navigate("home");
    }, 1200);
  };

  return (
    <div
      className="min-h-screen bg-background font-poppins"
      data-ocid="login.page"
    >
      {/* Header */}
      <div className="bg-brand-green px-3 py-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="text-white"
          data-ocid="login.button"
        >
          <ArrowLeft size={22} />
        </button>
        <span className="text-white font-bold text-lg">Account</span>
      </div>

      {/* Brand */}
      <div className="bg-brand-green pb-8 pt-2 flex flex-col items-center">
        <img
          src={siteSettings.logoUrl}
          alt="Logo"
          className="h-16 w-16 rounded-full border-4 border-brand-yellow object-cover mb-2"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/64x64/0b8d4d/FFD600?text=AUG";
          }}
        />
        <h2 className="text-white font-bold text-lg">{siteSettings.name}</h2>
        <p className="text-white/70 text-xs">{siteSettings.tagline}</p>
      </div>

      <div className="px-4 -mt-4">
        <div className="bg-card rounded-2xl shadow-card p-5">
          {/* Tabs */}
          <div className="flex bg-muted rounded-full p-1 mb-5">
            <button
              type="button"
              onClick={() => {
                setTab("login");
                setOtpStep("form");
              }}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
                tab === "login"
                  ? "bg-brand-green text-white shadow"
                  : "text-muted-foreground"
              }`}
              data-ocid="login.tab"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setTab("signup");
                setOtpStep("form");
              }}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
                tab === "signup"
                  ? "bg-brand-green text-white shadow"
                  : "text-muted-foreground"
              }`}
              data-ocid="login.tab"
            >
              Sign Up
            </button>
          </div>

          <div className="space-y-3">
            {tab === "signup" && (
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Full Name *
                </Label>
                <Input
                  placeholder="Priya Sharma"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="h-10 text-sm"
                  data-ocid="login.input"
                />
              </div>
            )}

            {/* Phone with OTP */}
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                {tab === "login"
                  ? "Mobile / Email *"
                  : "Mobile Number * (OTP verification)"}
              </Label>
              {tab === "signup" ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={form.phone}
                      onChange={(e) => {
                        update("phone", e.target.value);
                        setOtpStep("form");
                      }}
                      className="h-10 text-sm flex-1"
                      disabled={otpStep === "done"}
                      data-ocid="login.input"
                    />
                    {otpStep === "done" ? (
                      <span className="flex items-center gap-1 text-green-600 text-xs font-semibold px-2">
                        <CheckCircle size={16} /> Verified
                      </span>
                    ) : (
                      <Button
                        type="button"
                        onClick={sendOtp}
                        size="sm"
                        className="bg-brand-green text-white h-10 px-3 text-xs rounded-lg"
                        disabled={otpStep === "otp"}
                      >
                        <Phone size={14} className="mr-1" />
                        {otpStep === "otp" ? "Sent" : "Send OTP"}
                      </Button>
                    )}
                  </div>

                  {otpStep === "otp" && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="h-10 text-sm flex-1"
                        data-ocid="login.input"
                      />
                      <Button
                        type="button"
                        onClick={verifyOtp}
                        size="sm"
                        className="bg-brand-yellow text-black h-10 px-3 text-xs rounded-lg font-bold"
                      >
                        Verify
                      </Button>
                    </div>
                  )}

                  {otpStep === "otp" && (
                    <button
                      type="button"
                      onClick={sendOtp}
                      className="text-[10px] text-brand-green"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              ) : (
                <Input
                  placeholder="email@example.com or mobile"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="h-10 text-sm"
                  data-ocid="login.input"
                />
              )}
            </div>

            {tab === "signup" && (
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Email (optional)
                </Label>
                <Input
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="h-10 text-sm"
                  data-ocid="login.input"
                />
              </div>
            )}

            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                Password *
              </Label>
              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  className="h-10 text-sm pr-10"
                  data-ocid="login.input"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {tab === "signup" && (
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Referral Code (optional)
                </Label>
                <Input
                  placeholder="AUG-XXXX"
                  value={form.referral}
                  onChange={(e) => update("referral", e.target.value)}
                  className="h-10 text-sm"
                  data-ocid="login.input"
                />
              </div>
            )}

            <Button
              onClick={tab === "login" ? handleLogin : handleSignup}
              disabled={loading}
              className="w-full bg-brand-green text-white rounded-full h-11 font-bold text-base mt-2"
              data-ocid="login.submit_button"
            >
              {loading
                ? "Please wait..."
                : tab === "login"
                  ? "Login"
                  : "Create Account"}
            </Button>

            {tab === "signup" && (
              <p className="text-[10px] text-muted-foreground text-center">
                By signing up, you agree to our Terms & Conditions and Privacy
                Policy
              </p>
            )}
          </div>
        </div>

        {/* Admin link */}
        <div className="text-center mt-4 pb-4">
          <button
            type="button"
            onClick={() => navigate("admin")}
            className="text-xs text-muted-foreground hover:text-brand-green transition"
            data-ocid="login.link"
          >
            Admin Panel Access
          </button>
        </div>
      </div>
    </div>
  );
}
