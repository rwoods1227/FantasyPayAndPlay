import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";

const UPDATE_USER_BALANCE = gql`
  mutation updateUserBalance($_id: ID! , $balance: Float!) {
    updateUserBalance($_id: _id, $balance: balance) {
      id,
      balance
    }
  }
`

// class updateBalance extends React.Component {

  // set up state with value amount, bet type, odds, win, 
  // fetch state values using Query component
  // build out conditionals: if we lose subtract value of bet from balance. if we win calculate and update balance
  // create Mutation passing new balance (stored in state) to UPDATE_USER_BALANCE 
// }

const updateBalance = ({}) => {
  
}

// update: (balance) => {
//   const betType = Fetch bet type
//   const odds = fetch bet odds 
//   const value = Fetch bet value 
//   const winOrLose = Fetch bet win boolean
//   if lost {
//     return balance - value 
//   } else {
//     balance = odds * value 
        // return balance
//   }
// }


// function Todos() {
//   const { loading, error, data } = useQuery(GET_TODOS);
//   const [updateTodo] = useMutation(UPDATE_TODO);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   return data.todos.map(({ id, type }) => {
//     let input;

//     return (
//       <div key={id}>
//         <p>{type}</p>
//         <form
//           onSubmit={e => {
//             e.preventDefault();
//             updateTodo({ variables: { id, type: input.value } });

//             input.value = '';
//           }}
//         >
//           <input
//             ref={node => {
//               input = node;
//             }}
//           />
//           <button type="submit">Update Todo</button>
//         </form>
//       </div>
//     );
//   });
// }