import { call, put, select, take, takeLatest } from 'redux-saga/effects'

import actionTypes, * as actions from './restaurantDetailsActions';

import { fetchRestaurantDetails, RestaurantDetails } from 'api';
import { default as authActionTypes, fetchAuthRequest } from 'store/auth/authActions';
import { getAuthToken, getTokenIsLoading } from 'store/auth/authSelectors';

function* fetchRestaurantDetailsWorker(action: actions.FetchRestaurantDetailsRequestAction) {
  const { id } = action;
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
    const httpResponse = yield call(fetchRestaurantDetails, latestToken, id);
    const restaurantDetails = (httpResponse.data as RestaurantDetails);
    yield put(actions.fetchRestaurantDetailsSuccess({ id, restaurantDetails }));
  } catch (e) {
    yield put(actions.fetchRestaurantDetailsError(e.message));
  }
}

function* watchFetchRestaurauntDetails() {
  yield takeLatest(actionTypes.FETCH_RESTAURANT_DETAILS_REQUEST, fetchRestaurantDetailsWorker)
}

export default [ watchFetchRestaurauntDetails ];
