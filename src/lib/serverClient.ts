import {
  ApolloClient,
  createHttpLink,
  DefaultOptions,
  InMemoryCache,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  headers:{
    Authorization : `ApiKey ${process.env.GRAPHQL_TOKEN}`
  },
  fetch
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  mutate: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const serverClient = new ApolloClient({
  ssrMode: true,
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions,
});

export default serverClient;
