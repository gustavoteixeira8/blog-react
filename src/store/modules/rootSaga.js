import { all } from 'redux-saga/effects';
import { authSaga } from './auth/saga';
import { userSaga } from './user/saga';

export const rootSaga = function* () {
  return yield all([authSaga, userSaga]);
};
