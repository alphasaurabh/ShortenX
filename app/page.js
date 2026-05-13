import Hero from "../components/Hero";
import HomeStatsSection from "../components/HomeStatsSection";
import { getDashboardStats } from "../lib/stats";

export const dynamic = "force-dynamic";

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

export default async function Home() {
  const initialStats = await getDashboardStats();

  return (
    <>
      <Hero />
      <HomeStatsSection initialStats={initialStats} />

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:pb-28">
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
