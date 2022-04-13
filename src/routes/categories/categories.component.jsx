import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import { CategoryPreview } from "../category-preview/category-preview.component";
import "./categories.style.scss"

const Categories = () => {
    const { categories } = useSelector((state) => state.categories);

    return (
        <Fragment>
            {categories && Object.keys(categories).map(categoryKey => {
                const products = categories[categoryKey];
                return (
                    <CategoryPreview key={categoryKey} title={categoryKey} products={products} />
                )
            })}
        </Fragment>

    )
}
export default Categories;