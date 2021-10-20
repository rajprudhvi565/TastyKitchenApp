import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import {FaStar, FaRupeeSign} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import FoodItems from '../FoodItems'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    restaurantDetails: '',
    foodItems: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const restaurantDetailsUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const rawRestaurantResponse = await fetch(restaurantDetailsUrl, options)
    if (rawRestaurantResponse.ok === true) {
      const rawRestaurantDetails = await rawRestaurantResponse.json()
      const updatedRestaurantDetails = {
        costForTwo: rawRestaurantDetails.cost_for_two,
        cuisine: rawRestaurantDetails.cuisine,
        foodItems: rawRestaurantDetails.food_items.map(eachItem => ({
          foodItemsCost: eachItem.cost,
          fixedCost: eachItem.cost,
          foodType: eachItem.food_type,
          foodItemId: eachItem.id,
          foodImage: eachItem.image_url,
          foodName: eachItem.name,
          foodRating: eachItem.rating,
        })),
        restaurantId: rawRestaurantDetails.id,
        restaurantImage: rawRestaurantDetails.image_url,
        itemsCount: rawRestaurantDetails.items_count,
        location: rawRestaurantDetails.location,
        restaurantName: rawRestaurantDetails.name,
        opensAt: rawRestaurantDetails.opens_at,
        rating: rawRestaurantDetails.rating,
        reviewsCount: rawRestaurantDetails.reviews_count,
      }
      this.setState({
        restaurantDetails: updatedRestaurantDetails,
        foodItems: updatedRestaurantDetails.foodItems,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
    // const updatedRestaurantDetails =
  }

  renderRestaurantDetails = () => {
    const {restaurantDetails, foodItems} = this.state
    const {
      restaurantId,
      restaurantImage,
      itemsCount,
      location,
      restaurantName,
      opensAt,
      rating,
      reviewsCount,
      cuisine,
      costForTwo,
    } = restaurantDetails
    return (
      <>
        <Header />
        <div className="restaurant-Image-text-details-container">
          <img
            src={restaurantImage}
            alt="restaurant"
            className="separate-restaurant-image"
          />

          <div className="restaurant-details-container">
            <h1 className="separate-restaurant-name">{restaurantName}</h1>
            <p className="separate-restaurant-type">{cuisine}</p>
            <p className="separate-restaurant-location">{location}</p>
            <div className="separate-rating-costs-container">
              <div className="separate-rating-details-container">
                <div className="separate-rating-container">
                  <FaStar className="separate-star-icon" />
                  <p className="separate-rating">{rating}</p>
                </div>
                <p className="para">{`${reviewsCount} Ratings`}</p>
              </div>
              <div className="cost-for-two-container">
                <div className="cost-container">
                  <FaRupeeSign className="rupees-icon" />
                  <p className="cost-for-two">{costForTwo}</p>
                </div>
                <p className="para">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <div className="restaurant-each-item-container">
          {foodItems.map(eachItem => (
            <FoodItems foodItemDetails={eachItem} key={eachItem.foodItemId} />
          ))}
        </div>
        <Footer />
      </>
    )
  }

  loadRestaurantDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderRestaurantDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="restaurant-details-loader">
      <Loader type="TailSpin" color="#F7931E" height="40" width="50" />
    </div>
  )

  render() {
    return <div>{this.loadRestaurantDetails()}</div>
  }
}
export default RestaurantDetails
