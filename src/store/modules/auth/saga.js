import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as authActions from './actions';
import * as userActions from '../user/actions';
import * as types from '../types';
import axios from '../../../services/axios';
import { browserHistory } from '../../../services/browserHistory';

const loginRequest = function* ({ payload }) {
  try {
    const response = yield call(axios.post, '/auth', {
      login: payload.login,
      password: payload.password,
    });

    axios.defaults.headers.common['authorization'] = `Bearer ${response.data.body.accessToken}`;

    const userResponse = yield call(axios.get, '/user/me');

    const userData = { data: userResponse.data.body.user };

    yield put(userActions.createFetchUserLoggedInSuccess(userData));
    yield put(authActions.createLoginSuccess({ ...response.data.body }));

    toast.success('You have logged in');

    browserHistory.push(payload.prevPath);
  } catch (error) {
    const status = get(error, 'response.status', 500);
    if (status === 401 || status === 400) {
      error.response.data.body.errors.map((e, index) => toast.error(e, { toastId: index }));
    } else {
      toast.error('Internal error, try again later');
    }

    yield put(authActions.createLogoutRequest());
  }
};

export const logoutRequest = function* () {
  delete axios.defaults.headers.common['authorization'];
  yield put(authActions.createLoginError());
  yield put(userActions.createFetchUserLoggedInError());
};

const persistAccessToken = ({ payload }) => {
  const accessToken = get(payload, 'auth.data.accessToken', '');
  if (!accessToken) return;
  axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
};

export const authSaga = all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistAccessToken),
  takeLatest(types.LOGOUT_REQUEST, logoutRequest),
]);
