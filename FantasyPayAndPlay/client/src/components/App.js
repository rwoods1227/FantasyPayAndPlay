import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./session/Login";
import Register from "./session/Register";
import Splash from "./splash/Splash";
import Main from "./main/Main";

import AuthRoute from "../util/route_util";
require("./reset.css");

const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/login" component={Login} routeType="auth" />
      <AuthRoute path="/register/:email" component={Register} routeType="auth" />
      <AuthRoute path="/register" component={Register} routeType="auth" />
      <AuthRoute path="/app" component={Main} routeType="protected" />
      <Route path="/" component={Splash} />
    </Switch>
  </div>
);

export default App;
