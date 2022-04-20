import { INITIAL_STATE } from "./common.states";
import { COMMON_ACTION_TYPES } from "./common.types";

const commonReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case COMMON_ACTION_TYPES.REDIRECT_PAGE:
            return {
                ...state,
                redirect: payload
            }
        default:
            return state;
    }
}

export default commonReducer;