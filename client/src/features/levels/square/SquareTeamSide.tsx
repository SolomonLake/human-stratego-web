import { Vector3 } from "@babylonjs/core";
import { Room } from "../../pieces/Room";
import { SquareBaseLayer } from "./SquareBaseLayer";

export const SquareTeamSide = ({ xSide }: { xSide: -1 | 1 }) => {
  const height = 3;
  const roomYPosition = height / 2;

  const zWidth = 30;

  let xLayerSize = 0;

  const neutralCenterXSize = 1;
  const neutralCenterXPosition = xSide * (xLayerSize + neutralCenterXSize / 2);
  xLayerSize += neutralCenterXSize / 2;

  const teamBufferZoneXSize = 3;
  const teamBufferZoneXPosition =
    xSide * (xLayerSize + teamBufferZoneXSize / 2);
  xLayerSize += teamBufferZoneXSize;

  const teamBaseXSize = 4;
  const teamBaseXPosition = xSide * (xLayerSize + teamBaseXSize / 2);
  xLayerSize += teamBaseXSize;

  const teamBaseZSize = 4;
  const teamBaseSideZSize = zWidth / 2 - teamBaseZSize / 2;

  const teamBackXSize = 8;
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
      />
      <SquareBaseLayer
        teamBaseXPosition={teamBaseXPosition}
        teamBaseXSize={teamBaseXSize}
        teamBaseZSize={teamBaseZSize}
        height={height}
        roomYPosition={roomYPosition}
        teamBaseSideZSize={teamBaseSideZSize}
      />
      <Room
        size={new Vector3(teamBufferZoneXSize, height, zWidth)}
        position={new Vector3(teamBufferZoneXPosition, roomYPosition, 0)}
        positiveZWall
        negativeZWall
        checkCollisions
      />
      <Room
        size={new Vector3(neutralCenterXSize, height, zWidth)}
        position={new Vector3(neutralCenterXPosition, roomYPosition, 0)}
        positiveZWall
        negativeZWall
        checkCollisions
      />
    </>
  );
};
