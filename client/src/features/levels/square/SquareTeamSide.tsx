import { Color3, Vector3 } from "@babylonjs/core";
import { useCacheStore } from "../../cache/useCacheStore";
import { CollisionGroup } from "../../collision/collision";
import { Room } from "../../pieces/Room";
import { PALATTE } from "../../theme/theme";
import { SquareBaseLayer } from "./SquareBaseLayer";

export const FLAG_MESH_NAME = "flag";

export const SquareTeamSide = ({
  team,
  userMatchesTeam,
}: {
  team: Team;
  userMatchesTeam: boolean;
}) => {
  const xSide = team.side;
  const teamColor3 = Color3.FromHexString(PALATTE[team.color]);

  const height = 2.5;
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
      <box
        name={FLAG_MESH_NAME}
        size={0.25}
        onCreated={(box) => box.enableEdgesRendering()}
        edgesWidth={1}
        edgesColor={teamColor3.toColor4()}
        position={new Vector3(teamBackXPosition, roomYPosition / 2, 0)}
      >
        <standardMaterial
          name="flag-material"
          emissiveColor={Color3.FromHexString(PALATTE.accent)}
        />
      </box>
      <Room
        size={new Vector3(teamBackXSize, height, zWidth)}
        position={new Vector3(teamBackXPosition, roomYPosition, 0)}
        positiveXWall={xSide === 1}
        negativeXWall={xSide === -1}
        positiveZWall
        negativeZWall
        checkCollisions
        color3={teamColor3}
        zone={team.id}
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
        zone={team.id}
      />
      <Room
        size={new Vector3(neutralCenterXSize, height, zWidth)}
        position={new Vector3(neutralCenterXPosition, roomYPosition, 0)}
        positiveZWall
        negativeZWall
        positiveXWall={xSide === 1}
        positiveXWallVisibility={0.5}
        positiveXWallCollisionGroup={CollisionGroup.CollideWithAvatarBomb}
        positiveXWallColor3={teamColor3}
        negativeXWall={xSide === -1}
        negativeXWallVisibility={0.5}
        negativeXWallCollisionGroup={CollisionGroup.CollideWithAvatarBomb}
        negativeXWallColor3={teamColor3}
        collisionGroup={CollisionGroup.CollideWithAll}
        checkCollisions
        invertWalls
        color3={Color3.FromHexString(PALATTE.light)}
        zone={"Neutral"}
      />
    </>
  );
};
