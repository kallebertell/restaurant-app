import { all, spawn } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all(
    [
      // add sagas here
    ].map(saga => spawn(saga))
  );
}