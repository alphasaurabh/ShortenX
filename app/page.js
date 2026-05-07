import Hero from "../components/Hero";

const featureCards = [
  {
    title: "Short Links",
    description: "Make clean, fast short links in seconds. No signup. No bullshit.",
    icon: "↗",
  },
  {
    title: "QR Codes",
    description: "Hit generate and get a QR instantly—simple as that.",
    icon: "⌗",
  },
  {
    title: "Mini Pages",
    description: "Make quick, no-nonsense landing pages that just work.",
    icon: "▣",
  },
];

const stats = [
  { label: "Links generated", value: "12.4K" },
  { label: "QR codes created", value: "4.8K" },
  { label: "Instant redirects", value: "99.98%" },
  { label: "Platform uptime", value: "24/7" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl px-6 pb-24 lg:pb-28">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="premium-card premium-card-hover flex min-h-[132px] items-center justify-center p-[18px] text-center">
              <div className="space-y-1.5">
                <div className="text-2xl font-semibold tracking-tight text-white sm:text-[2rem]">{item.value}</div>
                <p className="text-sm text-slate-400">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {featureCards.map((card) => (
            <article key={card.title} className="premium-card premium-card-hover shimmer-border p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/12 bg-blue-400/10 text-lg text-blue-200 shadow-[0_0_30px_rgba(59,130,246,0.12)]">
                {card.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">{card.title}</h3>
              <p className="mt-2.5 text-sm leading-6 text-slate-400">{card.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
