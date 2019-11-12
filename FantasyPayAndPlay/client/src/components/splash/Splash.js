import React from "react";
import Nav from "../nav/Nav";
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from "@apollo/react-hooks";
import { Formik, Form, Field } from 'formik';

import Queries from "../../graphql/queries";
const { IS_LOGGED_IN } = Queries;

const SplashGif = require("./splash-gif.gif");
require("./splash.css");

const Splash = props => {
  const { data } = useQuery(IS_LOGGED_IN);
  const history = useHistory();

  return (
    <div>
      <Nav />
      {data.isLoggedIn ? (
        <div className="splash-logged-out">
          <h1>Start a fantasy team or <br />bet on matches today</h1>
          <h4>Start your fantasy for free in just 60 seconds.</h4>
          <div className="splash-callout">
            <Link to="/bets">OPEN FANTASY PAY & PLAY</Link>
          </div>
          <div className="splash-gif-container">
            <img src={SplashGif} alt="splash-gif"></img>
          </div>
        </div>
        ) : (
        <div className="splash-logged-out">
          <h1>Start a fantasy team or <br />bet on matches today</h1>
          <h4>Start your fantasy for free in just 60 seconds.</h4>
          <div className="splash-callout">
            <Formik
              initialValues={{
                email: ""
              }}
              onSubmit={values => history.push(`/register/${values.email}`)}
            >
              <Form>
                <Field
                  name="email"
                  autoComplete="off"
                  type="text"
                  spellCheck="false"
                  placeholder="Email"
                />
                <button type="submit">GET STARTED</button>
              </Form>
            </Formik>
          </div>
          <div className="splash-gif-container">
            <img src={SplashGif} alt="splash-gif"></img>
          </div>
        </div>
      )}
    </div>
  )
};

export default Splash;