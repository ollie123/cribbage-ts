enum Suit {
  Clubs = 0,
  Diamonds,
  Hearts,
  Spades
}

const SUIT_SYMBOLS: readonly string[] = [
  "♣",
  "♦",
  "♥",
  "♠"
]

function parseSuit(string: string): Suit {
  switch (string) {
    case "C":
    case "c":
    case "♣":
      return Suit.Clubs;
    case "D":
    case "d":
    case "♦":
      return Suit.Diamonds;
    case "H":
    case "h":
    case "♥":
      return Suit.Hearts;
    case "S":
    case "s":
    case "♠":
      return Suit.Spades;
  }
  throw new Error(`Invalid suit "${string}"`);
}

function suitString(suit: Suit): string {
  return Suit[suit];
}

function suitSymbol(suit: Suit): string {
  return SUIT_SYMBOLS[suit];
}

export default Suit;
export { parseSuit, suitString, suitSymbol };
