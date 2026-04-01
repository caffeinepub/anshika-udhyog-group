import { SiFacebook, SiInstagram, SiWhatsapp, SiYoutube } from "react-icons/si";
import { useNav } from "../App";

const WA_LINK =
  "https://wa.me/918349600835?text=HI%20ANSHIKA%20UDHYOG%20GROUP%20I%20AM%20INTERESTED%20SEND%20ME%20DETAILS";

export default function Footer() {
  const { navigate } = useNav();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-green text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center font-bold text-brand-green text-lg flex-shrink-0">
            AUG
          </div>
          <div>
            <div className="font-bold text-base">ANSHIKA UDHYOG GROUP</div>
            <div className="text-white/70 text-xs">
              Herbal Solutions for Healthy Life
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm mb-6">
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-brand-yellow mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-white/80">
              {[
                { label: "Home", page: "home" },
                { label: "Products", page: "products" },
                { label: "MLM Network", page: "mlm" },
                { label: "My Orders", page: "orders" },
                { label: "Wallet", page: "wallet" },
              ].map(({ label, page }) => (
                <li key={page}>
                  <button
                    type="button"
                    // biome-ignore lint/suspicious/noExplicitAny: dynamic page
                    onClick={() => navigate(page as any)}
                    className="hover:text-brand-yellow transition-colors text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Address */}
          <div>
            <h4 className="font-semibold text-brand-yellow mb-3">Contact Us</h4>
            <ul className="space-y-2 text-white/80 text-xs">
              <li className="flex items-start gap-1.5">
                <span>📍</span>
                <span>
                  Old Bus Stand Bilaspur,{"\n"}
                  Chhattisgarh
                </span>
              </li>
              <li>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-brand-yellow transition-colors"
                >
                  <span>📱</span>
                  <span>WhatsApp: 8349600835</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:8349600835"
                  className="flex items-center gap-1.5 hover:text-brand-yellow transition-colors"
                >
                  <span>📞</span>
                  <span>8349600835</span>
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <span>💳</span>
                <span>UPI: 8349600835@UPI</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social */}
        <div className="flex items-center gap-3 mb-5">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-white/10 hover:bg-white/25 rounded-full transition-colors"
            aria-label="WhatsApp"
          >
            <SiWhatsapp size={16} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-white/10 hover:bg-white/25 rounded-full transition-colors"
            aria-label="Facebook"
          >
            <SiFacebook size={16} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-white/10 hover:bg-white/25 rounded-full transition-colors"
            aria-label="Instagram"
          >
            <SiInstagram size={16} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-white/10 hover:bg-white/25 rounded-full transition-colors"
            aria-label="YouTube"
          >
            <SiYoutube size={16} />
          </a>
        </div>

        <div className="border-t border-white/20 pt-4 space-y-1 text-center">
          <p className="text-xs text-white/80 font-semibold">
            © {year} ANSHIKA UDHYOG GROUP. All Rights Reserved.
          </p>
          <p className="text-[10px] text-white/50">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noreferrer"
              className="text-brand-yellow hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
