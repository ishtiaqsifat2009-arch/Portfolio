import { useEffect, useRef, useState } from "react";

type PositionId = "startpos" | "kiwipete" | "endgame";
type LineTone = "prompt" | "info" | "search" | "result" | "muted";

type SearchDepth = {
  score: string;
  nodes: number;
  time: number;
  nps: string;
  tt: string;
  pv: string;
};

type PositionProfile = {
  label: string;
  fen: string;
  bestmove: string;
  ponder: string;
  depths: SearchDepth[];
};

type TerminalLine = { text: string; tone: LineTone };
type ReplayStatus = "IDLE" | "RUNNING" | "COMPLETE";

const profiles: Record<PositionId, PositionProfile> = {
  startpos: {
    label: "Initial Setup (Startpos)",
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    bestmove: "e2e4",
    ponder: "c7c5",
    depths: [
      { score: "+14", nodes: 20, time: 2, nps: "1.2M", tt: "0.0%", pv: "e2e4" },
      { score: "+22", nodes: 148, time: 8, nps: "3.8M", tt: "4.2%", pv: "e2e4 e7e5" },
      { score: "+28", nodes: 1140, time: 24, nps: "6.9M", tt: "12.5%", pv: "e2e4 c7c5 g1f3" },
      { score: "+34", nodes: 9840, time: 72, nps: "8.8M", tt: "24.1%", pv: "e2e4 c7c5 g1f3 d7d6" },
      { score: "+38", nodes: 64200, time: 140, nps: "10.4M", tt: "38.6%", pv: "e2e4 c7c5 g1f3 d7d6 d2d4 c5d4" },
      { score: "+41", nodes: 489200, time: 230, nps: "11.6M", tt: "49.2%", pv: "e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6" },
      { score: "+44", nodes: 2410800, time: 310, nps: "12.2M", tt: "58.7%", pv: "e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 a7a6" },
      { score: "+45", nodes: 12841000, time: 420, nps: "12.8M", tt: "64.3%", pv: "e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 a7a6 f1e2" },
    ],
  },
  kiwipete: {
    label: "Kiwipete (Tactical Branching)",
    fen: "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1",
    bestmove: "g2h3",
    ponder: "e8g8",
    depths: [
      { score: "+110", nodes: 48, time: 4, nps: "2.1M", tt: "0.0%", pv: "g2h3" },
      { score: "+135", nodes: 520, time: 14, nps: "4.8M", tt: "9.1%", pv: "g2h3 b4c3" },
      { score: "+142", nodes: 5890, time: 46, nps: "7.9M", tt: "21.4%", pv: "g2h3 e8g8 e1g1" },
      { score: "+168", nodes: 64100, time: 110, nps: "10.2M", tt: "34.0%", pv: "g2h3 b4c3 d2c3 e6d5" },
      { score: "+182", nodes: 590400, time: 204, nps: "11.7M", tt: "48.2%", pv: "g2h3 e8g8 e1g1 b4c3 d2c3 d7d6" },
      { score: "+195", nodes: 4820100, time: 320, nps: "12.4M", tt: "59.8%", pv: "g2h3 e8g8 e1g1 b4c3 d2c3 e6d5 e4d5" },
      { score: "+208", nodes: 18940000, time: 450, nps: "12.9M", tt: "68.5%", pv: "g2h3 e8g8 e1g1 b4c3 d2c3 e6d5 e4d5 a6e2 f3e2" },
      { score: "+215", nodes: 36400000, time: 590, nps: "13.1M", tt: "72.4%", pv: "g2h3 e8g8 e1g1 b4c3 d2c3 e6d5 e4d5 f6d5 c3g7 g8g7" },
    ],
  },
  endgame: {
    label: "Endgame Grind (Promotion & Zugzwang)",
    fen: "8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1",
    bestmove: "b4f4",
    ponder: "h4g5",
    depths: [
      { score: "+310", nodes: 14, time: 1, nps: "1.0M", tt: "0.0%", pv: "b4f4" },
      { score: "+345", nodes: 96, time: 5, nps: "3.2M", tt: "15.6%", pv: "b4f4 h4g3" },
      { score: "+380", nodes: 820, time: 18, nps: "6.5M", tt: "32.0%", pv: "b4f4 h4g3 f4f3 g3g2" },
      { score: "+410", nodes: 6410, time: 52, nps: "9.2M", tt: "48.4%", pv: "b4f4 h4g5 f4f7 g5g6" },
      { score: "+440", nodes: 38200, time: 94, nps: "11.1M", tt: "62.1%", pv: "b4f4 h4g5 f4f7 g5g6 f7c7" },
      { score: "+485", nodes: 210500, time: 160, nps: "12.3M", tt: "71.0%", pv: "b4f4 h4g5 f4f7 g5g6 f7c7 h5h2" },
      { score: "+520", nodes: 980400, time: 230, nps: "12.7M", tt: "76.4%", pv: "b4f4 h4g5 f4f7 g5g6 f7c7 h5e5 a5a6" },
      { score: "+560", nodes: 4120000, time: 310, nps: "13.0M", tt: "81.2%", pv: "b4f4 h4g5 f4f7 g5g6 f7c7 h5e5 a5a6 e5e2" },
    ],
  },
};

