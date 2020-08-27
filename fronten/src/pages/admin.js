import React from "react";
import { Route } from "react-router-dom";
import Login from "./login";

function Admin() {
  return (
    <>
      <Route path="/admin/login" component={Login} />
    </>
  );
}

export default Admin;
