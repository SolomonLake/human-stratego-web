import { Vector3 } from "@babylonjs/core";
import { useContext } from "react";
import { Room } from "../../pieces/Room";
import { CacheContext } from "../../cache/CacheContext";
import { useUserId } from "../../user/useUserId";
import { SquareBaseLayer } from "./SquareBaseLayer";
import { SquareTeamSide } from "./SquareTeamSide";
import { useCacheStore } from "../../cache/useCache";

export const SquareLevel = () => {
  const userId = useUserId();

  const { cache } = useCacheStore();

  const userTeamId = cache?.players[userId]?.teamId;

  if (!cache || !userTeamId) {
    return null;
  }

  return (
    <>
      {(Object.keys(cache.teams) as TeamId[]).map((teamId: TeamId) => (
        <SquareTeamSide
          key={teamId}
          team={cache.teams[teamId]}
          userMatchesTeam={userTeamId === teamId}
        />
      ))}
    </>
  );
};
