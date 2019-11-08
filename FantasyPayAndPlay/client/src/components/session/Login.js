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
      <Form>
        <label htmlFor="email">Email</label>
        <Field
          name="email"
          autoComplete="email"
          type="email"
        />
        <label htmlFor="password">Password</label>
        <Field
          name="password"
          autoComplete="current-password"
          type="password"
        />
        <button type="submit">Login</button>
      </Form>
    </Formik>
  )
}