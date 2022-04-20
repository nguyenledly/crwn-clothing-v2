import { INITIAL_STATE } from "./categories.states";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";


const categoriesReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        // case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
        //     return {
        //         ...state,
        //         categories: payload
        //     }
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_START:
            return {
                ...state,
                loading: true
            }
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: payload,
            }
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_FAILED:
            return {
                ...state,
                loading: false,
                error: payload
            }

        default:
            return state;
    }
}

export default categoriesReducer;