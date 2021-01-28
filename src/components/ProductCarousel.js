import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image  from "react-bootstrap/Image";
import Loader from '../components/Loader';
import Message from '../components/Message'

import { getSliderImages } from '../actions/homeAction';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserView, MobileView } from "react-device-detect";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const sliderImages = useSelector((state) => state.sliderImages);
  const {loading, images, error} = sliderImages
  
  useEffect(()=> {
    !sessionStorage.getItem("topSliderImages") && dispatch(getSliderImages())
  },[dispatch])

  return (
    <>
    {error && <Message variant='danger'>{error}</Message>}
   {loading && <Loader />}
      <BrowserView>
        <Carousel nextIcon="" prevIcon="" interval={1000}>
          {images.map(image => (
            <Carousel.Item interval={3000} key={image.id}>
            <Image
              src={
                process.env.REACT_APP_BACKEND_URL + 'topSliderImages/' +
                image.image_ar_url
              }
              alt=""
              className="d-block w-100"
            />
          </Carousel.Item>
          ))}
        </Carousel>
      </BrowserView>

      <MobileView>
        <Carousel nextIcon="" prevIcon="" interval={1000}>
        {images.map(image => (
            <Carousel.Item interval={3000} key={image.id}>
            <Image
              src={
                process.env.REACT_APP_BACKEND_URL + 'topSliderImages/mobile/' +
                image.mobile_image_ar_url
              }
              alt=""
              className="d-block w-100"
            />
          </Carousel.Item>
          ))}
        </Carousel>
      </MobileView>
      </>
   
  );
};

export default ProductCarousel;
