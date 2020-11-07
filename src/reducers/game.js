import { NEW_QUESTIONS, SUM_POINTS } from '../actions';

const INITIAL_STATE = {
  results: [],
  score: 0,
  assertions: 0,
};

function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case NEW_QUESTIONS:
    return { ...state, results: action.results.results };
  case SUM_POINTS:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
}

export default game;
