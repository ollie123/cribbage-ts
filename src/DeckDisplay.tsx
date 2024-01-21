import CardDisplay from "./CardDisplay"
import "./DeckDisplay.css"
import Deck from "./game/deck"

interface DeckDisplayProps {
  deck: Deck
}

function DeckDisplay({ deck }: DeckDisplayProps) {
  return (
    <div className="deck-display">
      {deck.cards.map(card => <CardDisplay card={card} />)}
    </div>
  )
}

export default DeckDisplay;