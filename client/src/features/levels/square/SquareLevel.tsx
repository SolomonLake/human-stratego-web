import { Vector3 } from "@babylonjs/core";
import { Room } from "../../pieces/Room";
import { SquareBaseLayer } from "./SquareBaseLayer";
import { SquareTeamSide } from "./SquareTeamSide";

export const SquareLevel = () => {
  const height = 3;
  const roomYPosition = height / 2;

  const zWidth = 30;

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
  const teamBaseSideZSize = zWidth / 2 - teamBaseZSize / 2;

  const teamBackXSize = 8;
  const teamBackXPosition = xLayerSize + teamBackXSize / 2;

  return (
    <>
      {/* Team1 */}
      <SquareTeamSide xSide={1} />
      {/* Team2 */}
      <SquareTeamSide xSide={-1} />
    </>
  );
};
