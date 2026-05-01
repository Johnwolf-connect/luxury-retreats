import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Lightbox = ({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  useEffect(() => {
    if (index === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-background/95 backdrop-blur-xl"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full border border-border/60 bg-card/60 p-3 text-foreground transition-smooth hover:border-primary hover:text-primary"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border/60 bg-card/60 p-3 text-foreground transition-smooth hover:border-primary hover:text-primary sm:left-6"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border/60 bg-card/60 p-3 text-foreground transition-smooth hover:border-primary hover:text-primary sm:right-6"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <motion.img
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={images[index]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-[92vw] rounded-sm object-contain shadow-elegant"
          />

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-card/70 px-4 py-1.5 text-xs uppercase tracking-wider text-foreground/80 backdrop-blur">
            {index + 1} / {images.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
