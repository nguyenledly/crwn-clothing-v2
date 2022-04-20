import { createAction } from "../../utils/reducer/reducer.util";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

// export const setCategories = (data) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, data);

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_START);

export const fetchCategoriesSuccess = (data) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_SUCCESS, data);

export const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_FAILED, error);