import { Action } from 'redux';
import { call, put, select, take, takeLatest } from 'redux-saga/effects'

import actionTypes, * as actions from './restaurantListingActions';

import { fetchRestaurantListing, FetchRestaurantListingResponse } from 'api';
import { default as authActionTypes, fetchAuthRequest } from 'store/auth/authActions';
import { getAuthToken, getTokenIsLoading } from 'store/auth/authSelectors';

function* fetchRestaurantListingWorker(action: Action) {
  const token = yield select(getAuthToken);
  const tokenIsLoading = yield select(getTokenIsLoading);

  if (!token) {
    if (!tokenIsLoading) {
      yield put(fetchAuthRequest());
    }

    yield take(authActionTypes.FETCH_AUTH_SUCCESS);
  }

  const latestToken = yield select(getAuthToken)

  try {
    const httpResponse = yield call(fetchRestaurantListing, latestToken);
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
