import { all, spawn } from 'redux-saga/effects';

import authSagas from './auth/authSagas';
import restaurantListingSagas from './restaurantListing/restaurantListingSagas';

export default function* rootSaga() {
  yield all(
    [
      ...authSagas,
      ...restaurantListingSagas
    ].map(saga => spawn(saga))
  );
}
