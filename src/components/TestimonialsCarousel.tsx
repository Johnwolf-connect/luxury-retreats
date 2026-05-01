import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/properties";

const TestimonialsCarousel = () => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % total), 6000);
    return () => clearInterval(id);
  }, [paused, total]);

  const t = testimonials[i];

  return (
    <section
      className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-14 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">Guest Stories</p>
        <h2 className="mx-auto max-w-3xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
          Words from those who stayed.
        </h2>
      </div>

      <div className="relative mx-auto max-w-4xl">
        <Quote className="mx-auto mb-6 h-10 w-10 text-primary/60" />

        <div className="relative min-h-[280px] sm:min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="mb-5 flex justify-center gap-1">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="mx-auto max-w-3xl font-display text-2xl italic leading-snug text-foreground/90 sm:text-3xl">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-10 flex items-center justify-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  width={56}
                  height={56}
                  loading="lazy"
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/30"
                />
                <div className="text-left">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.place}</p>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => setI((v) => (v - 1 + total) % total)}
            className="rounded-full border border-border/60 p-2.5 transition-smooth hover:border-primary hover:text-primary"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Go to testimonial ${k + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === k ? "w-8 bg-primary" : "w-1.5 bg-border hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setI((v) => (v + 1) % total)}
            className="rounded-full border border-border/60 p-2.5 transition-smooth hover:border-primary hover:text-primary"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
