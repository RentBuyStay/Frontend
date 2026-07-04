"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronDown } from "lucide-react";
import LoginModal from "./LoginModal";
import { appLoginUrl, appDashboardUrl } from "@/lib/config";
import { useGetMeQuery } from "@/services/meApi";

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

type NavbarVariant = "hero" | "card" | "page";

interface NavbarProps {
  /**
   * "hero" — glass nav floating (absolute) over an image hero; the page supplies
   *          the `relative` hero container. (default)
   * "card" — bare glass nav embedded inside a white card next to a search bar
   *          (property detail, property requests).
   * "page" — glass nav in the standard page container, for white pages with no
   *          image hero (blog detail, agencies, agents list, FAQs, legal, search).
   *
   * Every variant renders the SAME glass nav + mobile drawer, so the header looks
   * and behaves identically site-wide (incl. the full-width rounded underline and
   * the working mobile drawer) — only the outer wrapper differs per context.
   */
  variant?: NavbarVariant;
}

export default function Navbar({ variant = "hero" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  void showLogin;

  // Shared auth cookie → the marketing site recognises a dashboard-app session.
  const { data: me } = useGetMeQuery();
  const isAuthed = !!me;

  // Single login lives in the dashboard app; the shared auth cookie carries the
  // session back to this site. Send login/get-started here (with a return URL).
  const goToLogin = () => {
    const returnTo = typeof window !== "undefined" ? window.location.href : undefined;
    window.location.assign(appLoginUrl(returnTo));
  };
  const goToDashboard = () => window.location.assign(appDashboardUrl());
  // Auth-gated CTAs: straight to the dashboard when signed in, else to login.
  const authCta = () => (isAuthed ? goToDashboard() : goToLogin());

  const renderDropdown = (link: NavLink) =>
    link.dropdown ? (
      <DropdownMenu
        key={link.href}
        link={link}
        dropdown={link.dropdown}
        onLogin={goToLogin}
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

  // Shared nav contents (DRY) — logo on the left; desktop links + auth on the
  // right; on mobile the links/auth hide and the hamburger opens the drawer.
  // Used by BOTH the glass card nav and the solid page header below.
  const navInner = (
    <>
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
          onClick={isAuthed ? goToDashboard : goToLogin}
          className="flex items-center justify-center gap-2.5 px-2 py-1 text-[14px] text-[#121212] hover:text-[#305e82] transition-colors cursor-pointer"
          style={{ letterSpacing: "-0.02em", background: "transparent", border: "none" }}
        >
          {isAuthed ? "Dashboard" : "Log in"}
        </button>
        <button
          type="button"
          onClick={authCta}
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
    </>
  );

  // The glass card nav — translucent, rounded; floats over image heroes ("hero")
  // or sits inside a white search card ("card"). Rounded underline via `.nav-gradient-border`.
  const glassNav = (
    <nav
      className="nav-gradient-border flex items-center justify-between px-6 h-[72px] rounded-[20px]"
      style={{ background: "rgba(255,255,255,0.50)" }}
    >
      {navInner}
    </nav>
  );

  let header;
  if (variant === "hero") {
    // Floats over the hero image; the page supplies the relative hero container.
    header = <div className="absolute top-0 left-0 right-0 z-50 px-6 pt-6">{glassNav}</div>;
  } else if (variant === "card") {
    // Bare glass nav; the page embeds it inside its own white card next to a search
    // bar. `relative z-50` keeps it (and its dropdowns/drawer) above the content below.
    header = <div className="relative z-50">{glassNav}</div>;
  } else {
    // "page" — solid, full-width white header for white pages with no image hero.
    // Content + underline use the page gutter (16px mobile / 80px desktop) so the
    // gradient line spans nearly the full width on mobile (see `.nav-gradient-border-bottom`).
    header = (
      <header className="bg-white nav-gradient-border-bottom relative z-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[80px] flex items-center justify-between h-[72px] md:h-[96px]">
          {navInner}
        </div>
      </header>
    );
  }

  return (
    <>
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
      {header}
      <MobileDrawer open={open} onClose={() => setOpen(false)} onLogin={goToLogin} authed={isAuthed} onDashboard={goToDashboard} />
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
  authed = false,
  onDashboard,
}: {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
  authed?: boolean;
  onDashboard?: () => void;
}) {
  // Render through a portal to <body> so the drawer escapes any ancestor stacking,
  // overflow or transform context — it's mounted deep inside the navbar tree (e.g.
  // inside the property card). Portals need the DOM, so wait for client mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // While open: push the page content aside (app-style) + close on Escape.
  // `drawer-open` on <body> drives the #site-shell transform in globals.css.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("drawer-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("drawer-open");
    };
  }, [open, onClose]);

  if (!mounted) return null;

  if (!open) return null;

  return createPortal(
    <div className="lg:hidden">
      {/* Transparent click-catcher over the pushed content — tap to close.
          The dimming lives on the card itself (see .site-shell) so there is no
          hard scrim rectangle; this only captures taps. */}
      <div
        onClick={onClose}
        className="fixed inset-y-0 left-0 z-[30]"
        style={{ right: "288px" }}
      />

      {/* Menu panel — fixed at the right, revealed as #site-shell slides left. */}
      <aside
        role="dialog"
        aria-modal="true"
        className="fixed top-0 right-0 z-[10] flex h-full w-[288px] flex-col bg-white"
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
              if (authed && onDashboard) onDashboard();
              else onLogin();
            }}
            className="flex h-11 items-center justify-center rounded-[12px] border border-[#ededed] text-[14px] font-medium text-[#121212] hover:bg-[#f6f6f6] transition-colors"
          >
            {authed ? "Dashboard" : "Log in"}
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              if (authed && onDashboard) onDashboard();
              else onLogin();
            }}
            className="flex h-11 items-center justify-center rounded-[12px] text-[14px] font-medium text-white hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(175deg, rgba(117,163,199,1) 0%, rgba(48,94,130,1) 100%)" }}
          >
            Post Property
          </button>
        </div>
      </aside>
    </div>,
    document.body
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
