import { createSelector } from "reselect";
import cartReducer from "./cart.reducer";

const selectCartReducer = (state) => state.cart;

export const selectIsOpenCart = createSelector(
    [selectCartReducer],
    (cartReducer) => cartReducer.isOpenCart
);

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cartReducer) => cartReducer.cartItems,
);

export const selectCartCount = createSelector(
    [selectCartReducer],
    (cartReducer) => countItemsInCart(cartReducer.cartItems)
);

export const selectCartTotal = createSelector(
    [selectCartReducer],
    (cartReducer) => calculateTotalPrice(cartReducer.cartItems)
);

/* HELPER FUNCTIONS */
const countItemsInCart = (cartItems) => {
    const initialValue = 0;
    return cartItems.reduce((total, cur) => total + cur.quantity, initialValue);
}

const calculateTotalPrice = (cartItems) => {
    const initialValue = 0;
    return cartItems.reduce((total, cur) => total + (cur.quantity * cur.price), initialValue);
}
