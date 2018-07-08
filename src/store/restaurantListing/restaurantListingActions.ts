import { Action } from 'redux';

import { FetchRestaurantListingResponse } from 'api';

import { ErrorAction, SuccessAction } from '../actionTypes';


const types = {
  FETCH_RESTAURANT_LISTING_REQUEST: 'FETCH_RESTAURANT_LISTING_REQUEST',
  FETCH_RESTAURANT_LISTING_SUCCESS: 'FETCH_RESTAURANT_LISTING_SUCCESS',
  FETCH_RESTAURANT_LISTING_ERROR: 'FETCH_RESTAURANT_LISTING_ERROR'
};

export default types;

// Action creators
export const fetchRestaurantListingRequest = (): Action<string> => ({ type: types.FETCH_RESTAURANT_LISTING_REQUEST});
export const fetchRestaurantListingSuccess = (response: FetchRestaurantListingResponse): SuccessAction<FetchRestaurantListingResponse> => ({ type: types.FETCH_RESTAURANT_LISTING_SUCCESS, data: response });
export const fetchRestaurantListingError = (error: string): ErrorAction => ({ type: types.FETCH_RESTAURANT_LISTING_ERROR, error });
