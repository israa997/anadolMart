import axios from "axios";
import {
  SLIDER_IMAGE_REQUEST,
  SLIDER_IMAGE_SUCCESS,
  SLIDER_IMAGE_FAIL,
  ADVERTISMENT_IMAGE_REQUEST,
  ADVERTISMENT_IMAGE_SUCCESS,
  ADVERTISMENT_IMAGE_FAIL,
} from "../constants/homePageConstant";

export const getSliderImages = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SLIDER_IMAGE_REQUEST });

    const { data } = await axios.get("/api/home/topSlideImages");
    dispatch({
      type: SLIDER_IMAGE_SUCCESS,
      payload: data,
    });
    sessionStorage.setItem(
      "topSliderImages",
      
      JSON.stringify(data)
    );
  } catch (error) {
    dispatch({
      type: SLIDER_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
