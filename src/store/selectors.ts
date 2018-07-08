import { AppState } from './rootReducer';

export const getLocation = (state: AppState): any => state.router.location;
export const getPath = (state: AppState) => getLocation(state).pathname;
