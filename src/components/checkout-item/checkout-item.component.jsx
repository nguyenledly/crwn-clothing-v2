import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import './checkout-item.style.scss';
export const CheckoutItem = ({ product }) => {
    const { name, quantity, imageUrl, price } = product;
    const { addItemToCart, subItemToCart, removeItemToCart } = useContext(CartContext);
    const increaseItem = () => {
        addItemToCart(product);
    }
    const decreaseItem = () => {
        subItemToCart(product);
    }
    const onRemoveItem = () => {
        removeItemToCart(product);
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