"use client";
import React, { useState } from "react";
import useQrGenerationTracking from "./useQrGenerationTracking";
import { notifyStatsUpdated } from "../lib/stats-events";

export default function ShortenCard() {
  const [tab, setTab] = useState("short");
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useQrGenerationTracking({ shortUrl, isEnabled: Boolean(shortUrl && tab === "qr") });

  async function handleShorten(e) {
    e?.preventDefault();
    setError("");
    setCopied(false);
    setShortUrl("");

    const trimmed = (longUrl || "").trim();
    if (!trimmed) {
      setError("Please paste a valid URL to shorten.");
      return;
    }

    try { new URL(trimmed); } catch { setError("Include http:// or https://"); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });

      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { throw new Error(`Non-JSON response: ${text}`); }

      if (!res.ok) throw new Error(data.message || `Server ${res.status}`);

      if (data && data.shortUrl) {
        setShortUrl(data.shortUrl);
        setTab("short");
        notifyStatsUpdated();
      } else {
        throw new Error(data.message || "Unexpected server response");
      }
    } catch (err) {
      console.error("ShortenCard error:", err);
      setError(err.message || "Failed to create short link");
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
    <div className="mx-auto max-w-4xl">
      <div className="rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 p-1 shadow-soft">
        <div className="rounded-3xl bg-[#071226] p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div onClick={() => setTab("short")} className={`px-4 py-2 rounded-full cursor-pointer ${tab === "short" ? "bg-white text-slate-900" : "bg-transparent text-slate-300 hover:bg-slate-800"}`}>
                <span className="text-sm font-semibold">🔗 Short Link</span>
              </div>
              <div onClick={() => setTab("qr")} className={`px-4 py-2 rounded-full cursor-pointer ${tab === "qr" ? "bg-white text-slate-900" : "bg-transparent text-slate-300 hover:bg-slate-800"}`}>
                <span className="text-sm font-semibold">▦ QR Code</span>
              </div>
            </div>

            <div className="text-slate-400 text-sm">No credit card required</div>
          </div>

          <div className="mt-6">
            {tab === "short" ? (
              <form onSubmit={handleShorten} className="space-y-4">
                <label className="block text-slate-300 font-semibold">Paste your long link here</label>

                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="https://example.com/my-long-url"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    aria-label="Long URL"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className={`px-6 rounded-lg text-white font-semibold whitespace-nowrap ${loading ? "bg-slate-600 cursor-wait" : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"}`}
                    disabled={loading}
                  >
                    {loading ? "Shortening..." : "Get your link for free →"}
                  </button>
                </div>

                {error && <div className="mt-2 text-sm text-rose-400 bg-rose-900/10 p-2 rounded">{error}</div>}

                {shortUrl && (
                  <div className="mt-3 bg-slate-800 border border-slate-700 p-3 rounded-md flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-slate-200 break-words font-medium">{shortUrl}</div>
                      <div className="text-slate-400 text-sm mt-1">Share this link or generate a QR code.</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={handleCopy} className="px-3 py-1 bg-slate-700 rounded text-slate-300">{copied ? "Copied!" : "Copy"}</button>
                      <button onClick={() => setTab("qr")} className="px-3 py-1 bg-slate-700 rounded text-slate-300">Show QR</button>
                    </div>
                  </div>
                )}
              </form>
            ) : (
              <div className="py-6 flex flex-col items-center justify-center text-slate-300 gap-4">
                <div className="w-44 h-44 bg-white/5 rounded-lg flex items-center justify-center">
                  {shortUrl ? (
                    <img src={qrImageFor(shortUrl)} alt="QR code" className="w-40 h-40 object-contain" />
                  ) : longUrl ? (
                    <img src={qrImageFor(longUrl)} alt="QR preview" className="w-40 h-40 object-contain" />
                  ) : (
                    <div className="text-sm text-slate-400 px-2 text-center">QR preview appears here when you create or paste a link.</div>
                  )}
                </div>

                <div className="text-slate-400 text-sm text-center max-w-sm">
                  {shortUrl ? "Scan the QR to open the shortened link." : "Paste a link in the Short Link tab and create a short link to generate a QR code."}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
