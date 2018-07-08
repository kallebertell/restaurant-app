import { all, spawn } from 'redux-saga/effects';

import authSagas from './auth/authSagas';

export default function* rootSaga() {
  yield all(
    [
      ...authSagas
    ].map(saga => spawn(saga))
  );
}
