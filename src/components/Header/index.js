import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {choosen} = props

  const logoutUser = () => {
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/login')
  }

  let classNameForHome = 'header-nav-unactive-link'
  let classNameForCart = 'header-nav-unactive-link'

  if (choosen === 'cart') {
    classNameForCart = ''
  }

  if (choosen === 'home') {
    classNameForHome = ''
  }

  return (
    <nav className="header-nav-bg-container">
      <Link to="/" className="header-link">
        <div className="header-nav-website-logo-container">
          <img
            src="https://res.cloudinary.com/dbcjaxxjm/image/upload/v1625741571/Tasty%20Kitchens%20App%20Assests/Frame_274_tastyHat_lgmw8o.png"
            alt="website logo"
            className="nav-website-logo"
          />
          <h1 className="header-nav-heading">Tasty Kitchens</h1>
        </div>
      </Link>
      <ul className="header-nav-links-container">
        <Link to="/" className="header-link">
          {' '}
          <li className={`header-nav-link ${classNameForHome}`}>Home</li>
        </Link>
        <Link to="/Cart" className="header-link">
          {' '}
          <li className={`header-nav-link ${classNameForCart}`}>Cart</li>
        </Link>
        <li>
          <button
            type="button"
            className="header-nav-logout-button"
            onClick={logoutUser}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
