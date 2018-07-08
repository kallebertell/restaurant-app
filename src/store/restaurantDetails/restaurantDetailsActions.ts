import { Action } from 'redux';

import { RestaurantDetails } from 'api';

import { ErrorAction, SuccessAction } from '../actionTypes';

export interface FetchRestaurantDetailsRequestAction extends Action<string> {
  id: number;
}

export interface FetchRestaurantPayload {
  id: number;
  restaurantDetails: RestaurantDetails;
}

const types = {
  FETCH_RESTAURANT_DETAILS_REQUEST: 'FETCH_RESTAURANT_DETAILS_REQUEST',
  FETCH_RESTAURANT_DETAILS_SUCCESS: 'FETCH_RESTAURANT_DETAILS_SUCCESS',
  FETCH_RESTAURANT_DETAILS_ERROR: 'FETCH_RESTAURANT_DETAILS_ERROR'
};

export default types;

// Action creators
export const fetchRestaurantDetailsRequest = (id: number): FetchRestaurantDetailsRequestAction => ({ type: types.FETCH_RESTAURANT_DETAILS_REQUEST, id });
export const fetchRestaurantDetailsSuccess = (data: FetchRestaurantPayload): SuccessAction<FetchRestaurantPayload> => ({ type: types.FETCH_RESTAURANT_DETAILS_SUCCESS, data });
export const fetchRestaurantDetailsError = (error: string): ErrorAction => ({ type: types.FETCH_RESTAURANT_DETAILS_ERROR, error });
