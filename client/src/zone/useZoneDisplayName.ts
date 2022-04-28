import { useCacheStore } from "../features/cache/useCacheStore";
import { Zone } from "./zone";

export const useZoneDisplayName = (zone: Zone): string => {
  const { cache } = useCacheStore();

  switch (zone) {
    case "1":
    case "2":
      return cache.teams[zone].displayName;
    case "Base":
    case "Neutral":
      return zone;
  }
};
