import { call, put, select } from 'redux-saga/effects'

import { fetchAuth, FetchAuthResponse } from 'api';
import * as actions from './authActions';
import { getAuthToken, getTokenIsLoading } from './authSelectors';

/**
 * Use before doing any request needing authentication in your sagas.
 *
 * i.e.
 * const token = yield ensureAuthToken();
 */
export default function* ensureAuthToken() { 
  const token = yield select(getAuthToken);
  const tokenIsLoading = yield select(getTokenIsLoading);
  if (!token) {
    if (!tokenIsLoading) {
      yield put(actions.fetchAuthRequest());
    }

    try {
      const response = yield call(fetchAuth);
      const { token: newToken } = (response.data as FetchAuthResponse);
      yield put(actions.fetchAuthSuccess(newToken));
    } catch (e) {
      yield put(actions.fetchAuthError(e.message));
    }
  }

  return yield select(getAuthToken);
}
