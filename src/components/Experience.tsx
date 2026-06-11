import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const items = [
  {
    role: "Software Intern",
    company: "Stealth Startup",
    period: "May 2025 – July 2025",
    bullets: [
      "Developed and deployed production-ready landing pages integrated with backend services and APIs for user acquisition and tracking.",
      "Automated internal workflows using n8n, reducing manual effort and improving operational efficiency.",
      "Built structured data pipelines for capturing, validating, and routing leads for analytics and business insights.",
    ],
  },
  {
    role: "Chair",
    company: "IEEE Computer Society, RIT",
    period: "2025 – Present",
    bullets: [
      "Led initiatives that increased active membership by 104.17% and improved overall community engagement.",
      "Organized and executed 11+ large-scale technical events with 1750+ participants.",
      "Managed a 98-member team across operations, sponsorships, and outreach.",
    ],
  },
  {
    role: "IAMPro Intern",
    company: "IEEE Bangalore",
    period: "2025",
    bullets: [
      "Completed a 6-month mentorship-driven internship focused on real-world problem solving and system development.",
      "Executed an end-to-end project lifecycle under guidance of industry mentors.",
      "Co-authored and published research paper at ICDDS '25.",
    ],
  },
];

export const Experience = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!api) return;

    if (isHovered) return;

    const timer = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [api, isHovered]);

  return (
    <section id="experience" className="relative py-24">
      <div className="container">
        <div 
          className="glass-card rounded-[2rem] p-8 md:p-14 max-w-5xl mx-auto relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-3 text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Experience
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 text-sm md:text-base">
            My professional journey and internship experiences.
          </p>

          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative px-2 md:px-6"
          >
            {/* Custom Arrows mapping directly to api */}
            <button 
              onClick={() => api?.scrollPrev()}
              className="absolute left-0 md:-left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#1a1a1e] border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-white hover:scale-110 hover:shadow-[0_0_20px_hsl(320_90%_60%_/_0.4)] transition-all duration-300 active:scale-95 shadow-xl"
              aria-label="Previous experience"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button 
              onClick={() => api?.scrollNext()}
              className="absolute right-0 md:-right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#1a1a1e] border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-white hover:scale-110 hover:shadow-[0_0_20px_hsl(320_90%_60%_/_0.4)] transition-all duration-300 active:scale-95 shadow-xl"
              aria-label="Next experience"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <CarouselContent className="-ml-4 md:-ml-6">
              {items.map((item, i) => (
                <CarouselItem key={i} className="pl-4 md:pl-6 basis-full md:basis-1/2">
                  <div className="glass-card rounded-[1.5rem] p-8 md:p-10 border border-white/10 bg-[#1e1e24]/40 hover:border-primary/60 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_0_30px_hsl(320_90%_60%_/_0.3)] transition-all duration-300 ease-out h-full">
                    <h3 className="text-xl md:text-2xl font-bold mb-1 text-white">{item.role}</h3>
                    <h4 className="text-[13px] md:text-sm font-bold text-primary mb-3 uppercase tracking-widest">{item.company}</h4>
                    <div className="text-[13px] text-gray-400 mb-5 font-medium">{item.period}</div>
                    <ul className="space-y-3 text-[13px] md:text-[14px] text-gray-300 leading-relaxed">
                      {item.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 items-start">
                          <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-gray-400 shrink-0 border border-gray-400" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
