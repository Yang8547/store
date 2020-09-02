import React from "react";
import { Route } from "react-router-dom";
import Login from "./login";
import Adminhome from "./adminhome";

function Admin() {
  return (
    <>
      <Route path="/admin" exact component={Adminhome} />
      <Route path="/admin/login" component={Login} />
    </>
  );
}

export default Admin;
