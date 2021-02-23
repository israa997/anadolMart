import axios from 'axios';
import {
    ABOUT_LIST_REQUEST,
    ABOUT_LIST_SUCCESS,
    ABOUT_LIST_FAIL} from '../constants/aboutConstatnts';

export const getAboutList = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ABOUT_LIST_REQUEST,
      });
  
      const { data } = await axios.get("/api/home/about");
  
      dispatch({
        type: ABOUT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ABOUT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };