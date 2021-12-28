import * as types from '../types';

export const createFetchUserLoggedInSuccess = (payload) => ({
  type: types.FETCH_USER_LOGGED_IN_SUCCESS,
  payload,
});
export const createFetchUserLoggedInError = (payload) => ({
  type: types.FETCH_USER_LOGGED_IN_ERROR,
  payload,
});