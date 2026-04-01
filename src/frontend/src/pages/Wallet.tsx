import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  Plus,
  Wallet as WalletIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNav } from "../App";
import { useStore } from "../store/useStore";

const QUICK_AMOUNTS = [100, 200, 500, 1000];

export default function Wallet() {
  const { navigate } = useNav();
  const walletBalance = useStore((s) => s.walletBalance);
  const walletTxns = useStore((s) => s.walletTxns);
  const addWalletFunds = useStore((s) => s.addWalletFunds);
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);

  const handleAddMoney = () => {
    const amt = Number(amount);
    if (!amt || amt < 10) {
      toast.error("Minimum ₹10 required");
      return;
    }
    addWalletFunds(amt, "Added via UPI");
    toast.success(`₹${amt} added to wallet!`);
    setAmount("");
    setOpen(false);
  };

  return (
    <div className="fade-in-up" data-ocid="wallet.page">
      <div className="bg-brand-green px-3 py-3 flex items-center gap-3 sticky top-0 z-30">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="text-white"
          data-ocid="wallet.button"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white font-bold text-lg">My Wallet</h1>
      </div>

      <div className="px-3 py-4 space-y-4">
        {/* Balance Card */}
        <div className="bg-brand-green text-white rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-8 -translate-x-4" />
          <WalletIcon size={24} className="mb-2 opacity-70" />
          <p className="text-white/70 text-xs mb-1">Available Balance</p>
          <p className="text-3xl font-bold mb-4">
            ₹{walletBalance.toLocaleString()}
          </p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="bg-brand-yellow text-black font-bold text-sm px-6 py-2.5 rounded-full flex items-center gap-2 hover:opacity-90 transition"
                data-ocid="wallet.open_modal_button"
              >
                <Plus size={16} /> Add Money
              </button>
            </DialogTrigger>
            <DialogContent
              className="max-w-sm mx-auto"
              data-ocid="wallet.dialog"
            >
              <DialogHeader>
                <DialogTitle>Add Money to Wallet</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="flex gap-2 flex-wrap">
                  {QUICK_AMOUNTS.map((a) => (
                    <button
                      type="button"
                      key={a}
                      onClick={() => setAmount(String(a))}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                        amount === String(a)
                          ? "bg-brand-green text-white border-brand-green"
                          : "border-border"
                      }`}
                    >
                      ₹{a}
                    </button>
                  ))}
                </div>
                <Input
                  type="number"
                  placeholder="Enter custom amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-sm"
                  data-ocid="wallet.input"
                />
                <Button
                  onClick={handleAddMoney}
                  className="w-full bg-brand-green text-white rounded-full font-bold"
                  data-ocid="wallet.confirm_button"
                >
                  Add ₹{amount || "0"} via UPI
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 dark:bg-card rounded-xl p-3">
            <ArrowDownLeft size={18} className="text-green-600 mb-1" />
            <p className="text-xs text-muted-foreground">Total Credited</p>
            <p className="font-bold text-green-600">
              ₹
              {walletTxns
                .filter((t) => t.type === "credit")
                .reduce((s, t) => s + t.amount, 0)
                .toLocaleString()}
            </p>
          </div>
          <div className="bg-red-50 dark:bg-card rounded-xl p-3">
            <ArrowUpRight size={18} className="text-red-500 mb-1" />
            <p className="text-xs text-muted-foreground">Total Debited</p>
            <p className="font-bold text-red-500">
              ₹
              {walletTxns
                .filter((t) => t.type === "debit")
                .reduce((s, t) => s + t.amount, 0)
                .toLocaleString()}
            </p>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-card rounded-xl p-4 shadow-xs">
          <h3 className="font-bold text-sm mb-3">Transaction History</h3>
          {walletTxns.length === 0 ? (
            <p
              className="text-sm text-muted-foreground text-center py-4"
              data-ocid="wallet.empty_state"
            >
              No transactions yet
            </p>
          ) : (
            <div className="space-y-3">
              {walletTxns.map((txn, i) => (
                <div
                  key={txn.id}
                  className="flex items-center gap-3"
                  data-ocid={`wallet.item.${i + 1}`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                      txn.type === "credit"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {txn.type === "credit" ? (
                      <ArrowDownLeft size={16} />
                    ) : (
                      <ArrowUpRight size={16} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium line-clamp-1">
                      {txn.description}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {txn.date}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      txn.type === "credit" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {txn.type === "credit" ? "+" : "-"}₹{txn.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
