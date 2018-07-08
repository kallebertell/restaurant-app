import { RouterState} from 'connected-react-router';
import { combineReducers } from 'redux';

export interface AppState {
  router: RouterState;
}

const rootReducer = combineReducers({
  // add reducers here
  dummy: (state: any = {}, action: any) => state
});

export default rootReducer;
