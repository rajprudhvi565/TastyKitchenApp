import {Component} from 'react'

import {withRouter} from 'react-router-dom'

import {FaRupeeSign} from 'react-icons/fa'

import Header from '../Header'

import Footer from '../Footer'

import CartItem from '../CartItem'

import './index.css'

class Cart extends Component {
  state = {
    totalAmount: 0,
    getFoodItemsData: null,
  }

  componentDidMount() {
    const getFoodItemsList = localStorage.getItem('cartData')
    const foodItemsList = JSON.parse(getFoodItemsList)
    this.setState({getFoodItemsData: foodItemsList})
  }

  showTotalAmount = () => {
    const {getFoodItemsData} = this.state

    const amountList = getFoodItemsData.map(eachItem => eachItem.foodItemsCost)

    console.log(amountList)

    const amount = amountList.reduce((a, b) => a + b)
    this.setState({totalAmount: amount})
  }

  updatedAddTotalAmount = amount => {
    this.setState(prevState => ({totalAmount: prevState.totalAmount + amount}))
  }

  updatedSubTotalAmount = amount => {
    this.setState(prevState => ({totalAmount: prevState.totalAmount - amount}))
  }

  orderNowClicked = () => {
    const {history} = this.props

    history.replace('/')
  }

  onClickConfirm = () => {
    localStorage.removeItem('cartData')

    const {history} = this.props

    history.replace('/payment-successful')
  }

  renderEmptyCart = () => (
    <div className="empty-card-container">
      <img
        src="https://res.cloudinary.com/dbcjaxxjm/image/upload/v1626187770/Tasty%20Kitchens%20App%20Assests/cooking_1_zkjdvq.png"
        alt="empty cart"
        className="cooking-image"
      />
      <h1 className="empty-cart-heading">No Orders Yet!</h1>
      <p className="empty-cart-description">
        Your cart is empty. Add something from the menu.
      </p>
      <button
        type="button"
        className="order-now-buton"
        onClick={this.orderNowClicked}
      >
        Order Now
      </button>
    </div>
  )

  renderCartComponents = () => {
    const {totalAmount, getFoodItemsData} = this.state

    if (totalAmount === 0) {
      this.showTotalAmount()
    }
    return (
      <>
        <div className="cart-container">
          <ul className="cart-headers-list">
            <li className="list-item-tex list-sub">Item</li>
            <li className="list-quantity-text list-sub">Quantity</li>
            <li className="list-price-text list-sub">Price</li>
          </ul>
          <div className="cart-food-items-container">
            {getFoodItemsData.map(eachItem => (
              <CartItem
                key={eachItem.foodItemId}
                foodItemDetails={eachItem}
                updatedAddTotalAmount={this.updatedAddTotalAmount}
                updatedSubTotalAmount={this.updatedSubTotalAmount}
              />
            ))}
          </div>
          <p className="cart-dashed-border">{}</p>
          <div className="cart-order-total-container">
            <h1 className="cart-order-total-text">Order Total:</h1>
            <h1 className="cart-order-total-amount" testid="total-price">
              <FaRupeeSign className="cart-total-rupee" />
              {totalAmount}.00
            </h1>
          </div>
          <div className="cart-confirm-button-container">
            <button
              type="button"
              className="confirm-order-button"
              onClick={this.onClickConfirm}
            >
              Place Order
            </button>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {getFoodItemsData} = this.state

    return (
      <>
        <Header />
        {getFoodItemsData === null
          ? this.renderEmptyCart()
          : this.renderCartComponents()}
        <Footer />
      </>
    )
  }
}
export default withRouter(Cart)
