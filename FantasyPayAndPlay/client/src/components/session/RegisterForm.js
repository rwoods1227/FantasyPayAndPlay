import React from 'react';
import { Formik, Form, Field } from 'formik';
import useSession from './useSession';

import Mutations from '../../graphql/mutations';
const { REGISTER } = Mutations;

export default props => {
  const [registerUser] = useSession(REGISTER);

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
        <label htmlFor="email">username</label>
        <Field
          name="username"
          autoComplete="username"
          type="text"
        />
        <label htmlFor="email">email</label>
        <Field
          name="email"
          autoComplete="email"
          type="email"
        />
        <label htmlFor="password">password</label>
        <Field
          name="password"
          autoComplete="new-password"
          type="password"
        />
        <button type="submit" className="auth-submit-button">continue</button>
      </Form>
    </Formik>
  )
}