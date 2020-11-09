import { NEW_QUESTIONS,
  SUM_POINTS,
  RESET_GAME,
  ADD_RANKING,
  ADD_CATEGORIES,
  SAVE_SETTINGS,
} from '../actions';

const INITIAL_STATE = {
  results: [],
  score: 0,
  assertions: 0,
  ranking: [],
  settings: {
    category: 'Any Category',
    difficulty: 'Any Difficulty',
    type: 'Any Type',
  },
  options: {
    categories: ['Loading...'],
    difficulty: ['Any Difficulty', 'Easy', 'Medium', 'Hard'],
    type: ['Any Type', 'Multiple Choice', 'True / False'],
  },
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
  case RESET_GAME:
    return { ...state, score: 0, assertions: 0, results: [] };
  case ADD_CATEGORIES:
    return {
      ...state,
      options: {
        ...state.options,
        categories: ['Any Category', ...action.categories],
      },
    };
  case SAVE_SETTINGS:
    return {
      ...state,
      settings: {
        category: action.category,
        difficulty: action.difficulty,
        type: action.alternativesType,
      },
    };
  case ADD_RANKING:
    return { ...state,
      ranking: [
        ...state.ranking,
        { name: action.name, score: state.score, picture: `https://www.gravatar.com/avatar/${action.hash}` },
      ] };
  default:
    return state;
  }
}

export default game;
