import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAIL
} from "../constants/countriesConstant";
export const fetchCountriesReducer = (state = {countries:[]}, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES_REQUEST:
      return { loading: true, countries:[] };
    case FETCH_COUNTRIES_SUCCESS:
      return {
        loading: false,
        countries: action.payload,
      };
    case FETCH_COUNTRIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
