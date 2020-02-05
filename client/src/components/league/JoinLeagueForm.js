import React from "react";
import { Formik, Form, Field } from 'formik';
import { Mutation } from "react-apollo";
import { useAlert } from 'react-alert'

import Mutations from "../../graphql/mutations";
const { ADD_USER_TO_LEAGUE_AND_CREATE_TEAM } = Mutations;
// add alerts and checks for actual leagues/ unique users in league at some point

const JoinLeagueForm = ({leagues}) => {
  const alert = useAlert();
  let users = [];
  let leagueIdsAndUsers = {};
  leagues.forEach(league => {
    users = [];
    league.users.forEach(user =>{
      users.push(user._id)
    })
    leagueIdsAndUsers[league._id] = users;
  });
  return (
    <Mutation mutation={ADD_USER_TO_LEAGUE_AND_CREATE_TEAM}>
      {(addUserToLeagueAndCreateTeam, { loading, error,data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
        return (
        <Formik
          initialValues={{
            userId: localStorage.getItem("currentUserId"),
            leagueId: ''
          }}
          onSubmit={values => {
            if(Object.keys(leagueIdsAndUsers).includes(values.leagueId)){
              if(leagueIdsAndUsers[values.leagueId].includes(values.userId)){
                alert.show("User already in league");
              } else{
                addUserToLeagueAndCreateTeam({ variables: values }).then(() => {
                  alert.show("Joined League");
              })
              }
            }else{
              alert.show("Incorrect LeagueId");
            };
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
        )}}
    </Mutation>
  );
}

export default JoinLeagueForm;