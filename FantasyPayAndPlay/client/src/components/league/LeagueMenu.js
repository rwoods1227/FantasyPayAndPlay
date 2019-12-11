import React from "react";

import Mutations from "../../graphql/mutations";
//const {  } = Mutations;

const LeagueMenu = () => {
  return (
    <div className="league-container">
      <div className="header">
        <div className="league-icon"></div>
        <div className="header-content">
          <h1>League</h1>
          <span>Create or join a league</span>
        </div>
      </div>
      <div className="league-create-container-">
        {/* eventually change to league create mutation and form
        <Mutation mutation={CREATE_USER_BET}>
          {(createUserBet, data) => (
            <Formik
              initialValues={{
                value: 0
              }}
              onSubmit={values =>
                createUserBet({
                  variables: {
                    userId: localStorage.getItem("currentUserId"),
                    betId: bet._id,
                    value: values.value
                  }
                })
              }
            >
              <Form className="bet-placement-form">
                <Field name="value" type="number" placeholder="Enter bet" />
                <button type="submit">PLACE BET</button>
              </Form>
            </Formik>
          )}
        </Mutation> */}
      </div>
    </div>
  )
};

export default LeagueMenu;