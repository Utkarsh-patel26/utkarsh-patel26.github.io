import { useEffect, useMemo, useState } from "react";
import { ArrowRight, TerminalSquare } from "lucide-react";
import avatar from "@/assets/avatar.png";
import orb from "@/assets/orb.png";

const ROLES = ["Software Engineer", "Web Developer", "AI Enthusiast", "Backend Engineer"];

export const Hero = () => {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const current = ROLES[roleIdx];

  useEffect(() => {
    const speed = deleting ? 60 : 110;
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, current]);

  const stars = useMemo(
    () => Array.from({ length: 80 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 4,
    })),
    []
  );

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-cosmos pt-32 pb-20">
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute h-px w-32 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-shoot"
            style={{
              top: `${10 + i * 20}%`,
              left: `-10%`,
              animationDelay: `${i * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <span className="pill border-primary/40 bg-primary/5 text-foreground/90 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            WELCOME TO MY PORTFOLIO
          </span>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-4">
            Hi! I'm{" "}
            <span className="text-foreground">Naveen Kumar</span>
          </h1>

          <div className="text-4xl md:text-5xl font-bold text-gradient h-16 mb-6">
            {text}
            <span className="inline-block w-1 h-10 bg-primary ml-1 animate-pulse align-middle" />
          </div>

          <p className="text-lg text-muted-foreground max-w-lg mb-10">
            Information Technology student focused on AI applications, backend engineering,
            and modern web development.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:scale-105 transition-transform"
            >
              Let's Connect
              <span className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-7 py-3 rounded-full border border-primary/60 font-semibold hover:bg-primary/10 transition"
            >
              Save Contact
            </a>
          </div>
        </div>

        {/* Right: avatar + orb */}
        <div className="relative flex justify-center items-center">
          <img
            src={orb}
            alt=""
            aria-hidden
            width={200}
            height={200}
            className="absolute -top-4 left-1/4 w-44 h-44 animate-float opacity-90"
          />
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-glow blur-3xl scale-110" />
            <img
              src={avatar}
              alt="Naveen Kumar pixel art portrait"
              width={420}
              height={420}
              className="relative w-72 md:w-[420px] drop-shadow-[0_0_40px_hsl(var(--primary)/0.4)] animate-float"
            />
          </div>
        </div>
      </div>

      {/* CLI floating button */}
      <button
        type="button"
        aria-label="Try my CLI"
        className="fixed bottom-8 right-6 z-40 group flex flex-col items-end gap-2"
      >
        <span className="px-3 py-1.5 rounded-xl bg-gradient-primary text-primary-foreground text-xs font-semibold shadow-soft animate-float">
          Try my CLI! 🚀
        </span>
        <span className="w-12 h-12 rounded-full bg-background/80 backdrop-blur border border-primary/40 flex items-center justify-center glow-primary group-hover:scale-110 transition">
          <TerminalSquare className="w-5 h-5 text-foreground" />
        </span>
      </button>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        <span>Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};
