import { useEffect, useState } from "react";
import { Menu, X, Linkedin, Github, Code2 } from "lucide-react";
import avatar from "@/assets/avatar.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#publications", label: "Publications" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2 bg-background/70 backdrop-blur-xl border-b border-border" : "py-4"
      }`}
    >
      <nav className="max-w-[1400px] w-full mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#home" className="flex items-center">
          <div className="w-[52px] h-[52px] rounded-full border-[1.5px] border-white/90 p-[2px] flex items-center justify-center hover:opacity-90 transition-opacity">
            <img
              src={avatar}
              alt="Utkarsh Patel avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </a>

        <ul className="hidden md:flex flex-1 items-center justify-center gap-8 lg:gap-14 ml-4 lg:ml-12">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[13px] font-bold tracking-[0.1em] uppercase text-white hover-glitch-pink inline-block"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <a href="https://www.linkedin.com/in/utkarshpatel26/" target="_blank" rel="noreferrer" aria-label="LinkedIn"
            className="w-[42px] h-[42px] rounded-full border-[1.5px] border-white/90 flex items-center justify-center text-white hover:bg-white/20 transition">
            <span className="text-[14px] font-bold leading-none">in</span>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"
            className="w-[42px] h-[42px] rounded-full border-[1.5px] border-white/90 flex items-center justify-center text-white hover:bg-white/20 transition">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a
            href="/Utkarsh_Patel_Resume.pdf"
            download
            className="px-7 py-[0.6rem] ml-2 rounded-full border-[1.5px] border-white/90 text-[14px] font-bold text-white bg-transparent hover:bg-white/10 transition-colors"
          >
            Download CV
          </a>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden mt-4 mx-4 glass-card rounded-2xl p-6 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-sm font-semibold tracking-widest uppercase">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
