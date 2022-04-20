import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { setIsOpenCart } from "../../store/cart/cart.actions";
import { selectCartCount, selectIsOpenCart } from "../../store/cart/cart.selectors";
import './cart-icon.style.scss';

export const CartIcon = () => {
    const isOpenCart = useSelector(selectIsOpenCart);
    const cartCount = useSelector(selectCartCount);
    const dispatch = useDispatch();

    const onCartIconClick = () => {
        dispatch(setIsOpenCart(!isOpenCart));
    }

    return (
        <div className="cart-icon-container" onClick={onCartIconClick}>
            <ShoppingIcon className='shopping-icon' />
            <span className="item-count">{cartCount}</span>
        </div>
    )
}