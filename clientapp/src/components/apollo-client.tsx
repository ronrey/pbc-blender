import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  const auth_token = localStorage.getItem('auth_token');
  return {
    headers: {
      ...headers,
      authorization: auth_token ? `Bearer ${auth_token}` : '',
    },
  };
});

const createApolloLink = (serverName: string): ApolloLink => {
  const httpLink = createHttpLink({
    uri: `http://${serverName}:4000/graphql`,
  });

  return authLink.concat(httpLink);
};

const pbc1 = new ApolloClient({
  link: createApolloLink('192.168.0.40'),
  cache: new InMemoryCache(),
});

const pbc2 = new ApolloClient({
  link: createApolloLink('192.168.0.46'),
  cache: new InMemoryCache(),
});

const pbc3 = new ApolloClient({
  link: createApolloLink('192.168.0.43'),
  cache: new InMemoryCache(),
});

const pbc4 = new ApolloClient({
  link: createApolloLink('192.168.0.42'),
  cache: new InMemoryCache(),
});

const pbc5 = new ApolloClient({
  link: createApolloLink('192.168.0.47'),
  cache: new InMemoryCache(),
});

const pbc6 = new ApolloClient({
  link: createApolloLink('192.168.0.45'),
  cache: new InMemoryCache(),
});

export const apolloClients = {
  pbc1,
  pbc2,
  pbc3,
  pbc4,
  pbc5,
  pbc6,
};
