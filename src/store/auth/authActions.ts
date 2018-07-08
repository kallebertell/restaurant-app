import { Action } from 'redux';
import { ErrorAction, SuccessAction } from '../actionTypes';

const types = {
  FETCH_AUTH_REQUEST: 'FETCH_AUTH_REQUEST',
  FETCH_AUTH_SUCCESS: 'FETCH_AUTH_SUCCESS',
  FETCH_AUTH_ERROR: 'FETCH_AUTH_ERROR'
};

export default types;

// Action creators
export const fetchAuthRequest = (): Action<string> => ({ type: types.FETCH_AUTH_REQUEST });
export const fetchAuthSuccess = (token: string): SuccessAction<string> => ({ type: types.FETCH_AUTH_SUCCESS, data: token });
export const fetchAuthError = (error: string): ErrorAction => ({ type: types.FETCH_AUTH_ERROR, error });
