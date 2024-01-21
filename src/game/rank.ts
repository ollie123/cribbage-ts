enum Rank {
  Ace = 0,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King
}

const RANK_SYMBOLS: readonly string[] = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];

function parseRank(string: string): Rank {
  switch (string) {
    case "A":
    case "a":
      return Rank.Ace;
    case "T":
    case "t":
      return Rank.Ten;
    case "J":
    case "j":
      return Rank.Jack;
    case "Q":
    case "q":
      return Rank.Queen;
    case "K":
    case "k":
      return Rank.King;
  }
  const rank = parseInt(string);
  if (isNaN(rank) || rank < 1 || rank > 10) {
    throw new Error(`Invalid rank "${string}"`);
  }
  return rank - 1;
}

function rankString(rank: Rank): string {
  return Rank[rank];
}

function rankSymbol(rank: Rank): string {
  return RANK_SYMBOLS[rank];
}

export default Rank;
export { parseRank, rankString, rankSymbol };
