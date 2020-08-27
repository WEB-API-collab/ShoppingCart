import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
import HomeSc from './pages/home';
import ProductSc from './pages/product';
import CartSc from './pages/cart';
import SigninSc from './pages/signin';
import { useSelector } from 'react-redux';
import RegisterSc from './pages/register';


function App() {

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              &#9776;
        </button>
            <Link to="/" >Neuro Cart</Link>
          </div>
          <div className="header-links">
            <a href="cart.html">Cart</a>
            {
              userInfo ? <Link to="/profile">{userInfo.name}</Link> :
                <Link to="/signin">Sign In</Link>
            }
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul>
            <li>
              <a href="index.html">Laptops</a>
            </li>
            <li>
              <a href="index.html">Desktop</a>
            </li>
            <li>
          <a href="index.html">Storage and Hardware devices</a>
        </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/signin" component={SigninSc} />
            <Route path="/register" component={RegisterSc} />
            <Route path="/product/:id" component={ProductSc} />
            <Route path="/cart/:id?" component={CartSc} />
            <Route path="/" exact={true} component={HomeSc} />


          </div>
        </main>
        <footer className="footer">
          All right reserved.
    </footer>
      </div>
    </BrowserRouter>
  );
}
export default App;