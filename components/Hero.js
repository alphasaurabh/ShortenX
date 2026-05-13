'use client';
import React, { useState } from "react";
import useQrGenerationTracking from "./useQrGenerationTracking";
import { notifyStatsUpdated } from "../lib/stats-events";

function GradientHeroTitle() {
  return (
    <h1 className="max-w-3xl text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-white drop-shadow-[0_12px_32px_rgba(59,130,246,0.08)] sm:text-5xl lg:text-7xl">
      Build <span className="bg-gradient-to-r from-blue-300 via-blue-500 to-blue-400 bg-clip-text text-transparent [text-shadow:0_0_24px_rgba(59,130,246,0.22)]">stronger</span> digital <span className="bg-gradient-to-r from-blue-300 via-blue-500 to-blue-400 bg-clip-text text-transparent [text-shadow:0_0_24px_rgba(59,130,246,0.22)]">connections</span>
    </h1>
  );
}

export default function Hero() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState("short");

  useQrGenerationTracking({ shortUrl, isEnabled: Boolean(shortUrl && tab === "qr") });

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
        notifyStatsUpdated();
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
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:py-28 xl:py-32">
        <div className="relative space-y-8">
          <div className="absolute -left-6 top-6 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl animate-pulse-soft" />
          <div className="premium-chip w-fit">Premium URL shortener</div>
          <GradientHeroTitle />
          <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            ShortenX — No signup. No bullshit. Just short links, QR codes, and redirects that feel instant.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
  <span className="rounded-2xl border border-blue-400/12 bg-white/5 px-4 py-3 text-sm text-slate-300">
    Fast, private, and ready for production.
  </span>
