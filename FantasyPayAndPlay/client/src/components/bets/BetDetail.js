import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
const { FETCH_BET } = Queries;

const BetDetail = props => (
  // there we are getting the `id` for our query from React Router
  <Query query={FETCH_BET} variables={{ _id: props.match.params.id }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;

      return (
        <div className="detail">
          {data.bet._id}
          {data.bet.description}
        </div>
      );
    }}
  </Query>
);

export default BetDetail;