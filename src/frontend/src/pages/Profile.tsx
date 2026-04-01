import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  BadgeCheck,
  Banknote,
  CheckCircle2,
  Copy,
  Edit2,
  FileText,
  LogIn,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNav } from "../App";
import { useStore } from "../store/useStore";

export default function Profile() {
  const { navigate } = useNav();
  const { user, isLoggedIn, logout, updateUser, walletBalance, deductWallet } =
    useStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [address, setAddress] = useState(user?.address ?? "");

  // Password change
  const [pwSection, setPwSection] = useState(false);
  const [curPw, setCurPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confPw, setConfPw] = useState("");

  // Bank / UPI
  const [bankSection, setBankSection] = useState(false);
  const [bankNum, setBankNum] = useState(user?.bankAccount ?? "");
  const [upiVal, setUpiVal] = useState(user?.upiId ?? "");
  const [verifyingBank, setVerifyingBank] = useState(false);
  const [verifyingUpi, setVerifyingUpi] = useState(false);

  // Documents
  const [docSection, setDocSection] = useState(false);
  const [uploadingId, setUploadingId] = useState(false);
  const [uploadingCert, setUploadingCert] = useState(false);

  // Withdrawal
  const [withdrawSection, setWithdrawSection] = useState(false);
  const [withdrawAmt, setWithdrawAmt] = useState("");

  // Document overlay
  const [docOverlay, setDocOverlay] = useState<{
    open: boolean;
    url: string;
    title: string;
  }>({ open: false, url: "", title: "" });

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    updateUser({ name: name.trim(), phone, address });
    setEditing(false);
    toast.success("Profile updated!");
  };

  const copyReferral = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      toast.success("Referral code copied!");
    }
  };

  const handlePasswordChange = () => {
    if (!curPw) {
      toast.error("Current password required");
      return;
    }
    if (newPw.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (newPw !== confPw) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success("Password changed successfully!");
    setCurPw("");
    setNewPw("");
    setConfPw("");
    setPwSection(false);
  };

  const handleVerifyBank = () => {
    if (!bankNum) {
      toast.error("Enter bank account number");
      return;
    }
    setVerifyingBank(true);
    setTimeout(() => {
      updateUser({ bankAccount: bankNum, bankVerified: true });
      setVerifyingBank(false);
      toast.success("Bank account verified!");
    }, 2000);
  };

  const handleVerifyUpi = () => {
    if (!upiVal) {
      toast.error("Enter UPI ID");
      return;
    }
    setVerifyingUpi(true);
    setTimeout(() => {
      updateUser({ upiId: upiVal, upiVerified: true });
      setVerifyingUpi(false);
      toast.success("UPI ID verified!");
    }, 2000);
  };

  const handleFileUpload = (
    type: "idCard" | "certificate",
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (type === "idCard") setUploadingId(true);
    else setUploadingCert(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      if (type === "idCard") {
        updateUser({ idCardUrl: result });
        setUploadingId(false);
        toast.success("ID Card uploaded!");
      } else {
        updateUser({ certificateUrl: result });
        setUploadingCert(false);
        toast.success("Certificate uploaded!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleWithdraw = () => {
    const amount = Number(withdrawAmt);
    if (!amount || amount <= 0) {
      toast.error("Enter valid amount");
      return;
    }
    if (amount > walletBalance) {
      toast.error("Insufficient wallet balance");
      return;
    }
    deductWallet(amount, "Withdrawal request");
    setWithdrawAmt("");
    toast.success(
      "Withdrawal request submitted! Admin approval ke baad transfer hoga.",
    );
  };

  const statusColor = (s?: string) => {
    if (s === "approved") return "bg-green-100 text-green-700";
    if (s === "rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  if (!isLoggedIn || !user) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[80vh] gap-4 px-4"
        data-ocid="profile.page"
      >
        <div className="w-20 h-20 rounded-full bg-brand-green/20 flex items-center justify-center">
          <User size={40} className="text-brand-green" />
        </div>
        <h2 className="text-lg font-bold">Login to view profile</h2>
        <p className="text-sm text-muted-foreground text-center">
          Access your orders, wallet, and more
        </p>
        <Button
          onClick={() => navigate("login")}
          className="bg-brand-green text-white rounded-full px-8 font-bold"
          data-ocid="profile.primary_button"
        >
          <LogIn size={16} className="mr-2" /> Login / Sign Up
        </Button>
      </div>
    );
  }

  const isVerified = user.bankVerified || user.upiVerified;

  return (
    <div className="fade-in-up" data-ocid="profile.page">
      {/* Header */}
      <div className="bg-brand-green px-3 py-3 flex items-center gap-3 sticky top-0 z-30">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="text-white"
          data-ocid="profile.button"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white font-bold text-lg">My Profile</h1>
        <button
          type="button"
          onClick={() => (editing ? handleSave() : setEditing(true))}
          className="ml-auto text-white p-1"
          data-ocid="profile.edit_button"
        >
          {editing ? <Save size={20} /> : <Edit2 size={20} />}
        </button>
      </div>

      <div className="px-3 py-4 space-y-4">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-2 py-4">
          <div className="w-20 h-20 rounded-full bg-brand-green flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="font-bold text-lg">{user.name}</h2>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                user.role === "seller"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {user.role === "seller" ? "Verified Seller" : "Member"}
            </span>
            {user.accountStatus && (
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(user.accountStatus)}`}
              >
                {user.accountStatus === "approved"
                  ? "✓ Approved"
                  : user.accountStatus === "rejected"
                    ? "✗ Rejected"
                    : "⏳ Pending"}
              </span>
            )}
          </div>
        </div>

        {/* Account Status Card */}
        <div
          className={`rounded-xl p-4 ${statusColor(user.accountStatus)} border`}
        >
          <div className="flex items-center gap-2 mb-1">
            {user.accountStatus === "approved" ? (
              <CheckCircle2 size={16} />
            ) : user.accountStatus === "rejected" ? (
              <XCircle size={16} />
            ) : (
              <ShieldCheck size={16} />
            )}
            <h3 className="font-bold text-sm">Account Status</h3>
          </div>
          <p className="text-xs">
            {user.accountStatus === "approved"
              ? "Aapka account approved hai. Aap sabhi features use kar sakte hain."
              : user.accountStatus === "rejected"
                ? "Account reject hua hai. Admin se contact karein."
                : "Aapka account admin approval ke liye pending hai."}
          </p>
        </div>

        {/* Income Breakdown */}
        <div className="bg-card rounded-xl p-4 shadow-xs">
          <h3 className="font-bold text-sm mb-3">💰 Income Breakdown</h3>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-[10px] text-muted-foreground">Shopping</p>
              <p className="text-base font-bold text-green-600">₹1,200</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-[10px] text-muted-foreground">Utility</p>
              <p className="text-base font-bold text-blue-600">₹350</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <p className="text-[10px] text-muted-foreground">Network</p>
              <p className="text-base font-bold text-orange-600">₹2,500</p>
            </div>
          </div>
          <div className="bg-brand-green/10 rounded-lg p-2 flex justify-between items-center">
            <span className="text-xs font-semibold text-brand-green">
              Total Earnings
            </span>
            <span className="font-bold text-brand-green">₹4,050</span>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-card rounded-xl p-4 shadow-xs space-y-3">
          <h3 className="font-bold text-sm mb-2">Personal Information</h3>
          {editing ? (
            <>
              <div>
                <label
                  htmlFor="profile-name"
                  className="text-xs text-muted-foreground block mb-1"
                >
                  Full Name
                </label>
                <Input
                  id="profile-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-sm"
                  data-ocid="profile.input"
                />
              </div>
              <div>
                <label
                  htmlFor="profile-phone"
                  className="text-xs text-muted-foreground block mb-1"
                >
                  Phone
                </label>
                <Input
                  id="profile-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-sm"
                  data-ocid="profile.input"
                />
              </div>
              <div>
                <label
                  htmlFor="profile-address"
                  className="text-xs text-muted-foreground block mb-1"
                >
                  Address
                </label>
                <Input
                  id="profile-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="text-sm"
                  data-ocid="profile.input"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-brand-green text-white rounded-full text-sm"
                  data-ocid="profile.save_button"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setEditing(false)}
                  variant="outline"
                  className="flex-1 rounded-full text-sm"
                  data-ocid="profile.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <User size={14} className="text-brand-green" />
                <span className="text-sm">{user.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-brand-green" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-brand-green" />
                <span className="text-sm">{user.phone}</span>
              </div>
              {user.address && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-brand-green" />
                  <span className="text-sm">{user.address}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-green" />
                <span className="text-xs text-muted-foreground">
                  Member since {user.joinDate}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Password Change */}
        <div className="bg-card rounded-xl shadow-xs overflow-hidden">
          <button
            type="button"
            onClick={() => setPwSection(!pwSection)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
            data-ocid="profile.toggle"
          >
            <ShieldCheck size={16} className="text-brand-green" />
            <span className="text-sm font-semibold flex-1 text-left">
              Password Change
            </span>
            <span className="text-muted-foreground text-xs">
              {pwSection ? "▲" : "▼"}
            </span>
          </button>
          {pwSection && (
            <div className="px-4 pb-4 space-y-2">
              <Input
                type="password"
                placeholder="Current Password"
                value={curPw}
                onChange={(e) => setCurPw(e.target.value)}
                className="text-sm h-9"
                data-ocid="profile.input"
              />
              <Input
                type="password"
                placeholder="New Password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                className="text-sm h-9"
                data-ocid="profile.input"
              />
              <Input
                type="password"
                placeholder="Confirm New Password"
                value={confPw}
                onChange={(e) => setConfPw(e.target.value)}
                className="text-sm h-9"
                data-ocid="profile.input"
              />
              <Button
                onClick={handlePasswordChange}
                className="w-full bg-brand-green text-white rounded-full text-sm"
                data-ocid="profile.save_button"
              >
                Update Password
              </Button>
            </div>
          )}
        </div>

        {/* Bank & UPI */}
        <div className="bg-card rounded-xl shadow-xs overflow-hidden">
          <button
            type="button"
            onClick={() => setBankSection(!bankSection)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
            data-ocid="profile.toggle"
          >
            <Banknote size={16} className="text-brand-green" />
            <span className="text-sm font-semibold flex-1 text-left">
              Bank & UPI Details
            </span>
            <span className="text-muted-foreground text-xs">
              {bankSection ? "▲" : "▼"}
            </span>
          </button>
          {bankSection && (
            <div className="px-4 pb-4 space-y-3">
              <p className="text-[10px] text-muted-foreground bg-yellow-50 px-2 py-1.5 rounded">
                ⚠️ Withdrawal sirf verified account mein hoga — Admin approval ke
                baad
              </p>
              <div>
                <label
                  htmlFor="bank-num"
                  className="text-xs text-muted-foreground block mb-1"
                >
                  Bank Account Number
                </label>
                <div className="flex gap-2">
                  <Input
                    id="bank-num"
                    placeholder="Enter account number"
                    value={bankNum}
                    onChange={(e) => setBankNum(e.target.value)}
                    className="text-sm h-9 flex-1"
                    data-ocid="profile.input"
                  />
                  {user.bankVerified ? (
                    <span className="flex items-center gap-1 text-xs text-green-600 font-semibold px-2">
                      <BadgeCheck size={14} /> Verified
                    </span>
                  ) : (
                    <Button
                      onClick={handleVerifyBank}
                      disabled={verifyingBank}
                      className="bg-brand-green text-white text-xs h-9 px-3 rounded-lg"
                      data-ocid="profile.primary_button"
                    >
                      {verifyingBank ? "Verifying..." : "Verify"}
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="upi-val"
                  className="text-xs text-muted-foreground block mb-1"
                >
                  UPI ID
                </label>
                <div className="flex gap-2">
                  <Input
                    id="upi-val"
                    placeholder="name@upi"
                    value={upiVal}
                    onChange={(e) => setUpiVal(e.target.value)}
                    className="text-sm h-9 flex-1"
                    data-ocid="profile.input"
                  />
                  {user.upiVerified ? (
                    <span className="flex items-center gap-1 text-xs text-green-600 font-semibold px-2">
                      <BadgeCheck size={14} /> Verified
                    </span>
                  ) : (
                    <Button
                      onClick={handleVerifyUpi}
                      disabled={verifyingUpi}
                      className="bg-brand-green text-white text-xs h-9 px-3 rounded-lg"
                      data-ocid="profile.primary_button"
                    >
                      {verifyingUpi ? "Verifying..." : "Verify"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Documents */}
        <div className="bg-card rounded-xl shadow-xs overflow-hidden">
          <button
            type="button"
            onClick={() => setDocSection(!docSection)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
            data-ocid="profile.toggle"
          >
            <FileText size={16} className="text-brand-green" />
            <span className="text-sm font-semibold flex-1 text-left">
              Documents
            </span>
            <span className="text-muted-foreground text-xs">
              {docSection ? "▲" : "▼"}
            </span>
          </button>
          {docSection && (
            <div className="px-4 pb-4 space-y-3">
              {/* ID Card */}
              <div>
                <p className="text-xs font-medium mb-1">ID Card</p>
                <div className="flex items-center gap-3">
                  {user.idCardUrl && (
                    <button
                      type="button"
                      onClick={() =>
                        setDocOverlay({
                          open: true,
                          url: user.idCardUrl!,
                          title: "ID Card",
                        })
                      }
                      className="relative"
                    >
                      <img
                        src={user.idCardUrl}
                        alt="ID Card"
                        className="w-14 h-14 object-cover rounded-lg border"
                      />
                      <span className="absolute -top-1 -right-1 text-[9px] bg-green-500 text-white px-1 rounded-full">
                        ✓
                      </span>
                    </button>
                  )}
                  <label
                    htmlFor="profile-id-upload"
                    className="flex-1 cursor-pointer"
                  >
                    <div className="border-2 border-dashed border-brand-green/40 rounded-lg p-2 text-center text-xs text-brand-green hover:bg-brand-green/5 transition">
                      {uploadingId
                        ? "Uploading..."
                        : user.idCardUrl
                          ? "📷 Replace ID Card"
                          : "📷 Upload ID Card"}
                    </div>
                    <input
                      id="profile-id-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload("idCard", e)}
                      disabled={uploadingId}
                      data-ocid="profile.upload_button"
                    />
                  </label>
                </div>
              </div>
              {/* Certificate */}
              <div>
                <p className="text-xs font-medium mb-1">Certificate</p>
                <div className="flex items-center gap-3">
                  {user.certificateUrl && (
                    <button
                      type="button"
                      onClick={() =>
                        setDocOverlay({
                          open: true,
                          url: user.certificateUrl!,
                          title: "Certificate",
                        })
                      }
                      className="relative"
                    >
                      <img
                        src={user.certificateUrl}
                        alt="Certificate"
                        className="w-14 h-14 object-cover rounded-lg border"
                      />
                      <span className="absolute -top-1 -right-1 text-[9px] bg-green-500 text-white px-1 rounded-full">
                        ✓
                      </span>
                    </button>
                  )}
                  <label
                    htmlFor="profile-cert-upload"
                    className="flex-1 cursor-pointer"
                  >
                    <div className="border-2 border-dashed border-brand-green/40 rounded-lg p-2 text-center text-xs text-brand-green hover:bg-brand-green/5 transition">
                      {uploadingCert
                        ? "Uploading..."
                        : user.certificateUrl
                          ? "📷 Replace Certificate"
                          : "📷 Upload Certificate"}
                    </div>
                    <input
                      id="profile-cert-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload("certificate", e)}
                      disabled={uploadingCert}
                      data-ocid="profile.upload_button"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Withdrawal */}
        <div className="bg-card rounded-xl shadow-xs overflow-hidden">
          <button
            type="button"
            onClick={() => setWithdrawSection(!withdrawSection)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
            data-ocid="profile.toggle"
          >
            <Banknote size={16} className="text-brand-green" />
            <span className="text-sm font-semibold flex-1 text-left">
              Withdrawal
            </span>
            <span className="text-[10px] font-bold text-brand-green">
              ₹{walletBalance}
            </span>
            <span className="text-muted-foreground text-xs ml-1">
              {withdrawSection ? "▲" : "▼"}
            </span>
          </button>
          {withdrawSection && (
            <div className="px-4 pb-4 space-y-2">
              <p className="text-xs text-muted-foreground">
                Wallet Balance: <strong>₹{walletBalance}</strong>
              </p>
              {(user.bankAccount || user.upiId) && (
                <p className="text-[10px] bg-green-50 text-green-700 px-2 py-1.5 rounded">
                  Withdraw to: {user.upiId || user.bankAccount}
                </p>
              )}
              <Input
                type="number"
                placeholder="Enter amount"
                value={withdrawAmt}
                onChange={(e) => setWithdrawAmt(e.target.value)}
                className="text-sm h-9"
                data-ocid="profile.input"
              />
              {!isVerified ? (
                <div className="text-center">
                  <p className="text-xs text-red-500 mb-1">
                    Pehle bank/UPI verify karein
                  </p>
                  <Button
                    disabled
                    className="w-full bg-gray-200 text-gray-400 rounded-full text-sm cursor-not-allowed"
                  >
                    Request Withdrawal
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleWithdraw}
                  className="w-full bg-brand-green text-white rounded-full text-sm"
                  data-ocid="profile.primary_button"
                >
                  Request Withdrawal
                </Button>
              )}
              <p className="text-[10px] text-muted-foreground text-center">
                Admin approval ke baad aapke account mein transfer hoga
              </p>
            </div>
          )}
        </div>

        {/* Referral */}
        <div className="bg-brand-green text-white rounded-xl p-4">
          <p className="text-xs text-white/70 mb-1">Your Referral Code</p>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-widest flex-1">
              {user.referralCode}
            </span>
            <button
              type="button"
              onClick={copyReferral}
              className="p-2 bg-white/20 rounded-lg"
              data-ocid="profile.button"
            >
              <Copy size={16} />
            </button>
          </div>
          <p className="text-xs text-white/70 mt-1">
            Earn ₹500 for each referral!
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-card rounded-xl shadow-xs overflow-hidden">
          {[
            { label: "My Orders", page: "orders" as const, icon: "📦" },
            { label: "My Wallet", page: "wallet" as const, icon: "💰" },
            { label: "My Network", page: "mlm" as const, icon: "🌿" },
            { label: "Seller Panel", page: "seller" as const, icon: "🏪" },
          ].map((item) => (
            <button
              type="button"
              key={item.page}
              onClick={() => navigate(item.page)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-0"
              data-ocid="profile.link"
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium flex-1 text-left">
                {item.label}
              </span>
              <span className="text-muted-foreground text-xs">›</span>
            </button>
          ))}
        </div>

        <Button
          onClick={() => {
            logout();
            navigate("login");
          }}
          variant="outline"
          className="w-full rounded-full border-red-200 text-red-500 hover:bg-red-50"
          data-ocid="profile.delete_button"
        >
          Logout
        </Button>
      </div>

      {/* Document Overlay */}
      {docOverlay.open && (
        <dialog
          open
          className="fixed inset-0 m-0 w-full h-full max-w-none max-h-none bg-black/80 z-50 flex items-center justify-center p-4 border-0"
          onClick={() => setDocOverlay({ open: false, url: "", title: "" })}
          onKeyDown={(e) =>
            e.key === "Escape" &&
            setDocOverlay({ open: false, url: "", title: "" })
          }
        >
          <div className="bg-white rounded-2xl p-4 max-w-sm w-full">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold">{docOverlay.title}</h3>
              <button
                type="button"
                onClick={() =>
                  setDocOverlay({ open: false, url: "", title: "" })
                }
                className="text-muted-foreground"
                data-ocid="profile.close_button"
              >
                ✕
              </button>
            </div>
            <img
              src={docOverlay.url}
              alt={docOverlay.title}
              className="w-full rounded-lg"
            />
          </div>
        </dialog>
      )}
    </div>
  );
}
