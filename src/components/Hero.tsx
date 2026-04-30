import { Search, MapPin, Calendar, Users } from "lucide-react";
import hero from "@/assets/hero-villa.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <img
        src={hero}
        alt="Luxury villa at twilight with infinity pool"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover animate-scale-in"
      />
      <div className="absolute inset-0 bg-gradient-hero" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-16 pt-40 lg:px-10 lg:pb-24">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-primary/90">
            Curated luxury rentals · since 2014
          </p>
          <h1 className="font-display text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
            Homes worth <em className="font-light italic text-gradient-warm">remembering.</em>
          </h1>
          <p className="mt-6 max-w-xl text-base text-foreground/70 lg:text-lg">
            A privately curated collection of architectural villas, alpine chalets and
            island retreats — designed for travelers who notice the details.
          </p>
        </div>

        <div className="mt-12 animate-fade-up rounded-sm border border-border/50 bg-card/80 p-3 shadow-elegant backdrop-blur-xl lg:mt-16" style={{ animationDelay: "0.2s" }}>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-border/50 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
            <SearchField icon={MapPin} label="Where" placeholder="Anywhere" />
            <SearchField icon={Calendar} label="When" placeholder="Add dates" />
            <SearchField icon={Users} label="Guests" placeholder="Add guests" />
            <button className="flex items-center justify-center gap-2 bg-gradient-warm px-8 py-5 text-sm font-medium uppercase tracking-wider text-primary-foreground transition-smooth hover:opacity-90">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const SearchField = ({
  icon: Icon,
  label,
  placeholder,
}: {
  icon: typeof Search;
  label: string;
  placeholder: string;
}) => (
  <label className="flex cursor-pointer items-center gap-3 bg-card px-5 py-4 transition-smooth hover:bg-muted">
    <Icon className="h-4 w-4 shrink-0 text-primary" />
    <div className="min-w-0 flex-1">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <input
        className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground/50 focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  </label>
);

export default Hero;
