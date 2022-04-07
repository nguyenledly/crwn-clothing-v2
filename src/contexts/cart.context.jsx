import { createContext, useEffect, useState } from "react";

const addItemToCartFunc = (cartItems, addItem) => {
    let existingItem = cartItems.find(item => item.id == addItem.id);
    // if exist item then increase quantity one more
    if (existingItem) {
        return cartItems.map(item => {
            if (item.id == addItem.id) {
                item.quantity = item.quantity + 1;
            }
            return item;
        })
    }
    // if item not exist then add new => return array with new item
    return [...cartItems, { ...addItem, 'quantity': 1 }];
}

const countItemsInCart = (cartItems) => {
    const initialValue = 0;
    return cartItems.reduce((prev, cur) => prev + cur.quantity, initialValue);
}

export const CartContext = createContext({
    isOpenCart: false,
    setIsOpenCart: () => null,
    cartItems: [],
    setCartItems: () => { },
    cartCount: 0,
    setCartCount: () => { }
})

export const CartProvider = ({ children }) => {
    const [isOpenCart, setIsOpenCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const addItemToCart = (itemToAdd) => {
        setCartItems(addItemToCartFunc(cartItems, itemToAdd));
    }
    useEffect(() => {
        if (cartItems.length > 0) {
            setCartCount(countItemsInCart(cartItems));
        }
    }, [cartItems])
    const value = { isOpenCart, setIsOpenCart, cartItems, addItemToCart, cartCount };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}