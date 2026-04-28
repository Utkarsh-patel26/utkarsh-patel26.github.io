import { BookOpen } from "lucide-react";

export const Publications = () => {
  return (
    <section id="publications" className="relative py-24">
      <div className="container">
        <h2 className="section-heading">
          <span className="text-gradient">Publications</span>
        </h2>
        <p className="section-sub">
          Contributing to the academic community through applied research.
        </p>

        <div className="max-w-3xl mx-auto">
          <article className="glass-card rounded-3xl p-8 md:p-10 hover:border-primary/60 transition group">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold leading-snug mb-2">
                  Explainable CNN for Lung Disease Classification
                </h3>
                <p className="text-sm text-muted-foreground italic">
                  Deep learning with interpretability for medical imaging
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-5">
              Published at the <strong className="text-foreground/90">International Conference on Data-Driven Systems (ICDDS '25)</strong> — co-authored during the IEEE Bangalore IAMPro mentorship program.
            </p>

            <ul className="space-y-2 text-sm text-muted-foreground mb-2">
              <li className="flex gap-2"><span className="text-primary">▸</span> Designed an explainable CNN pipeline for classifying lung diseases from medical scans.</li>
              <li className="flex gap-2"><span className="text-primary">▸</span> Integrated visualization techniques to interpret model predictions for clinical trust.</li>
              <li className="flex gap-2"><span className="text-primary">▸</span> Also presented research on automated legal text information extraction at ISAI-DT '24.</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
};
