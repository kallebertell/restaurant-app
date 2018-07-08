import { Action } from 'redux';
import { call, put,  takeLatest } from 'redux-saga/effects'

import actionTypes, * as actions from './authActions';

import { fetchAuth, FetchAuthResponse } from 'api';

function* fetchAuthWorker(action: Action) {
   try {
      const response = yield call(fetchAuth);
      const { token } = (response.data as FetchAuthResponse);
      yield put(actions.fetchAuthSuccess(token));
   } catch (e) {
      yield put(actions.fetchAuthError(e.message));
   }
}

function* watchFetchAuth() {
  yield takeLatest(actionTypes.FETCH_AUTH_REQUEST, fetchAuthWorker)
}

export default [ watchFetchAuth ];
