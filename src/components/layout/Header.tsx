import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaBars, FaTimes } from "react-icons/fa";
import { LanguageToggle } from "./LanguageToggle";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const lang = i18n.language;
  const prefix = lang === "en" ? "/en" : lang === "ca" ? "/ca" : "";

  const navLinks = [
    { to: `${prefix}/`, label: t("nav.home") },
    { to: `${prefix}/agenda`, label: t("nav.calendar") },
    { to: `${prefix}/multimedia`, label: t("nav.media") },
    { to: `${prefix}/roster`, label: t("nav.roster") },
    { to: `${prefix}/palmares`, label: t("nav.palmares") },
    { to: `${prefix}/tienda`, label: t("nav.shop") },
    { to: `${prefix}/contacto`, label: t("nav.contact") },
  ];

  const basePath = location.pathname.replace(/^\/(en|ca)(?=\/|$)/, "") || "/";

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 w-full bg-lynx-dark-menu border-b-2 border-lynx-orange z-[1000] shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
      {/* Desktop nav */}
      <div className="hidden md:flex justify-between items-center py-4 px-6">
        <div className="flex items-center gap-4">
          <LanguageToggle lang={lang} basePath={basePath} />
        </div>
        <div className="flex-1 flex justify-center gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === `${prefix}/`}
              className={({ isActive }) =>
                `font-bold text-xl transition-all duration-300 hover:text-lynx-orange hover:scale-110 ${
                  isActive ? "text-lynx-orange underline underline-offset-4" : "text-lynx-text no-underline"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex justify-between items-center gap-3 px-4 py-3">
        <div className="flex items-center gap-2 min-w-0">
          <LanguageToggle lang={lang} basePath={basePath} />
          <span className="text-lynx-orange font-bold text-sm sm:text-lg truncate">
            LYNX RACING
          </span>
        </div>
        <button
          onClick={toggleMenu}
          className="text-lynx-text text-2xl hover:text-lynx-orange transition-colors flex-shrink-0"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4 py-4 bg-lynx-dark-menu">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === `${prefix}/`}
              onClick={closeMenu}
              className={({ isActive }) =>
                `font-bold text-lg transition-all duration-300 hover:text-lynx-orange ${
                  isActive ? "text-lynx-orange underline underline-offset-4" : "text-lynx-text no-underline"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
