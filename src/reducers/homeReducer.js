import {
    SLIDER_IMAGE_REQUEST,
    SLIDER_IMAGE_SUCCESS,
    SLIDER_IMAGE_FAIL,
    ADVERTISMENT_IMAGE_REQUEST,
    ADVERTISMENT_IMAGE_SUCCESS,
    ADVERTISMENT_IMAGE_FAIL,
  } from "../constants/homePageConstant";

export const sliderImageReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case SLIDER_IMAGE_REQUEST:
      return { loading: true, images: [] };
    case SLIDER_IMAGE_SUCCESS:
      return {
        loading: false,
        images: action.payload,
      };
    case SLIDER_IMAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
