"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const logoVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const navLinkVariants = {
    initial: { y: 0 },
    hover: { 
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      y: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      y: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const menuItemVariants = {
    closed: { 
      opacity: 0,
      x: -20
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 z-50">
              <motion.div
                variants={logoVariants}
                initial="initial"
                whileHover="hover"
                className="w-10 h-10"
              >
                <Image
                  src="/img/Logo_Icon_vio.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="rounded-sm"
                />
              </motion.div>
              <motion.span
                className={`text-lg font-bold transition-colors duration-200 ${
                  isOpen 
                  ? "text-white" 
                  : "bg-gradient-to-r from-[#808bf8] to-[#5865F2] bg-clip-text text-transparent"
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Vendly
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["Inicio", "Blog", "Contacto"].map((item) => (
                <motion.div
                  key={item}
                  variants={navLinkVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <Link 
                    href={item === "Inicio" ? "/" : `/${item.toLowerCase()}`}
                    className="relative text-gray-800 font-medium group"
                  >
                    {item}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#808bf8] origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative z-50"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-[#808bf8] z-40"
            >
              <motion.div
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col items-center justify-center h-screen space-y-8 pt-16"
              >
                {["Inicio", "Blog", "Contacto"].map((item) => (
                  <motion.div
                    key={item}
                    variants={menuItemVariants}
                    className="w-full px-8"
                  >
                    <Link
                      href={item === "Inicio" ? "/" : `/${item.toLowerCase()}`}
                      className="text-white text-2xl font-bold flex items-center space-x-4 hover:translate-x-2 transition-transform"
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: 32 }}
                        className="h-[2px] bg-white inline-block"
                      />
                      <span>{item}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Espaciador para el contenido */}
      <div className="h-16" />
    </>
  );
}