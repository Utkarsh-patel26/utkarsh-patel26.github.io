import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Publications } from "@/components/Publications";
import { Contact } from "@/components/Contact";
import { Terminal } from "@/components/Terminal";
const Index = () => {
  return (
    <main className="min-h-screen bg-[#040914] text-foreground overflow-x-hidden relative">
      {/* Deep Space Background Pattern for non-Hero sections */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Repeating Stars Pattern */}
        <div className="absolute inset-0 bg-stars opacity-50" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Floating Glowing Orbs */}
        <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#b92b6a]/20 blur-[140px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#5136b8]/20 blur-[160px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[60%] left-[40%] w-[40vw] h-[40vw] rounded-full bg-[#7534d0]/15 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Publications />
        <Contact />
      </div>
      <Terminal />
    </main>
  );
};

export default Index;
