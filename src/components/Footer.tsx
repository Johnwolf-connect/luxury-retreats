const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div className="sm:col-span-2">
          <a href="#" className="font-display text-3xl">
            Maison<span className="text-primary">.</span>
          </a>
          <p className="mt-4 max-w-sm text-sm text-foreground/60">
            A quiet collection of the world's most considered private homes — for travelers who
            arrive looking for more than a place to sleep.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs uppercase tracking-wider text-primary">Explore</p>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li><a href="#stays" className="hover:text-primary">Stays</a></li>
            <li><a href="#destinations" className="hover:text-primary">Destinations</a></li>
            <li><a href="#hosts" className="hover:text-primary">Hosts</a></li>
            <li><a href="#" className="hover:text-primary">Journal</a></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs uppercase tracking-wider text-primary">Maison</p>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li><a href="#" className="hover:text-primary">About</a></li>
            <li><a href="#" className="hover:text-primary">Become a host</a></li>
            <li><a href="#" className="hover:text-primary">Concierge</a></li>
            <li><a href="#" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center lg:px-10">
          <p>© {new Date().getFullYear()} Maison Collection. Crafted with care.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
