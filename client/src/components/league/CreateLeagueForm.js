import React from "react";
import { Formik, Form, Field } from 'formik';
import { Mutation } from "react-apollo";
import { useAlert } from 'react-alert'

import Mutations from "../../graphql/mutations";
const { NEW_LEAGUE } = Mutations;

const CreateLeagueForm = () => {
  const alert = useAlert();
  return (
    <Mutation mutation={NEW_LEAGUE}>
      
      {(newLeague, {loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
        return (
        <Formik
          initialValues={{
            name: '',
            description: '',
            comissioner: localStorage.getItem("currentUserId")
          }}
          onSubmit={values => {
            {
              console.log(values)
              if (values.name.length > 2 && values.description.length > 2) {
                newLeague({ variables: values
                }).then(() => {
                  alert.show("League Created Successfully");
                })
              } else {
                alert.show("Error! Name or Description Too Short")
              }
            }
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
        )}}
    </Mutation>
  );
}

export default CreateLeagueForm;