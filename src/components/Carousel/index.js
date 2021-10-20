import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Cookies from 'js-cookie'

import React, {Component} from 'react'
import Slider from 'react-slick'

import './index.css'

export default class SimpleSlider extends Component {
  state = {
    carouselImagesList: [],
  }

  componentDidMount() {
    this.getCarouselImages()
  }

  getCarouselImages = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const carouselApiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const Carouselresponse = await fetch(carouselApiUrl, options)
    if (Carouselresponse.ok === true) {
      const fetchedImages = await Carouselresponse.json()
      const upadatedImages = fetchedImages.offers.map(eachImage => ({
        imageUrl: eachImage.image_url,
        id: eachImage.id,
      }))
      this.setState({carouselImagesList: upadatedImages})
    }
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    const {carouselImagesList} = this.state
    return (
      <div>
        <Slider {...settings}>
          {carouselImagesList.map(eachItem => (
            <div key={eachItem.id}>
              <img
                src={eachItem.imageUrl}
                alt="offer"
                className="carousel-image"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }
}
