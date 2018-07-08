import { sortBy } from 'lodash';
import * as queryString from 'query-string';
import { createSelector } from 'reselect';

import { RestaurantSummary } from 'api';
import { AppState } from '../rootReducer';

export const getRestaurantListing = (state: AppState) => state.restaurantListing.restaurants;
export const getRestaurantListingLoading  = (state: AppState) => state.restaurantListing.loading;


export const getFilter = (state: AppState): string | undefined => {
  return queryString.parse(state.router.location.search).filter;
}

export const getSort = (state: AppState): string | undefined => {
  return queryString.parse(state.router.location.search).sort;
}

export const getFilteredListing: (state: AppState) => RestaurantSummary[] = createSelector(
  getRestaurantListing,
  getFilter,
  getSort,
  (restaurants, filter, sort) => {
    if (!restaurants) {
      return [];
    }

    const filteredListing: RestaurantSummary[] = !filter
      ? restaurants
      : restaurants.filter((restaurant: RestaurantSummary) => restaurant.general.categories.indexOf(filter) !== -1)

    return sortBy(filteredListing, (restaurant: RestaurantSummary) => restaurant.general.name);
  }
)
