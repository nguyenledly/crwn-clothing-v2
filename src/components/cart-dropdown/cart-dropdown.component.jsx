import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import { CartItem } from '../cart-item/cart-item.component';
import './cart-dropdown.style.scss';

export const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div className='cart-dropdown-container'>
            {cartItems.length == 0 && <span className='empty-message'>Your cart is empty</span>}
            <div className='cart-items'>
                {cartItems.map(item => {
                    return <CartItem key={item.id} product={item} />
                })}
            </div>
            <Button>Checkout</Button>
        </div>
    )
}