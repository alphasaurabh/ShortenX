export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-slate-100 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="premium-card shimmer-border relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_30%)]" />
          <div className="relative space-y-8">
            <div className="max-w-3xl space-y-4">
              <div className="premium-chip">About ShortenX</div>
              <h1 className="text-balance text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">About ShortenX</h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                A polished, open-source URL management tool designed to make sharing links easier, cleaner, and more trackable.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="premium-card premium-card-hover p-5">
                <div className="text-sm uppercase tracking-[0.22em] text-blue-200/80">Speed</div>
                <p className="mt-3 text-sm leading-7 text-slate-400">Fast short links built for instant sharing.</p>
              </div>
              <div className="premium-card premium-card-hover p-5">
                <div className="text-sm uppercase tracking-[0.22em] text-blue-200/80">QR Ready</div>
                <p className="mt-3 text-sm leading-7 text-slate-400">Downloadable QR codes that bridge the physical and digital worlds.</p>
              </div>
              <div className="premium-card premium-card-hover p-5">
                <div className="text-sm uppercase tracking-[0.22em] text-blue-200/80">Built With</div>
                <p className="mt-3 text-sm leading-7 text-slate-400">Next.js 14 and MongoDB for a lightweight but production-ready stack.</p>
              </div>
            </div>

            <section className="prose prose-invert max-w-none prose-headings:tracking-tight prose-p:text-slate-300 prose-li:text-slate-300">
              <p>
                🚀 <strong>ShortenX</strong> is a modern, open-source URL management tool designed to make sharing links easier,
                cleaner, and more trackable.
              </p>

              <p>
                In a digital world cluttered with long, messy URLs, ShortenX provides a streamlined solution. Whether you are a
                marketer needing to track campaign clicks, a student sharing resources, or just someone who wants a cleaner link,
                ShortenX handles it instantly.
              </p>

              <p>
                <strong>What makes ShortenX different?</strong> Unlike basic shorteners, ShortenX is built with a focus on
                performance and utility. It doesn't just shorten links; it generates instant, downloadable QR Codes for bridging the
                physical and digital worlds. Powered by Next.js 14 and MongoDB, it ensures that redirects are lightning-fast and data
                is securely stored.
              </p>

              <h2>👨‍💻 Meet the Developer</h2>
              <p>
                This project was designed and built by <strong>Saurabh Chandravanshi</strong>, a B.Tech third-year undergraduate at
                Gautam Buddha University.
              </p>

              <p>
                I am a passionate Full Stack Developer who loves building software that solves real-world problems with clean code and
                intuitive design. ShortenX was born out of my desire to master the latest features of Next.js (like Server Actions and
                the App Router) while creating a tool that I would actually use myself.
              </p>

              <p>
                I am currently open to work and actively looking for opportunities to contribute to innovative projects. Whether it's
                a full-time role, a freelance gig, or an open-source collaboration, I'm always excited to connect with fellow
                developers and tech enthusiasts.
              </p>

              <h2>📬 Let's Connect</h2>
              <p>If you want to discuss this project, have a job opportunity, or just want to say hi, feel free to reach out!</p>
              <ul>
                <li>
                  <strong>GitHub:</strong>{' '}
                  <a className="text-blue-300 underline decoration-blue-400/40 underline-offset-4" href="https://github.com/alphasaurabh" target="_blank" rel="noopener noreferrer">
                    github.com/alphasaurabh
                  </a>
                </li>
                <li>
                  <strong>LinkedIn:</strong>{' '}
                  <a className="text-blue-300 underline decoration-blue-400/40 underline-offset-4" href="https://www.linkedin.com/in/chandravanshisaurabh/" target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/chandravanshisaurabh
                  </a>
                </li>
                <li>
                  <strong>Email:</strong>{' '}
                  <a className="text-blue-300 underline decoration-blue-400/40 underline-offset-4" href="mailto:chandravanshisaurabh25@gmail.com">chandravanshisaurabh25@gmail.com</a>
                </li>
              </ul>

              <p>Star this project on GitHub if you found it useful! 🌟</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
