import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../../store/cart/cart.selectors';
import Button from '../button/button.component';
import { CartItem } from '../cart-item/cart-item.component';
import './cart-dropdown.style.scss';

export const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutPage = () => {
        navigate('/checkout');
    }
    return (
        <div className='cart-dropdown-container'>
            {cartItems.length == 0 && <span className='empty-message'>Your cart is empty</span>}
            <div className='cart-items'>
                {cartItems.map(item => {
                    return <CartItem key={item.id} product={item} />
                })}
            </div>
            <Button onClick={goToCheckoutPage}>Checkout</Button>
        </div>
    )
}