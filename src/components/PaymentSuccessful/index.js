import {withRouter} from 'react-router-dom'

import {FaCheckCircle} from 'react-icons/fa'

import Header from '../Header'

import './index.css'

const PaymentSuccessful = props => {
  const {history} = props

  const gotoHomePage = () => {
    history.replace('/')
    document.location.reload(true)
  }

  return (
    <>
      <Header choosen="cart" />
      <div className="payment-bg-container">
        <div className="payment-card-container">
          <FaCheckCircle className="check-circle" />
          <h1 className="payment-successful-text">Payment Successful</h1>
          <p className="payment-thankyou">
            Thank you for ordering
            <br />
            Your payment is successfully completed.
          </p>
          <button
            type="button"
            className="go-to-homepage-button"
            onClick={gotoHomePage}
          >
            Go To Home Page
          </button>
        </div>
      </div>
    </>
  )
}

export default withRouter(PaymentSuccessful)
