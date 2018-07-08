import { Action } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects'

import actionTypes, * as actions from './restaurantListingActions';

import { fetchRestaurantListing, FetchRestaurantListingResponse } from 'api';
import ensureAuthToken from '../auth/ensureAuthToken';

function* fetchRestaurantListingWorker(action: Action) {
  const token = yield ensureAuthToken();

  try {
    const httpResponse = yield call(fetchRestaurantListing, token);
    const response = (httpResponse.data as FetchRestaurantListingResponse);
    yield put(actions.fetchRestaurantListingSuccess(response));
  } catch (e) {
    yield put(actions.fetchRestaurantListingError(e.message));
  }
}

function* watchFetchRestaurauntListing() {
  yield takeLatest(actionTypes.FETCH_RESTAURANT_LISTING_REQUEST, fetchRestaurantListingWorker)
}

export default [ watchFetchRestaurauntListing ];
