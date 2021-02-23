import axios from 'axios'
import {
    BANNER_LIST_REQUEST,
    BANNER_LIST_SUCCESS,
    BANNER_LIST_FAIL} from '../constants/bannerConstatnts'

    export const getBannerList = () => async (dispatch, getState) => {
        try {
          dispatch({
            type: BANNER_LIST_REQUEST,
          });
      
          const { data } = await axios.get(
            "/api/home/banner"
          );
      
          dispatch({
            type: BANNER_LIST_SUCCESS,
            payload: data,
          });
        } catch (error) {
          dispatch({
            type: BANNER_LIST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
        }
      };