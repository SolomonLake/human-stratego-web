import { Color3, Vector3 } from "@babylonjs/core";
import { Room } from "../../pieces/Room";
import { Base } from "../../rooms/Base";
import { PALATTE } from "../../theme/theme";

export const SquareBaseLayer = ({
  teamBaseXPosition,
  teamBaseXSize,
  teamBaseZSize,
  height,
  roomYPosition,
  teamBaseSideZSize,
  userMatchesTeam,
  team,
}: {
  teamBaseXPosition: number;
  teamBaseXSize: number;
  teamBaseZSize: number;
  height: number;
  roomYPosition: number;
  teamBaseSideZSize: number;
  userMatchesTeam: boolean;
  team: Team;
}) => {
  const teamColor3 = Color3.FromHexString(PALATTE[team.color]);

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
        color3={teamColor3}
        zone={team.id}
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
        color3={teamColor3}
        zone={team.id}
      />
      {/* Team Base */}
      <Base
        teamBaseXSize={teamBaseXSize}
        teamBaseZSize={teamBaseZSize}
        teamBaseXPosition={teamBaseXPosition}
        height={height}
        roomYPosition={roomYPosition}
        userMatchesTeam={userMatchesTeam}
        team={team}
      />
    </>
  );
};
