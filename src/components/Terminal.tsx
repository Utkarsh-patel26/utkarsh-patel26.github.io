import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { InfrastructureMap } from './InfrastructureMap';

export const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    "utkarsh portfolio OS [Version 13.3.2026]",
    "Type \"help\" to see available commands.",
    "Type \"exit\" at any time to reset all modules."
  ]);
  const [input, setInput] = useState("");
  const [isXray, setIsXray] = useState(false);
  const [weatherEffect, setWeatherEffect] = useState<'rain' | 'snow' | null>(null);
  const [showInfra, setShowInfra] = useState(false);
  const [diagnostics, setDiagnostics] = useState({
    heap: 0,
    nodes: 0,
    fps: 0,
    net: 'Detecting...',
    uptime: 0,
    bufferCount: 0,
  });
  const [diagLog, setDiagLog] = useState<string[]>([]);
  const [gameState, setGameState] = useState<{
    active: boolean;
    word: string;
    guesses: Set<string>;
    attempts: number;
  }>({ active: false, word: '', guesses: new Set(), attempts: 6 });
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-terminal', handleOpen as EventListener);
    (window as any).openTerminal = handleOpen;
    return () => {
      window.removeEventListener('open-terminal', handleOpen as EventListener);
      delete (window as any).openTerminal;
    };
  }, []);

  // Live diagnostics updater
  useEffect(() => {
    if (!isXray) return;
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;
    const countFrames = () => {
      frameCount++;
      rafId = requestAnimationFrame(countFrames);
    };
    rafId = requestAnimationFrame(countFrames);

    const interval = setInterval(() => {
      const now = performance.now();
      const elapsed = (now - lastTime) / 1000;
      const fps = Math.round(frameCount / elapsed);
      frameCount = 0;
      lastTime = now;

      const mem = (performance as any).memory;
      const heap = mem ? Math.round(mem.usedJSHeapSize / 1024 / 1024) : Math.floor(Math.random() * 8 + 8);
      const nodes = document.querySelectorAll('*').length;
      const uptime = Math.round(performance.now() / 1000);
      const bufferCount = Math.floor(Math.random() * 10 + 40);

      setDiagnostics(prev => ({ ...prev, heap, nodes, fps, uptime, bufferCount }));

      const ts = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const logTypes = [
        `[${ts}] [MEM]: JS Heap: ${heap}MB`,
        `[${ts}] [DOM]: Live Node Count: ${nodes}`,
        `[${ts}] [PERF]: Frame composition sync (${(Math.random() * 0.4 + 0.1).toFixed(1)}ms)`,
        `[${ts}] [FPS]: Render rate: ${fps}fps`,
        `[${ts}] [GC]: Minor collection: ${Math.floor(Math.random() * 3 + 1)}ms`,
        `[${ts}] [NET]: RTT latency: ${Math.floor(Math.random() * 20 + 5)}ms`,
        `[${ts}] [SYS]: Uptime: ${uptime}s`,
      ];
      const newEntry = logTypes[Math.floor(Math.random() * logTypes.length)];
      setDiagLog(prev => [...prev.slice(-14), newEntry]);
    }, 1200);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(rafId);
    };
  }, [isXray]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isXray) {
      document.body.classList.add('xray-mode');
    } else {
      document.body.classList.remove('xray-mode');
    }
  }, [isXray]);

  const COMMANDS = ['play', 'about', 'stack', 'systems', 'projects', 'cv', 'rain', 'snow', 'dashboard', 'xray', 'infrastructure', 'ping', 'ls', 'clear', 'exit'];

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const currentInput = input.toLowerCase();
      if (!currentInput) return;
      
      const matchedCommand = COMMANDS.find(cmd => cmd.startsWith(currentInput));
      if (matchedCommand) {
        setInput(matchedCommand);
      }
      return;
    }

    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, `> ${input}`];
      
      if (gameState.active) {
        if (cmd === 'exit') {
          setGameState({ ...gameState, active: false });
          newHistory.push('SYSTEM LOCKDOWN ABORTED. Normal operations resumed.');
          setHistory(newHistory);
          setInput("");
          return;
        }

        if (cmd.length !== 1 || !/[a-z]/i.test(cmd)) {
          newHistory.push('Invalid input. Please type a single letter or "exit".');
          setHistory(newHistory);
          setInput("");
          return;
        }

        const letter = cmd.toUpperCase();
        const newGuesses = new Set(gameState.guesses);
        
        if (newGuesses.has(letter)) {
          newHistory.push(`You already guessed '${letter}'.`);
          setHistory(newHistory);
          setInput("");
          return;
        }

        newGuesses.add(letter);
        let newAttempts = gameState.attempts;
        
        if (!gameState.word.includes(letter)) {
          newAttempts--;
        }

        const renderHangman = (attemptsLeft: number, word: string, guesses: Set<string>) => {
          const parts = [
            '  │         O\n  │        /|\\\n  │        / \\\n',
            '  │         O\n  │        /|\\\n  │        /\n',
            '  │         O\n  │        /|\\\n  │\n',
            '  │         O\n  │        /|\n  │\n',
            '  │         O\n  │         |\n  │\n',
            '  │         O\n  │\n  │\n',
            '  │\n  │\n  │\n'
          ];
          const displayWord = word.split('').map(char => guesses.has(char) ? char : '_').join(' ');
          return `  ┌─────────┐\n  │         │\n${parts[attemptsLeft]}  │\n ─┴─\nWord: ${displayWord}\nAttempts remaining: ${attemptsLeft}`;
        };

        newHistory.push(renderHangman(newAttempts, gameState.word, newGuesses));

        const hasWon = gameState.word.split('').every(char => newGuesses.has(char));
        
        if (hasWon) {
          newHistory.push('ACCESS GRANTED. System unlocked.');
          setGameState({ active: false, word: '', guesses: new Set(), attempts: 6 });
        } else if (newAttempts === 0) {
          newHistory.push(`ACCESS DENIED. System locked. The word was ${gameState.word}.`);
          setGameState({ active: false, word: '', guesses: new Set(), attempts: 6 });
        } else {
          setGameState({ ...gameState, guesses: newGuesses, attempts: newAttempts });
        }
        
        setHistory(newHistory);
        setInput("");
        return;
      }

      switch(cmd) {
        case 'help':
          newHistory.push('Commands: play, about, stack, systems, projects, cv, rain, snow, dashboard, xray, infrastructure, ping, ls, clear, exit');
          break;
        case 'clear':
          setHistory([]);
          setInput("");
          return;
        case 'exit':
          setIsOpen(false);
          setIsXray(false);
          setWeatherEffect(null);
          setShowInfra(false);
          setGameState({ active: false, word: '', guesses: new Set(), attempts: 6 });
          setDiagLog([]);
          newHistory.push('SYSTEM LOCKDOWN ABORTED. All modules reset. Normal operations resumed.');
          break;
        case 'xray':
          setIsXray(!isXray);
          newHistory.push(isXray ? 'X-Ray mode disabled.' : 'Toggle X-Ray structural Dev mode... Blueprints visible.');
          break;
        case 'ping':
          newHistory.push('Pong! 12ms');
          break;
        case 'ls':
          newHistory.push('src/  public/  node_modules/  package.json');
          break;
        case 'about':
          newHistory.push('Utkarsh Patel - Systems & Backend Engineer');
          break;
        case 'stack':
          newHistory.push('Java, Spring Boot, React, Node.js, Distributed Systems, SQL/NoSQL');
          break;
        case 'projects':
          newHistory.push('Loading projects... [Kronos, HelixDB, Forge, PeerNexus]');
          setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 500);
          break;
        case 'cv':
          newHistory.push('Downloading CV...');
          window.open('/Utkarsh_Patel_Resume.pdf', '_blank');
          break;
        case 'systems':
          newHistory.push('Analyzing core systems... ALL SYSTEMS NOMINAL. Distributed consensus achieved.');
          break;
        case 'infrastructure':
          newHistory.push('Booting SYSTEM_TOPOLOGY... Loading architectural schematic...');
          setTimeout(() => setShowInfra(true), 800);
          break;
        case 'dashboard':
          newHistory.push('Dashboard access restricted. Please authenticate via secure token.');
          break;
        case 'play':
          const GAME_WORDS = ['SERVER', 'ROUTER', 'DOCKER', 'SYSTEM', 'KERNEL', 'OBJECT', 'STRING', 'PYTHON', 'THREAD', 'MEMORY', 'GITLAB', 'UBUNTU', 'DEBIAN', 'GITHUB', 'SPRING', 'CACHES', 'HACKER', 'BINARY', 'CIPHER', 'BUFFER'];
          const randomWord = GAME_WORDS[Math.floor(Math.random() * GAME_WORDS.length)];
          setGameState({
            active: true,
            word: randomWord,
            guesses: new Set(),
            attempts: 6
          });
          newHistory.push('SYSTEM LOCKDOWN INITIATED.\nBypass required. Guess the 6-letter tech keyword.\nType a single letter to guess. Type "exit" to abort.');
          newHistory.push(`  ┌─────────┐\n  │         │\n  │\n  │\n  │\n  │\n ─┴─\nWord: _ _ _ _ _ _\nAttempts remaining: 6`);
          break;

        case 'rain':
          newHistory.push(`Atmospheric module activated: rain simulation starting... (jk)`);
          setTimeout(() => {
            setHistory(prev => [...prev, "> lol... actually, here you go! 🌧️"]);
            setWeatherEffect('rain');
            setTimeout(() => setWeatherEffect(null), 10000);
          }, 1500);
          break;
        case 'snow':
          newHistory.push(`Atmospheric module activated: snow simulation starting... (jk)`);
          setTimeout(() => {
            setHistory(prev => [...prev, "> lol... actually, here you go! ❄️"]);
            setWeatherEffect('snow');
            setTimeout(() => setWeatherEffect(null), 10000);
          }, 1500);
          break;
        default:
          if (cmd) {
            newHistory.push(`Invalid input. Please type a single letter or a valid command.`);
          }
      }
      
      setHistory(newHistory);
      setInput("");
    }
  };

  if (!isOpen && !isXray) return null;

  return (
    <>
      {/* Diagnostics Panel (X-Ray Mode) */}
      {isXray && (
        <div className="fixed top-24 left-4 z-[100] w-80 bg-black/90 border border-cyan-500/50 rounded-lg text-cyan-400 font-mono text-[10px] sm:text-xs shadow-[0_0_20px_rgba(0,255,255,0.2)] backdrop-blur-md overflow-hidden animate-in slide-in-from-left-8 fade-in duration-500">
          <div className="border-b border-cyan-500/50 p-2 flex justify-between items-center bg-cyan-950/30">
            <span className="font-bold tracking-widest">CORE_DIAGNOSTICS_V5.0</span>
            <span className="animate-pulse text-red-400">● LIVE</span>
          </div>
          <div className="p-3 space-y-2">
            {/* Static system info */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-3 border-b border-cyan-500/30 pb-3 text-[10px]">
              <div>NET: <span className="text-cyan-200">{diagnostics.net}</span></div>
              <div>PWR: <span className="text-cyan-200">100% (Charging)</span></div>
              <div>VIEW: <span className="text-cyan-200">{window.innerWidth}x{window.innerHeight}</span></div>
              <div>OS: <span className="text-cyan-200">{navigator.platform || 'Unknown'}</span></div>
              <div>FPS: <span className={`font-bold ${diagnostics.fps >= 50 ? 'text-green-400' : diagnostics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'}`}>{diagnostics.fps}</span></div>
              <div>HEAP: <span className="text-cyan-200">{diagnostics.heap}MB</span></div>
              <div>NODES: <span className="text-cyan-200">{diagnostics.nodes}</span></div>
              <div>UP: <span className="text-cyan-200">{diagnostics.uptime}s</span></div>
            </div>

            {/* Live scrolling log */}
            <div className="space-y-0.5 opacity-80 h-[160px] overflow-hidden flex flex-col justify-end">
              {diagLog.map((line, i) => (
                <p
                  key={i}
                  className={`leading-4 transition-opacity duration-300 ${
                    i === diagLog.length - 1 ? 'text-cyan-300 opacity-100' :
                    i === diagLog.length - 2 ? 'opacity-80' :
                    i === diagLog.length - 3 ? 'opacity-60' : 'opacity-30'
                  } ${
                    line.includes('[MEM]') ? '' :
                    line.includes('[DOM]') ? 'text-blue-300' :
                    line.includes('[GC]')  ? 'text-yellow-400' :
                    line.includes('[NET]') ? 'text-green-400' : ''
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="text-right text-[9px] opacity-50 mt-2 border-t border-cyan-500/30 pt-2">
              STREAM_BUFFER: {diagLog.length}/{diagnostics.bufferCount}_ENTRIES
            </div>
          </div>
        </div>
      )}

      {/* Terminal Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-[100] w-full max-w-[400px] bg-[#0c0c0e]/95 border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden font-mono text-sm animate-in slide-in-from-bottom-8 fade-in duration-300">
          <div className="flex justify-between items-center px-4 py-3 border-b border-white/10 bg-white/5">
            <span className="text-xs text-gray-400 font-semibold tracking-wider">Developer Console</span>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-4 h-[300px] flex flex-col">
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 mb-2 text-gray-300 scrollbar-thin scrollbar-thumb-white/10">
              {history.map((line, i) => (
                <div key={i} className={`whitespace-pre-wrap ${line.startsWith('>') ? 'text-primary mt-4 font-bold' : ''}`}>
                  {line}
                </div>
              ))}
            </div>

            {/* Exit hint */}
            <div className="text-[10px] text-white/20 font-mono mb-1 text-right tracking-wider">
              type <span className="text-primary/50">exit</span> to reset all • <span className="text-primary/50">help</span> for commands
            </div>
            <div className="flex items-center gap-2 text-primary font-bold mt-2">
              <span>&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-gray-600"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* Weather Overlay */}
      {weatherEffect === 'rain' && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {Array.from({ length: 150 }).map((_, i) => (
            <div 
              key={i}
              className="absolute bg-blue-400/40 w-[2px] h-[30px] rounded-full animate-rain"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20 + 20}px`,
                animationDuration: `${Math.random() * 0.4 + 0.4}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Snow Overlay */}
      {weatherEffect === 'snow' && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {Array.from({ length: 120 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-white/60 select-none animate-rain"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20 + 20}px`,
                fontSize: `${Math.random() * 10 + 8}px`,
                animationDuration: `${Math.random() * 2 + 2}s`,
                animationDelay: `${Math.random() * 3}s`,
                animationTimingFunction: 'linear',
              }}
            >
              ❄
            </div>
          ))}
        </div>
      )}

      {/* Infrastructure Map Overlay */}
      {showInfra && <InfrastructureMap onClose={() => setShowInfra(false)} />}
    </>
  );
};
