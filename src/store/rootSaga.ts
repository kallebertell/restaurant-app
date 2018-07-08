import { all, spawn } from 'redux-saga/effects';

import authSagas from './auth/authSagas';
import restaurantDetailsSagas from './restaurantDetails/restaurantDetailsSagas';
import restaurantListingSagas from './restaurantListing/restaurantListingSagas';

export default function* rootSaga() {
  yield all(
    [
      ...authSagas,
      ...restaurantListingSagas,
      ...restaurantDetailsSagas
    ].map(saga => spawn(saga))
  );
}
