import { createContext } from "react";
import { CacheState, CacheStore, initialCacheState } from "./CacheProvider";

export const CacheContext = createContext<CacheStore>({
  cache: initialCacheState,
  dispatch: () => {},
});
