import React, { useState } from "react";
import "./DeckInput.css";
import Card from "./game/card";
import Deck from "./game/deck";

interface DeckInputProps {
  onDeckChange: (deck: Deck, cut: Card) => void;
}

function DeckInput({ onDeckChange }: DeckInputProps) {
  const [error, setError] = useState<string>("");

  const [deckInput, setDeckInput] = useState<string>("");
  const [cutInput, setCutInput] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const deck = Deck.parse(deckInput.trim());
      const cut = Card.parse(cutInput.trim());
      if (deck.cards.length !== 4) {
        throw new Error("Deck must contain exactly four cards");
      }
      onDeckChange(deck, cut);
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }
      setError(error.message);
    }
  }

  function handleDeckChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDeckInput(e.target.value);
  }

  function handleCutChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCutInput(e.target.value);
  }

  return (
    <div className="deck-input">
      <div className={"deck-input-header" + (error && " error")}>
        {error ? error : "Enter deck and cut:"}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          autoCapitalize="characters"
          autoComplete="off"
          className="deck-input-deck"
          maxLength={15}
          onChange={handleDeckChange}
          placeholder="Deck"
          value={deckInput}
        />
        <input
          autoCapitalize="characters"
          autoComplete="off"
          className="deck-input-card"
          maxLength={3}
          onChange={handleCutChange}
          placeholder="Cut"
          value={cutInput}
        />
        <button type="submit">Calculate</button>
      </form>
    </div>
  )
}

export default DeckInput;