import { AsyncStorage } from 'react-native';
import { DECKS_KEY, formatDecksResults } from './_data';

export function getDecks () {
	return AsyncStorage.getItem(DECKS_KEY)
		.then((results) => formatDecksResults(results));
}

export function getDeck (title) {
	return AsyncStorage.getItem(DECKS_KEY)
			.then((results) => {
				decks = formatDecksResults(results);

				if (decks[title]) {
					return decks[title];
				}

				return {error: 'Error. No Deck found with the give the given title.'};
			});
}

export function saveDeckTitle (deck) {
	return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(deck));
}


export function addCardToDeck (title, question, answer) {
	return getDecks()
		.then((decks) => {
			const updatedDecks = {
				...decks,
				[title]: {
				  ...decks[title],
				  questions: decks[title].questions.concat({question, answer})	
				}
			};
			return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(updatedDecks));
		});
}