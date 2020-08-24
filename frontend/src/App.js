import React from 'react';
import data from './data';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';

function App() {

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
        <a href="cart.html">My Cart</a>
        <a href="signin.html">Sign In</a>
      </div>
    </header> 

    <aside className ="sidebar">
        <h3>Shopping Categories</h3>
        <button className="sidebar-close-button" onClick={closeMenu}>x</button>
        <ul>
            <li>
                <a href="index.html">Laptops</a>
            </li> 

            <li>
                <a href="index.html">Gaming PCs</a>
            </li> 


        </ul>        

    </aside>


    <main className="main">
        <div className="content">
            
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
            
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
