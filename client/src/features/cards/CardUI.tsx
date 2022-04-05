import { ComponentProps } from "react";
import { PALATTE } from "../theme/theme";
import { CARDS } from "./cards";

interface CardUIProps extends ComponentProps<"rectangle"> {
  cardId: CardId;
  onClick?: () => void;
  color: string;
}

export const CardUI = ({ cardId, onClick, ...props }: CardUIProps) => {
  return (
    <rectangle
      name="card-ui"
      width={1}
      height={1}
      cornerRadius={20}
      background={PALATTE.light}
      thickness={6}
      key={cardId}
      {...props}
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
