import {
    ABOUT_LIST_REQUEST,
    ABOUT_LIST_SUCCESS,
    ABOUT_LIST_FAIL} from '../constants/aboutConstatnts'

export const aboutListReducer = (state = { about: [] }, action) => {
    switch (action.type) {
      case ABOUT_LIST_REQUEST:
        return {
          loading: true,
          about: [],
        };
      case ABOUT_LIST_SUCCESS:
        return {
          loading: false,
          about: action.payload,
        };
      case ABOUT_LIST_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };