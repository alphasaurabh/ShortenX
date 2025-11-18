'use client';
import React, { useState } from "react";

export default function Hero() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState("short");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setShortUrl("");
    const trimmed = (url || "").trim();
    if (!trimmed) {
      setError("Please paste a URL.");
      return;
    }
    try {
      new URL(trimmed);
    } catch {
      setError("Please include http:// or https://");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = await res.json();
      if (!res.ok || !data?.shortUrl) {
        setError(data?.message || data?.error || "Failed to shorten URL");
      } else {
        setShortUrl(data.shortUrl);
        setUrl("");
      }
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!shortUrl) return;
    try {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Copy failed — copy manually.");
    }
  }

  function qrImageFor(value) {
    if (!value) return null;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(value)}`;
  }

  return (
    <section className="relative overflow-hidden">
      <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 to-[#071226]/80">
        <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-md">Build stronger digital connections</h1>
            <p className="text-lg text-slate-300 max-w-xl">
             ShortenX — No signup. No bullshit. Just short links.
            </p>

            {/* Primary CTA removed as requested */}
          </div>

          <div className="hidden lg:flex items-center justify-end">
            <div className="w-[520px] rounded-3xl bg-gradient-to-tr from-slate-800 via-slate-900 to-[#08121b] p-8 border border-slate-700 shadow-soft">
              <div className="rounded-2xl bg-[radial-gradient(ellipse_at_center,_#0b1220,_#071226)] p-6">
                <div className="bg-white/5 rounded-xl p-6">
                

                  <form onSubmit={handleSubmit} className="mt-4 rounded-lg bg-slate-900 border border-slate-800 p-4">
                    <div className="flex items-center gap-3">
                      <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        aria-label="Long URL"
                        className="flex-1 bg-transparent outline-none text-slate-200 text-sm px-4 py-3 rounded-md"
                        placeholder="https://example.com/my-long-url"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className={`ml-2 ${loading ? "bg-slate-600 cursor-wait" : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"} text-white px-4 py-2 rounded-md font-medium shadow-md`}
                      >
                        {loading ? "Shortening..." : "Get your link"}
                      </button>
                    </div>

                    <div className="mt-4 flex gap-3 items-center flex-wrap">
                      <button
                        type="button"
                        onClick={() => setTab("short")}
                        className={`px-3 py-2 rounded-md text-xs ${tab === "short" ? "bg-white text-slate-900 font-semibold" : "bg-transparent text-slate-400 border border-slate-800"}`}
                      >
                        Short Link
                      </button>
                      <button
                        type="button"
                        onClick={() => setTab("qr")}
                        className={`px-3 py-2 rounded-md text-xs ${tab === "qr" ? "bg-white text-slate-900 font-semibold" : "bg-transparent text-slate-400 border border-slate-800"}`}
                      >
                        QR Code
                      </button>
                      {error && <div className="text-rose-400 text-sm ml-auto">{error}</div>}
                    </div>

                    {shortUrl && (
                      <div className="mt-4 flex gap-4 items-center">
                        {tab === "short" && (
                          <div className="flex items-center gap-2">
                            <a className="text-sm text-green-300 underline font-semibold" href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
                            <button type="button" onClick={handleCopy} className="px-3 py-1 bg-slate-700 rounded text-slate-300 text-sm hover:bg-slate-600">{copied ? "Copied!" : "Copy"}</button>
                          </div>
                        )}
                        {tab === "qr" && (
                          <div className="flex items-center gap-3">
                            <img
                              src={qrImageFor(shortUrl)}
                              alt="QR code"
                              className="w-32 h-32 rounded-md bg-white p-2"
                            />
                            <a
                              href={qrImageFor(shortUrl)}
                              download="shortenx-qr.png"
                              className="px-3 py-2 bg-slate-700 rounded text-slate-200 text-sm hover:bg-slate-600"
                            >
                              Download QR
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
