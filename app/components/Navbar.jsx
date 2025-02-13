"use client";

import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "light";
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
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
              href="/"
              className="text-white hover:underline block md:inline-block p-2"
            >
              LinkedIn
            </a>
          </li>
          <li className="block md:inline-block">
            <a
              href="/objectives"
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
              {theme === "light" ? "Modo Escuro" : "Modo Claro"}
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
