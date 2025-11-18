import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="max-w-6xl mx-auto px-6 -mt-20 pb-20">
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold">Short Links</h3>
            <p className="mt-3 text-slate-400 text-sm">Make clean, fast short links in seconds. No signup. No bullshit.</p>
          </div>
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold">QR Codes</h3>
            <p className="mt-3 text-slate-400 text-sm">Hit generate and get a QR instantly—simple as that.</p>
          </div>
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold">Mini Pages</h3>
            <p className="mt-3 text-slate-400 text-sm">Make quick, no-nonsense landing pages that just work.</p>
          </div>
        </div>
      </section>
    </>
  );
}
