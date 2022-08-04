import { AuthState } from './reducers/index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// typeSafe :)
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// memoized function - remembers state of auth.user, executes only when changes
export const isLoggedIn = createSelector(
  selectAuthState,
  // (state) => state['auth'],
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);
