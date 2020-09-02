import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import './App.css';
import Admin from './pages/admin';
import Main from './pages/main';
import Login from './pages/login'

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home"/>
        <Route path="/home" component={Main}>
        </Route>
        <Route path="/admin" component={Admin}>
        </Route>
        <Route path="/login" component={Login} />
      </Switch>

  </Router>
  );
}

export default App;
