"use client";
import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-transparent">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <a className="flex items-center gap-3" href="/">
          <span className="text-white font-bold text-2xl">ShortenX</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a className="hover:text-white" href="/">Home</a>
          <a className="hover:text-white" href="/about">About</a>
          <a className="hover:text-white" href="/contact">Contact</a>
          <a className="hover:text-white" href="/terms">Terms & Conditions</a>
        </nav>

        <button aria-label="Open menu" className="md:hidden p-2 rounded-md bg-slate-800" onClick={() => setOpen(v => !v)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-slate-200" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="px-6 py-4 flex flex-col gap-3">
            <a className="py-2" href="/">Home</a>
            <a className="py-2" href="/about">About</a>
            <a className="py-2" href="/contact">Contact</a>
            <a className="py-2" href="/terms">Terms & Conditions</a>
          </div>
        </div>
      )}
    </header>
  );
}
