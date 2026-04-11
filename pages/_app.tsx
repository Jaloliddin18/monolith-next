import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { appWithTranslation } from 'next-i18next';
import { useApollo } from '../apollo/client';
import { light } from '../scss/MaterialTheme';
import { socketVar } from '../apollo/store';
import { getJwtToken, updateUserInfo } from '../libs/auth';
import { REACT_APP_API_WS } from '../libs/config';
import '../scss/app.scss';
import '../scss/pc/main.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [theme] = useState(createTheme(light as any));

  useEffect(() => {
    const jwt = getJwtToken();
    if (jwt) updateUserInfo(jwt);

    const wsUrl = jwt ? `${REACT_APP_API_WS}?token=${jwt}` : REACT_APP_API_WS;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected');
      socketVar(ws);
    };

    ws.onerror = (err) => {
      console.warn('WebSocket error', err);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      socketVar(null);
    };

    return () => {
      ws.onopen = null;
      ws.onmessage = null;
      ws.close();
    };
  }, []);

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
