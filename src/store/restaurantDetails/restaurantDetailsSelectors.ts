import { AppState } from '../rootReducer';

export const getSelectedRestaurantId = (state: AppState, props: any) => {
  return state.router.location.search
}

export const getRestaurantDetails = (state: AppState, props: any) => {
  return state.restaurantDetails.restaurants[props.match.params.id];
}

export const getRestaurantDetailsLoading  = (state: AppState) => state.restaurantDetails.loading;
