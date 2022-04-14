import { createContext } from "react";
import { CacheStore, initialCacheState } from "./cacheStore";

export const CacheContext = createContext<CacheStore>({
  cache: initialCacheState,
  dispatch: () => {},
});
