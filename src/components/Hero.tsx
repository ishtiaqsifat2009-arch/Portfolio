const systemReadout = [
  { key: "ARCH", value: "x86_64-linux" },
  { key: "CORE", value: "C++20 / SIMD" },
  { key: "FOCUS", value: "Low-Latency Engines" },
];

function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate grid min-h-[calc(100svh-68px)] items-center gap-12 py-16 md:grid-cols-[1.12fr_.88fr] md:gap-14 md:py-20 lg:gap-24"
      id="top"
    >
      <div aria-hidden="true" className="technical-grid absolute inset-0 -z-10" />
      <div className="relative">
        <p className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[.62rem] tracking-[.12em] text-muted sm:text-xs">
          <span className="text-ice">01</span>
          <span>// STUDENT SYSTEMS DEVELOPER</span>
          <span className="hidden text-hairline sm:inline">—</span>
          <span>VANCOUVER, BC</span>
        </p>
        <h1
          className="max-w-[850px] text-[clamp(2.4rem,6.6vw,5.8rem)] font-semibold leading-[.99] tracking-[-.075em] text-copy"
          id="hero-title"
        >
          I like knowing
          <br />
          what the machine
          <br />
          <span className="text-ice">is actually doing.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
          I’m Ishtiaq Sifat—building high-throughput C++20 systems, bitboard
          chess engines, and terminal-driven developer tools.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            className="inline-flex min-h-12 items-center gap-4 border border-ice bg-ice px-5 text-sm font-semibold text-obsidian transition hover:border-ice-bright hover:bg-ice-bright focus-visible:outline-2 focus-visible:outline-ice-bright"
            href="#engine"
          >
            Explore Chess Engine <span aria-hidden="true">↘</span>
          </a>
          <a
            className="inline-flex min-h-12 items-center gap-4 border border-hairline px-5 text-sm font-medium text-copy transition hover:border-ice/50 hover:bg-steel-hover focus-visible:outline-2 focus-visible:outline-ice"
            href="#projects"
          >
            View Projects <span aria-hidden="true" className="text-ice">→</span>
          </a>
        </div>
      </div>

      <aside
        aria-label="System architecture overview"
        className="relative overflow-hidden border border-hairline bg-steel/90 shadow-[0_24px_70px_rgba(0,0,0,.32)]"
      >
        <div className="flex h-11 items-center justify-between border-b border-hairline px-4 font-mono text-[.6rem] uppercase tracking-[.12em] text-muted">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="h-1.5 w-1.5 rounded-full bg-hairline" />
            <i className="h-1.5 w-1.5 rounded-full bg-hairline" />
            <i className="h-1.5 w-1.5 rounded-full bg-ice/70" />
          </span>
          <span>system_readout.cfg</span>
          <span>v.01</span>
        </div>
        <div className="p-5 sm:p-7">
          <p className="font-mono text-xs text-muted">
            <span className="text-ice">[runtime]</span> current_profile
          </p>
          <div className="mt-6 space-y-5">
            {systemReadout.map((item, index) => (
              <div
                className="grid grid-cols-[4.5rem_1fr] items-baseline gap-3 sm:grid-cols-[5.5rem_1fr]"
                key={item.key}
              >
                <span className="font-mono text-[.62rem] tracking-[.08em] text-muted">
                  {item.key}
                </span>
                <span className="font-mono text-sm text-copy sm:text-base">
                  <span className="mr-2 text-muted">=</span>
                  {item.value}
                  {index === 0 && (
                    <span
                      aria-hidden="true"
                      className="ml-1 inline-block h-4 w-[2px] translate-y-[3px] animate-pulse bg-ice"
                    />
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="my-7 h-px bg-hairline" />
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[.6rem] tracking-[.08em]">
            <span className="text-muted">CURRENT STATE</span>
            <span className="flex items-center gap-2 text-emerald">
              <i className="h-1.5 w-1.5 rounded-full bg-emerald" />
              BUILDING / TESTING
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 border-t border-hairline">
          {["measure()", "iterate()", "repeat()"].map((item) => (
            <span
              className="border-r border-hairline py-3 text-center font-mono text-[.58rem] text-muted last:border-r-0"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </aside>
      <span className="absolute bottom-5 right-0 hidden font-mono text-[.6rem] tracking-wider text-muted md:block">
        IS / 2026
      </span>
    </section>
  );
}

export default Hero;
