import { useEffect, useState } from "react";
import { Menu, X, Github } from "lucide-react";
import avatar from "@/assets/avatar.webp";

const links = [
  { href: "#home", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#publications", label: "Publications" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2 bg-background/70 backdrop-blur-xl border-b border-border" : "py-4"
      }`}
    >
      <nav className="max-w-[1400px] w-full mx-auto px-6 md:px-12 flex items-center justify-between" aria-label="Main navigation">
        <a href="#home" className="flex items-center" aria-label="Back to top">
          <div className="w-[52px] h-[52px] rounded-full border-[1.5px] border-white/90 p-[2px] flex items-center justify-center hover:opacity-90 transition-opacity">
            <img
              src={avatar}
              alt="Utkarsh Patel avatar"
              width={48}
              height={48}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </a>

        <ul className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-12 ml-4 lg:ml-12">
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
          <a href="https://www.linkedin.com/in/utkarshpatel26/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"
            className="w-[42px] h-[42px] rounded-full border-[1.5px] border-white/90 flex items-center justify-center text-white hover:bg-white/20 transition">
            <span className="text-[14px] font-bold leading-none">in</span>
          </a>
          <a href="https://github.com/Utkarsh-patel26" target="_blank" rel="noreferrer" aria-label="GitHub profile"
            className="w-[42px] h-[42px] rounded-full border-[1.5px] border-white/90 flex items-center justify-center text-white hover:bg-white/20 transition">
            <Github className="w-[18px] h-[18px]" />
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
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
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
          <div className="flex items-center gap-4 pt-2 border-t border-white/10">
            <a href="https://github.com/Utkarsh-patel26" target="_blank" rel="noreferrer" aria-label="GitHub profile" className="text-white/80 hover:text-white">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/utkarshpatel26/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="text-white/80 hover:text-white text-sm font-bold">
              in
            </a>
            <a href="/Utkarsh_Patel_Resume.pdf" download className="ml-auto text-sm font-semibold text-primary">
              Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
