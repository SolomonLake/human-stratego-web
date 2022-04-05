import { useCacheStore } from "../cache/useCache";
import { useUserId } from "../user/useUserId";

export const useAvatarTeam = () => {
  const userId = useUserId();
  const { cache } = useCacheStore();

  return cache?.players[userId].teamId;
};
