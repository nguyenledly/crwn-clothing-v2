import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCollectionData } from "../../utils/firebase/firebase.util";
import { fetchCategoriesFailed, fetchCategoriesSuccess } from "./categories.actions";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export function* fetchCategoriesAsync() {
    try {
        const categories = yield call(getCollectionData, 'categories');
        yield put(fetchCategoriesSuccess(categories));
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}