const initialLines: TerminalLine[] = [
  { text: "$ sifat-engine --uci", tone: "prompt" },
  { text: "Bitboards initialized. Pick a position to replay a sample search.", tone: "info" },
];

const architecture = [
  {
    code: "01",
    title: "Move generation",
    detail:
      "64-bit bitboards represent occupancy. Sliding attacks use Magic Bitboards, with a PEXT (BMI2) path for indexed lookups.",
    value: "MAGIC + PEXT",
  },
  {
    code: "02",
    title: "Search",
    detail:
      "PVS alpha-beta narrows the tree; quiescence search extends tactical positions instead of evaluating in the middle of a capture sequence.",
    value: "PVS / QUIESCENCE",
  },
  {
    code: "03",
    title: "Transpositions",
    detail:
      "A dual-tier, depth-preferred transposition table uses 64-bit Zobrist keys to recognize positions the search has already seen.",
    value: "ZOBRIST / TT",
  },
];

function SearchMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-l border-hairline px-3 py-3 first:border-l-0 sm:px-4">
      <span className="block font-mono text-[.53rem] tracking-[.12em] text-muted">
        {label}
      </span>
      <b className="mt-1.5 block truncate font-mono text-xs font-medium text-copy sm:text-sm">
        {value}
      </b>
    </div>
  );
}

