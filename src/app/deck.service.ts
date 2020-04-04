import * as _ from 'lodash';
import { Injectable } from '@angular/core';


const DeckLayout = {
  science: {
    alchemist: 2,
    inventor: 2,
    crane: 2,
    engineer: 1,
    irrigation: 2,
    medicine: 2,
    mining: 2,
    printer: 1,
    road_building: 2,
    smith: 2
  },
  politics: {
    bishop: 2,
    diplomat: 2,
    constitution: 1,
    deserter: 2,
    intrigue: 2,
    saboteur: 2,
    spy: 3,
    warlord: 2,
    wedding: 2
  },
  trade: {
    commercial_harbor: 2,
    master_merchant: 2,
    merchant: 6,
    merchant_fleet: 2,
    resource_monopoly: 4,
    trade_monopoly: 2
  }
};

const PointCards = ['printer', 'constitution'];

function createDeck(category: string, excludePointCards: boolean = false): Array<string> {
    const deck = new Array<string>();
    for (const [name, count] of DeckLayout[category]) {
        if (!excludePointCards || !(name in PointCards)) {
            _.times(count, () => {
                deck.push(name);
            });
        }
    }
    return _.shuffle(deck);
}


@Injectable({
  providedIn: 'root'
})
export class Deck {
    private decks = new Map<string, Array<string>>();

    constructor() {
        for (const category of ['science', 'politics', 'trade']) {
            this.decks[category] = createDeck(category);
        }
    }

    public getCard(category: string): string {
        if (!this.decks[category].length) {
            // shuffle deck, but exclude point cards
            this.decks[category] = createDeck(category, true);
        }
        return this.decks[category].pop();
    }
}
