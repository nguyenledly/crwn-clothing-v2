import { useNavigate } from "react-router-dom";
import "./category-item.style.scss";

const CategoryItem = ({category}) => {
    const {title, imageUrl} = category;
    const navigate = useNavigate();
    const goToShopDetailPage = () => {
      navigate(`/shop/${title.toLowerCase()}`)
    }
    return <div className='category-container'>
    <div className='background-image' style={{backgroundImage: `url(${imageUrl})`}} />
    <div className='category-body-container' onClick={goToShopDetailPage}>
      <h2>{title.toUpperCase()}</h2>
      <p>Shop Now</p>
    </div>
  </div>
}
export default CategoryItem;