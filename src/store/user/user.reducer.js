import { INITIAL_STATE } from "./user.states";
import { USER_ACTION_TYPES } from "./user.types";

const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return { ...state, currentUser: payload }
        default:
            return state;
    }
}

export default userReducer;