import { uniqBy } from 'lodash';
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

const ensureNonBrokenCategories = (categories: string[]): string[] => {
  if (categories.length === 1 && categories[0].indexOf(',') !== -1) {
    return categories[0].split(',');
  }

  return categories;
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
        restaurants:
          // Api seems to return a random list of restaurants,
          // and sometimes the list contains many restaurants with the same id.
          // Assuming this is a backend bug and we'll just filter away duplicates.
          uniqBy(restaurants, 'id')
            // also the categories are broken
            .map(restaurant => ({
              ...restaurant,
              general: {
                ...restaurant.general,
                categories: ensureNonBrokenCategories(restaurant.general.categories),
              }
            })),
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
