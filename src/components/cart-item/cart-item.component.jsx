import './cart-item.style.scss';
export const CartItem = ({ product }) => {
    const { name, price, imageUrl, quantity } = product;

    return (
        <div className="cart-item-container">
            <img src={imageUrl} alt={name} />
            <div className="item-details">
                <span className="name">{name} </span>
                <span>{quantity} x ${price}</span>
            </div>

        </div>
    )
}