import React from "react";
import { Formik, Form, Field } from 'formik';
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { NEW_LEAGUE } = Mutations;

const CreateLeagueForm = () => {
  return (
    <Mutation mutation={NEW_LEAGUE}>
      {(newLeague, data) => (
        <Formik
          initialValues={{
            name: '',
            description: '',
            comissioner: localStorage.getItem("currentUserId")
          }}
          onSubmit={values => {
            newLeague({ variables: values })
              .then();
          }}
        >
          <Form className="league-create-form">
            <label
              htmlFor="name"
            >LEAGUE NAME</label>
            <Field
              name="name"
              type="text"
              placeholder="Enter the name of your league"
            />
            <label
              htmlFor="description"
            >DESCRIPTION</label>
            <Field
              name="description"
              type="text"
              placeholder="Enter a description for your league"
            />
            <button type="submit" className="league-create-button">FINISH</button>
          </Form>
        </Formik>
      )}
    </Mutation>
  );
}

export default CreateLeagueForm;