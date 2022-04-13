import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../product-card/product-card.component';
import './category-detail.style.scss';

const CategoryDetail = () => {
    const { categories } = useSelector((state) => state.categories);
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categories[category]);
    }, [category, categories]);
    return (
        <div className='category-detail-container'>
            {products && <Fragment>
                <h1>
                    <span className='title'>{category.toUpperCase()}</span>
                </h1>
                <div className='products'>
                    {
                        products.map((product) => {
                            return <ProductCard key={product.id} product={product}></ProductCard>
                        })
                    }
                </div>
            </Fragment>}
        </div>
    )
}

export default CategoryDetail;