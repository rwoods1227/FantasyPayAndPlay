import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const UPDATE_USER_BALANCE = gql`
  mutation updateUserBalance($_id: ID! , $balance: Float!) {
    updateUserBalance($_id: _id, $balance: balance) {
      id,
      balance
    }
  }
`