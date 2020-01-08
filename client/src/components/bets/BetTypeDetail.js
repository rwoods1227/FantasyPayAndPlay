import React from "react";
import { Formik, Form, Field } from 'formik';
import { Mutation } from "react-apollo";
import BetsIndex from "./BetsIndex";
import { useAlert } from 'react-alert'
import { Query } from "react-apollo";
import Queries from "../../graphql/queries"
import Mutations from "../../graphql/mutations";

const { FETCH_USER } = Queries;
const { CREATE_USER_BET } = Mutations;
const BetTypeDetail = ({ bets, selected, changeMain }) => {

  const alert = useAlert();
  let balance = 0;
  return (
    <div className={selected ? "bet-type" : "hidden"}>
      <Query query={FETCH_USER} variables={{ _id: localStorage.getItem("currentUserId") }} pollInterval={1000}>
        {({ loading, error, data }) => {
          if (loading) return <h1>Loading..</h1>;
          if (error) console.log(error);
           balance = data.user.balance;
           return null
        }}
      </Query>
        
        
       {bets.map(bet => (
        <div key={`bet-details-${bet._id}`} className="bet-details">
          <h2>{bet.details}</h2>
          <span>{bet.line}</span>
          <div className="bet-placement">
            <h3>Place a bet</h3>
            {console.log(balance)}
            <Mutation mutation={CREATE_USER_BET}>
              {(createUserBet, data) => (
                <Formik
                  initialValues={{
                    value: 0
                  }}
                  onSubmit={values =>
                  { 
                    if (values.value > 0 && values.value <= balance) {
                    createUserBet({ variables: {
                      userId: localStorage.getItem("currentUserId"),
                      betId: bet._id,
                      value: values.value
                    }}).then(() => {
                      alert.show("Bet Placed");
                    })
                    } else {
                      alert.show("Error! Try Again")
                    }
                  }}
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
