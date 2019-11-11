import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

require("./auth.css");
require("./left-panel.css");

export default props => (
  <div className="login-page">
    <div className="left-panel">
      <a href="/" className="main-icon">FantasyPay&Play</a>
      <div className="title-container">
        <h2>Welcome to FantasyPay&Play</h2>
        <span>FantasyPay&Play is the easiest way to enjoy fantasy leagues with friends!</span>
      </div>
    </div>
    <div className="right-panel">
      <div className="content-container">
        <div className="header-container">
          <div className="onboard-header">
            <h2>Sign up</h2>
            <Link to="/login" className="right-header-action">Login</Link>
          </div>
          <div className="onboard-desc">
            Let's get started by creating an account
          </div>
        </div>
        <RegisterForm />
      </div>
      <footer>
        <div className="footer">
          <a href="https://github.com/rwoods1227/FantasyPayAndPlay">Learn about FantasyPay&Play</a>
        </div>
      </footer>
    </div>
  </div>
);