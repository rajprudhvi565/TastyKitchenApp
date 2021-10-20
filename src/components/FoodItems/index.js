import './index.css'
import {Component} from 'react'

import {FaStar, FaRupeeSign} from 'react-icons/fa'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

class FoodItems extends Component {
  state = {isClicked: false, quantity: 1, itemId: ''}

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
    const localStorageData = JSON.parse(localStorage.getItem('cartData'))
    console.log(localStorageData)
    const {itemId} = this.state
    console.log(itemId)
    localStorageData.map(eachObj => {
      if (eachObj.foodItemId === itemId) {
        // eslint-disable-next-line no-param-reassign
        eachObj.quantity += 1
        return eachObj
      }
      return eachObj
    })
    localStorage.setItem('cartData', JSON.stringify(localStorageData))
  }

  updateLocalStorage = value => {
    const eachData = value
    console.log(eachData)
    const {itemId} = this.state
    if (eachData.foodItemId === itemId) {
      eachData.quantity += 1
    }
    const localStorageData = JSON.parse(localStorage.getItem('cartData'))
    localStorage.setItem('food_items', JSON.stringify(localStorageData))
  }

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
    const localStorageData = JSON.parse(localStorage.getItem('cartData'))
    console.log(localStorageData)
    const {itemId} = this.state
    console.log(itemId)
    localStorageData.map(eachObj => {
      if (eachObj.foodItemId === itemId && eachObj.quantity > 1) {
        // eslint-disable-next-line no-param-reassign
        eachObj.quantity -= 1
        return eachObj
      }
      return eachObj
    })
    localStorage.setItem('cartData', JSON.stringify(localStorageData))
  }

  onClickAdd = () => {
    const oldItem = JSON.parse(localStorage.getItem('cartData')) || []
    const {isClicked, quantity} = this.state
    const {foodItemDetails} = this.props
    Object.assign(foodItemDetails, {quantity})
    // console.log(foodItems)
    this.setState({isClicked: !isClicked, itemId: foodItemDetails.foodItemId})
    // example for array "some method" const result = array1.every((array1) => array1 < 40);
    const result = oldItem.some(
      eachItem => eachItem.foodItemId === foodItemDetails.foodItemId,
    )
    if (result !== true) {
      oldItem.push(foodItemDetails)
      localStorage.setItem('cartData', JSON.stringify(oldItem))
    }
  }

  render() {
    const {foodItemDetails} = this.props
    const {
      foodItemsCost,
      foodType,
      foodItemId,
      foodImage,
      foodName,
      foodRating,
    } = foodItemDetails
    const {quantity, isClicked, itemId} = this.state
    return (
      <>
        <div className="food-list-cont" testid="foodItem">
          <img src={foodImage} alt="foodimage" className="food-image" />
          <div>
            <h1 className="item-name-text">{foodName}</h1>
            <div className="cost-main-cont">
              <FaRupeeSign className="icon-top-space" />
              <p className="cost-rate-text">{foodItemsCost}</p>
            </div>
            <div className="rating-main-cont">
              <FaStar className="icon-top-space star-icon" />
              <p className="cost-rate-text">{foodRating} </p>
            </div>
            <div>
              {isClicked ? (
                <div className="quantity-container-control">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onDecrementQuantity}
                    testid="decrement-count"
                  >
                    <BsDashSquare className="quantity-controller-icon" />
                  </button>
                  <p className="quantity" testid="active-count">
                    {quantity}
                  </p>
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onIncrementQuantity}
                    testid="increment-count"
                  >
                    <BsPlusSquare className="quantity-controller-icon" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="add-button"
                  onClick={this.onClickAdd}
                >
                  ADD
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default FoodItems
