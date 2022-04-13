import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom"
import { ReactComponent as Crown } from "../../assets/crown.svg";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.util";
import { CartDropdown } from "../../components/cart-dropdown/cart-dropdown.component";
import { CartIcon } from "../../components/cart-icon/cart-icon.component";
import "./navigation.style.scss";
import { useSelector } from "react-redux";

const Navigation = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { isOpenCart } = useContext(CartContext);
    const onSignOut = async () => {
        await signOutUser();
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