import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Github } from "lucide-react";
import avatar from "@/assets/avatar.png";

const ROLES = ["Software Engineer", "Backend Developer", "CS Undergrad"];

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

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 bg-cosmos">
      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <span className="inline-block px-5 py-2 rounded-[30px] border border-white/20 bg-black/20 text-white/90 text-sm font-bold tracking-[0.1em] mb-8">
            WELCOME TO MY PORTFOLIO
          </span>

          <h1 className="text-5xl md:text-[4rem] font-extrabold leading-[1.05] mb-2 tracking-tight text-white">
            Hi! I'm Utkarsh Patel
          </h1>

          <div
            className="text-5xl md:text-[4rem] font-extrabold text-[#b92b6a] min-h-[5rem] mb-8 tracking-tight"
            aria-label={`Roles: ${ROLES.join(", ")}`}
          >
            <span aria-hidden="true">{text}</span>
            <span aria-hidden="true" className="animate-pulse">|</span>
          </div>

          <p className="text-gray-400 text-lg max-w-xl mb-12">
            Computer Science undergraduate at RIT Bangalore with hands-on experience in
            backend engineering, distributed systems, and real-world software development.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-gradient-to-r from-[#b92b6a] via-[#7534d0] to-[#5136b8] text-white font-semibold hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_20px_hsl(320_90%_60%_/_0.4)] transition-all duration-300 active:scale-95"
            >
              <span className="text-sm">Let's Connect</span>
              <span className="w-8 h-8 rounded-full border border-white/70 flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            <a
              href="/Utkarsh_Patel_Resume.pdf"
              download
              className="inline-flex items-center justify-center px-7 py-3 rounded-[30px] border border-white/30 text-sm font-semibold text-white bg-transparent hover:bg-white/5 hover:-translate-y-1 hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_20px_hsl(320_90%_60%_/_0.2)] transition-all duration-300 active:scale-95"
            >
              Download Resume
            </a>
            <a
              href="https://github.com/Utkarsh-patel26"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-[30px] border border-white/30 text-sm font-semibold text-white bg-transparent hover:bg-white/5 hover:-translate-y-1 hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_20px_hsl(320_90%_60%_/_0.2)] transition-all duration-300 active:scale-95"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>

        {/* Right: avatar */}
        <div className="relative flex justify-center lg:justify-end lg:ml-32 items-end group lg:translate-y-32">
          {/* Avatar (Animated float: moves 20px up and back infinitely) */}
          <div className="relative z-10 animate-float transition-transform duration-500">
            {/* Aura Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full bg-gradient-to-tr from-[#b92b6a]/80 to-[#5136b8]/80 blur-[60px] md:blur-[80px] -z-10" />
            <img
              src={avatar}
              alt="Utkarsh Patel pixel art portrait"
              className="relative z-10 w-[18rem] md:w-[28rem] drop-shadow-[0_0_30px_rgba(170,54,124,0.4)]"
            />
          </div>
        </div>
      </div>

      {/* Floating CLI widget */}
      <button
        type="button"
        aria-label="Open the interactive terminal"
        className="fixed bottom-8 right-8 z-[10001] flex flex-col items-center gap-3 animate-fade-up cursor-pointer group"
        onClick={() => window.dispatchEvent(new CustomEvent('open-terminal'))}
      >
        <span className="bg-[#b92b6a] text-white text-xs font-bold px-4 py-2 rounded-full shadow-[0_0_20px_rgba(185,43,106,0.4)] group-hover:scale-105 transition-transform flex items-center gap-1.5 relative">
          Try my CLI! 🚀
          <span className="absolute right-[22px] -bottom-[6px] w-3 h-3 bg-[#b92b6a] rotate-45 transform origin-center"></span>
        </span>
        <span className="w-12 h-12 bg-[#332f42] border border-white/20 rounded-full flex items-center justify-center text-white/90 shadow-[0_0_15px_rgba(185,43,106,0.3)] group-hover:scale-110 group-hover:bg-[#b92b6a] transition-all duration-300 font-mono text-sm leading-none z-10 active:scale-95">
          &gt;_
        </span>
      </button>

    </section>
  );
};
