import React from 'react';
import { Formik, Form, Field } from 'formik';
import useSession from './useSession';

import Mutations from '../../graphql/mutations';
const { LOGIN } = Mutations;

export default props => {
  const [loginUser] = useSession(LOGIN);

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={values => {
        loginUser({ variables: values })
      }}
    >
      <Form className="auth-form">
        <label htmlFor="email">email</label>
        <Field
          name="email"
          autoComplete="email"
          type="email"
          placeholder="Enter email"
        />
        <label htmlFor="password">password</label>
        <Field
          name="password"
          autoComplete="current-password"
          type="password"
          placeholder="Enter password"
        />
        <button type="submit" className="auth-submit-button">Login</button>
      </Form>
    </Formik>
  )
}