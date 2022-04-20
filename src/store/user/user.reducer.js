import { INITIAL_STATE } from "./user.states";
import { USER_ACTION_TYPES } from "./user.types";

const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_ACTION_TYPES.SIGN_IN_START:
        case USER_ACTION_TYPES.SIGN_OUT_START:
        case USER_ACTION_TYPES.SIGN_UP_START:
            return { ...state, isLoading: true }
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return { ...state, currentUser: payload, isLoading: false, error: null }
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
            return { ...state, isLoading: false, error: payload }
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return { ...state, isLoading: false, currentUser: null }
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
            return { ...state, isLoading: false, error: payload }
        default:
            return state;
    }
}

export default userReducer;