import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import HeroSearch from "./HeroSearch";
import hero from "@/assets/hero-villa.jpg";

const VIDEO_SRC =
  "https://cdn.coverr.co/videos/coverr-luxury-villa-with-pool-at-sunset-2633/1080p.mp4";

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Photo base (always visible) */}
      <img
        src={hero}
        alt="Luxury villa at twilight with infinity pool"
        className="absolute inset-0 h-full w-full animate-scale-in object-cover"
      />
      {/* Video overlay (fades in when ready) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_hsl(var(--background)/0.7)_100%)]" />
      {/* Subtle film grain */}
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
            Curated Luxury Escapes
          </p>
          <h1 className="font-display text-5xl leading-[1.02] text-foreground sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            Book your <em className="font-light italic text-gradient-warm">private</em> retreat.
          </h1>
          <p className="mt-7 max-w-xl text-base text-foreground/70 lg:text-lg">
            A privately curated collection of architectural villas, alpine chalets and
            island sanctuaries — designed for travelers who notice the details.
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

      {/* Scroll indicator */}
      <motion.a
        href="#stays"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/60 transition-smooth hover:text-primary md:flex"
      >
        <span>Scroll</span>
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

export default Hero;
