import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../../components/product-card/product-card.component';
import './category-preview.style.scss';

export const CategoryPreview = ({ title, products }) => {
    const navigate = useNavigate();
    const goToDetailPage = () => {
        navigate(`/shop/${title}`)
    }
    return (
        <div className='category-preview-container'>
            <h1>
                <span className='title' onClick={goToDetailPage}>{title.toUpperCase()}</span>
            </h1>
            <div className='preview'>
                {
                    products.slice(0, 4).map((product) => {
                        return <ProductCard key={product.id} product={product}></ProductCard>
                    })
                }
            </div>
        </div>
    )
}