import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";
import './cart-icon.style.scss';

export const CartIcon = () => {
    const { isOpenCart, setIsOpenCart, cartItems, cartCount } = useContext(CartContext);
    const onCartIconClick = () => {
        setIsOpenCart(!isOpenCart);
    }

    return (
        <div className="cart-icon-container" onClick={onCartIconClick}>
            <ShoppingIcon className='shopping-icon' />
            <span className="item-count">{cartCount}</span>
        </div>
    )
}