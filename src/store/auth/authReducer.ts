import { Action } from 'redux';
import { ErrorAction, SuccessAction } from '../actionTypes';
import actionTypes from './authActions';

export interface AuthState {
  token?: string;
  error?: string;
  fetchingToken: boolean;
}

const initialState: AuthState = {
  token: undefined,
  error: undefined,
  fetchingToken: false
};

const authReducer = (state: AuthState = initialState, action: Action<string>) => {
  switch (action.type) {
    case actionTypes.FETCH_AUTH_REQUEST:
      return {
        ...state,
        token: undefined,
        error: undefined,
        fetchingToken: true,
      };

    case actionTypes.FETCH_AUTH_SUCCESS:
      return {
        ...state,
        token: (action as SuccessAction<string>).data,
        fetchingToken: false,
      };

    case actionTypes.FETCH_AUTH_ERROR:
      return {
        ...state,
        error: (action as ErrorAction).error,
        fetchingToken: false,
      };
  }

  return state;
}

export default authReducer;
