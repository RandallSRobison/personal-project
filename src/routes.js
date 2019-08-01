import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../src/components/dashboard/Dashboard";
import Login from "../src/components/login/Login";
import Register from "../src/components/register/Register";
import Groups from "../src/components/groups/Groups";
import Group from "../src/components/groups/Group";
import UserGoals from '../src/components/goal/UserGoals'

export default (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/registered" component={Dashboard} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/groups" component={Groups} />
    <Route path="/group/:groupId" component={Group} />
    <Route path="/goals" component={UserGoals} />
  </Switch>
);
