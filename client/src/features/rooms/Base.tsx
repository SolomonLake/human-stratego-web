import { Color3, Vector3, Mesh } from "@babylonjs/core";
import { Control } from "@babylonjs/gui";
import { CARDS } from "../cards/cards";
import { CollisionGroup } from "../collision/collision";
import { Room } from "../pieces/Room";
import { Wall } from "../pieces/Wall";
import { TeamCardPanelWall } from "../teamCardPanel/TeamCardPanelWall";
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

  const size = new Vector3(teamBaseXSize, height, teamBaseZSize);

  return (
    <Room
      size={size}
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
          ? CollisionGroup.CollideWithNone
          : CollisionGroup.CollideWithAll
      }
      color3={teamColor3}
      wallVisibility={userMatchesTeam ? 0.4 : 1}
      emissiveWalls
    >
      <TeamCardPanelWall roomSize={size} />
    </Room>
  );
};
