import { Vector3 } from "@babylonjs/core";
import { Room } from "../../pieces/Room";
import { Base } from "../../rooms/Base";

export const SquareBaseLayer = ({
  teamBaseXPosition,
  teamBaseXSize,
  teamBaseZSize,
  height,
  roomYPosition,
  teamBaseSideZSize,
}: {
  teamBaseXPosition: number;
  teamBaseXSize: number;
  teamBaseZSize: number;
  height: number;
  roomYPosition: number;
  teamBaseSideZSize: number;
}) => {
  return (
    <>
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
      {/* Team Base */}
      <Base
        teamBaseXSize={teamBaseXSize}
        teamBaseZSize={teamBaseZSize}
        teamBaseXPosition={teamBaseXPosition}
        height={height}
        roomYPosition={roomYPosition}
      />
    </>
  );
};
