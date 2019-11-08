import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./session/Login";
import Register from "./session/Register";
import AuthRoute from "../util/route_util";
import Nav from "./Nav";

const App = () => (
  <div>
    <Nav />
    <h1>Fantasy Pay & Play</h1>

    <Switch>
      <AuthRoute exact path="/login" component={Login} routeType="auth" />
      <AuthRoute exact path="/register" component={Register} routeType="auth" />
    </Switch>
  </div>
);

export default App;
