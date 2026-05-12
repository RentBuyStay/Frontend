"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Buy", href: "/for-sale" },
  { label: "Rent", href: "/for-rent" },
  { label: "Shortlet", href: "/shortlet" },
  { label: "Services", href: "/services" },
  { label: "Agents", href: "/agents" },
  { label: "Area Guide", href: "/area-guide" },
  { label: "Blog", href: "/blogs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#ededed]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <Link href="/" className="font-semibold text-xl text-[#305e82]">
          RentBuyStay
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[#121212] hover:text-[#305e82] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-[#121212] hover:text-[#305e82] transition-colors"
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

        <button
          className="lg:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#ededed] bg-white px-6 py-4 flex flex-col gap-4">
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
            <Link href="/login" className="text-sm font-medium">
              Log in
            </Link>
            <Link
              href="/post-property"
              className="text-sm font-medium bg-[#305e82] text-white px-4 py-2 rounded-lg text-center"
            >
              Post Property
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
