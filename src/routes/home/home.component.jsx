import { Route, Routes, useNavigate } from "react-router-dom";
import Categories from "../../components/categories/categories.component";
import { Checkout } from "../../components/checkout/checkout.component";
import Navigation from "../navigation/navigation.component";
import Authentication from "../../components/authentication/auththentication.component";
import Shop from "../shop/shop.component";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkUserSession } from "../../store/user/user.actions";
import { fetchCategoriesStart } from "../../store/categories/categories.actions";

const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(checkUserSession());
        dispatch(fetchCategoriesStart());
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                {/* This is called: Nested route */}
                <Route index element={<Categories />}></Route>
                <Route path="shop/*" element={<Shop />}></Route>
                <Route path="auth" element={<Authentication />}></Route>
                <Route path="checkout" element={<Checkout />}></Route>
            </Route>
        </Routes>
    );
}
export default Home;