import { Control } from "@babylonjs/gui";
import { ComponentProps } from "react";
import { useAvatarTeam } from "../avatar/useAvatarTeam";
import { useCacheStore } from "../cache/useCacheStore";
import { CardUI } from "../cards/CardUI";
import { PALATTE } from "../theme/theme";
import { useTeam } from "./useTeam";

interface TeamCardUIProps extends ComponentProps<"rectangle"> {
  cardId: CardId;
  gridColumn?: number;
  gridRow?: number;
  onClick?: () => void;
}

export const TeamCardUI = ({
  cardId,
  gridColumn,
  gridRow,
  onClick,
  ...props
}: TeamCardUIProps) => {
  const teamId = useAvatarTeam();

  const { cache } = useCacheStore();

  const team = teamId ? cache?.teams[teamId] : undefined;

  if (!team) {
    return null;
  }

  return (
    <rectangle gridColumn={gridColumn} gridRow={gridRow} thickness={0}>
      <rectangle
        height={0.8}
        thickness={0}
        verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
        paddingTop={20}
        paddingBottom={10}
        paddingLeft={10}
        paddingRight={10}
      >
        <CardUI
          cardId={cardId}
          key={cardId}
          onClick={onClick}
          color={PALATTE[team?.color]}
          {...props}
        />
      </rectangle>
      <rectangle
        height={0.2}
        verticalAlignment={Control.VERTICAL_ALIGNMENT_BOTTOM}
        thickness={0}
      >
        <textBlock
          text={team?.cardCounts[cardId].toString()}
          color={PALATTE.light}
          fontSize={50}
          height={0.7}
          verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
        />
      </rectangle>
    </rectangle>
  );
};
