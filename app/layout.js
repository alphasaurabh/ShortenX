import "./globals.css";
import Navbar from "../components/Navbar.js";

export const metadata = {
  title: "ShortenX — Private & Fast URL Shortener",
  description: "Shorten links, create QR codes, privacy-first."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#071226] text-slate-100">
        <Navbar />
        <main>{children}</main>
        <footer className="mt-24">
          <div className="max-w-6xl mx-auto px-6 py-8 text-slate-400 border-t border-slate-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm">&copy; {new Date().getFullYear()} ShortenX</div>
              <div className="flex items-center gap-4 text-sm">
                {/* Footer links removed as requested */}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
