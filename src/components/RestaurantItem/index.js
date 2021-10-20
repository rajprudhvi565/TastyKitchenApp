import './index.css'
import {Link} from 'react-router-dom'

const RestaurantItem = props => {
  const {hotelDetails} = props
  // cuisine was replaced with menu type
  const {imageUrl, name, cuisine, userRating, id} = hotelDetails
  return (
    <Link
      to={`/restaurant/${id}`}
      className="hylink-style"
      testid="restaurant-item"
    >
      <li className="each-hotel" testid="restaurant-item">
        <img src={imageUrl} alt="restaurant" className="hotel-image" />
        <div>
          <p className="name-text">{name}</p>
          <p className="cuisine-text">{cuisine}</p>
          <div className="star-rating">
            <img
              src="https://res.cloudinary.com/drkn9ypps/image/upload/v1634410164/7_Rating_ytewlh.svg"
              alt="star"
              className="star-icon"
            />
            <p className="rating-text">{userRating}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default RestaurantItem
