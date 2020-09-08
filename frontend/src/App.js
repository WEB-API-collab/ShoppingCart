import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
import HomeScreen from './sscreens/HomeScreen';
import ProductScreen from './sscreens/ProductScreen';
import CartScreen from './sscreens/CartScreen';
import SigninScreen from './sscreens/SignInScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './sscreens/RegisterScreen';
import ProductsScreen from './sscreens/ProductsScreen';
import ShippingScreen from './sscreens/ShippingScreen';
import PaymentScreen from './sscreens/PaymentScreen';
import PlaceOrderScreen from './sscreens/PlaceOrderScreen';
import OrderScreen from './sscreens/OrderScreen';
import ProfileScreen from './sscreens/ProfileScreen';
import OrdersScreen from './sscreens/OrdersScreen';
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
      <Link to="/">Home</Link>
        <a href="index.html">FAQs</a>
        <a href="cart.html">My Cart</a>
            {
              userInfo ? <Link to="/profile">{userInfo.name}</Link> :
                <Link to="/signin">Sign In</Link>
            }

            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#"  >Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}

      </div>
      
    </header> 

    <aside className ="sidebar">
        <h3 className = "main text">Shopping Categories</h3>
        <button className="sidebar-close-button" onClick={closeMenu}>x</button>
        
        <ul className="categories">
            <li>

               <Link to="/category/Laptops">Laptops</Link>

            </li> 

            <li> 
              
               <Link to="/category/Gaming PCs">Gaming PCs</Link>

            </li>

            <li> 
              
               <Link to="/category/CPUs">CPUs</Link>

            </li>

            <li> 
              
              <Link to="/category/GPUs">GPUs</Link>

           </li>

           <li> 
              
              <Link to="/category/Monitors">Monitors</Link>

           </li>



        </ul>        

    </aside>


    <main className="main">
        <div className="content">

            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
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
