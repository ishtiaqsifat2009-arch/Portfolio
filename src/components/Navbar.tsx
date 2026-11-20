import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Chess Engine", href: "#engine" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = links
      .map(({ href }) => document.querySelector(href))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-hairline/90 bg-obsidian/85 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex h-[68px] w-full max-w-[1240px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-10"
      >
        <a
          aria-label="Ishtiaq Sifat, home"
          className="flex shrink-0 items-center gap-2 font-semibold tracking-tight text-copy"
          href="#top"
          onClick={closeMenu}
        >
          <span className="border border-hairline px-1.5 py-1 font-mono text-xs font-semibold text-ice">
            IS
          </span>
          <span className="font-mono text-xs text-muted">/</span>
          <span className="text-sm">Ishtiaq Sifat</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                aria-current={
                  activeSection === link.href ? "location" : undefined
                }
                className={`nav-link ${activeSection === link.href ? "nav-link-active" : ""}`}
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 border border-hairline bg-steel px-3 py-2 font-mono text-[.62rem] tracking-[.08em] text-muted sm:flex">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald shadow-[0_0_8px_rgba(52,211,153,.55)]" />
          ONLINE <span className="text-hairline">/</span> x86_64
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          className="grid h-10 w-10 place-items-center border border-hairline text-copy transition hover:border-ice/50 hover:text-ice focus-visible:outline-2 focus-visible:outline-ice md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span className="grid gap-[5px]" aria-hidden="true">
            <span className={`block h-px w-4 bg-current transition ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`block h-px w-4 bg-current transition ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      <div
        className={`absolute inset-x-0 top-full border-b border-hairline bg-obsidian/95 px-5 pb-4 pt-2 shadow-2xl backdrop-blur-xl sm:px-8 md:hidden ${menuOpen ? "block" : "hidden"}`}
        id="mobile-navigation"
      >
        <ul className="mx-auto max-w-[1240px]">
          {links.map((link) => (
            <li className="border-b border-hairline/70 last:border-0" key={link.href}>
              <a
                aria-current={
                  activeSection === link.href ? "location" : undefined
                }
                className={`block py-3 text-sm transition hover:text-ice ${activeSection === link.href ? "text-ice" : "text-muted"}`}
                href={link.href}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="flex items-center gap-2 pt-4 font-mono text-[.62rem] tracking-wider text-muted sm:hidden">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald" />
            ONLINE / x86_64
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
