import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { sliderImageReducer } from "./reducers/homeReducer";
import { userDETAILSReducer, userLoginReducer, userRegisterReducer, userUPDATEProfileReducer } from "./reducers/userReducers";
import { fetchCountriesReducer } from "./reducers/countriesReducer";
import { orderCreateReducer, orderDeliverReducer, orderDetailsSReducer, orderPayReducer, orderListReducer, orderDetailsReducer } from "./reducers/orderReducers";
import { getOrderDetails } from "./actions/orderActions";

const reducer = 
combineReducers({
  // state: null
  sliderImages: sliderImageReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  cart: cartReducer,
  productList: productListReducer,
  countriesReducer: fetchCountriesReducer,
  orderCreate: orderCreateReducer,
  userDetails: userDETAILSReducer,
  userProfileUpdate: userUPDATEProfileReducer,
  userOrderDetails: orderDetailsSReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
  orderPay: orderPayReducer,
  orderDetails: orderDetailsReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const sliderImages = sessionStorage.getItem("topSliderImages")
  ? JSON.parse(sessionStorage.getItem("topSliderImages"))
  : [];

const productsFromStorage = sessionStorage.getItem("products")
  ? JSON.parse(sessionStorage.getItem("products"))
  : [];

const countriesFromStorage = sessionStorage.getItem("countries")
  ? JSON.parse(sessionStorage.getItem("countries"))
  : [];

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  sliderImages: { images: sliderImages },
  productList: { products: productsFromStorage },
  countriesReducer: {
    countries: countriesFromStorage
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;