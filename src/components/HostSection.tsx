import host1 from "@/assets/host-1.jpg";
import { Award } from "lucide-react";

const HostSection = () => {
  return (
    <section id="hosts" className="border-y border-border/40 bg-card/30">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10 lg:py-32">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-elegant">
            <img
              src={host1}
              alt="Camille Laurent, Maison host"
              loading="lazy"
              width={512}
              height={512}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden rounded-sm border border-border/60 bg-card p-6 shadow-elegant sm:block">
            <p className="font-display text-3xl text-primary">200+</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Verified hosts</p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">Meet our hosts</p>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Hospitality, kept personal.
          </h2>
          <p className="mt-6 text-foreground/70">
            Every Maison home is cared for by a host we know personally — chefs, designers, and
            world travelers who treat your stay as their own. They greet you on arrival and are a
            message away throughout.
          </p>

          <div className="mt-10 flex items-center gap-5 border-t border-border/40 pt-8">
            <img src={host1} alt="" loading="lazy" className="h-16 w-16 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">Camille Laurent</p>
                <Award className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Superhost · Côte d'Azur · Hosting since 2017
              </p>
            </div>
            <button className="rounded-full border border-border/60 px-5 py-2 text-xs uppercase tracking-wider transition-smooth hover:border-primary hover:text-primary">
              Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostSection;
