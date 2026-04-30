import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link to="/" className="font-display text-2xl tracking-tight text-foreground">
          Maison<span className="text-primary">.</span>
        </Link>
        <div className="hidden items-center gap-10 text-sm text-foreground/80 md:flex">
          <a href="#stays" className="transition-smooth hover:text-primary">Stays</a>
          <a href="#destinations" className="transition-smooth hover:text-primary">Destinations</a>
          <a href="#hosts" className="transition-smooth hover:text-primary">Hosts</a>
          <a href="#journal" className="transition-smooth hover:text-primary">Journal</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden text-sm text-foreground/80 transition-smooth hover:text-primary md:block">
            Sign in
          </button>
          <button className="rounded-full border border-border/60 p-2.5 md:hidden" aria-label="Menu">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
