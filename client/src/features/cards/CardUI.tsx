import { PALATTE } from "../theme/theme";
import { CARDS } from "./cards";

export const CardUI = ({
  cardId,
  gridColumn,
  gridRow,
  onClick,
}: {
  cardId: CardId;
  gridColumn?: number;
  gridRow?: number;
  onClick?: () => void;
}) => {
  return (
    <rectangle
      name="card-ui"
      width={1}
      height={1}
      color={PALATTE.team1}
      cornerRadius={20}
      background={PALATTE.light}
      thickness={6}
      key={cardId}
      gridColumn={gridColumn}
      gridRow={gridRow}
    >
      <babylon-button onPointerClickObservable={onClick}>
        <textBlock
          name="card-text-ui"
          text={CARDS[cardId].displayCharacter}
          fontSize={60}
        />
      </babylon-button>
    </rectangle>
  );
};
