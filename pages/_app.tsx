import { useState } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { appWithTranslation } from 'next-i18next';
import { useApollo } from '../apollo/client';
import { light } from '../scss/MaterialTheme';
import '../scss/app.scss';
import '../scss/pc/main.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function App({ Component, pageProps }: AppProps) {
	const apolloClient = useApollo(pageProps.initialApolloState);
	const [theme] = useState(createTheme(light as any));

	return (
		<ApolloProvider client={apolloClient}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default appWithTranslation(App);
