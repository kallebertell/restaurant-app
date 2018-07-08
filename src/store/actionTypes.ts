import { Action } from 'redux';

/**
 * Generic action interface for successful api response with payload.
 */
export interface SuccessAction<T> extends Action<string> {
  data: T;
}

/**
 * Action interface for failed api calls.
 */
export interface ErrorAction extends Action<string> {
  error: string;
}
