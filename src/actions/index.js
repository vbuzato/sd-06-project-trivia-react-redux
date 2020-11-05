export const ADD_USER = 'ADD_USER';
export const USER_HASH = 'USER_HASH';
export const USER_TOKEN = 'USER_TOKEN';
export { fetchToken } from './requestAPI';

export const userInfo = (name, email) => ({
  type: ADD_USER,
  name,
  email,
});

export const userHash = (hash) => ({
  type: USER_HASH,
  hash,
});
