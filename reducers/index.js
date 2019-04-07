import { RECEIVE_DECKS, ADD_DECK_TITLE, ADD_DECK_QUESTION } from '../actions';

export default function decks (state = {}, action) {
	switch(action.type) {
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			};
		case ADD_DECK_TITLE:
			return {
				...state,
				...action.deck
			};
		case ADD_DECK_QUESTION:
			const { title, question, answer } = action; 

			return {
				...state,
				[title]: {
				  ...state[title],
				  questions: state[title].questions.concat({question, answer})	
				}
			};
		default:
			return state;
	}
}