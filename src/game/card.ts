import Rank, { parseRank, rankString, rankSymbol } from "./rank";
import Suit, { parseSuit, suitString, suitSymbol } from "./suit";

class Card {
  rank: Rank;
  suit: Suit;

  constructor(rank: Rank, suit: Suit) {
    this.rank = rank;
    this.suit = suit;
  }

  compare(card: Card): number {
    return this.compareByRank(card) || this.compareBySuit(card);
  }

  compareByRank(card: Card): number {
    return this.rank - card.rank;
  }

  compareBySuit(card: Card): number {
    return this.suit - card.suit;
  }

  isSameRank(card: Card): boolean {
    return this.compareByRank(card) === 0;
  }

  isSameSuit(card: Card): boolean {
    return this.compareBySuit(card) === 0;
  }

  get rankString(): string {
    return rankString(this.rank);
  }

  get rankSymbol(): string {
    return rankSymbol(this.rank);
  }

  get score(): number {
    switch (this.rank) {
      case Rank.Jack:
      case Rank.Queen:
      case Rank.King:
        return 10;
      default:
        return this.rank + 1;
    }
  }

  get suitString(): string {
    return suitString(this.suit);
  }

  get suitSymbol(): string {
    return suitSymbol(this.suit);
  }

  get value(): number {
    return this.rank * 4 + this.suit;
  }

  get string(): string {
    return `${this.rankString} of ${this.suitString}`;
  }

  get symbol(): string {
    return this.rankSymbol + this.suitSymbol;
  }

  static ofValue(value: number): Card {
    return new Card(Math.trunc(value / 4), value % 4);
  }

  static parse(string: string): Card {
    const match = string.match(/^([0-9]{1,2}|[ATJQK])([CDHS])$/i);
    if (match === null) {
      throw new Error(`Invalid card "${string}"`);
    }
    try {
      return new Card(parseRank(match[1]), parseSuit(match[2]));
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }
      throw new Error(`Invalid card "${string}": ${error.message}`);
    }
  }
}

export default Card;
