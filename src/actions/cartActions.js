import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const addToCart = (productName, qty, color, size, productImageUrl) => async (
  dispatch,
  getState
) => {
  const productsFromStorage = sessionStorage.getItem("products")
    ? JSON.parse(sessionStorage.getItem("products"))
    : [];
  console.log(productsFromStorage);
  const singleProductDetail = productsFromStorage.filter(
    (product) => product.product_slug_name === productName
  )[0];
  console.log(singleProductDetail);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: singleProductDetail.product_slug_name,
      name: singleProductDetail.en_name,
      image: productImageUrl,
      price: singleProductDetail.countries[0].pricepercountry.realPrice,
      countInStock: qty,
      qty,
      color,
      size,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
