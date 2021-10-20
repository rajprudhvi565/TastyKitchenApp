import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

window.scrollTo(0, 0)

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <div className="not-found-card-container">
        <img
          src="https://res.cloudinary.com/dbcjaxxjm/image/upload/v1626253691/Tasty%20Kitchens%20App%20Assests/Layer_1_bjex5f.png"
          alt="not found"
          className="not-found-image"
        />
        <h1 className="not-found-heading">PAGE NOT FOUND</h1>
        <p className="not-found-description">
          we are sorry, the page you requested could not be found
        </p>
        <Link to="/">
          <button type="button" className="not-found-custom-button">
            Home Page
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default NotFound
