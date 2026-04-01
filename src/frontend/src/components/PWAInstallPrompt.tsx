import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

export default function PWAInstallPrompt() {
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // Check if already installed as PWA
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Detect iOS
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(ios);

    // Check if user already dismissed
    const dismissed = localStorage.getItem("pwa-dismissed");
    if (dismissed) return;

    if (ios) {
      // Show iOS instruction after 3 seconds
      setTimeout(() => setShowBanner(true), 3000);
    } else {
      // Listen for beforeinstallprompt on Android/Chrome
      const handler = (e: Event) => {
        e.preventDefault();
        deferredPrompt = e as BeforeInstallPromptEvent;
        setTimeout(() => setShowBanner(true), 3000);
      };
      window.addEventListener("beforeinstallprompt", handler);
      return () => window.removeEventListener("beforeinstallprompt", handler);
    }
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowBanner(false);
      }
      deferredPrompt = null;
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("pwa-dismissed", "1");
  };

  if (!showBanner || isInstalled) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "80px",
        left: "12px",
        right: "12px",
        zIndex: 9999,
        background: "linear-gradient(135deg, #0b8d4d, #067a3e)",
        color: "white",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "0 8px 32px rgba(11,141,77,0.4)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        animation: "slideUp 0.4s ease-out",
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      <img
        src="/assets/generated/aug-icon-192.dim_192x192.png"
        alt="AUG"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "10px",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "2px" }}>
          ANSHIKA UDHYOG GROUP
        </div>
        {isIOS ? (
          <div style={{ fontSize: "12px", opacity: 0.9 }}>
            📱 Install: Safari mein Share → "Add to Home Screen" karein
          </div>
        ) : (
          <div style={{ fontSize: "12px", opacity: 0.9 }}>
            📲 App install karein — bilkul APK jaisa!
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          flexShrink: 0,
        }}
      >
        {!isIOS && (
          <button
            type="button"
            onClick={handleInstall}
            style={{
              background: "#FFD600",
              color: "#0b8d4d",
              border: "none",
              borderRadius: "8px",
              padding: "6px 14px",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Install
          </button>
        )}
        <button
          type="button"
          onClick={handleDismiss}
          style={{
            background: "rgba(255,255,255,0.2)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "6px 14px",
            fontWeight: 600,
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          Baad mein
        </button>
      </div>
    </div>
  );
}
