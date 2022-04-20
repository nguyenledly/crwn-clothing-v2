import { createSelector } from "reselect";

const selectCommonReducer = (state) => state.common;

export const selectRedirect = createSelector(
    [selectCommonReducer],
    (commonReducer) => commonReducer.redirect
);