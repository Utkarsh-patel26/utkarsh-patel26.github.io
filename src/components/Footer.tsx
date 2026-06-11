import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-gray-400 text-center md:text-left">
          <p className="font-semibold text-white">Utkarsh Patel</p>
          <p>© {new Date().getFullYear()} · Built with React, Vite & Tailwind · Open source on{" "}
            <a
              href="https://github.com/Utkarsh-patel26/utkarsh-patel26.github.io"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://github.com/Utkarsh-patel26" target="_blank" rel="noreferrer" aria-label="GitHub profile" className="text-gray-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/utkarshpatel26/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:utkarshishu2627@gmail.com" aria-label="Send email" className="text-gray-400 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="#home"
            aria-label="Back to top"
            className="ml-2 w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/60 transition-all"
          >
            <ArrowUp className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
