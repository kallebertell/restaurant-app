import { AppState } from '../rootReducer';

export const getAuthToken = (state: AppState) => state.auth.token;
