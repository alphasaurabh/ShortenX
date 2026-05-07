"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/terms", label: "Terms & Conditions" },
  ];

  function isActive(href) {
    return href === "/" ? pathname === "/" : pathname === href;
  }

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-blue-400/10 bg-slate-950/55 px-5 py-4 shadow-[0_18px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl md:px-6">
        <div className="flex items-center justify-between gap-4">
          <a className="group flex items-center gap-3" href="/" aria-label="ShortenX home">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-400/15 bg-white/5 shadow-[0_0_0_1px_rgba(59,130,246,0.08)] transition-transform duration-300 group-hover:scale-105">
              <img src="/favicon.ico" alt="ShortenX logo" className="h-6 w-6 rounded-md object-contain" />
            </span>
            <span className="text-xl font-semibold tracking-tight text-white sm:text-2xl">ShortenX</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-active={isActive(item.href)}
                className="premium-nav-link text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            aria-label="Open menu"
            aria-expanded={open}
            className="group inline-flex items-center justify-center rounded-2xl border border-blue-400/10 bg-white/5 p-3 text-slate-200 transition-all duration-300 hover:border-blue-400/20 hover:bg-blue-400/10 hover:text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform duration-300 group-hover:scale-105" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {open && (
          <div className="mt-4 rounded-3xl border border-blue-400/10 bg-slate-950/80 p-3 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  className={`rounded-2xl px-4 py-3 text-sm transition-all duration-300 ${isActive(item.href) ? "bg-blue-500/12 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
