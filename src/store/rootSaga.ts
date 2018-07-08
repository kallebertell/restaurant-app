import { all, spawn } from 'redux-saga/effects';

import restaurantDetailsSagas from './restaurantDetails/restaurantDetailsSagas';
import restaurantListingSagas from './restaurantListing/restaurantListingSagas';

export default function* rootSaga() {
  yield all(
    [
      ...restaurantListingSagas,
      ...restaurantDetailsSagas
    ].map(saga => spawn(saga))
  );
}
