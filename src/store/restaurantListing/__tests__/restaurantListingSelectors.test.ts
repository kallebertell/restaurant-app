
import * as queryString from 'query-string';

import { RestaurantSummary } from 'api';
import { AppState } from '../../rootReducer';
import { SortMethod } from '../restaurantListingActions';
import { getFilteredListing } from '../restaurantListingSelectors';

const restaurants = [
  {
    general: {
      name: 'american grill',
      categories: ['a']
    },
    rating: {
      average: 1
    }
  },
  {
    general: {
      name: 'banana land',
      categories: ['b']
    },
    rating: {
      average: 4
    }
  },
];

const newState = (filter?: string, sort?: SortMethod): Partial<AppState> => {
  const queryParams = Object.assign(
    {},
    filter ? { filter } : undefined,
    sort ? { sort } : undefined
  );

  return {
    restaurantListing: {
      restaurants: restaurants as RestaurantSummary[],
      loading: false,
    },
    router: {
      location: {
        pathname: '/restaurants/Berlin/12345',
        search: queryString.stringify(queryParams),
        hash: '',
        key: '',
      },
      action: 'PUSH'
    }
  };
}

describe('getFilteredListing', () => {
  it('returns list untouched when no filter and sort is defined', () => {
    const list = getFilteredListing(newState(undefined, undefined) as AppState);
    expect(list).toBe(restaurants);
  });

  it('filters', () => {
    const list = getFilteredListing(newState('a', undefined) as AppState);
    expect(list.length).toBe(1);
    expect(list[0].general.name).toBe('american grill');
  });

  it('sorts', () => {
    const list = getFilteredListing(newState(undefined, 'rating') as AppState);
    expect(list.length).toBe(2);
    expect(list[0].general.name).toBe('banana land');
  });
});