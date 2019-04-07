export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK_TITLE  = 'ADD_DECK_TITLE';
export const ADD_DECK_QUESTION  = 'ADD_DECK_QUESTION';

export function receiveDecks (decks) {
	return {
		type: RECEIVE_DECKS,
		decks
	}
}

export function addDeckTitle (deck) {
	return {
		type: ADD_DECK_TITLE,
		deck
	}
}

export function addDeckQuestion (title, question, answer) {
	return {
		type: ADD_DECK_QUESTION,
		title,
		question,
		answer
	}
}