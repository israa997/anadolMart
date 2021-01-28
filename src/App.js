import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import OrderScreen from './screens/OrderScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {ProfileScreen} from './screens/ProfileScreen'
import userOrderScreen from './screens/UserOrderScreen'
const App = () => {
  
  return (
    
    <Router>
      <Header />
      <main style={{marginTop: "6rem"}}>
        <Route path='/order/:id' component={OrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/orders' component={userOrderScreen}/>
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/product/:slug_name' component={ProductScreen} />
          <Route path='/cart/:slug_name?' component={CartScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
