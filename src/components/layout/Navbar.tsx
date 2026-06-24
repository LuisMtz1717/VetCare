"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/#servicios",   label: "Servicios" },
  { href: "/veterinarios", label: "Veterinarios" },
  { href: "/tienda",       label: "Tienda" },
];

export default function Navbar() {
  const pathname  = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center text-white text-base font-bold transition-transform group-hover:scale-105 shadow-md">
            V
          </span>
          <span className="text-xl font-bold font-display text-brand tracking-tight">
            VetCare
          </span>
        </Link>

        {/* Nav links – desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-brand bg-accent-soft"
                  : "text-ink-soft hover:text-brand hover:bg-parchment"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA – desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="px-4 py-2 rounded-xl text-sm font-medium text-ink-soft hover:text-brand transition-colors">
            Iniciar sesión
          </Link>
          <Link href="/register" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand shadow-md hover:bg-brand-light transition-all hover:-translate-y-px active:translate-y-0">
            Registrarse
          </Link>
        </div>

        {/* Hamburger – mobile */}
        <button
          className="md:hidden p-2 rounded-lg text-ink hover:bg-parchment transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-cream border-t border-border mt-2 px-6 py-4 flex flex-col gap-2">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="px-4 py-2.5 rounded-xl text-sm font-medium text-ink-soft hover:text-brand hover:bg-parchment" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <hr className="border-border my-1" />
          <Link href="/login" className="px-4 py-2.5 rounded-xl text-sm font-medium text-ink-soft">Iniciar sesión</Link>
          <Link href="/register" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand text-center">Registrarse gratis</Link>
        </div>
      )}
    </header>
  );
}