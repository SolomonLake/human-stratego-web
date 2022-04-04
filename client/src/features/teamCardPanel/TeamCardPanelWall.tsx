import { Vector3 } from "@babylonjs/core";
import { Control } from "@babylonjs/gui";
import { CARDS } from "../cards/cards";
import { PALATTE } from "../theme/theme";
import { TeamCardPanelUI } from "./TeamCardPanelUI";

export const TeamCardPanelWall = ({ roomSize }: { roomSize: Vector3 }) => {
  return (
    <plane
      name="card-selector-plane"
      position={new Vector3(roomSize.x / 2 - 0.05, 0 - roomSize.y / 8, 0)}
      width={roomSize.x / 2}
      height={roomSize.y / 2}
      rotation={new Vector3(0, Math.PI * 0.5, 0)}
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
