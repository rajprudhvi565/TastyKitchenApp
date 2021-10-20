import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import RestaurantListHeader from '../RestaurantListHeader'

import RestaurantItem from '../RestaurantItem'

import PaginationButton from '../PaginationButton'

import './index.css'
// This file and folder can be deleted later
class RestaurantList extends Component {
  state = {
    restaurantsListData: [],
    isLoading: true,
    firstPage: 1,
    lastPage: 0,
    sortByValue: '',
  }

  componentDidMount() {
    this.getRestaurantListData()
  }

  convertResponseData = data => {
    const restaurantListData = data.map(eachData => ({
      id: eachData.id,
      name: eachData.name,
      cuisine: eachData.cuisine,
      imageUrl: eachData.image_url,
      userRating: eachData.user_rating.rating,
      totalReviews: eachData.user_rating.total_reviews,
    }))

    this.setState({restaurantsListData: restaurantListData, isLoading: false})
  }

  onSortOptionsSelected = value => {
    this.setState({sortByValue: value}, this.getRestaurantListData)
  }

  onPaginationButtonClicked = pageNo => {
    this.setState({firstPage: pageNo}, this.getRestaurantListData)
  }

  getRestaurantListData = async () => {
    const {firstPage, sortByValue} = this.state

    const LIMIT = 9
    const activePage = 9 * firstPage
    const offset = activePage - 1 * LIMIT

    const selectedSortValue = sortByValue

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    let apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}`
    if (sortByValue !== '') {
      apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${selectedSortValue}`
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    this.convertResponseData(data.restaurants)
    this.setState({lastPage: Math.ceil(data.total / 9)})
  }

  renderLoadingSpinner = () => (
    <div className="restaurant-list-loader">
      <Loader
        type="ThreeDots"
        color="#F7931E"
        height={50}
        width={50}
        testid="restaurants-list-loader"
      />
    </div>
  )

  renderRestaurantListComponents = () => {
    const {restaurantsListData, firstPage, lastPage} = this.state

    return (
      <>
        <div className="restaurant-list-item-container">
          {restaurantsListData.map(eachItem => (
            <RestaurantItem
              key={eachItem.id}
              hotelDetails={eachItem}
              testid="restaurant-item"
            />
          ))}
        </div>
        <PaginationButton
          firstPage={firstPage}
          lastPage={lastPage}
          onPaginationButtonClicked={this.onPaginationButtonClicked}
        />
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <RestaurantListHeader
          onSortOptionsSelected={this.onSortOptionsSelected}
        />
        {isLoading
          ? this.renderLoadingSpinner()
          : this.renderRestaurantListComponents()}
      </>
    )
  }
}

export default RestaurantList
