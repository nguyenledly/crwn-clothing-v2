import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom"
import { ReactComponent as Crown } from "../../assets/crown.svg";
import "./navigation.style.scss";

const Navigation = () => {
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
                    <Link to="/auth" className="nav-link">
                        SIGN IN
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
}
export default Navigation;