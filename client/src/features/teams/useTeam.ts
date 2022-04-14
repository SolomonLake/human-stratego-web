import { useCacheStore } from "../cache/useCacheStore";

export const useTeam = (teamId?: TeamId) => {
  const { cache } = useCacheStore();

  if (teamId) {
    return cache?.teams[teamId];
  }
};
