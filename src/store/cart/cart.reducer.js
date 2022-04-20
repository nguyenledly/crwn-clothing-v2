import { INITIAL_STATE } from "./cart.states";
import { CART_ACTION_TYPES } from "./cart.types";

const cartReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload
            };
        case CART_ACTION_TYPES.SET_CART_IS_OPEN:
            return {
                ...state,
                isOpenCart: payload
            }
        default:
            return state;
    }
}

export default cartReducer;