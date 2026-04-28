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
      <nav className="container flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <img
            src={avatar}
            alt="Utkarsh Patel avatar"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover border-2 border-primary/40 glow-primary"
          />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-semibold tracking-widest uppercase text-foreground/80 hover:text-foreground transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted/50 transition">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted/50 transition">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://leetcode.com/" target="_blank" rel="noreferrer" aria-label="LeetCode"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted/50 transition">
            <Code2 className="w-4 h-4" />
          </a>
          <a
            href="/Utkarsh_Patel_Resume.pdf"
            download
            className="px-5 py-2 rounded-full border border-primary/60 text-sm font-semibold hover:bg-primary/10 transition"
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
