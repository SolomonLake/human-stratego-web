import { Vector3 } from "@babylonjs/core";
import { Control, Grid } from "@babylonjs/gui";
import { useEffect, useRef } from "react";
import { CARDS } from "../cards/cards";
import { PALATTE } from "../theme/theme";
import { Key, ReactNode, Ref } from "react";
import { CardUI } from "../cards/CardUI";
import { useCacheStore } from "../cache/useCache";
import { useAvatarTeam } from "../avatar/useAvatarTeam";
import { useTeam } from "./useTeam";
import { TeamCardUI } from "./TeamCardUI";

export declare type GridNode = {
  key?: Key;
  ref?: Ref<ReactNode>;
};
export declare type RowOrColumnDefinitionProps = {
  value: number;
  unit?: number;
};
declare global {
  namespace JSX {
    interface IntrinsicElements {
      rowDefinition: RowOrColumnDefinitionProps & GridNode;
      columnDefinition: RowOrColumnDefinitionProps & GridNode;
    }
  }
}

export const TeamCardPanelUI = ({
  onClose,
  onSelectCard,
}: {
  onSelectCard?: (cardId: CardId) => void;
  onClose?: () => void;
}) => {
  const cardIds = (Object.keys(CARDS) as CardId[]).sort((cardA, cardB) => {
    // Sort elite cards first, then bomb, then everything else
    if (CARDS[cardB].type === "elite") return 1;
    if (CARDS[cardA].type === "elite") return -1;
    if (CARDS[cardA].type === "bomb") return -1;
    return 0;
  });
  const firstRowCount = Math.ceil(cardIds.length / 2) - 1;
  const firstRowCardIds = cardIds.slice(0, firstRowCount) as CardId[];
  const secondRowCardIds = cardIds.slice(
    firstRowCount,
    cardIds.length
  ) as CardId[];

  return (
    <>
      <grid name="team-card-panel-grid">
        <rowDefinition value={1} />
        <rowDefinition value={1} />
        <columnDefinition value={1} />
        <columnDefinition value={1} />
        <columnDefinition value={1} />
        <columnDefinition value={1} />
        <columnDefinition value={1} />
        <columnDefinition value={1} />
        {onClose ? (
          <babylon-button
            onPointerClickObservable={onClose}
            width={"80px"}
            height={"80px"}
            verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
            horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
            color={PALATTE.light}
            thickness={4}
            cornerRadius={20}
            paddingTop={10}
            paddingLeft={10}
          >
            <textBlock fontSize={35} text="✖" />
          </babylon-button>
        ) : null}
        {firstRowCardIds.map((cardId, index) => {
          return (
            <TeamCardUI
              cardId={cardId}
              gridColumn={index + 1}
              gridRow={0}
              onSelectCard={onSelectCard}
              onClose={onClose}
              key={cardId}
            />
          );
        })}
        {secondRowCardIds.map((cardId, index) => {
          return (
            <TeamCardUI
              cardId={cardId}
              gridColumn={index}
              gridRow={1}
              onSelectCard={onSelectCard}
              onClose={onClose}
              key={cardId}
            />
          );
        })}
      </grid>
    </>
  );
};
