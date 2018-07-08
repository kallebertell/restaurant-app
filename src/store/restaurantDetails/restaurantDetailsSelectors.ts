import { createSelector } from 'reselect';

import { RestaurantDetails } from 'api';
import * as routePaths from 'pages/routePaths';
import { AppState } from '../rootReducer';
import { RestaurantMap } from './restaurantDetailsReducer';

const RESTAURANT_ID_PATTERN = routePaths.RESTAURANT_DETAILS_PATH.replace(':id', '(.*)$');

/**
 * This is also passed to component props already parsed,
 * but getting it from components props will break memoiziation of the selector.
 */
export const getSelectedRestaurantId = (state: AppState): string | undefined => {
  const match = state.router.location.pathname.match(RESTAURANT_ID_PATTERN);
  return match ? match[1] : undefined;
}

const getRestaurants = (state: AppState): RestaurantMap => state.restaurantDetails.restaurants;

export const getRestaurantDetails = createSelector(
  getRestaurants,
  getSelectedRestaurantId,
  (restaurants: RestaurantMap, id?: string): RestaurantDetails | undefined =>
    id ? restaurants[id] : undefined
);

export const getRestaurantDetailsLoading  = (state: AppState): boolean => state.restaurantDetails.loading;
