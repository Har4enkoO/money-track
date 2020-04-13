import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./components/Pages/Home/Home";
import Categories from "./components/Pages/Categories/Categories";
import Charts from "./components/Pages/Charts/Charts";
import AddCategory from "./components/Pages/AddCategory/AddCategory";

export const Routes = () => (
  <Router>
    <Switch>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/charts" component={Charts} />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/add_category" component={AddCategory} />
      </Layout>
    </Switch>
  </Router>
);
