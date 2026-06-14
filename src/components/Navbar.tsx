"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import LoginModal from "./LoginModal";

type DropdownItem = { label: string; href: string; action?: "login" };
type NavLink = { label: string; href: string; dropdown?: DropdownItem[] };

// Exact items from Figma
const requestsDropdown: DropdownItem[] = [
  { label: "Post a Request", href: "/property-requests/new", action: "login" },
  { label: "View Property Requests", href: "/property-requests" },
];

const servicesDropdown: DropdownItem[] = [
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
  /** When true the navbar uses the glass card background */
  transparent?: boolean;
  /** When transparent: position the glass nav absolutely over a hero image (true),
      or render it in normal flow, e.g. inside a card on a white page (false). */
  floating?: boolean;
}

export default function Navbar({ transparent = false, floating = true }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const renderDropdown = (link: NavLink) =>
    link.dropdown ? (
      <DropdownMenu
        key={link.href}
        link={link}
        dropdown={link.dropdown}
        onLogin={() => setShowLogin(true)}
      />
    ) : (
      <Link
        key={link.href}
        href={link.href}
        className="flex items-center justify-center px-3 py-1 text-[14px] text-[#121212] hover:text-[#305e82] transition-colors whitespace-nowrap"
        style={{ letterSpacing: "-0.02em" }}
      >
        {link.label}
      </Link>
    );

  if (transparent) {
    return (
      <>
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
      <div className={floating ? "absolute top-0 left-0 right-0 z-50 px-6 pt-6" : ""}>
        {/* Glass card */}
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
            {navLinks.map(renderDropdown)}
          </div>

          {/* Auth — gap 16px to match figma */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => setShowLogin(true)}
              className="flex items-center justify-center gap-2.5 px-2 py-1 text-[14px] text-[#121212] hover:text-[#305e82] transition-colors cursor-pointer"
              style={{ letterSpacing: "-0.02em", background: "transparent", border: "none" }}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => setShowLogin(true)}
              className="flex items-center justify-center gap-2 h-12 px-6 text-[14px] font-medium text-white rounded-[12px] hover:opacity-90 transition-opacity cursor-pointer"
              style={{
                background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)",
                border: "1px solid rgba(120,158,187,0.5)",
                letterSpacing: "-0.02em",
              }}
            >
              Post Property
            </button>
          </div>

          {/* Mobile toggle — opens the right-side drawer */}
          <button className="lg:hidden p-2 text-[#121212]" onClick={() => setOpen(true)} aria-label="Open menu">
            <Image src="/icons/tabler-menu-4.svg" alt="Menu" width={24} height={24} />
          </button>
        </nav>
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} onLogin={() => setShowLogin(true)} />
      </>
    );
  }

  /* Plain navbar for white-bg pages — Figma: full-width with gradient bottom line, no rounded card */
  return (
    <>
    <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    <header className="bg-white nav-gradient-border-bottom relative">
      <div className="max-w-[1440px] mx-auto px-[80px] flex items-center justify-between h-[96px]">
        {/* Logo — same 166x48 */}
        <Link href="/" className="shrink-0">
          <Image src="/images/logo.svg" alt="RentBuyStay" width={166} height={48} className="h-12 w-auto" priority />
        </Link>

        {/* Desktop links — same as transparent */}
        <div className="hidden lg:flex items-center gap-4">
          {navLinks.map(renderDropdown)}
        </div>

        {/* Auth */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={() => setShowLogin(true)}
            className="flex items-center justify-center gap-2.5 px-2 py-1 text-[14px] text-[#121212] hover:text-[#305e82] transition-colors cursor-pointer"
            style={{ letterSpacing: "-0.02em", background: "transparent", border: "none" }}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => setShowLogin(true)}
            className="flex items-center justify-center gap-2 h-12 px-6 text-[14px] font-medium text-white rounded-[12px] hover:opacity-90 transition-opacity cursor-pointer"
            style={{
              background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)",
              border: "1px solid rgba(120,158,187,0.5)",
              letterSpacing: "-0.02em",
            }}
          >
            Post Property
          </button>
        </div>

        {/* Mobile toggle — opens the right-side drawer */}
        <button className="lg:hidden p-2" onClick={() => setOpen(true)} aria-label="Open menu">
          <Image src="/icons/tabler-menu-4.svg" alt="Menu" width={24} height={24} />
        </button>
      </div>
    </header>
    <MobileDrawer open={open} onClose={() => setOpen(false)} onLogin={() => setShowLogin(true)} />
    </>
  );
}

