import "./shop.style.scss"
import { Route, Routes } from "react-router-dom";
import Categories from "../categories/categories.component";
import CategoryDetail from "../../components/category-detail/category-detail.component";

const Shop = () => {
    return (
        <Routes>
            <Route index element={<Categories />} />
            <Route path=":category" element={<CategoryDetail />} />
        </Routes>
    )
}
export default Shop;