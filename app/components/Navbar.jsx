"use client";
import React, { useState, useEffect } from "react";
import {
  FaMoon,
  FaSun,
  FaAlignJustify,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

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

  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav
      className="bg-primary p-4 z-50 relative shadow-md"
      role="banner"
      aria-label="Cabeçalho principal"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-foreground text-lg font-bold">
          <h1 aria-label="América Senior">
            América <span className="text-secondary">Senior</span>
          </h1>
        </div>

        <div className="block md:hidden">
          <button
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
          >
            {isOpen ? (
              <IoIosCloseCircle className="text-xl text-foreground" />
            ) : (
              <FaAlignJustify className="text-xl text-foreground" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
                onClick={() => setIsOpen(false)}
                role="presentation"
                aria-label="Overlay do menu"
                data-testid="menu-overlay"
              />

              <motion.ul
                key="mobile-menu"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed top-0 right-0 h-full w-3/4 bg-primary p-6 space-y-6 shadow-xl md:hidden"
                role="menu"
                aria-label="Menu principal"
              >
                <motion.li variants={itemVariants} role="none">
                  <a
                    href="https://br.linkedin.com/in/fellipe-m-dino"
                    role="menuitem"
                    className="flex items-center gap-3 text-foreground hover:text-secondary p-3 rounded-lg transition-colors"
                  >
                    <FaLinkedin
                      className="text-2xl"
                      data-testid="linkedin-icon"
                    />
                    LinkedIn
                  </a>
                </motion.li>

                <motion.li variants={itemVariants} role="none">
                  <a
                    href="https://github.com/FellipeMiguel"
                    role="menuitem"
                    className="flex items-center gap-3 text-foreground hover:text-secondary p-3 rounded-lg transition-colors"
                  >
                    <FaGithub className="text-2xl" data-testid="github-icon" />
                    GitHub
                  </a>
                </motion.li>

                <motion.li variants={itemVariants} role="none">
                  <button
                    onClick={toggleTheme}
                    role="menuitem"
                    className="w-full flex items-center gap-3 text-foreground hover:text-secondary p-3 rounded-lg transition-colors"
                    data-testid="theme-button"
                  >
                    {theme === "light" ? (
                      <FaMoon className="text-2xl" />
                    ) : (
                      <FaSun className="text-2xl" />
                    )}
                    Tema {theme === "light" ? "Escuro" : "Claro"}
                  </button>
                </motion.li>

                <motion.li
                  className="absolute top-4 right-4"
                  variants={itemVariants}
                  role="none"
                >
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-foreground hover:text-secondary transition-colors"
                    aria-label="Fechar menu mobile"
                  >
                    <IoIosCloseCircle className="text-3xl" />
                  </button>
                </motion.li>
              </motion.ul>
            </>
          )}
        </AnimatePresence>

        <ul className="hidden md:flex items-center gap-6">
          <li role="none">
            <a
              href="https://br.linkedin.com/in/fellipe-m-dino"
              className="text-foreground hover:text-secondary flex items-center gap-2 transition-colors"
              role="menuitem"
            >
              <FaLinkedin />
              LinkedIn
            </a>
          </li>
          <li role="none">
            <a
              href="https://github.com/FellipeMiguel"
              className="text-foreground hover:text-secondary flex items-center gap-2 transition-colors"
              role="menuitem"
            >
              <FaGithub />
              GitHub
            </a>
          </li>
          <li role="none">
            <button
              onClick={toggleTheme}
              className="text-foreground hover:text-secondary flex items-center gap-2 transition-colors"
              role="menuitem"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
              Tema
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
