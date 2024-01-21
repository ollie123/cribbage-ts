import "./CardDisplay.css";
import Card from "./game/card";

interface CardDisplayProps {
  card: Card;
}

function CardDisplay({ card }: CardDisplayProps) {
  return (
    <div className={"card " + card.suitString.toLowerCase()}>
      <span className="rank">{card.rankSymbol}</span>
      <span className="suit">{card.suitSymbol}</span>
    </div>
  )
}

export default CardDisplay;