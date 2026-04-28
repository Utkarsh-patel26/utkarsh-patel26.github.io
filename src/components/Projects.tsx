import { useState } from "react";
import { ExternalLink, Wrench } from "lucide-react";

const main = [
  {
    title: "AI-Powered Learning Tutor",
    badge: "🔧 Undergoing Project",
    desc: "Adaptive AI tutor generating lessons, quizzes, and summaries based on learner level. Focused on caching and AI orchestration.",
    stack: ["React", "Node.js", "Firebase", "Gemini 2.0", "Llama 3.1"],
  },
  {
    title: "Anonymous Chat Web App",
    desc: "Real-time anonymous messaging platform with guest login and responsive UI. Optimized message rendering.",
    stack: ["React", "Firebase"],
    link: "https://anonymouschat007.web.app/",
  },
  {
    title: "Medicine Reminder App",
    desc: "Cross-platform mobile app with scheduled notifications and persistent reminder tracking using Capacitor.",
    stack: ["React", "Capacitor", "Local Notifications"],
  },
];

const mini = [
  { title: "Portfolio Generator", desc: "CLI to scaffold portfolios with a configurable theme.", stack: ["Node.js"] },
  { title: "Quiz Engine", desc: "Lightweight quiz UI with adaptive difficulty levels.", stack: ["React"] },
  { title: "Markdown Notes", desc: "Local-first markdown notes app with tags and search.", stack: ["React", "IndexedDB"] },
];

export const Projects = () => {
  const [tab, setTab] = useState<"main" | "mini">("main");
  const list = tab === "main" ? main : mini;

  return (
    <section id="projects" className="relative py-24">
      <div className="container">
        <h2 className="section-heading">
          <span className="text-gradient">Projects</span>
        </h2>
        <p className="section-sub">
          A selection of my recent works, ranging from complex full-stack applications to focused technical experiments.
        </p>

        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-full glass-card">
            {(["main", "mini"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2 text-sm font-semibold rounded-full transition-all ${
                  tab === t
                    ? "bg-gradient-primary text-primary-foreground shadow-soft"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {t === "main" ? "Main Projects" : "Mini Projects"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p) => (
            <article
              key={p.title}
              className="group glass-card rounded-3xl p-7 hover:border-primary/60 hover:-translate-y-1 transition-all duration-300"
            >
              {p.badge && (
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground border border-secondary/40 mb-4">
                  <Wrench className="w-3 h-3" /> {p.badge.replace("🔧 ", "")}
                </span>
              )}
              <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-5">{p.desc}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-muted/60 border border-border text-foreground/80"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {"link" in p && p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gradient hover:opacity-80"
                >
                  Live Demo <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
