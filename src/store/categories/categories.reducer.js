import { INITIAL_STATE } from "./categories.states";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";


const categoriesReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
            return {
                ...state,
                categories: payload
            }

        default:
            return state;
    }
}

export default categoriesReducer;