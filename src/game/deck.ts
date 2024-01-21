import Card from "./card";

class Deck {
  cards: Card[];

  constructor(cards: Card[]) {
    this.cards = cards;
  }

  add(...cards: Card[]): Deck {
    return new Deck([...this.cards, ...cards]);
  }

  *combinations(r: number): IterableIterator<Deck> {
    const indices = new Array(r);
    const nextIndex = () => {
      for (let i = r - 1; i >= 0; i--) {
        if (indices[i] != i + this.length - r) {
          return i;
        }
      }
      return null;
    };

    // Initialization
    for (let i = 0; i < r; i++) {
      indices[i] = i;
    }
    yield new Deck(indices.map(i => this.cards[i]));

    // Iteration
    let i;
    while ((i = nextIndex()) !== null) {
      indices[i]++;
      for (let j = i + 1; j < r; j++) {
        indices[j] = indices[j - 1] + 1;
      }
      yield new Deck(indices.map(i => this.cards[i]));
    }
  }

  isAllSameRank(): boolean {
    return this.cards.every(card => card.isSameRank(this.cards[0]));
  }

  isAllSameSuit(): boolean {
    return this.cards.every(card => card.isSameSuit(this.cards[0]));
  }

  isRun(): boolean {
    return this.cards.every((card, i) => i === 0 || card.rank === this.cards[i - 1].rank + 1);
  }

  get length(): number {
    return this.cards.length;
  }

  shuffled(): Deck {
    const cards = [...this.cards];
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return new Deck(cards);
  }

  sorted(compareFn: (a: Card, b: Card) => number = (a, b) => a.compare(b)): Deck {
    return new Deck([...this.cards].sort(compareFn));
  }

  sortedByRank(): Deck {
    return this.sorted((a, b) => a.compareByRank(b));
  }

  sortedBySuit(): Deck {
    return this.sorted((a, b) => a.compareBySuit(b));
  }

  sumRanks(): number {
    return this.cards.reduce((total, card) => total + card.score, 0);
  }

  static of(...cards: Card[]): Deck {
    return new Deck(cards);
  }

  static ofStandard(): Deck {
    const cards = new Array<Card>(52);
    for (let i = 0; i < 52; i++) {
      cards[i] = Card.ofValue(i);
    }
    return new Deck(cards);
  }

  static parse(string: string): Deck {
    return new Deck(string.split(/\s+/).map(string => Card.parse(string)));
  }
}

export default Deck;