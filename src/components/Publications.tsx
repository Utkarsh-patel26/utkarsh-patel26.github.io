import { BookOpen, ExternalLink } from "lucide-react";

export const Publications = () => {
  return (
    <section id="publications" className="relative py-24">
      <div className="container">
        <h2 className="section-heading">
          <span className="text-gradient">Publications</span>
        </h2>
        <p className="section-sub">
          Contributing to the academic community through research in AI and Quantum Computing.
        </p>

        <div className="max-w-3xl mx-auto">
          <article className="glass-card rounded-3xl p-8 md:p-10 hover:border-primary/60 transition group">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold leading-snug mb-2">
                  Quantum-Inspired Adaptive AI Tutor for Personalised Learning
                </h3>
                <p className="text-sm text-muted-foreground italic">
                  A quiz-driven knowledge framework
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-5">
              Presented at the <strong className="text-foreground/90">1st International Conference on Quantum Innovations for Computing and Knowledge Systems (QUICK'26)</strong> — Organized by Vellore Institute of Technology (VIT), Chennai in collaboration with Deakin University, Australia · March 2026.
            </p>

            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex gap-2"><span className="text-primary">▸</span> Proposed adaptive learning architecture combining learner-state modelling with AI-driven content generation.</li>
              <li className="flex gap-2"><span className="text-primary">▸</span> Explored optimisation strategies for personalised quiz sequencing and instructional flow.</li>
              <li className="flex gap-2"><span className="text-primary">▸</span> Documented system design approach and experimental evaluation observations.</li>
            </ul>

            <a
              href="https://doi.org/10.1051/epjconf/202636001020"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-semibold hover:scale-105 transition"
            >
              Show publication <ExternalLink className="w-4 h-4" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
};
