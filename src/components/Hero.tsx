import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import HeroSearch from "./HeroSearch";
import hero from "@/assets/hero-villa.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <img
        src={hero}
        alt="Modern luxury Buckhead estate at dusk with the Atlanta skyline beyond"
        className="absolute inset-0 h-full w-full animate-scale-in object-cover"
      />

      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_hsl(var(--background)/0.7)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-20 pt-40 lg:px-10 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-primary/90">
            <span className="h-px w-10 bg-primary/60" />
            Atlanta · Buckhead · Alpharetta · Milton
          </p>
          <h1 className="font-display text-5xl leading-[1.02] text-foreground sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            Exceptional <em className="font-light italic text-gradient-warm">homes</em> in Georgia.
          </h1>
          <p className="mt-7 max-w-xl text-base text-foreground/70 lg:text-lg">
            Expert guidance for buying, selling and investing in Atlanta's most considered
            neighborhoods — quietly handled, end to end.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 lg:mt-16"
        >
          <HeroSearch />
        </motion.div>
      </div>

      <motion.a
        href="#listings"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/60 transition-smooth hover:text-primary md:flex"
      >
        <span>Listings</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;
