import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../src/components/dashboard/Dashboard";
import Login from "../src/components/login/Login";
import Register from "../src/components/register/Register";

export default (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Switch>
);
