import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "./Home";
import Product from "./Product";
import Cart from "./Cart";

function Main() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <div className="grid-container">
      <header className="header">
        <div className="brand">
          <button onClick={openMenu}>&#9776;</button>
          <Link to="/">store</Link>
        </div>
        <div className="header-links">
          <Link to="/home/cart">Cart</Link>
          <a href="signin.html">Sign In</a>
        </div>
      </header>
      <aside className="sidebar">
        <h3>Shopping Categories</h3>
        <button className="sidebar-close-button" onClick={closeMenu}>
          x
        </button>
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
          
            <Route path="/home" exact component={Home} />
            <Route path="/home/product/:id" component={Product} />
            <Route path="/home/cart" component={Cart} />

        </div>
      </main>
      <footer className="footer">All right reserved.</footer>
    </div>
  );
}

export default Main;
