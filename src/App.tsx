import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ChessEngineSection from "./components/ChessEngineSection";
import ProjectsSection from "./components/ProjectsSection";

const focusAreas = [
  {
    title: "Languages",
    detail: "C++20 · Python · x86_64 assembly · JavaScript",
  },
  {
    title: "Systems & algorithms",
    detail: "Bitboards · search · data structures · Linux",
  },
  {
    title: "Tools",
    detail: "Neovim · GDB · Valgrind · Git · shell",
  },
];

const otherInputs = [
  {
    number: "01",
    title: "Competitive programming",
    text: "I like the point in a CCC problem where one observation makes the whole thing simpler. I’m still practicing, and trying to get faster without skipping the reasoning.",
  },
  {
    number: "02",
    title: "Games",
    text: "I play a lot of action RPGs. I end up noticing the combat feel, menus, and pacing almost as much as the story.",
  },
  {
    number: "03",
    title: "Basketball",
    text: "Basketball gets me away from the screen for a while. I play to stay active, reset my head, and have fun with friends.",
  },
];

function App() {
  return (
    <>
      <a
        className="sr-only z-50 rounded-sm bg-ice px-4 py-2 font-mono text-sm text-obsidian focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href="#main"
      >
        Skip to content
      </a>
      <Navbar />
      <main
        className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10"
        id="main"
      >
        <Hero />

        <section
          aria-labelledby="about-title"
          className="border-t border-hairline py-16 md:py-24"
          id="about"
        >
          <div className="section-index">02 <span>// ABOUT</span></div>
          <div className="mt-7 grid gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-20">
            <h2 className="section-title" id="about-title">
              Curious about the parts you don’t see.
            </h2>
            <div className="max-w-2xl">
              <p className="body-copy">
                I’m a student programmer who likes getting into the details:
                how a search tree grows, where a program spends its time, and
                how a small design choice changes the whole system. Lately,
                that curiosity has mostly turned into C++20 projects, chess
                engines, and terminal tools.
              </p>
              <dl className="mt-8 grid gap-5 border-t border-hairline pt-5 sm:grid-cols-3">
                <div>
                  <dt className="data-label">Currently learning</dt>
                  <dd className="data-value">Search & performance</dd>
                </div>
                <div>
                  <dt className="data-label">Competition</dt>
                  <dd className="data-value">Canadian Computing Competition</dd>
                </div>
                <div>
                  <dt className="data-label">Usual setup</dt>
                  <dd className="data-value">Linux, shell, debugger</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <ChessEngineSection />
        <ProjectsSection />

        <section
          aria-labelledby="stack-title"
          className="border-t border-hairline py-16 md:py-24"
          id="stack"
        >
          <div className="section-index">05 <span>// STACK</span></div>
          <div className="mt-7 grid gap-10 md:grid-cols-[.75fr_1.25fr] md:gap-20">
            <div>
              <h2 className="section-title" id="stack-title">
                Tools I reach for.
              </h2>
              <p className="body-copy mt-5 max-w-sm">
                The right tool depends on the problem. These are the languages
                and environments I’ve been spending time with.
              </p>
            </div>
            <div className="divide-y divide-hairline border-y border-hairline">
              {focusAreas.map((area, index) => (
                <div
                  className="grid gap-2 py-5 sm:grid-cols-[2rem_11rem_1fr] sm:items-baseline sm:gap-4"
                  key={area.title}
                >
                  <span className="data-label text-ice">
                    0{index + 1}
                  </span>
                  <h3 className="text-sm font-semibold text-copy">
                    {area.title}
                  </h3>
                  <p className="font-mono text-xs leading-6 text-muted">
                    {area.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="outside-title"
          className="border-t border-hairline py-16 md:py-24"
          id="outside"
        >
          <div className="section-index">06 <span>// OUTSIDE THE TERMINAL</span></div>
          <div className="mt-7 grid gap-10 md:grid-cols-[.75fr_1.25fr] md:gap-20">
            <div>
              <h2 className="section-title" id="outside-title">
                Things I do<br className="hidden sm:block" /> when I log off.
              </h2>
              <p className="body-copy mt-5 max-w-sm">
                When I’m not working on a project, I’m usually doing CCC
                practice, playing a game, or out on the court.
              </p>
            </div>
            <div className="divide-y divide-hairline border-y border-hairline">
              {otherInputs.map((item) => (
                <article
                  className="grid grid-cols-[2rem_1fr] gap-4 py-5 sm:grid-cols-[2rem_1fr] sm:gap-5"
                  key={item.number}
                >
                  <span className="data-label pt-1 text-ice">{item.number}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-copy">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
                      {item.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <footer className="border-t border-hairline">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-3 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <a
            className="font-mono font-semibold tracking-wide text-copy"
            href="#top"
          >
            [IS] <span className="text-muted">/</span> Ishtiaq Sifat
          </a>
          <p>Built with React, TypeScript, and a lot of curiosity.</p>
          <a className="transition hover:text-ice" href="#top">
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  );
}

function ContactSection() {
  const email = "ishtiaq.sifat2009@gmail.com";
  const [copyState, setCopyState] = useState("");
  const timeoutRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    },
    [],
  );

  async function copyEmail() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const helper = document.createElement("textarea");
        helper.value = email;
        helper.setAttribute("readonly", "");
        helper.style.position = "fixed";
        helper.style.opacity = "0";
        document.body.appendChild(helper);
        helper.select();
        const copied = document.execCommand("copy");
        helper.remove();
        if (!copied) throw new Error("Clipboard access is unavailable.");
      }
      setCopyState("Email copied.");
    } catch {
      setCopyState("Copy didn’t work here — use the email link.");
    }

    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setCopyState(""), 2600);
  }

  return (
    <section
      aria-labelledby="contact-title"
      className="border-t border-hairline py-16 md:py-24"
      id="contact"
    >
      <div className="section-index">07 <span>// CONTACT</span></div>
      <div className="mt-7 grid gap-10 md:grid-cols-[.85fr_1.15fr] md:gap-20">
        <div>
          <p className="data-label">QUESTIONS, COLLABORATION, OR A GOOD BUG</p>
          <h2 className="section-title mt-4" id="contact-title">
            Let’s talk systems.
          </h2>
          <p className="body-copy mt-5 max-w-sm">
            If you’re into C++, chess engines, or solving a tricky problem,
            I’d be glad to hear from you.
          </p>
        </div>
        <div className="border-y border-hairline">
          <div className="grid min-h-16 grid-cols-[3.5rem_1fr_auto] items-center gap-3 border-b border-hairline">
            <span className="data-label">EMAIL</span>
            <a
              className="break-all text-sm text-copy transition hover:text-ice-bright sm:text-base"
              href={`mailto:${email}`}
            >
              {email}
            </a>
            <button
              className="border border-hairline px-3 py-2 font-mono text-[.65rem] uppercase tracking-wider text-muted transition hover:border-ice/50 hover:text-ice focus-visible:outline-2 focus-visible:outline-ice"
              onClick={copyEmail}
              type="button"
            >
              Copy
            </button>
          </div>
          <p aria-live="polite" className="min-h-8 py-2 font-mono text-xs text-emerald">
            {copyState}
          </p>
          <a
            className="contact-link"
            href="https://github.com/ishtiaqsifat2009-arch"
            rel="noreferrer"
            target="_blank"
          >
            <span>GITHUB</span>
            <b>@ishtiaqsifat2009-arch</b>
            <span aria-hidden="true">↗</span>
          </a>
          <a
            className="contact-link"
            href="https://www.linkedin.com/in/ishtiaq-sifat-9b7634361/"
            rel="noreferrer"
            target="_blank"
          >
            <span>LINKEDIN</span>
            <b>Ishtiaq Sifat</b>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default App;
