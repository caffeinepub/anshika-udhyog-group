import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface SellerCertificateProps {
  user: {
    name: string;
    referralCode: string;
    joinDate: string;
    kyc?: string;
  };
}

export function SellerCertificate({ user }: SellerCertificateProps) {
  const downloadCertificate = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 560;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // White background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 800, 560);

    // Outer border
    ctx.strokeStyle = "#0b8d4d";
    ctx.lineWidth = 4;
    ctx.strokeRect(12, 12, 776, 536);

    // Inner border
    ctx.strokeStyle = "#FFD600";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(22, 22, 756, 516);

    // Watermark AUG
    ctx.globalAlpha = 0.04;
    ctx.fillStyle = "#0b8d4d";
    ctx.font = "bold 200px Arial";
    ctx.textAlign = "center";
    ctx.fillText("AUG", 400, 340);
    ctx.globalAlpha = 1;
    ctx.textAlign = "left";

    // Top leaf icon area
    ctx.fillStyle = "#0b8d4d";
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "center";
    ctx.fillText("🌿 ANSHIKA UDHYOG GROUP", 400, 80);

    ctx.fillStyle = "#666666";
    ctx.font = "14px Arial";
    ctx.fillText("Herbal Solutions for Healthy Life", 400, 106);

    // Divider line
    ctx.strokeStyle = "#0b8d4d";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, 120);
    ctx.lineTo(740, 120);
    ctx.stroke();

    // Certificate heading
    ctx.fillStyle = "#c9a800";
    ctx.font = "bold 26px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("CERTIFICATE OF AUTHORIZATION", 400, 170);

    // Body text
    ctx.fillStyle = "#333333";
    ctx.font = "15px Arial";
    ctx.fillText("This is to certify that", 400, 230);

    ctx.fillStyle = "#0b8d4d";
    ctx.font = "bold 24px Georgia";
    ctx.fillText(user.name, 400, 268);

    ctx.fillStyle = "#555555";
    ctx.font = "13px Arial";
    ctx.fillText(`(Seller ID: ${user.referralCode})`, 400, 294);

    // Body paragraph - line by line
    ctx.fillStyle = "#444444";
    ctx.font = "14px Arial";
    ctx.fillText(
      "is an Authorized Seller of ANSHIKA UDHYOG GROUP and is duly authorized",
      400,
      330,
    );
    ctx.fillText(
      "to represent and sell our premium herbal products.",
      400,
      352,
    );

    // Divider
    ctx.strokeStyle = "rgba(11,141,77,0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, 380);
    ctx.lineTo(740, 380);
    ctx.stroke();

    // Bottom section
    // Date (left)
    ctx.fillStyle = "#333333";
    ctx.font = "13px Arial";
    ctx.textAlign = "left";
    ctx.fillText(`Date: ${user.joinDate}`, 70, 430);

    // Company seal (center)
    ctx.strokeStyle = "#0b8d4d";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(400, 435, 38, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "#FFD600";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(400, 435, 32, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#0b8d4d";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.fillText("AUG", 400, 440);
    ctx.font = "9px Arial";
    ctx.fillText("OFFICIAL SEAL", 400, 456);

    // Signature (right)
    ctx.textAlign = "right";
    ctx.strokeStyle = "#333333";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(570, 420);
    ctx.lineTo(730, 420);
    ctx.stroke();
    ctx.fillStyle = "#333333";
    ctx.font = "13px Arial";
    ctx.fillText("Director, Anshika Udhyog Group", 730, 440);

    // Download
    const link = document.createElement("a");
    link.download = `${user.name.replace(/\s+/g, "-")}-Seller-Certificate.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Certificate Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "#ffffff",
          border: "3px solid #0b8d4d",
          borderRadius: "4px",
          position: "relative",
          padding: "20px",
          boxShadow: "0 4px 20px rgba(11,141,77,0.15)",
        }}
      >
        {/* Inner decorative border */}
        <div
          style={{
            position: "absolute",
            inset: "8px",
            border: "1px solid #FFD600",
            pointerEvents: "none",
          }}
        />

        {/* Watermark */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.04,
            fontSize: "120px",
            fontWeight: "bold",
            color: "#0b8d4d",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          AUG
        </div>

        {/* Header */}
        <div className="text-center mb-3" style={{ position: "relative" }}>
          <div
            style={{
              color: "#0b8d4d",
              fontWeight: "bold",
              fontSize: "16px",
              letterSpacing: "0.5px",
            }}
          >
            🌿 ANSHIKA UDHYOG GROUP
          </div>
          <div style={{ color: "#777", fontSize: "11px", marginTop: "2px" }}>
            Herbal Solutions for Healthy Life
          </div>
          <div
            style={{
              height: "1px",
              background: "#0b8d4d",
              margin: "10px 0",
              opacity: 0.4,
            }}
          />
        </div>

        {/* Certificate Title */}
        <div className="text-center mb-4" style={{ position: "relative" }}>
          <div
            style={{
              color: "#c9a800",
              fontWeight: "bold",
              fontSize: "15px",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Certificate of Authorization
          </div>
        </div>

        {/* Body */}
        <div className="text-center mb-5" style={{ position: "relative" }}>
          <p style={{ color: "#555", fontSize: "11px", marginBottom: "6px" }}>
            This is to certify that
          </p>
          <p
            style={{
              color: "#0b8d4d",
              fontWeight: "bold",
              fontSize: "18px",
              fontFamily: "Georgia, serif",
              marginBottom: "3px",
            }}
          >
            {user.name}
          </p>
          <p style={{ color: "#777", fontSize: "10px", marginBottom: "8px" }}>
            (Seller ID: {user.referralCode})
          </p>
          <p
            style={{
              color: "#444",
              fontSize: "11px",
              lineHeight: 1.6,
              maxWidth: "360px",
              margin: "0 auto",
            }}
          >
            is an <strong>Authorized Seller</strong> of ANSHIKA UDHYOG GROUP and
            is duly authorized to represent and sell our premium herbal
            products.
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(11,141,77,0.2)",
            margin: "12px 0",
          }}
        />

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            position: "relative",
          }}
        >
          {/* Date */}
          <div style={{ fontSize: "10px", color: "#555" }}>
            Date: {user.joinDate}
          </div>

          {/* Seal */}
          <div className="flex flex-col items-center">
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                border: "3px solid #0b8d4d",
                outline: "2px solid #FFD600",
                outlineOffset: "-7px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#0b8d4d",
              }}
            >
              <span style={{ fontWeight: "bold", fontSize: "12px" }}>AUG</span>
              <span style={{ fontSize: "6px", letterSpacing: "0.5px" }}>
                SEAL
              </span>
            </div>
          </div>

          {/* Signature */}
          <div
            className="text-right"
            style={{ fontSize: "10px", color: "#333" }}
          >
            <div
              style={{
                borderTop: "1px solid #333",
                paddingTop: "4px",
                width: "140px",
              }}
            >
              Director, Anshika Udhyog Group
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <Button
        onClick={downloadCertificate}
        className="bg-brand-green text-white hover:bg-brand-green/90 rounded-full gap-2 text-sm font-semibold"
        data-ocid="seller.download_button"
      >
        <Download className="w-4 h-4" />
        Download Seller Certificate
      </Button>
    </div>
  );
}
