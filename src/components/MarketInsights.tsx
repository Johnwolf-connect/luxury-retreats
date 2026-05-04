import { motion } from "framer-motion";
import { TrendingUp, Home, Building2, LineChart } from "lucide-react";

const STATS = [
  { icon: TrendingUp, label: "Median sale price (Metro)", value: "$465K", note: "+5.8% YoY" },
  { icon: Home, label: "Active luxury listings ($2M+)", value: "612", note: "vs. 484 in 2024" },
  { icon: LineChart, label: "Avg. days on market", value: "27", note: "−9 days YoY" },
  { icon: Building2, label: "New construction starts", value: "9,200", note: "Forsyth & N. Fulton lead" },
];

const TRENDS = [
  { title: "Buckhead pulls ahead", body: "Inventory at sub-2018 levels. Tuxedo Park and Haynes Manor are seeing multi-offer scenarios above $4M for the first time since 2021." },
  { title: "Milton & Forsyth surge", body: "Equestrian estates and gated golf communities are commanding 7–9% premiums on appreciation as relocators from California and the Northeast continue to arrive." },
  { title: "Intown rentals tighten", body: "Furnished executive rentals near the BeltLine are trading at 4.5–5.2% cap rates, with vacancy under 3% in Inman Park and Virginia-Highland." },
];

const MarketInsights = () => {
  return (
    <section id="market" className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">Market Insights · 2026</p>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              The Georgia luxury market, in numbers.
            </h2>
          </div>
          <p className="max-w-md text-foreground/60 lg:justify-self-end">
            A monthly snapshot of metro Atlanta — pulled from FMLS, GAMLS and our internal
            transaction data through Q1 2026.
          </p>
        </div>

        <div className="mb-16 grid gap-px overflow-hidden rounded-sm border border-border/40 bg-border/40 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="bg-background p-7"
            >
              <s.icon className="mb-5 h-5 w-5 text-primary" />
              <p className="font-display text-3xl text-foreground">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <p className="mt-3 text-xs text-emerald-400">{s.note}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {TRENDS.map((t, i) => (
            <motion.article
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-sm border border-border/40 bg-card/40 p-7 transition-smooth hover:border-primary/40 hover:bg-card"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Trend 0{i + 1}</p>
              <h3 className="mt-3 font-display text-xl">{t.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/65">{t.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;
