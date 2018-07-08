import { Action } from 'redux';
import { ErrorAction, SuccessAction } from '../actionTypes';
import actionTypes, { FetchRestaurantPayload } from './restaurantDetailsActions';

import { RestaurantDetails } from 'api';

export interface RestaurantMap  {
  [id: string]: RestaurantDetails;
}

export interface RestaurantDetailsState {
  restaurants: RestaurantMap;
  error?: string;
  loading: boolean;
}

const initialState: RestaurantDetailsState = {
  restaurants: {
  },
  error: undefined,
  loading: false
};

const authReducer = (state: RestaurantDetailsState = initialState, action: Action<string>) => {
  switch (action.type) {
    case actionTypes.FETCH_RESTAURANT_DETAILS_REQUEST:
      return {
        ...state,
        error: undefined,
        loading: true,
      };

    case actionTypes.FETCH_RESTAURANT_DETAILS_SUCCESS:
      const { restaurantDetails, id } = (action as SuccessAction<FetchRestaurantPayload>).data;
      return {
        ...state,
        restaurants: {
          ...state.restaurants,
          [id]: restaurantDetails,
        },
        loading: false,
      };

    case actionTypes.FETCH_RESTAURANT_DETAILS_ERROR:
      return {
        ...state,
        error: (action as ErrorAction).error,
        loading: false,
      };
  }

  return state;
}

export default authReducer;
