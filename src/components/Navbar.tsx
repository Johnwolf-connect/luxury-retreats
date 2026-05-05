import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/search", label: "Search", isRoute: true },
  { href: "#listings", label: "Listings" },
  { href: "#neighborhoods", label: "Neighborhoods" },
  { href: "#market", label: "Market Insights" },
  { href: "#team", label: "Our Team" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link to="/" className="font-display text-2xl tracking-tight text-foreground">
          Maison Georgia<span className="text-primary">.</span>
        </Link>
        <div className="hidden items-center gap-10 text-sm text-foreground/80 md:flex">
          {links.map((l) =>
            l.isRoute ? (
              <Link key={l.href} to={l.href} className="transition-smooth hover:text-primary">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="transition-smooth hover:text-primary">
                {l.label}
              </a>
            )
          )}
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+14045550199" className="hidden items-center gap-2 text-sm text-foreground/80 transition-smooth hover:text-primary md:flex">
            <Phone className="h-3.5 w-3.5" /> (404) 555-0199
          </a>
          <button
            onClick={() => setOpen(true)}
            className="rounded-full border border-border/60 p-2.5 text-foreground/80 transition-smooth hover:border-primary hover:text-primary md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <Link to="/" onClick={() => setOpen(false)} className="font-display text-2xl">
                Maison Georgia<span className="text-primary">.</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-border/60 p-2.5"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mt-12 flex flex-col items-start gap-2 px-6"
            >
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="font-display text-4xl leading-tight text-foreground transition-smooth hover:text-primary"
                >
                  {l.label}
                </motion.a>
              ))}
              <a href="tel:+14045550199" className="mt-10 flex w-full items-center justify-center gap-2 bg-gradient-warm px-6 py-4 text-xs uppercase tracking-wider text-primary-foreground">
                <Phone className="h-3.5 w-3.5" /> Call (404) 555-0199
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
