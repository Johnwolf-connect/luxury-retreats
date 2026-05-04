import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const NEIGHBORHOODS = [
  { name: "Buckhead", median: "$1.85M", change: "+6.4%", note: "Tuxedo Park, Tuxedo Forest, West Paces Ferry" },
  { name: "Alpharetta", median: "$985K", change: "+5.1%", note: "Country Club of the South, Avalon, Crabapple" },
  { name: "Milton", median: "$1.42M", change: "+7.2%", note: "Birmingham, White Columns, The Hayfield" },
  { name: "Sandy Springs", median: "$925K", change: "+4.8%", note: "Riverside, Glenridge, City Springs" },
  { name: "Virginia-Highland", median: "$1.12M", change: "+5.6%", note: "Atkins Park, Morningside, Druid Hills" },
  { name: "Inman Park", median: "$1.05M", change: "+6.0%", note: "BeltLine adjacent, Old Fourth Ward, Reynoldstown" },
  { name: "Midtown", median: "$695K", change: "+3.9%", note: "Ansley Park, Piedmont Park, Arts District" },
  { name: "Johns Creek", median: "$870K", change: "+4.2%", note: "Newtown, Bellmoore Park, Country Club" },
];

const MapView = () => {
  return (
    <section id="neighborhoods" className="border-t border-border/40 bg-card/40">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">Featured Neighborhoods</p>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Where Atlanta lives well.
            </h2>
          </div>
          <p className="max-w-md text-foreground/60 lg:justify-self-end">
            From the canopy of Tuxedo Park to the patios of Inman Park — eight zip codes we know
            block by block. Median sale prices, year-over-year, last 12 months.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-sm border border-border/40 bg-border/40 sm:grid-cols-2 lg:grid-cols-4">
          {NEIGHBORHOODS.map((n, i) => (
            <motion.a
              key={n.name}
              href="#listings"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group flex flex-col bg-background p-7 transition-smooth hover:bg-card"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-display text-xl">{n.name}</h3>
                <ArrowUpRight className="h-4 w-4 text-foreground/40 transition-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Median {n.median}</p>
              <p className="mt-3 text-xs uppercase tracking-wider text-emerald-400">{n.change} YoY</p>
              <p className="mt-4 text-xs text-foreground/55">{n.note}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MapView;
