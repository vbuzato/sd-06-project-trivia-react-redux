import { NEW_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  results: [],
};

function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case NEW_QUESTIONS:
    return { ...state, results: action.results.results };
  default:
    return state;
  }
}

export default game;
