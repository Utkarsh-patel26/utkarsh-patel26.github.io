import { useState } from "react";
import { Send, Linkedin, Instagram, Github, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "Thanks for reaching out — I'll get back to you soon." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="container">
        <div className="glass-card rounded-[2rem] p-8 md:p-14 max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-glow blur-3xl opacity-60" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-glow blur-3xl opacity-40" />

          <div className="grid md:grid-cols-2 gap-10 relative">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Let's Build <span className="text-gradient">Something Great</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Feel free to reach out for collaborations or just a friendly hello.
              </p>

              <div className="space-y-3 mb-8">
                <a href="mailto:hello@naveenkumarp.me" className="flex items-center gap-3 text-sm hover:text-foreground text-foreground/80">
                  <Mail className="w-4 h-4 text-primary" /> hello@naveenkumarp.me
                </a>
              </div>

              <div className="flex gap-3">
                {[Linkedin, Instagram, Github].map((Icon, i) => (
                  <a key={i} href="#" className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:border-primary/60 transition">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl bg-muted/40 border border-border focus:border-primary outline-none transition"
              />
              <input
                type="email"
                required
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl bg-muted/40 border border-border focus:border-primary outline-none transition"
              />
              <textarea
                required
                rows={5}
                placeholder="Your message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl bg-muted/40 border border-border focus:border-primary outline-none transition resize-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold hover:scale-105 transition"
              >
                Send <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          © {new Date().getFullYear()} Naveen Kumar P. Crafted with passion.
        </p>
      </div>
    </section>
  );
};
