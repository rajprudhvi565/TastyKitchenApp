import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  usernameEntered = event => {
    this.setState({username: event.target.value})
  }

  passwordEntered = event => {
    this.setState({password: event.target.value})
  }

  sendErrorMsg = message => {
    this.setState({isError: true, errorMsg: message})
  }

  callHomeComponent = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userData = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      this.callHomeComponent(data.jwt_token)
    } else {
      this.sendErrorMsg(data.error_msg)
    }
  }

  render() {
    const {isError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <form className="login-form-container" onSubmit={this.onSubmitForm}>
          <div className="login-website-container">
            <img
              src="https://res.cloudinary.com/dbcjaxxjm/image/upload/v1625741571/Tasty%20Kitchens%20App%20Assests/Frame_274_tastyHat_lgmw8o.png"
              className="login-website-logo"
              alt="website logo"
            />
            <h1 className="login-website-name">Tasty Kitchens</h1>
          </div>
          <h1 className="login-sign-in-text">Login</h1>
          <label htmlFor="username" className="login-label">
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            className="login-input"
            onChange={this.usernameEntered}
          />
          <label htmlFor="password" className="login-label">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            className="login-input"
            onChange={this.passwordEntered}
          />
          <button type="submit" className="login-custom-button">
            Login
          </button>
          {isError && <p className="login-form-error-msg-text">{errorMsg}</p>}
        </form>
        <img
          src="https://res.cloudinary.com/dbcjaxxjm/image/upload/v1625740789/Tasty%20Kitchens%20App%20Assests/Rectangle_1456loginImage_j4imyo.png"
          className="login-cover-image"
          alt="website login"
        />
      </div>
    )
  }
}

export default LoginForm
