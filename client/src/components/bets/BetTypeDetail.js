import React from "react";
import { Formik, Form, Field } from 'formik';
import { Mutation } from "react-apollo";
import BetsIndex from "./BetsIndex";

import Mutations from "../../graphql/mutations";
const { CREATE_USER_BET } = Mutations;

const BetTypeDetail = ({ bets, selected, changeMain }) => {
  return (
    <div className={selected ? "bet-type" : "hidden"}>
      {bets.map(bet => (
        <div key={`bet-details-${bet._id}`} className="bet-details">
          <h2>{bet.details}</h2>
          <span>{bet.line}</span>
          <div className="bet-placement">
            <h3>Place a bet</h3>
            <Mutation mutation={CREATE_USER_BET}>
              {(createUserBet, data) => (
                <Formik
                  initialValues={{
                    value: 0
                  }}
                  onSubmit={values =>
                    createUserBet({ variables: {
                      userId: localStorage.getItem("currentUserId"),
                      betId: bet._id,
                      value: values.value
                    }})
                  }
                >
                  <Form className="bet-placement-form">
                    <Field name="value" type="number" placeholder="Enter bet"/>
                    <button type="submit">PLACE BET</button>
                  </Form>
                </Formik>
              )}
            </Mutation>
          </div>
        </div>
      ))}
      <div className="bet-detail-back-button">
        <span
          onClick={() => changeMain(BetsIndex, { changeMain })}
        ><i className="fas fa-undo"></i> back to matches</span>
      </div>
    </div>  
  )
}

export default BetTypeDetail;
