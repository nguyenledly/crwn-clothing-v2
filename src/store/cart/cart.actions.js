import { createAction } from "../../utils/reducer/reducer.util";
import { CART_ACTION_TYPES } from "./cart.types";



export const setIsOpenCart = (flag) => createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, flag);

export const addItemToCart = (cartItems, itemToAdd) => {
    const newCartItems = addItemToCartFunc(cartItems, itemToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}
export const subItemToCart = (cartItems, itemToSub) => {
    const newCartItems = subItemToCartFunc(cartItems, itemToSub);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemToCart = (cartItems, itemToRemove) => {
    const newCartItems = removeItemToCartFunc(cartItems, itemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

const addItemToCartFunc = (cartItems, addItem) => {
    let existingItem = cartItems.find(item => item.id == addItem.id);
    // if exist item then increase quantity one more
    if (existingItem) {
        return cartItems.map(item => {
            if (item.id == addItem.id) {
                item.quantity += 1;
            }
            return item;
        })
    }
    // if item not exist then add new => return array with new item
    return [...cartItems, { ...addItem, 'quantity': 1 }];
}

const subItemToCartFunc = (cartItems, subItem) => {
    return cartItems.filter(item => {
        if (item.id == subItem.id) {
            if (subItem.quantity === 1) {
                item = null;
            }
            else {
                subItem.quantity -= 1;
            }
        }
        return item != null;
    });
}

const removeItemToCartFunc = (cartItems, removeItem) => {
    return cartItems.filter(item => item.id != removeItem.id)
}