import { RouterState} from 'connected-react-router';
import { combineReducers } from 'redux';

import authReducer, { AuthState } from './auth/authReducer';
import restaurantListingReducer, { RestaurantListingState } from './restaurantListing/restaurantListingReducer';

export interface AppState {
  router: RouterState;
  auth: AuthState;
  restaurantListing: RestaurantListingState;
}

const rootReducer = combineReducers({
  auth: authReducer,
  restaurantListing: restaurantListingReducer,
});

export default rootReducer;
