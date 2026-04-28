import { useState } from "react";
import { ExternalLink, Award } from "lucide-react";

type Project = {
  title: string;
  desc: string;
  stack: string[];
  badge?: string;
  link?: string;
  bullets?: string[];
};

const main: Project[] = [
  {
    title: "PeerNexus (Torrent Client)",
    desc: "A BitTorrent-style peer-to-peer client enabling decentralized file sharing without centralized infrastructure.",
    stack: ["Java", "Networking", "Multithreading"],
    link: "https://github.com/",
    bullets: [
      "Implemented multithreaded socket communication to manage concurrent peer connections.",
      "Designed core protocol logic: piece scheduling, choking/unchoking, and hash-based integrity verification.",
    ],
  },
  {
    title: "HALEM-PEGASIS Evaluator",
    desc: "Hierarchical enhancement to improve routing efficiency in wireless sensor networks, with full simulation system.",
    stack: ["Java", "Swing", "Simulation"],
    link: "https://github.com/",
    bullets: [
      "Analyzed network lifetime, node energy consumption, and routing performance.",
      "Achieved 35% reduction in routing overhead via optimized leader selection and adaptive topology.",
    ],
  },
  {
    title: "Lumen (Course Platform)",
    desc: "Full-stack platform for course discovery, enrollment, and instructor management.",
    stack: ["Node.js", "MongoDB", "Express", "REST"],
    link: "https://github.com/",
    bullets: [
      "Implemented secure authentication, role-based access control, and REST APIs.",
      "Optimized database queries and backend performance for concurrent users with low latency.",
    ],
  },
];

const achievements: Project[] = [
  {
    title: "Research Publication — ICDDS '25",
    badge: "Publication",
    desc: "Published paper on Explainable CNN for lung disease classification at ICDDS '25.",
    stack: ["Deep Learning", "CNN", "Explainable AI"],
  },
  {
    title: "Gold Medalist — Taekwondo (National)",
    badge: "Award",
    desc: "Won gold medal at National Level Taekwondo (2021), demonstrating discipline and competitive excellence.",
    stack: ["Discipline", "Athletics"],
  },
  {
    title: "ISAI-DT '24 Conference Presentation",
    badge: "Talk",
    desc: "Presented research on automated legal text information extraction at ISAI-DT '24.",
    stack: ["NLP", "Information Extraction"],
  },
  {
    title: "Ghost Hackathon Participant",
    badge: "Hackathon",
    desc: "Participated in Ghost Hackathon by FOSS United and Tech4Community, building a functional solution under time constraints.",
    stack: ["FOSS", "Rapid Prototyping"],
  },
];

export const Projects = () => {
  const [tab, setTab] = useState<"main" | "achievements">("main");
  const list = tab === "main" ? main : achievements;

  return (
    <section id="projects" className="relative py-24">
      <div className="container">
        <h2 className="section-heading">
          <span className="text-gradient">Projects & Achievements</span>
        </h2>
        <p className="section-sub">
          A selection of my recent works and recognitions across software engineering and research.
        </p>

        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-full glass-card">
            {(["main", "achievements"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2 text-sm font-semibold rounded-full transition-all ${
                  tab === t
                    ? "bg-gradient-primary text-primary-foreground shadow-soft"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {t === "main" ? "Projects" : "Achievements"}
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
                  <Award className="w-3 h-3" /> {p.badge}
                </span>
              )}
              <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>

              {p.bullets && (
                <ul className="space-y-1.5 text-xs text-muted-foreground mb-5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-primary mt-0.5">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

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

              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gradient hover:opacity-80"
                >
                  GitHub <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
