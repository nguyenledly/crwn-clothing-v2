import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemToCart, subItemToCart } from "../../store/cart/cart.actions";
import { selectCartItems } from "../../store/cart/cart.selectors";
import './checkout-item.style.scss';
export const CheckoutItem = ({ product }) => {
    const { name, quantity, imageUrl, price } = product;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const increaseItem = () => {
        dispatch(addItemToCart(cartItems, product));
    }
    const decreaseItem = () => {
        dispatch(subItemToCart(cartItems, product));
    }
    const onRemoveItem = () => {
        dispatch(removeItemToCart(cartItems, product));
    }
    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={decreaseItem}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={increaseItem}>&#10095;</div>
            </span>
            {/* <span  onClick={increaseItem}>Increase</span>
            <span onClick={decreaseItem}>Decrease</span> */}
            <span className="price">${price}</span>
            <span className="remove-button" onClick={onRemoveItem}>&#10005;</span>
        </div>
    )
}