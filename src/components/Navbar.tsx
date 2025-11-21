"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current route path

  const links = [
    { name: "Stories", href: "/stories" },
    { name: "Mountains", href: "/category/Mountains" },
    { name: "Beach", href: "/category/Beach" },
    { name: "Hotels", href: "/category/Hotels" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-700">
          RahiNotes
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center space-x-10 font-medium text-gray-700">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              pathname.startsWith(link.href.replace("/category", "/category/"));

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors ${
                  isActive
                    ? "text-green-700 border-b-2 border-green-700 pb-1"
                    : "hover:text-green-700 text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Placeholder for Right Side (future icons/buttons) */}
        <div className="hidden md:flex w-24"></div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none text-2xl"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-4 text-gray-700 font-medium">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              pathname.startsWith(link.href.replace("/category", "/category/"));

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block transition-colors ${
                  isActive
                    ? "text-green-700 font-semibold"
                    : "hover:text-green-700 text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
