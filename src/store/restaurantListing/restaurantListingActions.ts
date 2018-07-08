import { Action } from 'redux';

import { FetchRestaurantListingResponse } from 'api';

import { ErrorAction, SuccessAction } from '../actionTypes';



const types = {
  SET_RESTAURANT_FILTER: 'SET_RESTAURANT_FILTER',
  SET_RESTAURANT_SORT: 'SET_RESTAURANT_SORT',

  FETCH_RESTAURANT_LISTING_REQUEST: 'FETCH_RESTAURANT_LISTING_REQUEST',
  FETCH_RESTAURANT_LISTING_SUCCESS: 'FETCH_RESTAURANT_LISTING_SUCCESS',
  FETCH_RESTAURANT_LISTING_ERROR: 'FETCH_RESTAURANT_LISTING_ERROR'
};

export default types;

export interface SetRestaurantFilterAction extends Action<string> {
  filter: string;
}

export interface SetRestaurantSortAction extends Action<string> {
  sort: string;
}

// Action creators
export const setRestaurantFilter = (filter: string): SetRestaurantFilterAction => ({ type: types.SET_RESTAURANT_FILTER, filter });
export const setRestaurantSort = (sort: string): SetRestaurantSortAction => ({ type: types.SET_RESTAURANT_FILTER, sort });

export const fetchRestaurantListingRequest = (): Action<string> => ({ type: types.FETCH_RESTAURANT_LISTING_REQUEST});
export const fetchRestaurantListingSuccess = (response: FetchRestaurantListingResponse): SuccessAction<FetchRestaurantListingResponse> => ({ type: types.FETCH_RESTAURANT_LISTING_SUCCESS, data: response });
export const fetchRestaurantListingError = (error: string): ErrorAction => ({ type: types.FETCH_RESTAURANT_LISTING_ERROR, error });
