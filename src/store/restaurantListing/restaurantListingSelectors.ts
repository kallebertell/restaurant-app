import { AppState } from '../rootReducer';

export const getRestaurantListing = (state: AppState) => state.restaurantListing.restaurants;
export const getRestaurantListingLoading  = (state: AppState) => state.restaurantListing.loading;
