import { Vector3 } from "@babylonjs/core";
import { Room } from "../../pieces/Room";

export const SquareLevel = () => {
  const height = 3;
  const roomYPosition = height / 2;

  const widthZ = 30;

  let xLayerSize = 0;
  const neutralCenterXSize = 2;
  xLayerSize += neutralCenterXSize / 2;

  const teamBufferZoneXSize = 3;
  const teamBufferZoneXPosition = xLayerSize + teamBufferZoneXSize / 2;
  xLayerSize += teamBufferZoneXSize;

  const teamBaseXSize = 4;
  const teamBaseXPosition = xLayerSize + teamBaseXSize / 2;
  xLayerSize += teamBaseXSize;

  const teamBaseZSize = 4;
  const teamBaseSideZSize = widthZ / 2 - teamBaseZSize / 2;

  const teamBackXSize = 8;
  const teamBackXPosition = xLayerSize + teamBackXSize / 2;

  return (
    <>
      {/* Team1 */}
      <Room
        size={new Vector3(teamBackXSize, height, widthZ)}
        position={new Vector3(teamBackXPosition, roomYPosition, 0)}
        positiveXWall
        positiveZWall
        negativeZWall
        checkCollisions
      />
      <Room
        size={new Vector3(teamBaseXSize, height, teamBaseSideZSize)}
        position={
          new Vector3(
            teamBaseXPosition,
            roomYPosition,
            teamBaseSideZSize / 2 + teamBaseZSize / 2
          )
        }
        positiveZWall
        checkCollisions
      />
      <Room
        size={new Vector3(teamBaseXSize, height, teamBaseSideZSize)}
        position={
          new Vector3(
            teamBaseXPosition,
            roomYPosition,
            -1 * (teamBaseSideZSize / 2 + teamBaseZSize / 2)
          )
        }
        negativeZWall
        checkCollisions
      />
      {/* Team1 Base */}
      <Room
        size={new Vector3(teamBaseXSize, height, teamBaseZSize)}
        position={new Vector3(teamBaseXPosition, roomYPosition, 0)}
        positiveXWall
        negativeXWall
        positiveZWall
        negativeZWall
      />
      <Room
        size={new Vector3(teamBufferZoneXSize, height, widthZ)}
        position={new Vector3(teamBufferZoneXPosition, roomYPosition, 0)}
        positiveZWall
        negativeZWall
        checkCollisions
      />
      {/* Neutral */}
      <Room
        size={new Vector3(neutralCenterXSize, height, widthZ)}
        position={new Vector3(0, roomYPosition, 0)}
        positiveZWall
        negativeZWall
        checkCollisions
      />
      {/* Team2 */}
      <Room
        size={new Vector3(3, height, widthZ)}
        position={new Vector3(-1 * 2.5, roomYPosition, 0)}
        positiveZWall
        negativeZWall
        checkCollisions
      />
      <Room
        size={new Vector3(12, height, widthZ)}
        position={new Vector3(-1 * (4 + 12 / 2), roomYPosition, 0)}
        negativeXWall
        positiveZWall
        negativeZWall
        checkCollisions
      />
    </>
  );
};
