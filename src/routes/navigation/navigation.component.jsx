import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom"
import { ReactComponent as Crown } from "../../assets/crown.svg";
import { CartDropdown } from "../../components/cart-dropdown/cart-dropdown.component";
import { CartIcon } from "../../components/cart-icon/cart-icon.component";
import "./navigation.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selectors";
import { selectIsOpenCart } from "../../store/cart/cart.selectors";
import { signOutStart } from "../../store/user/user.actions";

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isOpenCart = useSelector(selectIsOpenCart);
    const onSignOut = () => {
        dispatch(signOutStart());
    }

    return (
        <Fragment>
            <div className="navigation">
                <div className="logo-container">
                    <Link to="/" >
                        <Crown className="logo" />
                    </Link>
                </div>

                <div className="nav-links-container">
                    <Link to="/shop" className="nav-link">
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={onSignOut}>SIGN OUT</span>
                        ) : (
                            <Link to="/auth" className="nav-link">
                                SIGN IN
                            </Link>
                        )
                    }
                    <CartIcon />
                </div>
                {isOpenCart && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    );
}
export default Navigation;