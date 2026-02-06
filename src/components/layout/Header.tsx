import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/agenda", label: "Agenda" },
  { to: "/multimedia", label: "Multimedia" },
  { to: "/roster", label: "Roster" },
  { to: "/tienda", label: "Tienda" },
  { to: "/contacto", label: "Contacto" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 w-full bg-lynx-dark-menu border-b-2 border-lynx-orange z-[1000] shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
      {/* Desktop nav */}
      <div className="hidden md:flex justify-center gap-10 py-4">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
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

      {/* Mobile nav */}
      <div className="md:hidden flex justify-between items-center px-4 py-3">
        <span className="text-lynx-orange font-bold text-lg">LYNX RACING</span>
        <button
          onClick={toggleMenu}
          className="text-lynx-text text-2xl hover:text-lynx-orange transition-colors"
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
