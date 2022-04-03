import { Vector3 } from "@babylonjs/core";
import { Control, Grid } from "@babylonjs/gui";
import { useEffect, useRef } from "react";
import { CARDS } from "../cards/cards";
import { PALATTE } from "../theme/theme";
import { Key, ReactNode, Ref } from "react";

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

export const TeamCardPanelUI = () => {
  const cardIds = Object.keys(CARDS);
  const half = Math.ceil(cardIds.length / 2) + 1;
  const firstHalfCardIds = cardIds.slice(0, half) as CardId[];
  const secondHalfCardIds = cardIds.slice(half, cardIds.length) as CardId[];

  const gridRef = useRef<Grid | null>(null);

  // useEffect(() => {
  //   const grid = gridRef.current;
  //   if (grid) {
  //     grid.addColumnDefinition(0.5);
  //     grid.addColumnDefinition(0.5);
  //     grid.addColumnDefinition(0.5);
  //     grid.addColumnDefinition(0.5);
  //     grid.addColumnDefinition(0.5);
  //     grid.addColumnDefinition(0.5);
  //   }
  // }, [gridRef]);

  return (
    <>
      <rectangle
        name="cards-selector-row-container"
        height={0.5}
        width={1}
        verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
        thickness={0}
      >
        <grid name="grid1" ref={gridRef}>
          <columnDefinition value={1} />
          <columnDefinition value={1} />
          <columnDefinition value={1} />
          <columnDefinition value={1} />
          <columnDefinition value={1} />
          <columnDefinition value={1} />
          {firstHalfCardIds.map((cardId, index) => {
            return (
              <rectangle
                name="card-ui"
                width={1}
                height={1}
                color={PALATTE.team1}
                cornerRadius={20}
                background={PALATTE.light}
                paddingTop={"20px"}
                paddingLeft={"10px"}
                paddingRight={"10px"}
                paddingBottom={"20px"}
                thickness={6}
                key={cardId}
                gridColumn={index}
              >
                <textBlock
                  name="card-text-ui"
                  text={CARDS[cardId].displayCharacter}
                  fontSize={60}
                />
              </rectangle>
            );
          })}
        </grid>
        {/* <stackPanel name="stack-panel-cards-selector" isVertical={false}>
          {firstHalfCardIds.map((cardId, index) => {
            return (
              <rectangle
                name="card-ui"
                width={"150px"}
                height={0.8}
                color={PALATTE.team1}
                cornerRadius={20}
                background={PALATTE.light}
                paddingTop={"20px"}
                paddingLeft={"10px"}
                paddingRight={"10px"}
                paddingBottom={"20px"}
                thickness={6}
                key={cardId}
                isPointerBlocker
              >
                <textBlock
                  name="card-text-ui"
                  text={CARDS[cardId].displayCharacter}
                  fontSize={60}
                />
              </rectangle>
            );
          })}
        </stackPanel> */}
      </rectangle>
      <rectangle
        name="cards-selector-row-container"
        height={0.5}
        width={1}
        verticalAlignment={Control.VERTICAL_ALIGNMENT_BOTTOM}
        thickness={0}
      >
        <stackPanel name="stack-panel-cards-selector" isVertical={false}>
          {secondHalfCardIds.map((cardId, index) => {
            return (
              <rectangle
                name="card-ui"
                width={"150px"}
                height={0.8}
                color={PALATTE.team1}
                cornerRadius={20}
                background={PALATTE.light}
                paddingTop={"20px"}
                paddingLeft={"10px"}
                paddingRight={"10px"}
                paddingBottom={"20px"}
                thickness={6}
                key={cardId}
              >
                <babylon-button
                  onPointerClickObservable={() => {
                    console.log("clickk");
                  }}
                  key={cardId}
                >
                  <textBlock
                    name="card-text-ui"
                    text={CARDS[cardId].displayCharacter}
                    fontSize={60}
                  />
                </babylon-button>
              </rectangle>
            );
          })}
        </stackPanel>
      </rectangle>
    </>
  );
};
