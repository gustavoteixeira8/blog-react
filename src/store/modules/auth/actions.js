import * as types from '../types';

export const createLogoutRequest = (payload) => ({ type: types.LOGIN_ERROR, payload });
export const createLoginRequest = (payload) => ({ type: types.LOGIN_REQUEST, payload });
export const createLoginSuccess = (payload) => ({ type: types.LOGIN_SUCCESS, payload });
export const createLoginError = (payload) => ({ type: types.LOGIN_ERROR, payload });
