import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import useSession from './useSession';

import Mutations from '../../graphql/mutations';
const { LOGIN } = Mutations;

export default props => {
  const [loginUser] = useSession(LOGIN);

  const [error, setError] = useState({
    isError: false
  });

  const [focus, setFocus] = useState({
    focusedOn: ""
  });

  const handleError = bool => {
    setError(error => ({ ...error, isError: bool  }));
  };

  const handleFocus = field => {
    setFocus(focusedOn => ({ ...focus, focusedOn: field }));
  }

  const errorMessage = (
    <div className="error-message-container">
      <div className="validation-alert">
        <i className="fa fa-exclamation-triangle"></i>
        <span>Your crendentails were invalid.</span>
        <div className="dismiss-button" onClick={() => handleError(false)}>
          <i className="fa fa-times"></i>
        </div>
      </div>
    </div>
  );

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={values => {
        loginUser({ variables: values })
          .catch(() => handleError(true))
      }}
    >
      <Form className="auth-form">
        {error.isError ? errorMessage : null}
        <label 
          htmlFor="email"
          style={focus.focusedOn === "email" ? { color: '#00ceb8' } : null }
        >email</label>
        <Field
          name="email"
          autoComplete="off"
          type="email"
          spellCheck="false"
          onFocus={() => handleFocus("email")}
          onBlur={() => handleFocus("")}
          placeholder="Enter email"
        />
        <label 
          htmlFor="password"
          style={focus.focusedOn === "password" ? { color: '#00ceb8' } : null}
        >password</label>
        <Field
          name="password"
          autoComplete="off"
          type="password"
          placeholder="Enter password"
          onFocus={() => handleFocus("password")}
          onBlur={() => handleFocus("")}
        />
        <div className="auth-submit-buttons-container">
          <button type="submit" className="auth-submit-button">Login</button>
          <button onClick={e => {
            e.preventDefault();
            loginUser({ variables: { 
              email: 'jaydoe@email.com',
              password: '12345678'
            }}).catch(() => handleError(true))
          }} className="auth-submit-button"
          >DEMO LOGIN</button>
        </div>
      </Form>
    </Formik>
  );
};