import { motion } from "framer-motion";
import { TrendingUp, Landmark, Trees, GraduationCap } from "lucide-react";

const items = [
  {
    icon: TrendingUp,
    title: "Strong appreciation",
    body: "Metro Atlanta home values have grown 6–8% annually over the past decade — and forecasts project continued momentum into 2026.",
  },
  {
    icon: Landmark,
    title: "Low taxes, no limits",
    body: "Georgia's flat 5.39% income tax and favorable property tax structure protect more of your investment compared to coastal markets.",
  },
  {
    icon: GraduationCap,
    title: "Top-rated schools",
    body: "Forsyth, Fulton, and Cherokee counties are home to nationally ranked public schools and elite independents like Westminster and Pace.",
  },
  {
    icon: Trees,
    title: "Lifestyle, year-round",
    body: "Mild winters, deep tree canopy, the BeltLine, the Chattahoochee, and a one-hour reach to mountains, lakes, and the coast.",
  },
];

const WhyBookSection = () => {
  return (
    <section className="border-y border-border/40 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">Why Georgia</p>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            The case for buying in Atlanta.
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-sm bg-border/40 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-background p-8 transition-smooth hover:bg-card lg:p-10"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-smooth group-hover:scale-110 group-hover:bg-primary/20">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl">{it.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/65">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBookSection;
