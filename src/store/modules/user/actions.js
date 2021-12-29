import * as types from '../types';

export const createFetchUserLoggedInRequest = (payload) => ({
  type: types.FETCH_USER_LOGGED_IN_REQUEST,
  payload,
});
export const createFetchUserLoggedInSuccess = (payload) => ({
  type: types.FETCH_USER_LOGGED_IN_SUCCESS,
  payload,
});
export const createFetchUserLoggedInError = (payload) => ({
  type: types.FETCH_USER_LOGGED_IN_ERROR,
  payload,
});

export const createUpdateUserLoggedInRequest = (payload) => ({
  type: types.UPDATE_USER_LOGGED_IN_REQUEST,
  payload,
});

export const createDeleteUserLoggedInRequest = (payload) => ({
  type: types.DELETE_USER_LOGGED_IN_REQUEST,
  payload,
});
