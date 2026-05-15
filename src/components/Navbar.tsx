"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

type DropdownItem = { label: string; href: string };
type NavLink = { label: string; href: string; dropdown?: DropdownItem[] };

// Exact items from Figma
const requestsDropdown: DropdownItem[] = [
  { label: "Post a Request", href: "/property-requests/new" },
  { label: "View Property Requests", href: "/property-requests" },
];

const servicesDropdown: DropdownItem[] = [
  { label: "Property Verification", href: "/services/verification" },
  { label: "Place Banner Ad", href: "/services/banner-ad" },
];

const navLinks: NavLink[] = [
  { label: "Buy", href: "/for-sale" },
  { label: "Rent", href: "/for-rent" },
  { label: "Shortlet", href: "/shortlet" },
  { label: "Requests", href: "/property-requests", dropdown: requestsDropdown },
  { label: "Services", href: "/services", dropdown: servicesDropdown },
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
          className="nav-gradient-border flex items-center justify-between px-6 h-[72px] rounded-[20px]"
          style={{ background: "rgba(255,255,255,0.50)" }}
        >
          {/* Logo — Figma: 166x48 */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.svg"
              alt="RentBuyStay"
              width={166}
              height={48}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop links — Figma: gap 16px, item padding 4px 12px, gap 4px between text and arrow */}
          <div className="hidden lg:flex items-center gap-4">
            {navLinks.map((l) =>
              l.dropdown ? (
                <DropdownMenu key={l.href} link={l} dropdown={l.dropdown} />
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center justify-center px-3 py-1 text-[14px] text-[#121212] hover:text-[#305e82] transition-colors whitespace-nowrap"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {l.label}
                </Link>
              )
            )}
          </div>

          {/* Auth — gap 16px to match figma */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2.5 px-2 py-1 text-[14px] text-[#121212] hover:text-[#305e82] transition-colors"
              style={{ letterSpacing: "-0.02em" }}
            >
              Log in
            </Link>
            <Link
              href="/post-property"
              className="flex items-center justify-center gap-2 h-12 px-6 text-[14px] font-medium text-white rounded-[12px] hover:opacity-90 transition-opacity"
              style={{
                background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)",
                border: "1px solid rgba(120,158,187,0.5)",
                letterSpacing: "-0.02em",
              }}
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

  /* Plain navbar for white-bg pages — Figma: full-width with gradient bottom line, no rounded card */
  return (
    <header className="bg-white nav-gradient-border-bottom relative">
      <div className="max-w-[1440px] mx-auto px-[80px] flex items-center justify-between h-[96px]">
        {/* Logo — same 166x48 */}
        <Link href="/" className="shrink-0">
          <Image src="/images/logo.svg" alt="RentBuyStay" width={166} height={48} className="h-12 w-auto" priority />
        </Link>

        {/* Desktop links — same as transparent */}
        <div className="hidden lg:flex items-center gap-4">
          {navLinks.map((l) =>
            l.dropdown ? (
              <DropdownMenu key={l.href} link={l} dropdown={l.dropdown} />
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center justify-center px-3 py-1 text-[14px] text-[#121212] hover:text-[#305e82] transition-colors whitespace-nowrap"
                style={{ letterSpacing: "-0.02em" }}
              >
                {l.label}
              </Link>
            )
          )}
        </div>

        {/* Auth */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <Link href="/login" className="flex items-center justify-center gap-2.5 px-2 py-1 text-[14px] text-[#121212] hover:text-[#305e82] transition-colors" style={{ letterSpacing: "-0.02em" }}>
            Log in
          </Link>
          <Link
            href="/post-property"
            className="flex items-center justify-center gap-2 h-12 px-6 text-[14px] font-medium text-white rounded-[12px] hover:opacity-90 transition-opacity"
            style={{
              background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)",
              border: "1px solid rgba(120,158,187,0.5)",
              letterSpacing: "-0.02em",
            }}
          >
            Post Property
          </Link>
        </div>

        {/* Mobile toggle */}
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

/* DropdownMenu — opens on CLICK, closes on click-outside or item click. Fixed pos escapes overflow:hidden. */
function DropdownMenu({ link, dropdown }: { link: NavLink; dropdown: DropdownItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click-outside to close
  useEffect(() => {
    if (!isOpen) return;
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isOpen]);

  function toggle() {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      // Position dropdown so it visually attaches to the bottom of the navbar
      // Find the closest <header> or <nav> to align with its bottom
      const headerEl =
        triggerRef.current.closest("header") ||
        triggerRef.current.closest("nav");
      const navBottom = headerEl
        ? headerEl.getBoundingClientRect().bottom
        : rect.bottom;
      setPos({ left: rect.left, top: navBottom });
    }
    setIsOpen((s) => !s);
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        className="flex items-center justify-center gap-1 px-3 py-1 text-[14px] text-[#121212] hover:text-[#305e82] transition-colors whitespace-nowrap"
        style={{ letterSpacing: "-0.02em" }}
      >
        {link.label}
        <ChevronDown size={16} strokeWidth={1.5} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && pos && (
        <div
          ref={dropdownRef}
          className="fixed bg-white py-3 min-w-[220px]"
          style={{
            left: pos.left,
            top: pos.top,
            zIndex: 9999,
            // Flat top (attached to navbar bottom), rounded only bottom corners
            borderRadius: "0 0 12px 12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          {dropdown.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-6 py-3 hover:bg-[#f6f6f6] transition-colors whitespace-nowrap"
              style={{ fontSize: "14px", color: "#121212" }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
