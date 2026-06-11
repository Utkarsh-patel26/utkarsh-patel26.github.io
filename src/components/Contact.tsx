import { useState } from "react";
import { Send, Linkedin, Github, Mail, Phone, MapPin, Code2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EMAIL = "utkarshishu2627@gmail.com";

export const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio contact from ${form.name}`,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast({ title: "Message sent!", description: "Thanks for reaching out — I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch {
      // Fall back to the visitor's mail client so the message is never lost
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio contact")}&body=${body}`;
      toast({
        title: "Opening your email app",
        description: "The form service didn't respond, so I'm handing this off to your mail client.",
      });
    } finally {
      setSending(false);
    }
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
                Open to internships, collaborations, and interesting backend / distributed systems problems.
                I usually reply within 24 hours.
              </p>

              <div className="space-y-3 mb-8">
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-sm hover:text-foreground text-foreground/80">
                  <Mail className="w-4 h-4 text-primary" /> {EMAIL}
                </a>
                <a href="tel:+916307816747" className="flex items-center gap-3 text-sm hover:text-foreground text-foreground/80">
                  <Phone className="w-4 h-4 text-primary" /> +91 63078 16747
                </a>
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <MapPin className="w-4 h-4 text-primary" /> Bangalore, India
                </div>
              </div>

              <div className="flex gap-3">
                <a href="https://www.linkedin.com/in/utkarshpatel26/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:border-primary/60 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_0_20px_hsl(320_90%_60%_/_0.3)] transition-all duration-300 active:scale-95">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://github.com/Utkarsh-patel26" target="_blank" rel="noreferrer" aria-label="GitHub profile" className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:border-primary/60 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_0_20px_hsl(320_90%_60%_/_0.3)] transition-all duration-300 active:scale-95">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://leetcode.com/u/utkarshishu26/" target="_blank" rel="noreferrer" aria-label="LeetCode profile" className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:border-primary/60 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_0_20px_hsl(320_90%_60%_/_0.3)] transition-all duration-300 active:scale-95">
                  <Code2 className="w-4 h-4" />
                </a>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <label className="sr-only" htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="Your name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl bg-muted/40 border border-border focus:border-primary outline-none transition"
              />
              <label className="sr-only" htmlFor="contact-email">Your email</label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder="Your email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl bg-muted/40 border border-border focus:border-primary outline-none transition"
              />
              <label className="sr-only" htmlFor="contact-message">Your message</label>
              <textarea
                id="contact-message"
                required
                rows={5}
                placeholder="Your message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl bg-muted/40 border border-border focus:border-primary outline-none transition resize-none"
              />
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_20px_hsl(320_90%_60%_/_0.4)] transition-all duration-300 active:scale-95 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:scale-100"
              >
                {sending ? (
                  <>Sending <Loader2 className="w-4 h-4 animate-spin" /></>
                ) : (
                  <>Send <Send className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
