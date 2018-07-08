import { RouterState} from 'connected-react-router';
import { combineReducers } from 'redux';

import authReducer, { AuthState } from './auth/authReducer';

export interface AppState {
  router: RouterState;
  auth: AuthState;
}

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
