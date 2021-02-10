import {
    BANNER_LIST_REQUEST,
    BANNER_LIST_SUCCESS,
    BANNER_LIST_FAIL} from '../constants/bannerConstatnts'

export const BannerListReducer = (state = { banner: [] }, action) => {
    switch (action.type) {
      case BANNER_LIST_REQUEST:
        return {
          loading: true,
          banner: [],
        };
      case BANNER_LIST_SUCCESS:
        return {
          loading: false,
          banner: action.payload,
        };
      case BANNER_LIST_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  