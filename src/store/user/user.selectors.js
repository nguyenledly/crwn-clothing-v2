import { createSelector } from "reselect";

const selectUserReducer = (state) => state.user;

export const selectCurrentUser = createSelector(
    [selectUserReducer],
    (userReducer) => userReducer.currentUser
);

export const selectLoading = createSelector(
    [selectUserReducer],
    (userReducer) => userReducer.isLoading
);

export const selectSignInError = createSelector(
    [selectUserReducer],
    (userReducer) => userReducer.error
);

export const selectErrorMapping = createSelector(
    [selectSignInError],
    (signInError) => {
        return signInError && signInError.message ? signInError.message: null;
    }
)
