import { AppState } from './rootReducer';

export const getLocation = (state: AppState): any => state.router.location;
