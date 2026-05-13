import "./globals.css";
import Navbar from "../components/Navbar.js";

export const metadata = {
  title: "ShortenX — Private & Fast URL Shortener",
  description: "Shorten links, create QR codes, privacy-first."
};

export default function RootLayout({ children }) {
  const ambientBackgroundStyle = {
    backgroundImage:
      "radial-gradient(circle at 20% 18%, rgba(59,130,246,0.12), transparent 28%), radial-gradient(circle at 82% 12%, rgba(37,99,235,0.1), transparent 24%), radial-gradient(circle at 50% 65%, rgba(59,130,246,0.06), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent 18%, rgba(255,255,255,0.015) 82%, transparent)",
  };

  const gridBackgroundStyle = {
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
    backgroundSize: "112px 112px",
    backgroundAttachment: "fixed",
  };

  return (
    <html lang="en">
      <body className="relative min-h-screen isolate bg-[#071226] text-slate-100">
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 bg-[#071226]" />
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-70" style={ambientBackgroundStyle} />
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-[0.032]" style={gridBackgroundStyle} />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <footer className="px-6 pb-8 pt-12">
          <div className="mx-auto flex max-w-6xl items-center justify-center rounded-[28px] border border-blue-400/10 bg-slate-950/55 px-6 py-6 text-center text-sm text-slate-400 shadow-[0_18px_60px_rgba(2,6,23,0.42)] backdrop-blur-xl sm:px-8">
            <p className="leading-relaxed text-slate-500">
              © 2026{" "}
              <a
                href="https://saurabhdev.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 transition-colors duration-200 hover:text-sky-300 hover:underline hover:underline-offset-4"
              >
                Saurabh Chandravanshi
              </a>
              . All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
