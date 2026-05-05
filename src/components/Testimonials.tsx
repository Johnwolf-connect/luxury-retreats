import { testimonials } from "@/data/properties";
import { Quote } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="mb-14 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">Client Stories</p>
        <h2 className="mx-auto max-w-3xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
          Words from buyers, sellers and investors.
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="group relative flex flex-col rounded-sm border border-border/60 bg-card/60 p-8 transition-smooth hover:border-primary/40 hover:bg-card"
          >
            <Quote className="h-7 w-7 text-primary/70" />
            <blockquote className="mt-6 flex-1 font-display text-xl leading-snug text-foreground/90">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-8 border-t border-border/40 pt-5">
              <p className="text-sm font-medium">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.place}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
