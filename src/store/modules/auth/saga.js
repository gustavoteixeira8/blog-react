import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import { browserHistory } from '../../../services/browserHistory';

const loginRequest = function* ({ payload }) {
  try {
    const response = yield call(axios.post, '/auth', {
      login: payload.login,
      password: payload.password,
    });

    yield put(actions.createLoginSuccess({ ...response.data.body }));

    toast.success('You have logged in');

    browserHistory.push(payload.prevPath);
  } catch (error) {
    error.response.data.body.errors.map((e, index) => toast.error(e, { toastId: index }));

    yield put(actions.createLoginError());
  }
};

const persistAccessToken = ({ payload }) => {
  const accessToken = get(payload, 'accessToken', '');
  if (!accessToken) return;
  axios.defaults.headers['authorization'] = `Bearer ${accessToken}`;
};

export const authSaga = all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.LOGIN_SUCCESS, persistAccessToken),
]);
