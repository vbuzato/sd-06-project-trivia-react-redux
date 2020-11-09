export const ADD_USER = 'ADD_USER';
export const USER_HASH = 'USER_HASH';
export const USER_TOKEN = 'USER_TOKEN';
export const NEW_QUESTIONS = 'NEW_QUESTIONS';
export const SUM_POINTS = 'SUM_POINTS';
export const RESET_GAME = 'RESET_GAME';
export const ADD_RANKING = 'ADD_RANKING';

const tokenAPI = 'https://opentdb.com/api_token.php?command=request';
const questionsAPI = 'https://opentdb.com/api.php?amount=5&token=';

export const userInfo = (name, email) => ({
  type: ADD_USER,
  name,
  email,
});

export const userHash = (hash) => ({
  type: USER_HASH,
  hash,
});

export const questions = (results) => ({
  type: NEW_QUESTIONS,
  results,
});

export const fetchQuestions = (token) => async (dispatch) => {
  const requestQuestions = await fetch(`${questionsAPI}${token}`);
  const results = await requestQuestions.json();
  return dispatch(questions(results));
};

export const userToken = (token) => ({
  type: USER_TOKEN,
  token,
});

export const fetchToken = () => async (dispatch) => {
  const requestToken = await fetch(tokenAPI);
  const token = await requestToken.json();
  localStorage.setItem('token', token.token);
  await dispatch(userToken(token.token));
  return dispatch(fetchQuestions(token.token));
};

export const sumNewPoints = (score) => ({
  type: SUM_POINTS,
  score,
});

export const resetGame = () => ({
  type: RESET_GAME,
});

export const addRanking = (name, hash) => ({
  type: ADD_RANKING,
  name,
  hash,
});
