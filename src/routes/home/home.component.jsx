import { Route, Routes } from "react-router-dom";
import Categories from "../../components/categories/categories.component";
import { Checkout } from "../../components/checkout/checkout.component";
import Navigation from "../navigation/navigation.component";
import Authentication from "../../components/authentication/auththentication.component";
import Shop from "../shop/shop.component";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createUserToFireStore, getCollectionData, onAuthStateChangedListener } from "../../utils/firebase/firebase.util";
import { setCurrentUser } from "../../store/user/user.actions";
import { setCategories } from "../../store/categories/categories.actions";

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChangedListener(async (user) => {
            if (user) {
                await createUserToFireStore(user);
            }
            dispatch(setCurrentUser(user));
        });
        // Get categories
        const getData = async () => {
            const mapCategories = await getCollectionData('categories');
            dispatch(setCategories(mapCategories));
        }
        getData();
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