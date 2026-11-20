import { useState } from "react";

type ProjectCategory = "all" | "cpp" | "engine" | "gamedev";

const filters: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "cpp", label: "C++" },
  { id: "engine", label: "Chess engine" },
  { id: "gamedev", label: "Game dev" },
];

const projects = [
  {
    number: "01",
    category: "engine" as const,
    type: "C++20 / BITBOARDS / UCI",
    title: "C++20 Chess Engine",
    description:
      "A bitboard engine with Magic and PEXT move generation, PVS alpha-beta search, quiescence, a transposition table, and dynamic move ordering.",
    image: "chess-engine.webp",
    imageAlt: "Chess engine search visualization",
    tags: ["Search", "Optimization", "UCI"],
    href: "#engine",
    linkLabel: "Explore engine",
    featured: true,
  },
  {
    number: "02",
    category: "cpp" as const,
    type: "C++ / TERMINAL / PRODUCTIVITY",
    title: "Aegis Workspace",
    description:
      "A terminal productivity dashboard with a study queue and logging, built to make it easier to keep track of what I’m working on.",
    image: "Aegis(coverpic).jpg",
    imageAlt: "Aegis Workspace terminal dashboard showing a study queue and activity log",
    tags: ["CLI", "Study queue", "Logging"],
    href: "https://github.com/ishtiaqsifat2009-arch/Aegis-Project",
    linkLabel: "View on GitHub",
    featured: false,
  },
  {
    number: "03",
    category: "gamedev" as const,
    type: "SFU CANADIAN CODING LEAGUE / PIXELPAD",
    title: "Team game project",
    description:
      "A team project for the SFU Canadian Coding League. I worked on core game logic and helped get the pieces integrated in PixelPad.",
    image: "SFUCL.jpg",
    imageAlt: "SFU Canadian Coding League logo",
    tags: ["Game dev", "Team project", "PixelPad"],
    href: "https://pixelpad.io/app/rapclzvumnh/",
    linkLabel: "View on PixelPad",
    featured: false,
  },
];

function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const visibleProjects = projects.filter(
    (project) => activeFilter === "all" || project.category === activeFilter,
  );
  const imageBase = `${import.meta.env.BASE_URL}images/`;

  return (
    <section
      aria-labelledby="projects-title"
      className="border-t border-hairline py-16 md:py-24"
      id="projects"
    >
      <div className="section-index">04 <span>// SELECTED WORK</span></div>
      <div className="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="data-label mb-3">BUILT, TESTED, REVISED</p>
          <h2 className="section-title" id="projects-title">
            Projects I’ve been<br />
            <span className="text-ice">spending time on.</span>
          </h2>
        </div>
        <div aria-label="Filter projects" className="flex flex-wrap gap-1" role="group">
          {filters.map((filter) => {
            const count =
              filter.id === "all"
                ? projects.length
                : projects.filter((project) => project.category === filter.id).length;
            const selected = activeFilter === filter.id;

            return (
              <button
                aria-pressed={selected}
                className={`border px-3 py-2 font-mono text-[.62rem] tracking-wide transition focus-visible:outline-2 focus-visible:outline-ice ${selected ? "border-ice/50 bg-ice-glow text-ice-bright" : "border-transparent text-muted hover:border-hairline hover:text-copy"}`}
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                type="button"
              >
                {filter.label} <span className="ml-1 opacity-65">{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 border-t border-hairline">
        {visibleProjects.map((project) => (
          <article
            className={`group grid gap-4 border-b border-hairline py-5 transition hover:bg-steel/45 sm:gap-6 md:grid-cols-[3.5rem_10rem_minmax(0,1fr)_8rem] md:items-center md:py-6 ${project.featured ? "md:py-8" : ""}`}
            key={project.number}
          >
            <div className="flex items-center justify-between font-mono text-xs text-ice md:block md:self-start md:pt-1">
              <span>{project.number}</span>
              <span className="text-[.55rem] tracking-wider text-muted md:hidden">
                {project.type}
              </span>
            </div>
            <img
              alt={project.imageAlt}
              className={`w-full border border-hairline bg-steel object-cover transition group-hover:border-ice/40 md:col-start-2 ${project.featured ? "aspect-[1.7] md:aspect-[1.35]" : "aspect-[1.8] md:aspect-[1.35]"}`}
              loading="lazy"
              src={`${imageBase}${project.image}`}
            />
            <div className="md:col-start-3">
              <p className="data-label mb-2 hidden md:block">{project.type}</p>
              <h3 className="text-lg font-semibold tracking-tight text-copy">
                {project.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                {project.description}
              </p>
              <ul aria-label="Project technologies" className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    className="border border-hairline px-2 py-1 font-mono text-[.55rem] text-muted"
                    key={tag}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <a
              aria-label={`${project.linkLabel}: ${project.title}`}
              className="inline-flex items-center gap-2 text-xs font-medium text-copy transition hover:text-ice-bright md:col-start-4 md:justify-self-end"
              href={project.href}
              rel={project.href.startsWith("http") ? "noreferrer" : undefined}
              target={project.href.startsWith("http") ? "_blank" : undefined}
            >
              {project.linkLabel}
              <span className="text-ice" aria-hidden="true">
                {project.href.startsWith("http") ? "↗" : "→"}
              </span>
            </a>
          </article>
        ))}
      </div>
      {visibleProjects.length === 0 && (
        <p className="py-8 text-sm text-muted">No projects in this category yet.</p>
      )}
    </section>
  );
}

export default ProjectsSection;
