import { SiWhatsapp } from "react-icons/si";

const WA_LINK =
  "https://wa.me/918349600835?text=HI%20ANSHIKA%20UDHYOG%20GROUP%20I%20AM%20INTERESTED%20SEND%20ME%20DETAILS";

export default function WhatsAppButton() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-24 right-4 z-50 bg-green-500 text-white p-3.5 rounded-full shadow-xl hover:bg-green-600 transition-colors hover:scale-110 active:scale-95"
      aria-label="Chat on WhatsApp"
      data-ocid="whatsapp.button"
      style={{
        animation: "wa-pulse 2s ease-in-out infinite",
      }}
    >
      <SiWhatsapp size={26} />
      <style>{`
        @keyframes wa-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
          50% { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
        }
      `}</style>
    </a>
  );
}
