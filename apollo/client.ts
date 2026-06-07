import { useMemo } from "react";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  from,
  NormalizedCacheObject,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/public/createUploadLink.js";
import { onError } from "@apollo/client/link/error";
import { getJwtToken } from "../libs/auth";
import { sweetErrorAlert } from "../libs/sweetAlert";
let apolloClient: ApolloClient<NormalizedCacheObject>;
// global variable: apolloClients

function getHeaders() {
  const headers = {} as HeadersInit;
  const token = getJwtToken();
  // @ts-ignore
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

function createIsomorphicLink() {
  // createApolloClient calls: createIsomorphicLink()
  // A link chain is like an assembly line where your GraphQL request passes through multiple steps before reaching the server.
  if (typeof window !== "undefined") {
    const authLink = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          ...getHeaders(),
        },
      }));
      return forward(operation);
    });

    const link = createUploadLink({
      uri: process.env.REACT_APP_API_GRAPHQL_URL,
    });

    const errorLink = onError(({ graphQLErrors, networkError, response }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path, extensions }) => {
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          );
          if (!message.includes("input") && !message.includes("specific roles") && !message.includes("Allowed only")) sweetErrorAlert(message);
        });
      }
      if (networkError) console.error(`[Network error]: ${networkError}`);
      // @ts-ignore
      if (networkError?.statusCode === 401) {
      }
    });

    return from([errorLink, authLink.concat(link)]);
  }
}

function createApolloClient() {
  // initializeApollo calls: createApolloClient()
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphicLink(),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getFurnitures: {
              keyArgs: ["input", ["search", "sort", "direction"]],
              merge(_existing, incoming) {
                return incoming;
              },
            },
            getBoardArticles: {
              keyArgs: ["input", ["search", "sort", "direction"]],
              merge(_existing, incoming) {
                return incoming;
              },
            },
          },
        },
      },
    }),
    resolvers: {},
  });
}

export function initializeApollo(initialState = null) {
  // useApollo calls: initializeApollo(initialState)
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) _apolloClient.cache.restore(initialState);
  // Copy server's fetched data into browser's cache (avoids duplicate fetch)
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  // _app.tsx calls: useApollo(pageProps)
  return useMemo(() => initializeApollo(initialState), [initialState]);
  // useMemo remembers a value and only recalculates it when initialState is updated
}

/**
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// No Subscription required for develop process

const httpLink = createHttpLink({
  uri: "http://localhost:3007/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
*/
