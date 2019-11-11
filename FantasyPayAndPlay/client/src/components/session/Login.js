import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

require("./auth.css");
require("./left-panel.css");

export default props => (
  <div className="login-page">
    <div className="left-panel">
      <a href="/">FantasyPay&Play</a>
      <div className="title-container">
        <h2>Welcome back!</h2>
        <span>FantasyPay&Play is the easiest way to enjoy fantasy leagues with friends!</span>
      </div>
    </div>
    <div className="right-panel">
      <div className="content-container">
        <div className="header-container">
          <div className="onboard-header">
            <h2>Login</h2>
            <Link to="/register" className="right-header-action">Sign up</Link>           
          </div>
          <div className="onboard-desc">
            Sign in using email
          </div>
        </div>
        <LoginForm />
      </div>
      <footer>
        <div className="footer">
          <a href="https://github.com/rwoods1227/FantasyPayAndPlay">Learn about FantasyPay&Play</a>
        </div>
      </footer>
    </div>
  </div>
);