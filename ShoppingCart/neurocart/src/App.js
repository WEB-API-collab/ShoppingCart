import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
import HomeScreen from './pages/home';
import ProductScreen from './pages/product';
import CartScreen from './pages/cart';
import SigninScreen from './pages/signin';
import { useSelector } from 'react-redux';
import RegisterScreen from './pages/register';
import ProductsScreen from './pages/products';
import ShippingScreen from './pages/shipping';
import PaymentScreen from './pages/payment';
import PlaceOrderScreen from './pages/placeOrder';
import OrderScreen from './pages/order';
import KommunicateChat from './chat';


function App() {

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");     
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");    
  }

  return (

    <BrowserRouter> 

    <div className="grid-container">
    <header className="header">
      <div className="brand">
          <button onClick={openMenu}>
              &#9776;
          </button>
          <Link to="/" ><img src="/images/logo.png"></img></Link>        
      </div>
      
      <div className="header-links">
        <a href="index.html">Home</a>
        <a href="index.html">FAQs</a>
        <a href="cart.html">My Cart</a>
            {
              userInfo ? <Link to="/profile">{userInfo.name}</Link> :
                <Link to="/signin">Sign In</Link>
            }
      </div>
      
    </header> 

    <aside className ="sidebar">
        <h3 className = "main text">Shopping Categories</h3>
        <button className="sidebar-close-button" onClick={closeMenu}>x</button>
        <ul>
            <li><a href="index.html">Laptops</a></li> 

            <li><a href="index.html">Gaming PCs</a></li> 


        </ul>        

    </aside>


    <main className="main">
        <div className="content">

            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/" exact={true} component={KommunicateChat} />
            
          </div>
    </main>
    <footer className="footer">
        &copy; NeuroCart (Pvt) Limited 2020        
    </footer>
  </div>
  </BrowserRouter>
  );
}

export default App;
