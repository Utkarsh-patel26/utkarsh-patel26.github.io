import { Briefcase } from "lucide-react";

const items = [
  {
    role: "Product Engineering Intern",
    company: "CODEGRAMMER",
    period: "Jan 2026 – Mar 2026",
    bullets: [
      "Performed factual accuracy and linguistic audits on large-scale datasets.",
      "Identified inconsistencies and structured QA reports for senior review.",
      "Contributed to improving content reliability for the learning platform.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "CODEHUNTERS",
    period: "June 2025 – July 2025",
    bullets: [
      "Built reusable React.js UI components based on design specs.",
      "Improved responsive layouts using modern CSS techniques.",
      "Collaborated with the team to integrate frontend with backend APIs.",
    ],
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="relative py-24">
      <div className="container">
        <h2 className="section-heading">
          <span className="text-gradient">Experience</span>
        </h2>
        <p className="section-sub">My professional journey and internship experiences.</p>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-secondary/40 to-transparent md:-translate-x-1/2" />

          <div className="space-y-12">
            {items.map((it, i) => (
              <div
                key={i}
                className={`relative flex flex-col md:flex-row gap-6 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 top-6 w-4 h-4 rounded-full bg-gradient-primary border-4 border-background -translate-x-1/2 glow-primary z-10" />

                <div className="md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <div className="glass-card rounded-3xl p-7 hover:border-primary/60 transition">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span className="text-xs font-semibold tracking-wider text-muted-foreground">
                        {it.period}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{it.role}</h3>
                    <h4 className="text-sm font-semibold text-gradient mb-4">{it.company}</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {it.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-primary mt-1">▸</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
