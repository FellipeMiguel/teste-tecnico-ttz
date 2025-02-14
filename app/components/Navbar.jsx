"use client";
import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav className="bg-primary p-4 z-50 relative shadow-md" aria-label="Navegação principal">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-foreground text-lg font-bold">
          <h1>
            América <span className="text-secondary">Senior</span>
          </h1>
        </div>
        
        <div className="block md:hidden">
          <button
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        <ul
          id="menu-mobile"
          className={`${
            isOpen ? "block" : "hidden"
          } h-32 md:h-auto md:flex md:items-center md:space-x-4 absolute md:relative bg-primary md:bg-transparent w-full md:w-auto top-4 md:top-0`}
          role="navigation"
          aria-label="Menu principal"
        >
          <li role="none">
            <a
              href="/"
              className="text-foreground hover:underline block md:inline-block p-2"
              role="menuitem"
              aria-label="Visitar LinkedIn"
            >
              LinkedIn
            </a>
          </li>
          <li role="none">
            <button
              onClick={toggleTheme}
              className="text-foreground hover:underline block md:inline-block p-2"
              aria-label={`Alternar para tema ${theme === "light" ? "escuro" : "claro"}`}
            >
              {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;