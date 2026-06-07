import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { ApolloProvider, useQuery, useReactiveVar } from "@apollo/client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { appWithTranslation } from "next-i18next";
import { useApollo } from "../apollo/client";
import { light } from "../scss/MaterialTheme";
import { userVar, socketVar, unreadCountVar } from "../apollo/store";
import { getJwtToken, updateUserInfo } from "../libs/auth";
import { REACT_APP_API_WS } from "../libs/config";
import { GET_UNREAD_COUNT } from "../apollo/user/query";
import "../scss/app.scss";
import "../scss/pc/main.scss";
import "../scss/mobile/main.scss";

interface NotificationSocketPayload {
  event: string;
  receiverId?: string;
}

function AppInner({ Component, pageProps }: Pick<AppProps, "Component" | "pageProps">) {
  const user = useReactiveVar(userVar);
  const socket = useReactiveVar(socketVar);

  const { data: unreadData, startPolling, stopPolling } = useQuery(GET_UNREAD_COUNT, {
    skip: !user?._id,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (user?._id) {
      startPolling(30000);
    } else {
      stopPolling();
    }
    return () => stopPolling();
  }, [user?._id, startPolling, stopPolling]);

  useEffect(() => {
    if (unreadData?.getUnreadCount !== undefined) {
      unreadCountVar(unreadData.getUnreadCount);
    }
  }, [unreadData]);

  useEffect(() => {
    if (!socket || !user?._id) return;

    const handleSocketMessage = (msg: MessageEvent) => {
      const data = JSON.parse(msg.data) as NotificationSocketPayload;
      if (data.event !== "notification") return;
      if (data.receiverId && data.receiverId !== user._id) return;
      unreadCountVar(unreadCountVar() + 1);
    };

    socket.addEventListener("message", handleSocketMessage);
    return () => {
      socket.removeEventListener("message", handleSocketMessage);
    };
  }, [socket, user?._id]);

  return <Component {...pageProps} />;
}

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [theme] = useState(createTheme(light as any));

  useEffect(() => {
    const jwt = getJwtToken();
    if (jwt) updateUserInfo(jwt);

    const wsUrl = jwt ? `${REACT_APP_API_WS}?token=${jwt}` : REACT_APP_API_WS;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      socketVar(ws);
    };

    ws.onerror = (err) => {
      console.warn("WebSocket error", err);
    };

    ws.onclose = () => {
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
        <AppInner Component={Component} pageProps={pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default appWithTranslation(App);
