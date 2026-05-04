import { useState } from "react";
import { Instagram, Facebook, Linkedin, Check, Send, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || email.length > 200) return;
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="border-b border-border/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center lg:px-10">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">Market Letter</p>
            <h3 className="font-display text-3xl leading-tight sm:text-4xl">
              Off-market listings, monthly market briefs, and quiet opportunities — delivered first.
            </h3>
          </div>
          <form onSubmit={submit} className="lg:justify-self-end lg:w-full lg:max-w-md">
            <div className="flex overflow-hidden rounded-sm border border-border/60 bg-card/60 backdrop-blur transition-smooth focus-within:border-primary/60">
              <input
                type="email"
                required
                maxLength={200}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email address"
                className="flex-1 bg-transparent px-4 py-4 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
              />
              <button
                type="submit"
                className="flex items-center gap-2 bg-gradient-warm px-5 text-xs uppercase tracking-wider text-primary-foreground transition-smooth hover:opacity-90"
              >
                {done ? <><Check className="h-4 w-4" /> Subscribed</> : <><Send className="h-3.5 w-3.5" /> Subscribe</>}
              </button>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              One brief a month. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div className="sm:col-span-2">
          <a href="#" className="font-display text-3xl">
            Maison Georgia<span className="text-primary">.</span>
          </a>
          <p className="mt-4 max-w-sm text-sm text-foreground/60">
            A boutique real estate firm representing buyers, sellers, and investors across
            Atlanta's most considered neighborhoods. Licensed in Georgia.
          </p>
          <div className="mt-6 space-y-2 text-sm text-foreground/70">
            <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" /> 3344 Peachtree Rd NE, Atlanta, GA 30326</p>
            <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-primary" /> (404) 555-0199</p>
            <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-primary" /> hello@maisongeorgia.com</p>
          </div>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="rounded-full border border-border/50 p-2.5 text-foreground/60 transition-smooth hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs uppercase tracking-wider text-primary">Explore</p>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li><a href="#listings" className="hover:text-primary">Featured Listings</a></li>
            <li><a href="#neighborhoods" className="hover:text-primary">Neighborhoods</a></li>
            <li><a href="#market" className="hover:text-primary">Market Insights</a></li>
            <li><a href="#team" className="hover:text-primary">Our Team</a></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs uppercase tracking-wider text-primary">Services</p>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li><a href="#" className="hover:text-primary">Buy a home</a></li>
            <li><a href="#" className="hover:text-primary">Sell with us</a></li>
            <li><a href="#" className="hover:text-primary">Investment advisory</a></li>
            <li><a href="#" className="hover:text-primary">Relocation</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center lg:px-10">
          <p>© {new Date().getFullYear()} Maison Georgia Real Estate · Licensed Brokerage in Georgia · Equal Housing Opportunity</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Fair Housing</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
