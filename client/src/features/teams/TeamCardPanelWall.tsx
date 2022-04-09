import { Vector3 } from "@babylonjs/core";
import { Control } from "@babylonjs/gui";
import { CARDS } from "../cards/cards";
import { PALATTE } from "../theme/theme";
import { TeamCardPanelUI } from "./TeamCardPanelUI";

export const TEAM_CARD_PANEL_WALL_NAME = "card-selector-plane";

export const TeamCardPanelWall = ({
  roomSize,
  teamSide,
}: {
  roomSize: Vector3;
  teamSide: 1 | -1;
}) => {
  return (
    <plane
      name={TEAM_CARD_PANEL_WALL_NAME}
      position={
        new Vector3((roomSize.x / 2 - 0.05) * teamSide, 0 - roomSize.y / 8, 0)
      }
      width={roomSize.x / 2}
      height={roomSize.y / 2}
      rotation={new Vector3(0, Math.PI * 0.5 * teamSide, 0)}
      checkCollisions={false}
      visibility={0.6}
    >
      <advancedDynamicTexture
        name="card-selector-texture"
        createForParentMesh
        width={1024}
        height={1024}
        generateMipMaps
      >
        <rectangle
          name="card-selector-background"
          width={1}
          height={1}
          background={PALATTE.dark}
          thickness={0}
          cornerRadius={20}
        >
          <TeamCardPanelUI />
        </rectangle>
      </advancedDynamicTexture>
    </plane>
  );
};
