import host1 from "@/assets/host-1.jpg";
import { Award, Phone, Mail } from "lucide-react";

const HostSection = () => {
  return (
    <section id="team" className="border-y border-border/40 bg-card/30">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10 lg:py-32">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-elegant">
            <img
              src={host1}
              alt="Alexandra Whitfield, Principal Broker"
              loading="lazy"
              width={512}
              height={640}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden rounded-sm border border-border/60 bg-card p-6 shadow-elegant sm:block">
            <p className="font-display text-3xl text-primary">$1.2B+</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Career sales volume</p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">Meet our team</p>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Local expertise, quietly delivered.
          </h2>
          <p className="mt-6 text-foreground/70">
            Maison Georgia is a boutique brokerage of native Atlantans, relocators and former
            developers. We represent buyers, sellers and investors across Buckhead, Alpharetta,
            Milton, Sandy Springs and Intown — with the discretion the market expects.
          </p>

          <div className="mt-10 flex items-center gap-5 border-t border-border/40 pt-8">
            <img src={host1} alt="" loading="lazy" className="h-16 w-16 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">Alexandra Whitfield</p>
                <Award className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Principal Broker · Buckhead · Licensed since 2014
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="tel:+14045550199" className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2 text-xs uppercase tracking-wider text-primary transition-smooth hover:bg-primary hover:text-primary-foreground">
              <Phone className="h-3.5 w-3.5" /> (404) 555-0199
            </a>
            <a href="mailto:hello@maisongeorgia.com" className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2 text-xs uppercase tracking-wider transition-smooth hover:border-primary hover:text-primary">
              <Mail className="h-3.5 w-3.5" /> Email the team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostSection;
