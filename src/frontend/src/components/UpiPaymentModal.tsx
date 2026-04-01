import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, X } from "lucide-react";
import { useState } from "react";

interface UpiPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderId?: string;
  onSuccess?: () => void;
}

const UPI_ID = "8349600835@UPI";
const PAYEE_NAME = "ANSHIKA%20UDHYOG%20GROUP";

const UPI_APPS = [
  {
    name: "PhonePe",
    color: "bg-[#5F259F] hover:bg-[#4a1d7a]",
    emoji: "💜",
  },
  {
    name: "Google Pay",
    color: "bg-[#1a73e8] hover:bg-[#1557b0]",
    emoji: "🔵",
  },
  {
    name: "Paytm",
    color: "bg-[#00BAF2] hover:bg-[#009fd0]",
    emoji: "🔷",
  },
];

export default function UpiPaymentModal({
  isOpen,
  onClose,
  amount,
  orderId,
  onSuccess,
}: UpiPaymentModalProps) {
  const [paid, setPaid] = useState(false);

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${PAYEE_NAME}&am=${amount}&cu=INR${orderId ? `&tn=Order_${orderId}` : ""}`;

  const handlePay = (appName: string) => {
    window.location.href = upiLink;
    // Fallback: try intent links
    if (appName === "PhonePe") {
      window.open(
        `phonepe://pay?pa=${UPI_ID}&pn=${PAYEE_NAME}&am=${amount}&cu=INR`,
        "_blank",
      );
    } else if (appName === "Google Pay") {
      window.open(
        `tez://upi/pay?pa=${UPI_ID}&pn=${PAYEE_NAME}&am=${amount}&cu=INR`,
        "_blank",
      );
    } else {
      window.open(upiLink, "_blank");
    }
  };

  const handleMarkPaid = () => {
    setPaid(true);
    setTimeout(() => {
      setPaid(false);
      onSuccess?.();
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-sm mx-auto rounded-2xl p-0 overflow-hidden"
        data-ocid="upi.dialog"
      >
        {/* Header */}
        <div className="bg-brand-green text-white px-5 py-4">
          <DialogHeader>
            <DialogTitle className="text-white font-bold text-base">
              💳 UPI Payment
            </DialogTitle>
          </DialogHeader>
          <p className="text-white/80 text-xs mt-1">ANSHIKA UDHYOG GROUP</p>
        </div>

        {paid ? (
          <div className="flex flex-col items-center justify-center py-10 px-5 gap-3">
            <CheckCircle2 size={56} className="text-brand-green" />
            <h3 className="font-bold text-lg text-brand-green">
              Payment Successful!
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Thank you for your payment. Your order has been confirmed.
            </p>
          </div>
        ) : (
          <div className="p-5 space-y-5">
            {/* Amount */}
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">
                Amount to Pay
              </p>
              <p className="text-3xl font-bold text-brand-green">
                ₹{amount.toLocaleString()}
              </p>
              {orderId && (
                <Badge variant="secondary" className="mt-2 text-xs">
                  Order #{orderId}
                </Badge>
              )}
            </div>

            {/* UPI ID */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">UPI ID</p>
              <p className="font-mono text-sm font-semibold text-foreground">
                {UPI_ID}
              </p>
            </div>

            {/* Pay Buttons */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium">
                Choose Payment App:
              </p>
              {UPI_APPS.map((app) => (
                <button
                  key={app.name}
                  type="button"
                  onClick={() => handlePay(app.name)}
                  className={`w-full ${app.color} text-white rounded-xl py-3 font-semibold text-sm transition-all active:scale-95 flex items-center justify-center gap-2`}
                  data-ocid="upi.primary_button"
                >
                  <span>{app.emoji}</span>
                  Pay with {app.name}
                </button>
              ))}
            </div>

            {/* Mark as paid */}
            <div className="border-t border-border pt-4">
              <Button
                onClick={handleMarkPaid}
                className="w-full bg-brand-green text-white rounded-xl font-bold"
                data-ocid="upi.confirm_button"
              >
                ✅ Mark as Paid
              </Button>
              <p className="text-[10px] text-muted-foreground text-center mt-2">
                Click after completing payment in your UPI app
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full text-xs text-muted-foreground py-1"
              data-ocid="upi.cancel_button"
            >
              Cancel
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
