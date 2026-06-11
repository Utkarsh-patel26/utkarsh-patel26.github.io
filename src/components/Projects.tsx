import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Wrench, Award, Github, ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type Project = {
  title: string;
  desc: string;
  stack: string[];
  badge?: string;
  github?: string;
  demo?: string;
};

const GH = "https://github.com/Utkarsh-patel26";

const main: Project[] = [
  {
    title: "Kronos — Distributed KV Store",
    desc: "Distributed key-value store built from scratch using Raft consensus. Implements leader election, log replication, fault tolerance, snapshots. Handles network partitions and ensures consistency across nodes, similar to etcd / TiKV.",
    stack: ["Distributed Systems", "Raft", "Consensus"],
    github: `${GH}/Kronos`,
  },
  {
    title: "HelixDB — Relational Database Engine",
    desc: "Fully custom database engine written in Java. Includes SQL parser, query planner, execution engine. Storage engine with B+ Tree indexing and buffer pool. Implements ACID transactions using WAL and Two-Phase Locking.",
    stack: ["Java", "Database Internals", "B+ Trees", "ACID"],
    github: `${GH}/HelixDB`,
  },
  {
    title: "Forge — JVM + JIT Compiler",
    desc: "Built a Java Virtual Machine from scratch. Parses .class files and executes ~200 JVM opcodes. Includes custom garbage collector. JIT compiler converts bytecode → SSA → x86-64 machine code.",
    stack: ["Compilers", "JVM Internals", "JIT", "x86-64"],
  },
  {
    title: "PeerNexus — BitTorrent Client",
    desc: "Full BitTorrent protocol implementation. Includes DHT, peer exchange, magnet links, piece selection. Bandwidth control and persistent state handling. Production-style system with CI/CD and Docker support.",
    stack: ["Networking", "P2P", "Docker", "CI/CD"],
    github: `${GH}/PeerNexus`,
  },
  {
    title: "Codebase Intelligence & Refactor Assistant",
    badge: "Work Repo",
    desc: "Parses repositories into AST + dependency graph. Supports natural language querying over codebases. Performs automated refactoring and unit test generation. Includes search indexing using Lucene.",
    stack: ["AST", "Code Analysis", "Lucene", "NLP"],
  },
  {
    title: "SoulSupport — Mental Health Platform",
    desc: "Full-stack platform with authentication, sessions, and forums. AI chatbot integration for user support. Dockerized production-ready deployment with Nginx. Real-time features and scalable backend architecture.",
    stack: ["Full-Stack", "AI Integration", "Docker", "Nginx"],
    github: `${GH}/SoulSupport`,
    demo: "https://soul-support-hazel.vercel.app",
  },
];

const mini: Project[] = [
  {
    title: "GhostClick",
    desc: "Behavioral AI system using Transformer (defender) vs LSTM-GAN (attacker). Focus on simulating and detecting human-like interaction patterns.",
    stack: ["AI", "Transformers", "LSTM-GAN"],
    github: `${GH}/GhostClick`,
  },
  {
    title: "FarCloser",
    desc: "Platform for long-distance couples. Private shared space for communication and memory sharing.",
    stack: ["Full-Stack", "Communication"],
  },
  {
    title: "Lumen",
    desc: "Course platform with Node.js backend and React frontend. Supports authentication, enrollment, admin dashboards.",
    stack: ["Node.js", "React", "MongoDB"],
    github: `${GH}/Lumen`,
  },
  {
    title: "Toxic Comment Detection",
    desc: "NLP pipeline for toxicity classification. Uses TF-IDF + SVM, Logistic Regression, XGBoost. Includes Flask API and dashboard.",
    stack: ["NLP", "Machine Learning", "Flask"],
    github: `${GH}/Toxic-Comment-Detection`,
  },
  {
    title: "HALEM-PEGASIS Evaluator",
    desc: "Simulation tool for wireless sensor network routing protocols. Compares PEGASIS vs HALEM-PEGASIS. Evaluates energy efficiency, latency, and scalability.",
    stack: ["Simulation", "Networking", "Routing"],
    github: `${GH}/halem-pegasis-evaluator`,
  },
  {
    title: "knights-tour",
    desc: "Algorithm visualization / implementation project.",
    stack: ["Algorithms", "Visualization"],
    github: `${GH}/knights-tour`,
  },
  {
    title: "1D-Elastic-Collision",
    desc: "Physics simulation of elastic collisions.",
    stack: ["Physics", "Simulation"],
    github: `${GH}/1D-Elastic-Collision`,
  },
  {
    title: "Todo-List",
    desc: "Basic task management UI project.",
    stack: ["UI", "Frontend"],
  },
  {
    title: "schedulr",
    desc: "Experimental scheduling UI / frontend project.",
    stack: ["UI", "Experiment"],
    github: `${GH}/schedulr`,
  },
  {
    title: "crime-justice",
    desc: "Static HTML-based project for reporting and awareness.",
    stack: ["HTML", "Static"],
    github: `${GH}/crime-justice`,
  },
  {
    title: "utkarsh-patel26.github.io",
    desc: "This portfolio — React, Vite, Tailwind, with an interactive terminal and live system topology demo.",
    stack: ["Portfolio", "React", "Vite"],
    github: `${GH}/utkarsh-patel26.github.io`,
  },
  {
    title: "Java (Algorithms Fork)",
    desc: "Collection of algorithm implementations in Java.",
    stack: ["Java", "Algorithms"],
    github: `${GH}/Java`,
  },
];

