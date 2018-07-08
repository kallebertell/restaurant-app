import { RouterState} from 'connected-react-router';
import { combineReducers } from 'redux';

import authReducer, { AuthState } from './auth/authReducer';
import restaurantDetailsReducer, { RestaurantDetailsState } from './restaurantDetails/restaurantDetailsReducer';
import restaurantListingReducer, { RestaurantListingState } from './restaurantListing/restaurantListingReducer';

export interface AppState {
  router: RouterState;
  auth: AuthState;
  restaurantListing: RestaurantListingState;
  restaurantDetails: RestaurantDetailsState;
}

const rootReducer = combineReducers({
  auth: authReducer,
  restaurantListing: restaurantListingReducer,
  restaurantDetails: restaurantDetailsReducer,
});

export default rootReducer;
