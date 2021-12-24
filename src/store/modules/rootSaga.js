import { all } from 'redux-saga/effects';
import { authSaga } from './auth/saga';

export const rootSaga = function* () {
  return yield all([authSaga]);
};