const achievements: Project[] = [
  {
    title: "Research Publication",
    badge: "Publication",
    desc: "Published paper on Explainable CNN for lung disease classification at ICDDS '25.",
    stack: ["Deep Learning", "CNN", "Explainable AI"],
  },
  {
    title: "Gold Medalist",
    badge: "Award",
    desc: "Won gold medal at National Level Taekwondo (2021), demonstrating discipline and competitive excellence.",
    stack: ["Discipline", "Athletics"],
  },
  {
    title: "ISAI-DT '24 Presentation",
    badge: "Talk",
    desc: "Presented research on automated legal text information extraction at ISAI-DT '24.",
    stack: ["NLP", "Information Extraction"],
  },
  {
    title: "Ghost Hackathon",
    badge: "Hackathon",
    desc: "Participated in Ghost Hackathon by FOSS United and Tech4Community, building a functional solution under time constraints.",
    stack: ["FOSS", "Rapid Prototyping"],
  },
];

export const Projects = () => {
  const [tab, setTab] = useState<"main" | "mini" | "achievements">("main");
  const [api, setApi] = useState<CarouselApi>();
  const [isHovered, setIsHovered] = useState(false);

  const list = tab === "main" ? main : tab === "mini" ? mini : achievements;

  useEffect(() => {
    if (!api) return;
    if (isHovered) return;
    const timer = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [api, isHovered, tab]);

  const handleTabChange = (t: "main" | "mini" | "achievements") => {
    setTab(t);
    api?.scrollTo(0);
  };

  return (
    <section id="projects" className="relative py-24">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Projects
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10 text-sm md:text-base">
          A selection of my recent works, ranging from complex full-stack applications to focused technical experiments.
        </p>

        {/* Segmented Control */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex w-full max-w-2xl rounded-full bg-[#1e1e24]/80 p-0 overflow-hidden border border-white/5 shadow-lg">
            {(["main", "mini", "achievements"] as const).map((t) => (
              <button
                key={t}
                onClick={() => handleTabChange(t)}
                className={`flex-1 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 ${
                  tab === t
                    ? "bg-gradient-primary text-white shadow-[0_0_15px_hsl(320_90%_60%_/_0.3)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {t === "main" ? "Main Projects" : t === "mini" ? "Mini Projects" : "Achievements"}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-full relative px-2 md:px-6"
        >
          {/* Left Arrow */}
          <button 
            onClick={() => api?.scrollPrev()}
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#1a1a1e] border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-white hover:scale-110 hover:shadow-[0_0_20px_hsl(320_90%_60%_/_0.4)] transition-all duration-300 active:scale-95 shadow-xl"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button 
            onClick={() => api?.scrollNext()}
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#1a1a1e] border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-white hover:scale-110 hover:shadow-[0_0_20px_hsl(320_90%_60%_/_0.4)] transition-all duration-300 active:scale-95 shadow-xl"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <CarouselContent className="-ml-4 md:-ml-6">
            {list.map((p, i) => (
              <CarouselItem key={`${tab}-${i}`} className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                <div className="glass-card rounded-[1.5rem] p-8 border border-white/5 bg-[#1a1a1e]/60 hover:border-primary/60 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_0_30px_hsl(320_90%_60%_/_0.3)] transition-all duration-500 ease-out h-full flex flex-col shadow-lg animate-in fade-in zoom-in-95">
                  <h3 className="text-xl font-bold mb-4 text-gradient">{p.title}</h3>
                  
                  {p.badge && (
                    <div className="mb-5 inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full bg-[#2a1b28] text-[#e8508e] border border-[#e8508e]/20 w-fit uppercase tracking-wider">
                      {tab === "achievements" ? <Award className="w-3 h-3" /> : <Wrench className="w-3 h-3" />}
                      {p.badge}
                    </div>
                  )}
                  
                  <p className="text-[13px] text-gray-400 mb-8 leading-relaxed flex-grow">
                    {p.desc}
                  </p>

                  <div className="mt-auto pt-2 flex flex-col gap-4">
                    <div className="text-[12px] font-bold text-white">
                      Stack: <span className="text-gray-400 font-medium">{p.stack.join(", ")}</span>
                    </div>

                    {(p.github || p.demo) && (
                      <div className="flex items-center gap-4">
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#e8508e] hover:text-[#e8508e]/80 transition-colors w-fit"
                            aria-label={`${p.title} source code on GitHub`}
                          >
                            <Github className="w-3.5 h-3.5" /> Source
                          </a>
                        )}
                        {p.demo && (
                          <a
                            href={p.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#e8508e] hover:text-[#e8508e]/80 transition-colors w-fit"
                            aria-label={`${p.title} live demo`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="text-center mt-12">
          <a
            href="https://github.com/Utkarsh-patel26?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/20 text-sm font-semibold text-white hover:bg-white/5 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
          >
            <Github className="w-4 h-4" /> View all repositories on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};
