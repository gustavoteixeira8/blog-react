import { get } from 'lodash';
import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../../services/axios';
import { browserHistory } from '../../../services/browserHistory';
import * as userActions from '../user/actions';
import * as authActions from '../auth/actions';
import * as types from '../types';

export const fetchUserLoggedInRequest = function* () {
  try {
    const response = yield call(axios.get, '/user/me');

    const userData = get(response, 'data.body.user');

    yield put(userActions.createFetchUserLoggedInSuccess({ data: userData }));
  } catch (error) {
    const status = get(error, 'response.data.status', 500);
    const errors = get(error, 'response.data.body.errors', []);

    if (status >= 400 && status <= 499) {
      errors.map((e, index) => toast.error(e, { toastId: index }));
    } else {
      toast.error('Internal error, try again later');
    }

    yield put(userActions.createFetchUserLoggedInError());
  }
};

export const updateUserLoggedInRequest = function* ({ payload }) {
  try {
    const response = yield call(axios.put, '/user', payload.user);

    yield put(userActions.createFetchUserLoggedInRequest());

    const message = get(response, 'data.body.message', 'Your user was updated successfully');

    toast.success(message);
  } catch (error) {
    const errors = get(error, 'response.data.body.errors', []);
    const status = get(error, 'response.data.status', 500);

    if (status >= 400 && status <= 499) {
      errors.map((error) => toast.error(error, { toastId: Math.random() }));
      return;
    }

    toast.error('Internal error, try again later');

    yield put(userActions.createFetchUserLoggedInError());
  }
};

export const deleteUserLoggedInRequest = function* () {
  try {
    const response = yield call(axios.delete, '/use');

    const message = get(response, 'data.body.message', 'Your user was deleted successfully');

    toast.success(message);

    yield put(authActions.createLogoutRequest());
  } catch (error) {
    const errors = get(error, 'response.data.body.errors', []);
    const status = get(error, 'response.data.status', 500);

    if (status >= 400 && status <= 499) {
      errors.map((error) => toast.error(error, { toastId: Math.random() }));
      return;
    }

    toast.error('Internal error, try again later');

    yield put(userActions.createFetchUserLoggedInError());

    browserHistory.push('/account');
  }
};

export const userSaga = all([
  takeLatest(types.FETCH_USER_LOGGED_IN_REQUEST, fetchUserLoggedInRequest),
  takeLatest(types.UPDATE_USER_LOGGED_IN_REQUEST, updateUserLoggedInRequest),
  takeLatest(types.DELETE_USER_LOGGED_IN_REQUEST, deleteUserLoggedInRequest),
]);
