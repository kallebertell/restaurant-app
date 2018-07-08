import { AppState } from '../rootReducer';

export const getAuthToken = (state: AppState) => state.auth.token;
export const getTokenIsLoading = (state: AppState) => state.auth.loading;