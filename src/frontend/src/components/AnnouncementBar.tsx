import { useStore } from "../store/useStore";

export default function AnnouncementBar() {
  const announcementText = useStore((s) => s.announcementText);

  return (
    <div className="bg-brand-yellow text-black py-1.5 text-xs font-semibold overflow-hidden relative">
      <div className="scroll-text px-4">{announcementText}</div>
    </div>
  );
}
