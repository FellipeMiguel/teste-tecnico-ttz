"use client";

import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Carregar tema ao iniciar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "light";
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  // Atualizar tema quando ele mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <nav className="bg-[#0094B5] p-4 z-50 relative shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <h1>
            América <span className="text-red-300">Senior</span>
          </h1>
        </div>
        <div className="block md:hidden">
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } h-32 md:h-auto md:flex md:items-center md:space-x-4 absolute md:relative bg-[#0094B5] md:bg-transparent w-full md:w-auto top-4 md:top-0`}
        >
          <li className="block md:inline-block">
            <a
              href="https://br.linkedin.com/in/fellipe-m-dino"
              target="_blank"
              className="text-white hover:underline block md:inline-block p-2"
            >
              LinkedIn
            </a>
          </li>
          <li className="block md:inline-block">
            <a
              href="https://github.com/FellipeMiguel/"
              target="_blank"
              className="text-white hover:underline block md:inline-block p-2"
            >
              Github
            </a>
          </li>
          <li className="block md:inline-block">
            <button
              onClick={toggleTheme}
              className="text-white hover:underline block md:inline-block p-2"
            >
              {theme === "light" ? (
                <FaMoon size={20} /> // Ícone de lua para o modo escuro
              ) : (
                <FaSun size={20} /> // Ícone de sol para o modo claro
              )}
            </button>
          </li>
        </ul>
      </div>
      {isOpen && (
        <button
          className="absolute top-4 right-4 text-white md:hidden"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
      )}
    </nav>
  );
};

export default Navbar;
