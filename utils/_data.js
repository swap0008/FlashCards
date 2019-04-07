import { AsyncStorage } from 'react-native';

export const DECKS_KEY = 'UdaciCards:decks';

let dummyData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

function setDummyData (results) {
  if (!results) {
    AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(dummyData));
  }
}

export function formatDecksResults (results) {
  setDummyData(results);

  return results === null
    ? dummyData
    : JSON.parse(results);
}