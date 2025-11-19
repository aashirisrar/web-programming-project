"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "About us", href: "#about" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="bg-[#1a1a1a] backdrop-blur-md border border-gray-800 rounded-full shadow-lg">
          <nav className="h-16 flex items-center justify-between px-8">
            {/* Logo */}
            <Link href="#" className="flex items-center justify-start gap-2">
              <div className="w-6 h-6 rounded bg-white flex items-center justify-center">
                <span className="text-xs font-bold text-black">LH</span>
              </div>
              <span className="font-bold text-lg text-white mr-16">LinksHubb</span>
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-gray-300 hover:text-white transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                onClick={loginModal.onOpen}
                variant="ghost"
                className="text-white hover:bg-transparent font-medium px-4 py-2 rounded-full border border-gray-600 hover:border-gray-500 transition-colors"
              >
                Login
              </Button>
              <Button
                onClick={registerModal.onOpen}
                className="bg-white hover:bg-gray-100 text-black rounded-full px-6 py-2 font-medium transition-colors"
              >
                Sign Up
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </nav>
        </div>
      </div>      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden mx-auto max-w-7xl px-6"
        >
          <div className="rounded-2xl bg-[#1a1a1a] backdrop-blur-md border border-gray-800 p-6 space-y-4 mt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-sm text-gray-300 hover:text-white transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-700">
              <Button
                variant="ghost"
                className="w-full text-white hover:text-gray-300 font-medium border border-gray-600 hover:border-gray-500 rounded-full"
                onClick={loginModal.onOpen}
              >
                Download our app
              </Button>
              <Button
                className="w-full bg-white hover:bg-gray-100 text-black rounded-full font-medium"
                onClick={registerModal.onOpen}
              >
                Talk to an expert
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
