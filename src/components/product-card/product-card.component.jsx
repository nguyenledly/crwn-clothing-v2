import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.actions";
import { selectCartItems } from "../../store/cart/cart.selectors";
import Button from "../button/button.component";
import "./product-card.style.scss";

export const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { name, price, imageUrl } = product;
    const cartItems = useSelector(selectCartItems);


    const onAddToCartClick = () => {
        dispatch(addItemToCart(cartItems, product));
    }
    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={name} className="product-image" />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button children={"ADD TO CART"} onClick={onAddToCartClick} />
        </div>
    )
}