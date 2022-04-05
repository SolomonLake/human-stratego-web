import { useEffect, useReducer, useState } from "react";
import { useCacheStore } from "../cache/useCache";
import { useSocket } from "../sockets/useSocket";
import { useUserId } from "../user/useUserId";
import { Player } from "./Player";
import { usePlayerDisconnectListener } from "./usePlayerDisconnectListener";

type PlayerAction =
  | { type: "player/playerJoined"; event: PlayerJoinEvent }
  | { type: "player/playerDisconnected"; event: PlayerDisconnectEvent }
  | { type: "player/playersReceived"; players: ServerCache["players"] };

const playersReducer = (state: PlayerMap, action: PlayerAction) => {
  switch (action.type) {
    case "player/playerJoined": {
      const { userId, position } = action.event;
      return {
        ...state,
        [userId]: {
          ...state[userId],
          position,
        },
      };
    }
    case "player/playerDisconnected": {
      const { userId, disconnectedAt } = action.event;
      return {
        ...state,
        [userId]: {
          ...state[userId],
          disconnectedAt,
        },
      };
    }
    case "player/playersReceived": {
      return action.players;
    }
  }
};

export const Players = () => {
  const [playersState, dispatch] = useReducer(playersReducer, {});
  const [teams, setTeams] = useState<TeamMap | undefined>(undefined);
  const socket = useSocket();
  const userId = useUserId();

  const { cache } = useCacheStore();

  useEffect(() => {
    if (cache) {
      dispatch({ type: "player/playersReceived", players: cache.players });
      setTeams(cache.teams);
    }
  }, [cache]);

  useEffect(() => {
    const onPlayerJoin = (ev: PlayerJoinEvent) => {
      dispatch({ type: "player/playerJoined", event: ev });
    };
    socket.on("playerJoin", onPlayerJoin);
    return () => {
      socket.off("playerJoin", onPlayerJoin);
    };
  });

  usePlayerDisconnectListener((ev) =>
    dispatch({ type: "player/playerDisconnected", event: ev })
  );

  if (!teams) {
    return null;
  }

  return (
    <>
      {Object.keys(playersState)
        .filter((playerId) => playerId !== userId)
        .map((playerId) => {
          const player = playersState[playerId];

          return (
            <Player
              key={playerId}
              userId={playerId}
              initialPlayer={player}
              team={teams[player.teamId]}
            />
          );
        })}
    </>
  );
};
