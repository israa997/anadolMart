import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import store from './store';
import './bootstrap.min.css'
import './index.css';
import { listProducts } from './actions/productActions';
import { getAllCountries } from './actions/countriesAction';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getAboutList } from './actions/aboutAction';
import { getBannerList } from './actions/bannerAction';

!sessionStorage.getItem("products") && store.dispatch(listProducts());
!sessionStorage.getItem("countries") && store.dispatch(getAllCountries());
store.dispatch(getAboutList());
store.dispatch(getBannerList());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
