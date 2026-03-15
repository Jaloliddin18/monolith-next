import { useMemo } from 'react';
import { ApolloClient, ApolloLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
// @ts-ignore
import { createUploadLink } from 'apollo-upload-client';
import { sweetErrorAlert } from '../libs/sweetAlert';

let apolloClient: ApolloClient<any> | null = null;

function getJwtToken(): string {
	if (typeof window !== 'undefined') {
		return localStorage.getItem('accessToken') ?? '';
	}
	return '';
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message }) => {
			if (!message.includes('input')) sweetErrorAlert(message);
		});
	}
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = new ApolloLink((operation, forward) => {
	const token = getJwtToken();
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : '',
		},
	}));
	return forward(operation);
});

function createApolloClient() {
	const uploadLink = createUploadLink({
		uri: process.env.REACT_APP_API_GRAPHQL_URL,
	});

	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: from([errorLink, authLink, uploadLink as unknown as ApolloLink]),
		cache: new InMemoryCache(),
	});
}

export function initializeApollo(initialState: any = null) {
	const _apolloClient = apolloClient ?? createApolloClient();
	if (initialState) _apolloClient.cache.restore(initialState);
	if (typeof window === 'undefined') return _apolloClient;
	if (!apolloClient) apolloClient = _apolloClient;
	return _apolloClient;
}

export function useApollo(initialState: any) {
	return useMemo(() => initializeApollo(initialState), [initialState]);
}

export { getJwtToken };
