import axios from "axios";
import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAIL,
} from "../constants/countriesConstant";

export const getAllCountries = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_COUNTRIES_REQUEST,
    });

    const { data } = await axios.get("/api/home/countries");
    console.log(data)

    dispatch({
      type: FETCH_COUNTRIES_SUCCESS,
      payload: data,
    });
    sessionStorage.setItem(
        "countries",
        
        JSON.stringify(data)
      );
  } catch (error) {
    dispatch({
      type: FETCH_COUNTRIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
