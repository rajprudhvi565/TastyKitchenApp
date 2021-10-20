import {BsFilterLeft, BsFillCaretDownFill} from 'react-icons/bs'
// this file and folder can be deleted later
import {FaCheck} from 'react-icons/fa'

import './index.css'

const onLowest = 'lowest'

const onHighest = 'highest'

const RestaurantListHeader = props => {
  const {onSortOptionsSelected} = props

  const onSortByClicked = () => {
    const sortBySelectOptionsEl = document.getElementById('sortBySelectOptions')

    sortBySelectOptionsEl.classList.toggle(
      'restaurant-header-sort-options-container-hide',
    )
  }

  const onClickLowest = () => {
    const checkIconLowestEl = document.getElementById('checkIconLowest')
    const checkIconHighestEl = document.getElementById('checkIconHighest')

    checkIconLowestEl.classList.add('check-icon')
    checkIconHighestEl.classList.remove('check-icon')

    onSortOptionsSelected(onLowest)
  }

  const onClickHighest = () => {
    const checkIconLowestEl = document.getElementById('checkIconLowest')
    const checkIconHighestEl = document.getElementById('checkIconHighest')

    checkIconHighestEl.classList.add('check-icon')
    checkIconLowestEl.classList.remove('check-icon')

    onSortOptionsSelected(onHighest)
  }

  return (
    <div className="restaurant-list-header-container">
      <div className="restaurant-list-header-sortby-container">
        <div>
          <h1 className="restaurant-list-header-heading">
            Popular Restaurants
          </h1>
          <p className="restaurant-list-header-description">
            Select Your favourite restaurant special dish and make your day
            happy..
          </p>
        </div>
        <button
          type="button"
          className="restaurant-list-header-button"
          onClick={onSortByClicked}
        >
          <BsFilterLeft className="filter-icon" />
          <p className="restaurant-list-header-sort-by-text">Sort By</p>
          <BsFillCaretDownFill className="downfill-icon" />
        </button>
      </div>
      <div
        id="sortBySelectOptions"
        className="restaurant-header-sort-options-container restaurant-header-sort-options-container-hide"
      >
        <button
          type="button"
          className="restaurant-header-sort-options-button"
          onClick={onClickLowest}
        >
          Lowest
          <FaCheck id="checkIconLowest" className="check-icon-hide" />
        </button>
        <button
          type="button"
          className="restaurant-header-sort-options-button"
          onClick={onClickHighest}
        >
          Highest
          <FaCheck id="checkIconHighest" className="check-icon-hide" />
        </button>
      </div>
    </div>
  )
}

export default RestaurantListHeader
