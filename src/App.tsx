import { useState } from 'react';
import './App.css';
import DeckInput from './DeckInput';
import ScorableTable from './ScorableTable';
import Card from './game/card';
import Deck from './game/deck';
import score from './game/score';

function App() {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cut, setCut] = useState<Card | null>(null);

  function handleDeckChange(deck: Deck, cut: Card) {
    setDeck(deck);
    setCut(cut);
  }

  let scorables = null;
  if (deck !== null && cut !== null) {
    scorables = score(deck, cut);
    scorables.sort((a, b) => b.deck.length - a.deck.length || b.score - a.score);
  }

  return (
    <>
      <DeckInput onDeckChange={handleDeckChange} />
      {scorables && <ScorableTable scorables={scorables} />}
    </>
  )
}

export default App
