import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
// import { onError } from "apollo-link-error";
// import { ApolloLink } from "apollo-link";
import { HashRouter } from 'react-router-dom'; 
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Mutations from './graphql/mutations';
const { VERIFY_USER } = Mutations;

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

const token = localStorage.getItem("auth-token");

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
  headers: {
    authorization: token
  }
});

// const errorLink = onError(({ graphQLErrors }) => {
//   if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
// });

const client = new ApolloClient({
  link: httpLink,
  cache,
  resolvers: {},
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

cache.writeData({
  data: {
    isLoggedIn: Boolean(token)
  }
});

if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn
        }
      })
    });
}

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
