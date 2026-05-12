"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Buy", href: "/for-sale" },
  { label: "Rent", href: "/for-rent" },
  { label: "Shortlet", href: "/shortlet" },
  { label: "Requests", href: "/property-requests", dropdown: true },
  { label: "Services", href: "/services", dropdown: true },
  { label: "Agents", href: "/agents" },
  { label: "Blog", href: "/blogs" },
];

interface NavbarProps {
  /** When true the navbar floats over the hero with glass background */
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [open, setOpen] = useState(false);

  if (transparent) {
    return (
      <div className="absolute top-0 left-0 right-0 z-50 px-6 pt-6">
        {/* Floating glass card */}
        <nav
          className="nav-gradient-border flex items-center justify-between px-6 h-[72px] rounded-[20px] overflow-hidden"
          style={{ background: "rgba(255,255,255,0.50)" }}
        >
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.svg"
              alt="RentBuyStay"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-[#121212] hover:text-[#305e82] transition-colors flex items-center gap-0.5 whitespace-nowrap font-medium"
              >
                {l.label}
                {l.dropdown && <ChevronDown size={14} />}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link href="/login" className="text-sm font-medium text-[#121212] hover:text-[#305e82] transition-colors">
              Log in
            </Link>
            <Link
              href="/post-property"
              className="text-sm font-semibold bg-[#305e82] text-white px-5 py-2 rounded-xl hover:bg-[#254d6b] transition-colors"
            >
              Post Property
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden p-2 text-[#121212]" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden mt-2 rounded-2xl bg-white shadow-lg px-6 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-[#121212]" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#ededed]">
              <Link href="/login" className="text-sm font-medium text-[#121212]">Log in</Link>
              <Link href="/post-property" className="text-sm font-semibold bg-[#305e82] text-white px-4 py-2.5 rounded-xl text-center">
                Post Property
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* Solid white navbar for inner pages */
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#ededed]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <Link href="/" className="shrink-0">
          <Image src="/images/logo.svg" alt="RentBuyStay" width={130} height={38} className="h-9 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-[#121212] hover:text-[#305e82] transition-colors flex items-center gap-0.5">
              {l.label}
              {l.dropdown && <ChevronDown size={14} />}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link href="/login" className="text-sm font-medium text-[#121212] hover:text-[#305e82] transition-colors">
            Log in
          </Link>
          <Link href="/post-property" className="text-sm font-semibold bg-[#305e82] text-white px-5 py-2 rounded-xl hover:bg-[#254d6b] transition-colors">
            Post Property
          </Link>
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-[#ededed] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-[#121212]" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#ededed]">
            <Link href="/login" className="text-sm font-medium">Log in</Link>
            <Link href="/post-property" className="text-sm font-semibold bg-[#305e82] text-white px-4 py-2.5 rounded-xl text-center">Post Property</Link>
          </div>
        </div>
      )}
    </header>
  );
}
