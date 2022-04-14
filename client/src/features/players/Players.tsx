import { useCacheStore } from "../cache/useCacheStore";
import { useSocket } from "../sockets/useSocket";
import { useUserId } from "../user/useUserId";
import { Player } from "./Player";
import { usePlayerDisconnectedListener } from "./usePlayerDisconnectedListener";
import { usePlayerJoinedListener } from "./usePlayerJoined";

export const Players = () => {
  const socket = useSocket();
  const userId = useUserId();

  const { cache, dispatch } = useCacheStore();

  usePlayerJoinedListener();

  usePlayerDisconnectedListener((ev) => {
    dispatch({ type: "playerDisconnected", event: ev });
  });

  return (
    <>
      {Object.keys(cache.players)
        .filter((playerId) => playerId !== userId)
        .map((playerId) => {
          const player = cache.players[playerId];

          return (
            <Player
              key={playerId}
              userId={playerId}
              team={cache.teams[player.teamId]}
            />
          );
        })}
    </>
  );
};
