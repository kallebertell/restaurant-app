import { flatten, orderBy, sortBy, uniq } from 'lodash';
import * as queryString from 'query-string';
import { createSelector } from 'reselect';

import { RestaurantSummary } from 'api';
import { AppState } from '../rootReducer';
import { SortMethod } from './restaurantListingActions';

type SortingMethod = 'name' | 'rating';

interface SortingDefinition {
  value: (r: RestaurantSummary) => string | number,
  order: 'asc' | 'desc';
}

const sortingMethods: { [key in SortingMethod]: SortingDefinition } = {
  name: {
    value: (r: RestaurantSummary) => r.general.name,
    order: 'asc'
  },
  rating: {
    value: (r: RestaurantSummary) => r.rating.average,
    order: 'desc'
  }
};

export const getRestaurantListing = (state: AppState) => state.restaurantListing.restaurants;
export const getRestaurantListingLoading  = (state: AppState) => state.restaurantListing.loading;


export const getFilter = (state: AppState): string | undefined => {
  return queryString.parse(state.router.location.search).filter;
}

export const getSort = (state: AppState): SortMethod | undefined => {
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

    if (!sort) {
      return filteredListing;
    }

    const { order, value } = sortingMethods[sort];
    return orderBy(filteredListing, value, order);
  }
)

export const getAvailableCategories = createSelector(
  getRestaurantListing,
  (restaurants) => {
    if (!restaurants) {
      return [];
    }
    return sortBy(
      uniq(
        flatten(
          restaurants.map(restaurant => restaurant.general.categories)
        )
      )
    );
  }
)
