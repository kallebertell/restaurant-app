import { Action } from 'redux';
import { ErrorAction, SuccessAction } from '../actionTypes';
import actionTypes from './restaurantListingActions';

import { FetchRestaurantListingResponse, RestaurantSummary } from 'api';

export interface RestaurantListingState {
  restaurants?: RestaurantSummary[];
  error?: string;
  loading: boolean;
}

const initialState: RestaurantListingState = {
  restaurants: undefined,
  error: undefined,
  loading: false
};

const restaurantListingReducer = (state: RestaurantListingState = initialState, action: Action<string>) => {
  switch (action.type) {
    case actionTypes.FETCH_RESTAURANT_LISTING_REQUEST:
      return {
        ...state,
        restaurants: undefined,
        error: undefined,
        loading: true,
      };

    case actionTypes.FETCH_RESTAURANT_LISTING_SUCCESS:
      const { data: restaurants } = (action as SuccessAction<FetchRestaurantListingResponse>).data;
      return {
        ...state,
        restaurants,
        loading: false,
      };

    case actionTypes.FETCH_RESTAURANT_LISTING_ERROR:
      return {
        ...state,
        error: (action as ErrorAction).error,
        loading: false,
      };
  }

  return state;
}

export default restaurantListingReducer;
