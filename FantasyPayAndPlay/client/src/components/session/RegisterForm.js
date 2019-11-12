import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import useSession from './useSession';

import Mutations from '../../graphql/mutations';
const { REGISTER } = Mutations;

export default props => {
  const [registerUser] = useSession(REGISTER);

  const [error, setError] = useState({
    erroredField: ""
  });

  const [focus, setFocus] = useState({
    focusedOn: ""
  });

  const handleError = errorField => {
    setError(error => ({ ...error, errorField }));
  };

  const handleFocus = field => {
    setFocus(focusedOn => ({ ...focus, focusedOn: field }));
  }


  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        username: ''
      }}
      onSubmit={values => registerUser({ variables: values })}
    >
      <Form className="auth-form">
        <label 
          htmlFor="username"
          style={focus.focusedOn === "username" ? { color: '#00ceb8' } : null}
        >username</label>
        <Field
          name="username"
          autoComplete="off"
          type="text"
          placeholder="Enter new username"
          onFocus={() => handleFocus("username")}
          onBlur={() => handleFocus("")}
        />
        <label
          htmlFor="email"
          style={focus.focusedOn === "email" ? { color: '#00ceb8' } : null}
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
        <button type="submit" className="auth-submit-button">continue</button>
      </Form>
    </Formik>
  )
}