export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-slate-100 lg:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="premium-card shimmer-border relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_28%)]" />
          <div className="relative space-y-8">
            <div className="max-w-2xl space-y-4">
              <div className="premium-chip">Contact</div>
              <h1 className="text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl">Contact</h1>
              <p className="max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                Get in touch with the ShortenX team or connect through the channels below.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <a className="premium-card premium-card-hover p-5" href="mailto:chandravanshisaurabh25@gmail.com">
                <div className="text-sm uppercase tracking-[0.22em] text-blue-200/80">Email</div>
                <div className="mt-3 break-all text-lg font-semibold text-white">chandravanshisaurabh25@gmail.com</div>
                <p className="mt-2 text-sm leading-7 text-slate-400">Send a direct message for project questions or opportunities.</p>
              </a>

              <a className="premium-card premium-card-hover p-5" href="https://www.linkedin.com/in/chandravanshisaurabh/" target="_blank" rel="noopener noreferrer">
                <div className="text-sm uppercase tracking-[0.22em] text-blue-200/80">LinkedIn</div>
                <div className="mt-3 text-lg font-semibold text-white">linkedin.com/in/chandravanshisaurabh</div>
                <p className="mt-2 text-sm leading-7 text-slate-400">Connect on LinkedIn for professional updates and networking.</p>
              </a>
            </div>

            <div className="premium-card p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-blue-200/80">ShortenX</p>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Keep building with the same production-ready backend and a more polished frontend experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
