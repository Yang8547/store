import React from "react";
import { Route, Switch } from "react-router-dom";
import Adminhome from "./adminhome";

function Admin() {
  return (
    <Switch>
      <Route path="/admin" component={Adminhome} />
    </ Switch>
  );
}

export default Admin;
