import { useCacheStore } from "../cache/useCache";

export const useTeam = (teamId?: TeamId) => {
  const { cache } = useCacheStore();

  if (teamId) {
    return cache?.teams[teamId];
  }
};
