import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useRef } from "react";

interface UserIDCardProps {
  user: {
    name: string;
    phone: string;
    referralCode: string;
    joinDate: string;
    accountStatus?: string;
  };
}

export function UserIDCard({ user }: UserIDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const downloadCard = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 680;
    canvas.height = 426;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 680, 426);
    grad.addColorStop(0, "#0b8d4d");
    grad.addColorStop(1, "#065f34");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(0, 0, 680, 426, 20);
    ctx.fill();

    // Decorative circles (background pattern)
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(560, -40, 180, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(620, 380, 120, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(30, 300, 100, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Chip icon (top-left)
    ctx.fillStyle = "#FFD600";
    ctx.beginPath();
    ctx.roundRect(28, 28, 48, 36, 6);
    ctx.fill();
    ctx.strokeStyle = "#c9a800";
    ctx.lineWidth = 1;
    ctx.strokeRect(36, 36, 32, 20);
    ctx.beginPath();
    ctx.moveTo(52, 28);
    ctx.lineTo(52, 64);
    ctx.strokeStyle = "#c9a800";
    ctx.stroke();

    // Company name
    ctx.fillStyle = "#FFD600";
    ctx.font = "bold 22px Arial";
    ctx.fillText("ANSHIKA UDHYOG GROUP", 90, 52);

    // Tagline
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.font = "13px Arial";
    ctx.fillText("Herbal Solutions for Healthy Life", 90, 72);

    // Separator line
    ctx.strokeStyle = "rgba(255,214,0,0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(28, 90);
    ctx.lineTo(652, 90);
    ctx.stroke();

    // Avatar circle
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.beginPath();
    ctx.arc(100, 220, 72, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#FFD600";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(100, 220, 72, 0, Math.PI * 2);
    ctx.stroke();

    // Initials
    ctx.fillStyle = "#FFD600";
    ctx.font = "bold 52px Arial";
    ctx.textAlign = "center";
    ctx.fillText(initials, 100, 236);
    ctx.textAlign = "left";

    // User details
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 28px Arial";
    ctx.fillText(user.name, 200, 135);

    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "16px Arial";
    ctx.fillText(`Member ID: ${user.referralCode}`, 200, 170);
    ctx.fillText(`Mobile: ${user.phone}`, 200, 196);
    ctx.fillText(`Since: ${user.joinDate}`, 200, 222);

    // APPROVED badge background
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.beginPath();
    ctx.roundRect(200, 238, 220, 34, 17);
    ctx.fill();
    ctx.strokeStyle = "#FFD600";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(200, 238, 220, 34, 17);
    ctx.stroke();
    ctx.fillStyle = "#FFD600";
    ctx.font = "bold 14px Arial";
    ctx.fillText("✓ APPROVED MEMBER", 218, 260);

    // Bottom bar
    ctx.fillStyle = "#FFD600";
    ctx.beginPath();
    ctx.roundRect(0, 358, 680, 68, [0, 0, 20, 20]);
    ctx.fill();

    ctx.fillStyle = "#0b8d4d";
    ctx.font = "bold 18px Arial";
    ctx.fillText("✓ APPROVED MEMBER", 28, 400);
    ctx.textAlign = "right";
    ctx.font = "14px Arial";
    ctx.fillText("ANSHIKA UDHYOG GROUP", 652, 400);
    ctx.textAlign = "left";

    // Download
    const link = document.createElement("a");
    link.download = `${user.name.replace(/\s+/g, "-")}-ID-Card.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* PVC Card Display */}
      <div
        ref={cardRef}
        id="user-id-card"
        style={{
          width: "340px",
          height: "213px",
          background: "linear-gradient(135deg, #0b8d4d 0%, #065f34 100%)",
          borderRadius: "12px",
          position: "relative",
          overflow: "hidden",
          boxShadow:
            "0 8px 32px rgba(11,141,77,0.4), 0 2px 8px rgba(0,0,0,0.3)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            background: "rgba(255,255,255,0.07)",
            borderRadius: "50%",
            top: "-60px",
            right: "-40px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "120px",
            height: "120px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "50%",
            bottom: "-30px",
            right: "40px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "80px",
            height: "80px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "50%",
            bottom: "20px",
            left: "-20px",
          }}
        />

        {/* Top section */}
        <div
          style={{
            padding: "12px 14px 6px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* Chip */}
          <div
            style={{
              width: "28px",
              height: "20px",
              background: "#FFD600",
              borderRadius: "3px",
              border: "1px solid #c9a800",
              flexShrink: 0,
            }}
          />
          <div>
            <div
              style={{
                color: "#FFD600",
                fontWeight: "bold",
                fontSize: "11px",
                letterSpacing: "0.5px",
              }}
            >
              ANSHIKA UDHYOG GROUP
            </div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "8px" }}>
              Herbal Solutions for Healthy Life
            </div>
          </div>
        </div>

        {/* Separator */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,214,0,0.3)",
            margin: "0 14px",
          }}
        />

        {/* Center content */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            padding: "10px 14px",
            alignItems: "center",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: "2px solid #FFD600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFD600",
              fontWeight: "bold",
              fontSize: "22px",
              flexShrink: 0,
            }}
          >
            {initials}
          </div>

          {/* Details */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "14px",
                marginBottom: "3px",
              }}
            >
              {user.name}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "9px",
                lineHeight: "1.6",
              }}
            >
              <div>Member ID: {user.referralCode}</div>
              <div>Mobile: {user.phone}</div>
              <div>Since: {user.joinDate}</div>
            </div>
            {/* Approved badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
                marginTop: "4px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid #FFD600",
                borderRadius: "10px",
                padding: "1px 8px",
                color: "#FFD600",
                fontSize: "8px",
                fontWeight: "bold",
              }}
            >
              ✓ APPROVED MEMBER
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "#FFD600",
            padding: "5px 14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "#0b8d4d",
              fontWeight: "bold",
              fontSize: "9px",
            }}
          >
            ✓ APPROVED MEMBER
          </span>
          <span
            style={{
              color: "#065f34",
              fontSize: "8px",
              fontWeight: "600",
            }}
          >
            ANSHIKA UDHYOG GROUP
          </span>
        </div>
      </div>

      {/* Download Button */}
      <Button
        onClick={downloadCard}
        className="bg-brand-green text-white hover:bg-brand-green/90 rounded-full gap-2 text-sm font-semibold"
        data-ocid="profile.download_button"
      >
        <Download className="w-4 h-4" />
        Download ID Card
      </Button>
    </div>
  );
}
