import React from "react";
import { Formik, Form, Field } from 'formik';
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { ADD_USER_TO_LEAGUE_AND_CREATE_TEAM } = Mutations;

const JoinLeagueForm = () => {
  return (
    <Mutation mutation={ADD_USER_TO_LEAGUE_AND_CREATE_TEAM}>
      {(addUserToLeagueAndCreateTeam, data) => (
        <Formik
          initialValues={{
            userId: localStorage.getItem("currentUserId"),
            leagueId: ''
          }}
          onSubmit={values => {
            addUserToLeagueAndCreateTeam({ variables: values });
          }}
        >
          <Form className="league-create-form">
            <label
              htmlFor="leagueId"
            >LEAGUE ID</label>
            <Field
              name="leagueId"
              type="text"
              placeholder="Enter a friend's league ID"
            />
            <button type="submit" className="league-create-button">JOIN</button>
          </Form>
        </Formik>
      )}
    </Mutation>
  );
}

export default JoinLeagueForm;