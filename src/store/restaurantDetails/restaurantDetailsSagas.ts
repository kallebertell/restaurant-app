import { call, put, takeLatest } from 'redux-saga/effects'

import actionTypes, * as actions from './restaurantDetailsActions';

import { fetchRestaurantDetails, RestaurantDetails } from 'api';
import ensureAuthToken from '../auth/ensureAuthToken';

function* fetchRestaurantDetailsWorker(action: actions.FetchRestaurantDetailsRequestAction) {
  const { id } = action;
  const token = yield ensureAuthToken();

  try {
    const httpResponse = yield call(fetchRestaurantDetails, token, id);
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
