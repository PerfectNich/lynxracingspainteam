import { useScrollPosition } from "../../hooks/useScrollPosition";
import { FaArrowUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export function BackToTop() {
  const { t } = useTranslation();
  const isVisible = useScrollPosition(200);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-lynx-orange text-lynx-dark px-4 py-3 rounded-md cursor-pointer font-bold shadow-orange-glow transition-opacity duration-300 hover:scale-110 z-50 ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-label={t("common.back_to_top")}
    >
      <FaArrowUp />
    </button>
  );
}
