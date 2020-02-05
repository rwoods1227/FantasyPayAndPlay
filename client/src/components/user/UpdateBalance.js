import React from "react";
import { Formik, Form, Field } from 'formik';
import { Mutation } from "react-apollo";
import { useAlert } from 'react-alert'

import Mutations from "../../graphql/mutations";
const { ALL_BET_WIN_VALUES } = Mutations;

const UpdateBalanceButton = () => {
  const alert = useAlert();
  return (
    <Mutation mutation={ALL_BET_WIN_VALUES}>
      {(allBetWinValues, {loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
        return(
        <Formik
          initialValues={{
            name: ''
          }}
          onSubmit={(values) => {
            {
                allBetWinValues().then(() => {
                  alert.show("Balance Updated");
                })
            }
          }}
        >
          <Form className="league-create-form">
            <button type="submit" className="update-balance-button">Update Balance</button>
          </Form>
        </Formik>
        )}}
    </Mutation>
  );
}

export default UpdateBalanceButton;