function ChessEngineSection() {
  const [position, setPosition] = useState<PositionId>("startpos");
  const [status, setStatus] = useState<ReplayStatus>("IDLE");
  const [lines, setLines] = useState(initialLines);
  const [metrics, setMetrics] = useState({
    depth: "0 / 8",
    nodes: "0",
    nps: "—",
    tt: "—",
    bestmove: "—",
  });
  const [searching, setSearching] = useState(false);
  const generation = useRef(0);
  const timer = useRef<number | null>(null);
  const terminal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminal.current) terminal.current.scrollTop = terminal.current.scrollHeight;
  }, [lines]);

  useEffect(
    () => () => {
      generation.current += 1;
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  function reset() {
    generation.current += 1;
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
    setSearching(false);
    setStatus("IDLE");
    setLines(initialLines);
    setMetrics({ depth: "0 / 8", nodes: "0", nps: "—", tt: "—", bestmove: "—" });
  }

  function runReplay() {
    if (searching) return;
    if (timer.current !== null) window.clearTimeout(timer.current);

    const activeProfile = profiles[position];
    const runId = generation.current + 1;
    generation.current = runId;
    let depthIndex = 0;
    setSearching(true);
    setStatus("RUNNING");
    setMetrics({ depth: "0 / 8", nodes: "0", nps: "—", tt: "—", bestmove: "—" });
    setLines([
      { text: "$ ./sifat-engine --uci", tone: "prompt" },
      { text: `position fen ${activeProfile.fen}`, tone: "prompt" },
      { text: "go depth 8", tone: "prompt" },
    ]);

    const advance = () => {
      if (generation.current !== runId) return;

      const sample = activeProfile.depths[depthIndex];
      if (sample) {
        const depth = depthIndex + 1;
        const move = sample.pv.split(" ")[0] ?? "—";
        setMetrics({
          depth: `${depth} / 8`,
          nodes: sample.nodes.toLocaleString(),
          nps: `${sample.nps} NPS`,
          tt: sample.tt,
          bestmove: move,
        });
        setLines((current) => [
          ...current,
          {
            text: `info depth ${depth} score cp ${sample.score} time ${sample.time} nodes ${sample.nodes} nps ${sample.nps} tthit ${sample.tt} pv ${sample.pv}`,
            tone: "search",
          },
        ]);
        depthIndex += 1;
        timer.current = window.setTimeout(advance, 190);
        return;
      }

      setLines((current) => [
        ...current,
        { text: `bestmove ${activeProfile.bestmove} ponder ${activeProfile.ponder}`, tone: "result" },
        { text: "Replay complete — sample output only; no engine process is running.", tone: "muted" },
      ]);
      setMetrics((current) => ({ ...current, bestmove: activeProfile.bestmove }));
      setSearching(false);
      setStatus("COMPLETE");
      timer.current = null;
    };

    timer.current = window.setTimeout(advance, 160);
  }

  return (
    <section
      aria-labelledby="engine-title"
      className="border-t border-hairline py-16 md:py-24"
      id="engine"
    >
      <div className="section-index">03 <span>// FLAGSHIP / C++20</span></div>
      <div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-end md:gap-10">
        <div>
          <p className="data-label mb-3">PROJECT 001 — SEARCH & MOVE GENERATION</p>
          <h2 className="section-title" id="engine-title">
            A chess engine,<br />
            <span className="text-ice">from the bits up.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-muted">
          The interesting part isn’t just how many positions it can search. It’s
          how the board is represented, which branches get explored, and what
          information is worth keeping.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[.86fr_1.14fr] lg:gap-14">
        <div>
          <div className="relative overflow-hidden border border-hairline bg-steel">
            <div className="absolute inset-x-0 top-0 z-10 flex h-9 items-center justify-between border-b border-hairline bg-obsidian/80 px-3 font-mono text-[.55rem] tracking-wider text-muted backdrop-blur">
              <span>FIG. 01</span>
              <span>BOARD STATE / SEARCH VIEW</span>
            </div>
            <img
              alt="Visualization of a chess engine position and search"
              className="aspect-[1.35] w-full object-cover pt-9 opacity-90"
              loading="lazy"
              src={`${import.meta.env.BASE_URL}images/chess-engine.webp`}
            />
            <span className="absolute bottom-3 right-3 font-mono text-xs text-ice-bright">
              64 SQUARES
            </span>
          </div>
          <div className="divide-y divide-hairline border-x border-b border-hairline">
            {[
              ["BOARD MODEL", "64-bit bitboards / uint64_t"],
              ["SLIDING ATTACKS", "Magic Bitboards + PEXT (BMI2)"],
              ["SEARCH", "PVS alpha-beta + quiescence"],
              ["POSITION CACHE", "Dual-tier Zobrist TT"],
            ].map(([label, value]) => (
              <div
                className="grid gap-1 px-3 py-3 sm:grid-cols-[8rem_1fr] sm:items-baseline sm:gap-3"
                key={label}
              >
                <span className="data-label text-[.55rem]">{label}</span>
                <b className="text-xs font-medium text-copy">{value}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-hairline">
          {architecture.map((item) => (
            <article
              className="grid grid-cols-[2rem_1fr_auto] gap-3 border-b border-hairline py-5 sm:grid-cols-[2.5rem_1fr_9rem] sm:gap-4"
              key={item.code}
            >
              <span className="font-mono text-xs text-ice">{item.code}</span>
              <div>
                <h3 className="text-sm font-semibold text-copy">{item.title}</h3>
                <p className="mt-2 max-w-xl text-xs leading-6 text-muted sm:text-sm">
                  {item.detail}
                </p>
              </div>
              <span className="col-start-2 self-start font-mono text-[.55rem] tracking-wider text-ice-bright sm:col-start-auto sm:pt-1 sm:text-right">
                {item.value}
              </span>
            </article>
          ))}
          <div className="py-5">
            <p className="data-label mb-3">DYNAMIC MOVE ORDERING</p>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[.6rem] text-copy sm:text-xs">
              {["TT Hash", "MVV-LVA", "Killer", "History"].map((stage, index) => (
                <span className="inline-flex items-center gap-2" key={stage}>
                  <b className="border border-hairline bg-steel px-2.5 py-2 font-medium">
                    {stage}
                  </b>
                  {index < 3 && <span className="text-ice" aria-hidden="true">→</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border border-hairline bg-steel">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline px-4 py-4 sm:px-5">
          <div>
            <p className="data-label mb-1">INTERACTIVE REPLAY</p>
            <h3 className="text-lg font-semibold text-copy">UCI search trace</h3>
          </div>
          <span
            aria-live="polite"
            className={`flex items-center gap-2 font-mono text-[.62rem] tracking-wider ${status === "RUNNING" ? "text-ice-bright" : status === "COMPLETE" ? "text-emerald" : "text-muted"}`}
            role="status"
          >
            <i
              className={`h-1.5 w-1.5 rounded-full ${status === "RUNNING" ? "animate-pulse bg-ice" : status === "COMPLETE" ? "bg-emerald" : "bg-muted"}`}
            />
            {status}
          </span>
        </div>

        <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-5">
          <label className="grid max-w-md flex-1 gap-2 text-xs text-muted">
            Position preset
            <select
              className="h-11 w-full appearance-none border border-hairline bg-obsidian px-3 text-sm text-copy outline-none transition focus:border-ice/60 focus:ring-2 focus:ring-ice-glow"
              onChange={(event) => setPosition(event.target.value as PositionId)}
              value={position}
            >
              {(Object.entries(profiles) as [PositionId, PositionProfile][]).map(
                ([key, profile]) => (
                  <option key={key} value={key}>
                    {profile.label}
                  </option>
                ),
              )}
            </select>
          </label>
          <div className="flex gap-2">
            <button
              className="inline-flex min-h-11 items-center gap-3 border border-ice bg-ice px-4 text-xs font-semibold text-obsidian transition hover:bg-ice-bright disabled:cursor-wait disabled:opacity-60"
              disabled={searching}
              onClick={runReplay}
              type="button"
            >
              {searching ? "Searching…" : "Run replay"}
              <span aria-hidden="true">▶</span>
            </button>
            <button
              className="min-h-11 border border-hairline px-4 text-xs font-medium text-muted transition hover:border-muted hover:text-copy"
              onClick={reset}
              type="button"
            >
              Reset
            </button>
          </div>
        </div>

        <div aria-label="Search telemetry" className="grid grid-cols-3 border-y border-hairline sm:grid-cols-5">
          <SearchMetric label="DEPTH" value={metrics.depth} />
          <SearchMetric label="NODES" value={metrics.nodes} />
          <SearchMetric label="NPS" value={metrics.nps} />
          <SearchMetric label="TT HIT" value={metrics.tt} />
          <SearchMetric label="BEST MOVE" value={metrics.bestmove} />
        </div>

        <div className="bg-[#07090c]">
          <div className="flex justify-between border-b border-hairline/70 px-4 py-2 font-mono text-[.55rem] tracking-wider text-muted sm:px-5">
            <span>STDOUT</span>
            <span>uci_search_replay.log</span>
            <span>UTF-8</span>
          </div>
          <div
            aria-label="UCI simulator output"
            aria-live="polite"
            aria-relevant="additions text"
            className="max-h-64 min-h-44 overflow-auto px-4 py-4 font-mono text-[.63rem] leading-6 sm:px-5 sm:text-xs"
            ref={terminal}
            role="log"
          >
            {lines.map((line, index) => (
              <p
                className={`m-0 break-words ${line.tone === "prompt" ? "text-ice-bright" : line.tone === "info" ? "text-emerald" : line.tone === "result" ? "font-semibold text-emerald" : line.tone === "muted" ? "text-muted" : "text-copy/80"}`}
                key={`${index}-${line.text}`}
              >
                {line.text}
              </p>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-right font-mono text-[.58rem] text-muted">
        Sample UCI-style output only; the engine does not run in this page.
      </p>
    </section>
  );
}

export default ChessEngineSection;
