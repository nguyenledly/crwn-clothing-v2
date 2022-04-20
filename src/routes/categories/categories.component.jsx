import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../components/spinner/spinner.component";
import { selectCategoriesLoading, selectCategoriesMap } from "../../store/categories/categories.selectors";
import { CategoryPreview } from "../category-preview/category-preview.component";
import "./categories.style.scss"

const Categories = () => {
    const categories = useSelector(selectCategoriesMap);
    const categoriesLoading = useSelector(selectCategoriesLoading);
    return (
        <Fragment>
            {categoriesLoading ? (<Spinner />) :
                (< Fragment >
                    {categories && Object.keys(categories).map(categoryKey => {
                        const products = categories[categoryKey];
                        return (
                            <CategoryPreview key={categoryKey} title={categoryKey} products={products} />
                        )
                    })}
                </Fragment >)}
        </Fragment>
    )

}
export default Categories;