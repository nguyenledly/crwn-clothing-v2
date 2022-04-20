import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCategoriesLoading, selectCategoriesMap } from '../../store/categories/categories.selectors';
import { ProductCard } from '../product-card/product-card.component';
import Spinner from '../spinner/spinner.component';
import './category-detail.style.scss';

const CategoryDetail = () => {
    const categories = useSelector(selectCategoriesMap);
    const categoriesLoading = useSelector(selectCategoriesLoading);
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categories[category]);
    }, [category, categories]);
    return (
        <Fragment>
            <h1>
                <span className='title'>{category.toUpperCase()}</span>
            </h1>
            {
                categoriesLoading
                    ? (<Spinner />)
                    : (<div className='category-detail-container'>
                        {products &&
                            <div className='products'>
                                {
                                    products.map((product) => {
                                        return <ProductCard key={product.id} product={product}></ProductCard>
                                    })
                                }
                            </div>
                        }
                    </div>)
            }
        </Fragment>
    )
}

export default CategoryDetail;