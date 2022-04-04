import { Vector3 } from "@babylonjs/core";
import { Control, Grid } from "@babylonjs/gui";
import { useEffect, useRef } from "react";
import { CARDS } from "../cards/cards";
import { PALATTE } from "../theme/theme";
import { Key, ReactNode, Ref } from "react";
import { CardUI } from "../cards/CardUI";

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

export const TeamCardPanelUI = (clickable: { clickable?: boolean }) => {
  const cardIds = Object.keys(CARDS);
  const half = Math.ceil(cardIds.length / 2) + 1;
  const firstHalfCardIds = cardIds.slice(0, half) as CardId[];
  const secondHalfCardIds = cardIds.slice(half, cardIds.length) as CardId[];

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
        {firstHalfCardIds.map((cardId, index) => {
          return (
            <CardUI
              cardId={cardId}
              gridRow={0}
              gridColumn={index}
              key={cardId}
              onClick={clickable ? () => {} : undefined}
            />
          );
        })}
        {secondHalfCardIds.map((cardId, index) => {
          return (
            <CardUI
              cardId={cardId}
              gridRow={1}
              gridColumn={index + 1}
              key={cardId}
              onClick={clickable ? () => {} : undefined}
            />
          );
        })}
      </grid>
    </>
  );
};
