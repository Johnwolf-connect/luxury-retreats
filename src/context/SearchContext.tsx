import { createContext, useContext, useState, ReactNode } from "react";
import type { DateRange } from "react-day-picker";

export type SearchState = {
  location: string;
  dates: DateRange | undefined;
  guests: number;
};

type Ctx = {
  search: SearchState;
  setSearch: (s: SearchState) => void;
  applied: SearchState;
  apply: (s: SearchState) => void;
  reset: () => void;
};

const DEFAULT: SearchState = { location: "", dates: undefined, guests: 0 };

const SearchCtx = createContext<Ctx | null>(null);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<SearchState>(DEFAULT);
  const [applied, setApplied] = useState<SearchState>(DEFAULT);
  return (
    <SearchCtx.Provider
      value={{
        search,
        setSearch,
        applied,
        apply: (s) => {
          setSearch(s);
          setApplied(s);
        },
        reset: () => {
          setSearch(DEFAULT);
          setApplied(DEFAULT);
        },
      }}
    >
      {children}
    </SearchCtx.Provider>
  );
};

export const useSearch = () => {
  const c = useContext(SearchCtx);
  if (!c) throw new Error("useSearch must be used within SearchProvider");
  return c;
};
