import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.util";

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
const countItemsInCart = (cartItems) => {
    const initialValue = 0;
    return cartItems.reduce((total, cur) => total + cur.quantity, initialValue);
}

const calculateTotalPrice = (cartItems) => {
    const initialValue = 0;
    return cartItems.reduce((total, cur) => total + (cur.quantity * cur.price), initialValue);
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_CART_IS_OPEN: "SET_CART_IS_OPEN",
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.SET_CART_IS_OPEN:
            return {
                ...state,
                isOpenCart: payload
            }
        default:
            throw new Error(`Unhandled undefine type of "${type}" in cartReducer`);
    }
}

const INITIAL_STATE = {
    isOpenCart: false,
    cartItems: [],
    cartCount: 0,
    total: 0,
}


export const CartContext = createContext({
    isOpenCart: false,
    setIsOpenCart: () => null,
    cartItems: [],
    setCartItems: () => { },
    cartCount: 0,
    setCartCount: () => { },
    total: 0,
    setTotal: () => { },
})

export const CartProvider = ({ children }) => {
    const [{ isOpenCart, cartItems, cartCount, total }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = countItemsInCart(newCartItems);
        const newTotal = calculateTotalPrice(newCartItems);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartCount: newCartCount,
                total: newTotal,
            })
        );
    }

    const updateIsOpenCartReducer = (flag) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, flag));
    }

    const setIsOpenCart = (flag) => {
        updateIsOpenCartReducer(flag);
    }

    const addItemToCart = (itemToAdd) => {
        const newCartItems = addItemToCartFunc(cartItems, itemToAdd);
        updateCartItemsReducer(newCartItems);
    }
    const subItemToCart = (itemToSub) => {
        const newCartItems = subItemToCartFunc(cartItems, itemToSub);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemToCart = (itemToRemove) => {
        const newCartItems = removeItemToCartFunc(cartItems, itemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const value = { isOpenCart, setIsOpenCart, cartItems, addItemToCart, cartCount, subItemToCart, removeItemToCart, total };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}