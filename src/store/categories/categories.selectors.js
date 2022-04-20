import { createSelector } from "reselect";
import categoriesReducer from "./categories.reducer";

const selectCategoriesReducer = (state) => state.categories;

const selectCategoriesArray = createSelector(
    [selectCategoriesReducer],
    (categoriesReducer) => categoriesReducer.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategoriesArray],
    (categoriesArray) => categoriesArray.reduce((continuity, category) => {
        const { title, items } = category;
        continuity[title.toLowerCase()] = items;
        return continuity;
    }, {})
);

export const selectCategoriesLoading = createSelector(
    [selectCategoriesReducer],
    (categoriesReducer) => categoriesReducer.loading
);