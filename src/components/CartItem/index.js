import {Component} from 'react'

import {FaRupeeSign} from 'react-icons/fa'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import './index.css'

class CartItem extends Component {
  componentDidMount() {
    const {foodItemDetails} = this.props
    const {fixedCost, foodItemId} = foodItemDetails

    const costEl = document.getElementById(`cost${foodItemId}`)
    const quantityEl = document.getElementById(`quantity${foodItemId}`)

    const quantityValue = parseInt(quantityEl.textContent, 10)
    costEl.textContent = quantityValue * fixedCost

    // foodItemsCost
    const localStorageData = JSON.parse(localStorage.getItem('cartData'))
    localStorageData.map(eachObj => {
      if (eachObj.foodItemId === foodItemId) {
        // eslint-disable-next-line no-param-reassign
        eachObj.foodItemsCost = quantityValue * fixedCost
        return eachObj
      }
      return eachObj
    })
    localStorage.setItem('cartData', JSON.stringify(localStorageData))
  }

  onIncrease = () => {
    const {foodItemDetails, updatedAddTotalAmount} = this.props
    const {fixedCost, foodItemId} = foodItemDetails

    const quantityEl = document.getElementById(`quantity${foodItemId}`)
    const costEl = document.getElementById(`cost${foodItemId}`)

    const quantityValue = parseInt(quantityEl.textContent, 10)
    if (quantityValue > 0) {
      const costValue = parseInt(costEl.textContent, 10)

      const updatedValue = quantityValue + 1
      const updatedCost = costValue + fixedCost

      quantityEl.textContent = updatedValue
      costEl.textContent = updatedCost

      if (quantityValue > 0) {
        const localStorageData = JSON.parse(localStorage.getItem('cartData'))
        localStorageData.map(eachObj => {
          if (eachObj.foodItemId === foodItemId) {
            // eslint-disable-next-line no-param-reassign
            eachObj.foodItemsCost = updatedCost
            // eslint-disable-next-line no-param-reassign
            eachObj.quantity = updatedValue
            return eachObj
          }
          return eachObj
        })
        localStorage.setItem('cartData', JSON.stringify(localStorageData))
      }

      updatedAddTotalAmount(fixedCost)
    }
  }

  onDecrease = () => {
    const {foodItemDetails, updatedSubTotalAmount} = this.props
    const {foodItemId, fixedCost} = foodItemDetails

    const quantityEl = document.getElementById(`quantity${foodItemId}`)
    const costEl = document.getElementById(`cost${foodItemId}`)

    const quantityValue = parseInt(quantityEl.textContent, 10)
    if (quantityValue > 1) {
      const costValue = parseInt(costEl.textContent, 10)

      const updatedValue = quantityValue - 1
      const updatedCost = costValue - fixedCost

      quantityEl.textContent = updatedValue
      costEl.textContent = updatedCost

      if (quantityValue > 1) {
        const localStorageData = JSON.parse(localStorage.getItem('cartData'))
        localStorageData.map(eachObj => {
          if (eachObj.foodItemId === foodItemId) {
            // eslint-disable-next-line no-param-reassign
            eachObj.foodItemsCost = updatedCost
            // eslint-disable-next-line no-param-reassign
            eachObj.quantity = updatedValue
            return eachObj
          }
          return eachObj
        })
        localStorage.setItem('cartData', JSON.stringify(localStorageData))
      }

      updatedSubTotalAmount(fixedCost)
    }
  }

  render() {
    const {foodItemDetails} = this.props
    console.log(foodItemDetails)
    const {
      foodItemId,
      foodImage,
      foodName,
      foodItemsCost,
      quantity,
    } = foodItemDetails
    return (
      <ul className="cart-items-list">
        <li className="img-food-name">
          <img
            src={foodImage}
            alt={foodName}
            className="cart-food-item-image"
          />
          <h1 className="food-name-heading">{foodName}</h1>
        </li>
        <li className="controller-container">
          <div className="quantity-container">
            <button
              type="button"
              className="quantity-controller-button"
              onClick={this.onDecrease}
              testid="decrement-quantity"
            >
              <BsDashSquare className="quantity-controller-icon" />
            </button>
            <p
              className="quantity"
              id={`quantity${foodItemId}`}
              testid="item-quantity"
            >
              {quantity}
            </p>
            <button
              type="button"
              className="quantity-controller-button"
              onClick={this.onIncrease}
              testid="increment-quantity"
            >
              <BsPlusSquare className="quantity-controller-icon" />
            </button>
          </div>
        </li>
        <li className="food-item-cost-container">
          <p className="cart-food-item-cost">
            <FaRupeeSign className="cart-item-rupee" />
            <span id={`cost${foodItemId}`}>{foodItemsCost}</span>.00
          </p>
        </li>
      </ul>
    )
  }
}
export default CartItem
