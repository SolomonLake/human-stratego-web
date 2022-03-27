import { Color3, Vector3 } from "@babylonjs/core";
import { Room } from "../../pieces/Room";
import { PALATTE } from "../../theme/theme";
import { SquareBaseLayer } from "./SquareBaseLayer";

export const SquareTeamSide = ({
  team,
  userMatchesTeam,
}: {
  team: Team;
  userMatchesTeam: boolean;
}) => {
  const xSide = team.side;
  const teamColor3 = Color3.FromHexString(PALATTE[team.color]);

  const height = 3;
  const roomYPosition = height / 2;

  const zWidth = 30;

  let xLayerSize = 0;

  const neutralCenterXSize = 1;
  const neutralCenterXPosition = xSide * (xLayerSize + neutralCenterXSize / 2);
  xLayerSize += neutralCenterXSize;

  const teamBufferZoneXSize = 2;
  const teamBufferZoneXPosition =
    xSide * (xLayerSize + teamBufferZoneXSize / 2);
  xLayerSize += teamBufferZoneXSize;

  const teamBaseXSize = 4;
  const teamBaseXPosition = xSide * (xLayerSize + teamBaseXSize / 2);
  xLayerSize += teamBaseXSize;

  const teamBaseZSize = 4;
  const teamBaseSideZSize = zWidth / 2 - teamBaseZSize / 2;

  const teamBackXSize = 20;
  const teamBackXPosition = xSide * (xLayerSize + teamBackXSize / 2);

  return (
    <>
      <Room
        size={new Vector3(teamBackXSize, height, zWidth)}
        position={new Vector3(teamBackXPosition, roomYPosition, 0)}
        positiveXWall={xSide === 1}
        negativeXWall={xSide === -1}
        positiveZWall
        negativeZWall
        checkCollisions
        color3={teamColor3}
      />
      <SquareBaseLayer
        teamBaseXPosition={teamBaseXPosition}
        teamBaseXSize={teamBaseXSize}
        teamBaseZSize={teamBaseZSize}
        height={height}
        roomYPosition={roomYPosition}
        teamBaseSideZSize={teamBaseSideZSize}
        userMatchesTeam={userMatchesTeam}
        team={team}
      />
      <Room
        size={new Vector3(teamBufferZoneXSize, height, zWidth)}
        position={new Vector3(teamBufferZoneXPosition, roomYPosition, 0)}
        positiveZWall
        negativeZWall
        checkCollisions
        color3={teamColor3}
      />
      <Room
        size={new Vector3(neutralCenterXSize, height, zWidth)}
        position={new Vector3(neutralCenterXPosition, roomYPosition, 0)}
        positiveZWall
        negativeZWall
        checkCollisions
        color3={Color3.FromHexString(PALATTE.light)}
      />
    </>
  );
};
