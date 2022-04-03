import { Vector3 } from "@babylonjs/core";
import { Control } from "@babylonjs/gui";
import { CARDS } from "../cards/cards";
import { PALATTE } from "../theme/theme";

export const TeamCardPanelUI = () => {
  const cardIds = Object.keys(CARDS);
  const half = Math.ceil(cardIds.length / 2) + 1;
  const firstHalfCardIds = cardIds.slice(0, half) as CardId[];
  const secondHalfCardIds = cardIds.slice(half, cardIds.length) as CardId[];

  return (
    <>
      <rectangle
        name="cards-selector-row-container"
        height={0.5}
        width={1}
        verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
        thickness={0}
      >
        <stackPanel name="stack-panel-cards-selector" isVertical={false}>
          {firstHalfCardIds.map((cardId, index) => {
            return (
              <rectangle
                name="card-ui"
                width={"150px"}
                height={"400px"}
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
        </stackPanel>
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
                height={"400px"}
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
                <textBlock
                  name="card-text-ui"
                  text={CARDS[cardId].displayCharacter}
                  fontSize={60}
                />
              </rectangle>
            );
          })}
        </stackPanel>
      </rectangle>
    </>
  );
};
