"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Buy", href: "/for-sale" },
  { label: "Rent", href: "/for-rent" },
  { label: "Shortlet", href: "/shortlet" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Agents", href: "/agents" },
  { label: "Area Guide", href: "/area-guide" },
  { label: "Blogs", href: "/blogs" },
];

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const textColor = transparent ? "text-white" : "text-[#121212]";
  const hoverColor = transparent ? "hover:text-white/80" : "hover:text-[#305e82]";
  const bgClass = transparent
    ? "bg-transparent"
    : "bg-white border-b border-[#ededed] shadow-sm";

  return (
    <header className={`${transparent ? "absolute" : "sticky"} top-0 left-0 right-0 z-50 ${bgClass}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#ff5a00] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M3 9.5L12 3l9 6.5V21H3V9.5z" />
            </svg>
          </div>
          <span className={`font-semibold text-base ${transparent ? "text-white" : "text-[#121212]"}`}>
            RentBuyStay
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm ${textColor} ${hoverColor} transition-colors flex items-center gap-0.5`}
            >
              {l.label}
              {l.hasDropdown && <ChevronDown size={14} />}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className={`text-sm font-medium ${textColor} ${hoverColor} transition-colors`}
          >
            Log in
          </Link>
          <Link
            href="/post-property"
            className="text-sm font-medium bg-[#305e82] text-white px-4 py-2 rounded-lg hover:bg-[#254d6b] transition-colors"
          >
            Post Property
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 ${textColor}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-[#ededed] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[#121212]"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#ededed]">
            <Link href="/login" className="text-sm font-medium text-[#121212]">Log in</Link>
            <Link href="/post-property" className="text-sm font-medium bg-[#305e82] text-white px-4 py-2 rounded-lg text-center">
              Post Property
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
