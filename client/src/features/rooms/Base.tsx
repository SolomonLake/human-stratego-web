import { Color3, Vector3 } from "@babylonjs/core";
import { CollisionGroup } from "../collision/collision";
import { Room } from "../pieces/Room";
import { PALATTE } from "../theme/theme";

export const Base = ({
  teamBaseXSize,
  height,
  teamBaseZSize,
  teamBaseXPosition,
  teamBaseZPosition = 0,
  roomYPosition,
  userMatchesTeam,
  team,
}: {
  teamBaseXSize: number;
  height: number;
  teamBaseZSize: number;
  teamBaseXPosition: number;
  teamBaseZPosition?: number;
  roomYPosition: number;
  userMatchesTeam: boolean;
  team: Team;
}) => {
  const teamColor3 = Color3.FromHexString(PALATTE[team.color]);

  return (
    <Room
      size={new Vector3(teamBaseXSize, height, teamBaseZSize)}
      position={
        new Vector3(teamBaseXPosition, roomYPosition, teamBaseZPosition)
      }
      positiveXWall
      negativeXWall
      positiveZWall
      negativeZWall
      invertWalls
      checkCollisions
      collisionGroup={
        userMatchesTeam
          ? CollisionGroup.CollideWithNonMasks
          : CollisionGroup.CollideWithAll
      }
      color3={teamColor3}
    />
  );
};
