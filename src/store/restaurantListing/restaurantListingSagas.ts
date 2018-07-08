import { replace } from 'connected-react-router';
import * as queryString from 'query-string';
import { Action } from 'redux';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { fetchRestaurantListing, FetchRestaurantListingResponse } from 'api';
import ensureAuthToken from '../auth/ensureAuthToken';
import { getPath } from '../selectors';
import actionTypes, * as actions from './restaurantListingActions';
import { getFilter, getSort } from './restaurantListingSelectors';

function* changeQueryParams(filter: string, sort: string) {
  const path = yield select(getPath);

  const queryParams = Object.assign(
    {},
    filter && filter !== 'none' ? { filter } : undefined,
    sort && sort !== 'none' ? {sort } : undefined
  );

  return yield put(
    replace({
      pathname: path,
      search: queryString.stringify(queryParams)
    }
  ));
}

function* changeFiltering(action: actions.SetRestaurantFilterAction) {
  const sort = yield select(getSort)
  const { filter } = action;
  yield changeQueryParams(filter, sort);
}

function* watchSetRestaurantFilter() {
  yield takeLatest(actionTypes.SET_RESTAURANT_FILTER, changeFiltering);
}

function* changeSorting(action: actions.SetRestaurantSortAction) {
  const filter = yield select(getFilter)
  const { sort } = action;
  yield changeQueryParams(filter, sort);
}

function* watchSetRestaurantSort() {
  yield takeLatest(actionTypes.SET_RESTAURANT_FILTER, changeSorting);
}

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
  yield takeLatest(actionTypes.FETCH_RESTAURANT_LISTING_REQUEST, fetchRestaurantListingWorker);
}

export default [ watchFetchRestaurauntListing, watchSetRestaurantFilter, watchSetRestaurantSort ];
