import { Code2, Database, Wrench, Boxes, Languages } from "lucide-react";

const groups = [
  { icon: Languages, title: "Languages", items: ["Java", "Python", "JavaScript", "SQL"] },
  { icon: Boxes, title: "Frameworks", items: ["Spring Boot", "React", "Node.js", "Express", "Flask", "Celery"] },
  { icon: Database, title: "Databases & Caching", items: ["MongoDB", "Redis"] },
  { icon: Wrench, title: "Tools", items: ["Docker", "Git", "Maven", "n8n"] },
  { icon: Code2, title: "Domains", items: ["Backend Engineering", "Distributed Systems", "API Design", "Automation"] },
];

export const Skills = () => {
  const loop = [...groups, ...groups];

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-gradient-glow blur-3xl opacity-60 pointer-events-none" />

      <div className="container relative z-10">
        <h2 className="section-heading">
          <span className="text-gradient">Skills</span>
        </h2>
        <p className="section-sub">
          A showcase of my technical expertise and the tools I use to build scalable systems.
        </p>

        <div className="relative overflow-hidden mask-fade">
          <div className="flex gap-6 animate-marquee">
            {loop.map((g, i) => {
              const Icon = g.icon;
              return (
                <div
                  key={i}
                  className="glass-card rounded-3xl p-8 min-w-[300px] md:min-w-[340px] hover:border-primary/60 transition-all hover:-translate-y-1 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{g.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <span
                        key={it}
                        className="px-3 py-1 text-xs font-medium rounded-full border border-border bg-muted/40 text-foreground/80"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          width: max-content;
        }
        .mask-fade {
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
      `}</style>
    </section>
  );
};
