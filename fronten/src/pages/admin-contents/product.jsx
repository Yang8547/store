import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProductHome from './product-home';
import ProductAddOrUpdate from './product-add-or-update';
import ProductDetail from './product-detail'

const Product = () => {
  return (
    <Switch>
      <Route path="/admin/product" component={ProductHome} exact /> 
      <Route path="/admin/product/addorupdate" component={ProductAddOrUpdate} />
      <Route path="/admin/product/detail" component={ProductDetail} />
      <Redirect to="/admin/product" />
    </Switch>
  );
};

export default Product;