/* MobileDrawer — right slide-in panel + dimmed backdrop for the mobile menu.
   Open and close both live on the right, where the hamburger sits. The panel is
   full-height and covers the page (search bar, hero, etc.) instead of floating over it. */
function MobileDrawer({
  open,
  onClose,
  onLogin,
}: {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}) {
  // Lock body scroll + close on Escape while the drawer is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <div className="lg:hidden" aria-hidden={!open}>
      {/* Backdrop — dims and blurs the page, tap to close */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 right-0 z-[70] flex h-full w-[82%] max-w-[320px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header — logo + close (X sits exactly where the hamburger was) */}
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#ededed] px-5">
          <Image src="/images/logo.svg" alt="RentBuyStay" width={140} height={40} className="h-10 w-auto" />
          <button onClick={onClose} aria-label="Close menu" className="-mr-2 p-2 text-[#121212]">
            <X size={24} />
          </button>
        </div>

        {/* Links (Requests / Services expand inline) */}
        <nav className="flex-1 overflow-y-auto px-5 py-2">
          {navLinks.map((l) =>
            l.dropdown ? (
              <details key={l.href} className="group border-b border-[#f6f6f6]">
                <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-[15px] font-medium text-[#121212]">
                  {l.label}
                  <ChevronDown
                    size={18}
                    strokeWidth={1.5}
                    className="text-[#807e7e] transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="flex flex-col pb-2">
                  {l.dropdown.map((item) =>
                    item.action === "login" ? (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          onClose();
                          onLogin();
                        }}
                        className="py-2.5 pl-3 text-left text-[14px] text-[#807e7e] hover:text-[#305e82] transition-colors"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="py-2.5 pl-3 text-[14px] text-[#807e7e] hover:text-[#305e82] transition-colors"
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </details>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                onClick={onClose}
                className="block border-b border-[#f6f6f6] py-3.5 text-[15px] font-medium text-[#121212] hover:text-[#305e82] transition-colors"
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        {/* Auth actions pinned to the bottom */}
        <div className="flex shrink-0 flex-col gap-3 border-t border-[#ededed] px-5 py-4">
          <button
            type="button"
            onClick={() => {
              onClose();
              onLogin();
            }}
            className="flex h-11 items-center justify-center rounded-[12px] border border-[#ededed] text-[14px] font-medium text-[#121212] hover:bg-[#f6f6f6] transition-colors"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onLogin();
            }}
            className="flex h-11 items-center justify-center rounded-[12px] text-[14px] font-medium text-white hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)" }}
          >
            Post Property
          </button>
        </div>
      </aside>
    </div>
  );
}

/* DropdownMenu — opens on CLICK, closes on click-outside or item click. Fixed pos escapes overflow:hidden. */
function DropdownMenu({
  link,
  dropdown,
  onLogin,
}: {
  link: NavLink;
  dropdown: DropdownItem[];
  onLogin?: () => void;
}) {
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
          }}
        >
          {dropdown.map((item) =>
            item.action === "login" && onLogin ? (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onLogin();
                }}
                className="block w-full text-left px-6 py-3 hover:bg-[#f6f6f6] transition-colors whitespace-nowrap"
                style={{ fontSize: "14px", color: "#121212" }}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-6 py-3 hover:bg-[#f6f6f6] transition-colors whitespace-nowrap"
                style={{ fontSize: "14px", color: "#121212" }}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </>
  );
}