</div>

        </div>

        <div className="relative hidden justify-end lg:flex">
          <div className="absolute right-12 top-8 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl animate-pulse-soft" />
          <div className="absolute right-6 top-6 h-[420px] w-[420px] rounded-[44px] border border-blue-400/10 bg-blue-400/5 blur-0 animate-pulse-soft" />

          <div className="relative w-full max-w-[560px] animate-float-slow">
            <div className="absolute -inset-4 rounded-[38px] bg-blue-500/10 blur-2xl" />
            <div className="premium-card shimmer-border relative overflow-hidden p-6 md:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_35%)]" />
              <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "48px 48px", maskImage: "linear-gradient(180deg, rgba(0,0,0,0.55), transparent 90%)" }} />

              <div className="relative rounded-[26px] border border-blue-400/12 bg-slate-950/55 p-5 shadow-[0_20px_80px_rgba(2,6,23,0.72)] backdrop-blur-sm md:p-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-blue-200/80">ShortenX Studio</p>
                    <p className="mt-1 text-sm text-slate-400">Shorten a link, generate a QR, and share instantly.</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/15 bg-blue-400/10 text-blue-200">
                    ⌁
                  </div>
                </div>

                <div className="mt-5 rounded-[22px] border border-blue-400/10 bg-[#09162b] p-4 shadow-inner shadow-black/30">
                  <form id="shorten" onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        aria-label="Long URL"
                        className="premium-input flex-1"
                        placeholder="https://example.com/my-long-url"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className={`premium-button shrink-0 ${loading ? "cursor-wait opacity-80" : ""}`}
                      >
                        {loading ? "Shortening..." : "Get your link"}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setTab("short")}
                        className={`rounded-2xl px-4 py-2.5 text-xs font-medium transition-all duration-300 ${tab === "short" ? "bg-white text-slate-950 shadow-[0_10px_30px_rgba(255,255,255,0.08)]" : "border border-white/10 bg-white/0 text-slate-400 hover:border-blue-400/20 hover:bg-blue-400/10 hover:text-white"}`}
                      >
                        Short Link
                      </button>
                      <button
                        type="button"
                        onClick={() => setTab("qr")}
                        className={`rounded-2xl px-4 py-2.5 text-xs font-medium transition-all duration-300 ${tab === "qr" ? "bg-white text-slate-950 shadow-[0_10px_30px_rgba(255,255,255,0.08)]" : "border border-white/10 bg-white/0 text-slate-400 hover:border-blue-400/20 hover:bg-blue-400/10 hover:text-white"}`}
                      >
                        QR Code
                      </button>
                      {error && <div className="ml-auto text-sm text-blue-200/90">{error}</div>}
                    </div>

                    {shortUrl && (
                      <div className="rounded-[22px] border border-blue-400/12 bg-slate-950/50 p-4 shadow-[0_18px_50px_rgba(2,6,23,0.45)]">
                        {tab === "short" && (
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Generated link</div>
                              <a className="mt-2 block break-all text-sm font-semibold text-blue-300 underline decoration-blue-400/40 underline-offset-4 transition-colors hover:text-blue-200" href={shortUrl} target="_blank" rel="noreferrer">
                                {shortUrl}
                              </a>
                            </div>
                            <button type="button" onClick={handleCopy} className="premium-button px-4 py-2.5 text-sm">
                              {copied ? "Copied!" : "Copy"}
                            </button>
                          </div>
                        )}

                        {tab === "qr" && (
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="rounded-[24px] border border-white/8 bg-white p-3 shadow-[0_18px_50px_rgba(2,6,23,0.45)]">
                              <img
                                src={qrImageFor(shortUrl)}
                                alt="QR code"
                                className="h-36 w-36 rounded-[18px] object-contain"
                              />
                            </div>
                            <div className="space-y-3">
                              <p className="text-sm text-slate-300">Download the QR for flyers, social posts, or quick sharing.</p>
                              <a
                                href={qrImageFor(shortUrl)}
                                download="shortenx-qr.png"
                                className="premium-button inline-flex"
                              >
                                Download QR
                              </a>
                            </div>
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

        <div className="lg:hidden">
          <div className="premium-card shimmer-border relative overflow-hidden p-5 sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_36%)]" />
            <div className="relative rounded-[22px] border border-blue-400/10 bg-slate-950/55 p-4 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  aria-label="Long URL"
                  className="premium-input"
                  placeholder="https://example.com/my-long-url"
                />
                <button type="submit" disabled={loading} className={`premium-button w-full ${loading ? "cursor-wait opacity-80" : ""}`}>
                  {loading ? "Shortening..." : "Get your link"}
                </button>

                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => setTab("short")} className={`rounded-2xl px-4 py-2.5 text-xs font-medium transition-all duration-300 ${tab === "short" ? "bg-white text-slate-950" : "border border-white/10 text-slate-400"}`}>
                    Short Link
                  </button>
                  <button type="button" onClick={() => setTab("qr")} className={`rounded-2xl px-4 py-2.5 text-xs font-medium transition-all duration-300 ${tab === "qr" ? "bg-white text-slate-950" : "border border-white/10 text-slate-400"}`}>
                    QR Code
                  </button>
                </div>

                {error && <div className="text-sm text-blue-200/90">{error}</div>}

                {shortUrl && (
                  <div className="rounded-[22px] border border-blue-400/12 bg-slate-950/50 p-4">
                    {tab === "short" ? (
                      <div className="space-y-3">
                        <a className="block break-all text-sm font-semibold text-blue-300 underline decoration-blue-400/40 underline-offset-4" href={shortUrl} target="_blank" rel="noreferrer">
                          {shortUrl}
                        </a>
                        <button type="button" onClick={handleCopy} className="premium-button w-full px-4 py-2.5 text-sm">
                          {copied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <img src={qrImageFor(shortUrl)} alt="QR code" className="h-36 w-36 rounded-[18px] bg-white p-2 object-contain" />
                        <a href={qrImageFor(shortUrl)} download="shortenx-qr.png" className="premium-button w-full">
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
    </section>
  );
}
