// ==========================================================================
// ISHTIAQ SIFAT PORTFOLIO - CORE ENGINE & INTERACTION SCRIPTS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.nav-links');

    if (menu && menuLinks) {
        menu.addEventListener('click', function() {
            menu.classList.toggle('is-active');
            menuLinks.classList.toggle('active');
        });

        menuLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menu.classList.remove('is-active');
                menuLinks.classList.remove('active');
            });
        });
    }

    // --- Project Filtering System ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => { 
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 40);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(12px)';
                    setTimeout(() => { card.style.display = 'none'; }, 280);
                }
            });
        });
    });

    // --- Scroll Intersection Observer for Entrance Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px" 
    });

    const hiddenElements = document.querySelectorAll('.hidden-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- Hero Hacker Scramble Text Effect ---
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/~=";
    const heroText = document.querySelector(".hero-content h1");

    if (heroText) {
        heroText.onmouseover = event => {
            let iterations = 0;
            const targetValue = event.target.dataset.value || "Hello World.";
            
            clearInterval(event.target.intervalId);
            
            event.target.intervalId = setInterval(() => {
                event.target.innerText = targetValue.split("")
                    .map((letter, index) => {
                        if (index < iterations) {
                            return targetValue[index];
                        } 
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");
                
                if (iterations >= targetValue.length) { 
                    clearInterval(event.target.intervalId);
                }
                
                iterations += 1 / 2.5;
            }, 30);
        };
    }

    // --- Interactive Chess Engine Search Benchmark Simulator ---
    const runBenchBtn = document.getElementById('run-bench-btn');
    const clearBenchBtn = document.getElementById('clear-bench-btn');
    const fenSelect = document.getElementById('fen-select');
    const terminalOutput = document.getElementById('terminal-output');

    const statDepth = document.getElementById('stat-depth');
    const statNodes = document.getElementById('stat-nodes');
    const statNps = document.getElementById('stat-nps');
    const statTt = document.getElementById('stat-tt');
    const statBestmove = document.getElementById('stat-bestmove');

    // Benchmark Position Profiles
    const positionProfiles = {
        startpos: {
            name: "Standard Initial Position",
            fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            depthData: [
                { depth: 1, score: "+14 cp", nodes: 20, time: 2, nps: "1.2M", tt: "0.0%", pv: "e2e4" },
                { depth: 2, score: "+22 cp", nodes: 148, time: 8, nps: "3.8M", tt: "4.2%", pv: "e2e4 e7e5" },
                { depth: 3, score: "+28 cp", nodes: 1140, time: 24, nps: "6.9M", tt: "12.5%", pv: "e2e4 c7c5 g1f3" },
                { depth: 4, score: "+34 cp", nodes: 9840, time: 72, nps: "8.8M", tt: "24.1%", pv: "e2e4 c7c5 g1f3 d7d6" },
                { depth: 5, score: "+38 cp", nodes: 64200, time: 140, nps: "10.4M", tt: "38.6%", pv: "e2e4 c7c5 g1f3 d7d6 d2d4 c5d4" },
                { depth: 6, score: "+41 cp", nodes: 489200, time: 230, nps: "11.6M", tt: "49.2%", pv: "e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6" },
                { depth: 7, score: "+44 cp", nodes: 2410800, time: 310, nps: "12.2M", tt: "58.7%", pv: "e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 a7a6" },
                { depth: 8, score: "+45 cp", nodes: 12841000, time: 420, nps: "12.8M", tt: "64.3%", pv: "e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 a7a6 f1e2" }
            ],
            bestmove: "e2e4",
            ponder: "c7c5"
        },
        kiwipete: {
            name: "Kiwipete (Deep Combinatorial Trap)",
            fen: "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1",
            depthData: [
                { depth: 1, score: "+110 cp", nodes: 48, time: 4, nps: "2.1M", tt: "0.0%", pv: "g2h3" },
                { depth: 2, score: "+135 cp", nodes: 520, time: 14, nps: "4.8M", tt: "9.1%", pv: "g2h3 b4c3" },
                { depth: 3, score: "+142 cp", nodes: 5890, time: 46, nps: "7.9M", tt: "21.4%", pv: "g2h3 e8g8 e1g1" },
                { depth: 4, score: "+168 cp", nodes: 64100, time: 110, nps: "10.2M", tt: "34.0%", pv: "g2h3 b4c3 d2c3 e6d5" },
                { depth: 5, score: "+182 cp", nodes: 590400, time: 204, nps: "11.7M", tt: "48.2%", pv: "g2h3 e8g8 e1g1 b4c3 d2c3 d7d6" },
                { depth: 6, score: "+195 cp", nodes: 4820100, time: 320, nps: "12.4M", tt: "59.8%", pv: "g2h3 e8g8 e1g1 b4c3 d2c3 e6d5 e4d5" },
                { depth: 7, score: "+208 cp", nodes: 18940000, time: 450, nps: "12.9M", tt: "68.5%", pv: "g2h3 e8g8 e1g1 b4c3 d2c3 e6d5 e4d5 a6e2 f3e2" },
                { depth: 8, score: "+215 cp", nodes: 36400000, time: 590, nps: "13.1M", tt: "72.4%", pv: "g2h3 e8g8 e1g1 b4c3 d2c3 e6d5 e4d5 f6d5 c3g7 g8g7" }
            ],
            bestmove: "g2h3",
            ponder: "e8g8"
        },
        endgame: {
            name: "Endgame Grind (Pawn Promotion & Zugzwang)",
            fen: "8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1",
            depthData: [
                { depth: 1, score: "+310 cp", nodes: 14, time: 1, nps: "1.0M", tt: "0.0%", pv: "b4f4" },
                { depth: 2, score: "+345 cp", nodes: 96, time: 5, nps: "3.2M", tt: "15.6%", pv: "b4f4 h4g3" },
                { depth: 3, score: "+380 cp", nodes: 820, time: 18, nps: "6.5M", tt: "32.0%", pv: "b4f4 h4g3 f4f3 g3g2" },
                { depth: 4, score: "+410 cp", nodes: 6410, time: 52, nps: "9.2M", tt: "48.4%", pv: "b4f4 h4g5 f4f7 g5g6" },
                { depth: 5, score: "+440 cp", nodes: 38200, time: 94, nps: "11.1M", tt: "62.1%", pv: "b4f4 h4g5 f4f7 g5g6 f7c7" },
                { depth: 6, score: "+485 cp", nodes: 210500, time: 160, nps: "12.3M", tt: "71.0%", pv: "b4f4 h4g5 f4f7 g5g6 f7c7 h5h2" },
                { depth: 7, score: "+520 cp", nodes: 980400, time: 230, nps: "12.7M", tt: "76.4%", pv: "b4f4 h4g5 f4f7 g5g6 f7c7 h5e5 a5a6" },
                { depth: 8, score: "+560 cp", nodes: 4120000, time: 310, nps: "13.0M", tt: "81.2%", pv: "b4f4 h4g5 f4f7 g5g6 f7c7 h5e5 a5a6 e5e2" }
            ],
            bestmove: "b4f4",
            ponder: "h4g5"
        }
    };

    let isSearching = false;

    function appendTermLine(text, cssClass = '') {
        if (!terminalOutput) return;
        const p = document.createElement('p');
        p.className = `term-line ${cssClass}`;
        p.textContent = text;
        terminalOutput.appendChild(p);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    if (runBenchBtn) {
        runBenchBtn.addEventListener('click', () => {
            if (isSearching) return;
            isSearching = true;
            runBenchBtn.disabled = true;
            runBenchBtn.textContent = 'Searching...';

            const selectedKey = fenSelect ? fenSelect.value : 'startpos';
            const profile = positionProfiles[selectedKey] || positionProfiles.startpos;

            // Clear terminal for benchmark run
            terminalOutput.innerHTML = '';
            appendTermLine(`$ uci_engine --setoption name Hash value 128`, 'prompt-line');
            appendTermLine(`info string Transposition table allocated: 128MB (Zobrist keys 64-bit)`, 'info-line');
            appendTermLine(`position fen ${profile.fen}`, 'prompt-line');
            appendTermLine(`go depth 8`, 'prompt-line');

            let step = 0;
            const steps = profile.depthData;

            function runStep() {
                if (step < steps.length) {
                    const data = steps[step];
                    
                    // Update HUD Telemetry
                    if (statDepth) statDepth.textContent = `${data.depth} / 8`;
                    if (statNodes) statNodes.textContent = data.nodes.toLocaleString();
                    if (statNps) statNps.textContent = `${data.nps} NPS`;
                    if (statTt) statTt.textContent = data.tt;
                    if (statBestmove) statBestmove.textContent = data.pv.split(' ')[0] || '--';

                    // Append UCI output line
                    const uciLine = `info depth ${data.depth} score ${data.score} time ${data.time}ms nodes ${data.nodes} nps ${data.nps} tt_hit ${data.tt} pv ${data.pv}`;
                    appendTermLine(uciLine, 'uci-line');

                    step++;
                    setTimeout(runStep, 190);
                } else {
                    // Final best move
                    appendTermLine(`bestmove ${profile.bestmove} ponder ${profile.ponder}`, 'bestmove-line');
                    appendTermLine(`// Search completed: Alpha-Beta PVS cutoffs verified across ${steps[steps.length - 1].nodes.toLocaleString()} nodes.`, 'success-line');
                    
                    if (statBestmove) statBestmove.textContent = `${profile.bestmove}`;

                    isSearching = false;
                    runBenchBtn.disabled = false;
                    runBenchBtn.textContent = 'Run Search Engine';
                }
            }

            setTimeout(runStep, 150);
        });
    }

    if (clearBenchBtn) {
        clearBenchBtn.addEventListener('click', () => {
            if (isSearching) return;
            terminalOutput.innerHTML = '';
            appendTermLine('$ ./chess_engine --uci', 'prompt-line');
            appendTermLine('id name SifatEngine v2.4 (C++20, x86_64, BMI2)', 'success-line');
            appendTermLine('Bitboards initialized: 64 squares mapped, Magic tables computed (64KB hash).', 'info-line');
            appendTermLine('Select a position above and click "Run Search Engine" to simulate the alpha-beta search pipeline.', 'comment-line');

            if (statDepth) statDepth.textContent = '0 / 8';
            if (statNodes) statNodes.textContent = '0';
            if (statNps) statNps.textContent = '0 NPS';
            if (statTt) statTt.textContent = '0.0%';
            if (statBestmove) statBestmove.textContent = '--';
        });
    }

});
