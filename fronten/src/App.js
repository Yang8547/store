import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Product from './pages/Product';
import './App.css';

function App() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open")
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }
  return (
    <Router>
    <div className="grid-container">
    <header className="header">
      <div className="brand">
        <button onClick={openMenu}>
          &#9776;
        </button>
        <Link to="/">store</Link>
      </div>
      <div className="header-links">
        <a href="cart.html">Cart</a>
        <a href="signin.html">Sign In</a>
      </div>
    </header>
    <aside className="sidebar">
      <h3>Shopping Categories</h3>
      <button className="sidebar-close-button" onClick={closeMenu}>x</button>
      <ul>
        <li>
          <a href="index.html">Pants</a>
        </li>

        <li>
          <a href="index.html">Shirts</a>
        </li>

      </ul>
    </aside>
    <main className="main">
      <div className="content">
      <switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
      </switch>
      </div>

    </main>
    <footer className="footer">
      All right reserved.
    </footer>
  </div>
  </Router>
  );
}

export default App;
