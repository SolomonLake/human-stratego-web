import { Vector3 } from "@babylonjs/core";
import { Ceiling } from "./pieces/Ceiling";
import { Floor } from "./pieces/Floor";
import { Room } from "./pieces/Room";

export const SquareLevel = () => {
  const height = 3;
  const roomYPosition = height / 2;

  const widthZ = 30;

  const neutralXSize = 2;

  const teamNeutralXSize = neutralXSize / 2;

  const teamBufferZone = 3;

  const teamBaseXSize = 4;
  const teamBaseZSize = 4;

  const teamBaseXPosition =
    teamNeutralXSize + teamBufferZone + teamBaseXSize / 2;

  const teamBaseSideZSize = widthZ / 2 - teamBaseZSize / 2;

  const teamBackXSize = 8;
  const teamBackXPosition =
    teamBaseXPosition + teamBaseXSize / 2 + teamBackXSize / 2;

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
        size={new Vector3(teamBufferZone, height, widthZ)}
        position={
          new Vector3(teamNeutralXSize + teamBufferZone / 2, roomYPosition, 0)
        }
        positiveZWall
        negativeZWall
        checkCollisions
      />
      {/* Neutral */}
      <Room
        size={new Vector3(neutralXSize, height, widthZ)}
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
