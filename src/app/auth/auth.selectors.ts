import { createSelector } from "@ngrx/store";

// memoized function - remembers state of auth.user, executes only when changes
export const isLoggedIn = createSelector(
  state => state["auth"],
  (auth) => !!auth.user
)

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
)
