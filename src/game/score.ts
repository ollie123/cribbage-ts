import Card from "./card";
import Deck from "./deck";
import Rank from "./rank";

interface Scorable {
  deck: Deck;
  score: number;
  type: string;
}

function score(deck: Deck, cut: Card): Scorable[] {
  const scorables: Scorable[] = [];
  const deckWithCut = deck.add(cut).sortedByRank();

  // Nobs
  deck.cards.forEach(card => {
    if (card.rank === Rank.Jack && card.isSameSuit(cut)) {
      scorables.push({ deck: Deck.of(card), score: 1, type: "Nobs" });
    }
  })

  // Flush
  if (deckWithCut.isAllSameSuit()) {
    scorables.push({ deck: deckWithCut, score: 5, type: "Flush" });
  } else if (deck.isAllSameSuit()) {
    scorables.push({ deck: deck, score: 4, type: "Flush" });
  }

  // Pairs, runs, fifteens
  let runLength: number = 0;
  for (let r = 5; r > 1; r--) {
    for (const combination of deckWithCut.combinations(r)) {
      // Pair
      if (r == 2 && combination.isAllSameRank()) {
        scorables.push({ deck: combination, score: 2, type: "Pair" });
      }

      // Run
      if (r >= 3 && r <= 5 && (runLength === 0 || runLength === r) && combination.isRun()) {
        runLength = combination.length;
        scorables.push({ deck: combination, score: runLength, type: "Run" })
      }

      // Fifteen
      if (combination.sumRanks() === 15) {
        scorables.push({ deck: combination, score: 2, type: "Fifteen" });
      }
    }
  }
  return scorables;
}

export type { Scorable };
export default score;