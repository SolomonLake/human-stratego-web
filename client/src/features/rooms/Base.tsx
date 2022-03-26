import { Vector3 } from "@babylonjs/core";
import { Room } from "../pieces/Room";

export const Base = ({
  teamBaseXSize,
  height,
  teamBaseZSize,
  teamBaseXPosition,
  teamBaseZPosition = 0,
  roomYPosition,
}: {
  teamBaseXSize: number;
  height: number;
  teamBaseZSize: number;
  teamBaseXPosition: number;
  teamBaseZPosition?: number;
  roomYPosition: number;
}) => {
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
    />
  );
};
