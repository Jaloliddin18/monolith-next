# Chat WebSocket Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the live NestJS WebSocket chat gateway to the Next.js frontend, giving every page a floating chat widget that connects authenticated users in real-time.

**Architecture:** The backend gateway (`socket.gateway.ts`) runs a raw `ws` WebSocket server on port 3004. Auth is JWT-in-URL-query (`?token=<jwt>`). The frontend initialises a single `WebSocket` instance in `_app.tsx`, stores it in `socketVar` (Apollo reactive var), and a floating `<Chat />` component reads that var to send/receive messages. The chat widget is injected into `LayoutBasic` and `LayoutHome`.

**Tech Stack:** Next.js (Pages Router), TypeScript, Apollo `makeVar`, raw browser `WebSocket`, MUI 5, SCSS (BEM-like), `react-scrollable-feed`

---

## File Map

| Action | Path |
|--------|------|
| Modify | `libs/config.ts` — add `Messages.error4` and `REACT_APP_API_WS` export (already exists) |
| Modify | `scss/MaterialTheme/index.ts` — add `RippleBadge` styled component |
| Install | `react-scrollable-feed` npm package |
| Create | `libs/components/Chat.tsx` — floating chat widget |
| Modify | `pages/_app.tsx` — initialise WebSocket on mount, set `socketVar` |
| Modify | `libs/components/layout/LayoutBasic.tsx` — include `<Chat />` |
| Modify | `libs/components/layout/LayoutHome.tsx` — include `<Chat />` |
| Modify | `scss/pc/main.scss` — import chat styles |
| Create | `scss/pc/chat/chat.scss` — all `.chatting` styles |

---

## Task 1: Install react-scrollable-feed

**Files:**
- Modify: `package.json` (via yarn)

- [ ] **Step 1: Install the package**

```bash
yarn add react-scrollable-feed
```

Expected output: `✓ react-scrollable-feed` added under `dependencies`.

- [ ] **Step 2: Commit**

```bash
git add package.json yarn.lock
git commit -m "chore: add react-scrollable-feed for chat scroll"
```

---

## Task 2: Add RippleBadge to MaterialTheme

The `Chat.tsx` component needs `RippleBadge` (animated online-count badge). It doesn't exist yet in monolith-next's `MaterialTheme/index.ts`.

**Files:**
- Modify: `scss/MaterialTheme/index.ts`

- [ ] **Step 1: Add styled imports and RippleBadge export**

Open `scss/MaterialTheme/index.ts`. At the top, add:

```ts
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
```

Then at the bottom of the file (after the `export const light` block), add:

```ts
export const RippleBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#b4dcff8f',
    color: '#2c40bdd6',
    boxShadow: '0',
    '&::after': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '2px solid #32c2c1',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': { transform: 'scale(.8)', opacity: 1 },
    '100%': { transform: 'scale(2.4)', opacity: 0 },
  },
}));
```

- [ ] **Step 2: Commit**

```bash
git add scss/MaterialTheme/index.ts
git commit -m "chore: add RippleBadge styled component for chat online indicator"
```

---

## Task 3: Add Messages.error4 to config

`Chat.tsx` calls `sweetErrorAlert(Messages.error4)` when the input is empty.

**Files:**
- Modify: `libs/config.ts`

- [ ] **Step 1: Add error4 to Messages**

Open `libs/config.ts`. Replace:

```ts
export const Messages = {
	NOT_AUTHENTICATED: 'You are not authenticated. Please login first!',
	SOMETHING_WENT_WRONG: 'Something went wrong!',
};
```

With:

```ts
export const Messages = {
	NOT_AUTHENTICATED: 'You are not authenticated. Please login first!',
	SOMETHING_WENT_WRONG: 'Something went wrong!',
	error4: 'Message is empty!',
};
```

- [ ] **Step 2: Commit**

```bash
git add libs/config.ts
git commit -m "chore: add Messages.error4 for chat empty input validation"
```

---

## Task 4: Create Chat SCSS

**Files:**
- Create: `scss/pc/chat/chat.scss`
- Modify: `scss/pc/main.scss`

- [ ] **Step 1: Create `scss/pc/chat/chat.scss`**

```scss
#pc-wrap {
  .chatting {
    .chat-button {
      border: none;
      position: fixed;
      bottom: 90px;
      right: 30px;
      height: 50px;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.2);
      transition: transform 0.3s;
      z-index: 999;
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
        background-color: #fff;
      }
    }

    .chat-frame {
      position: fixed;
      right: -380px;
      width: 380px;
      height: 500px;
      display: flex;
      flex-direction: column;
      background: rgb(233, 243, 255);
      border-radius: 34px;
      box-shadow: 0px 0px 15px 0px rgba(50, 50, 50, 0.3);
      z-index: 100;
      bottom: 150px;
      transition: right 0.7s ease-in-out;

      &.open {
        right: 10px;
      }

      .chat-top {
        width: 100%;
        height: 103px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid rgba(205, 205, 205, 0.83);
        font-size: 30px;
        line-height: 54px;
        color: #000000;
      }

      .chat-content {
        position: relative;
        padding: 17px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        overflow: auto;

        .chat-main {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;

          .welcome {
            margin-left: 10px;
            padding: 9px;
            width: auto;
            height: auto;
            display: flex;
            background: #9fa7ac;
            border-radius: 20px 20px 20px 0px;
            color: #fff;
          }

          .msg-left {
            margin-left: 10px;
            padding: 9px;
            width: auto;
            height: auto;
            display: flex;
            background: #3c96cf;
            border-radius: 20px 20px 20px 0px;
            color: #fff;
          }
        }
      }

      .chat-bott {
        width: 100%;
        height: 103px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid rgba(205, 205, 205, 0.83);

        .msg-input {
          padding: 20px;
          width: 276px;
          height: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #f7f7f7;
          border-radius: 28px;
          border: none;
          outline-color: #257677;
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
        }

        .send-msg-btn {
          margin-left: 14px;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          background: #33c1c1;
          border: none;
          cursor: pointer;
          &:hover {
            background: #2aadad;
          }
        }
      }

      .msg-right {
        padding: 9px;
        width: auto;
        height: auto;
        display: flex;
        background: #d0ece8;
        border-radius: 20px 20px 0px 20px;
      }
    }
  }
}
```

- [ ] **Step 2: Import in `scss/pc/main.scss`**

Add this line at the top of the imports section in `scss/pc/main.scss`:

```scss
@use "./chat/chat";
```

- [ ] **Step 3: Commit**

```bash
git add scss/pc/chat/chat.scss scss/pc/main.scss
git commit -m "feat: add chat widget SCSS styles"
```

---

## Task 5: Create Chat.tsx component

**Files:**
- Create: `libs/components/Chat.tsx`

- [ ] **Step 1: Create the component**

```tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, Box, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import { useRouter } from 'next/router';
import ScrollableFeed from 'react-scrollable-feed';
import { RippleBadge } from '../../scss/MaterialTheme/index';
import { useReactiveVar } from '@apollo/client';
import { socketVar, userVar } from '../../apollo/store';
import { Member } from '../types/member/member';
import { Messages, REACT_APP_API_URL } from '../config';
import { sweetErrorAlert } from '../sweetAlert';

interface MessagePayload {
  event: string;
  text: string;
  memberData: Member;
}

interface InfoPayload {
  event: string;
  totalClients: number;
  memberData: Member;
  action: string;
}

const Chat = () => {
  const chatContentRef = useRef<HTMLDivElement>(null);
  const [messagesList, setMessagesList] = useState<MessagePayload[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const [messageInput, setMessageInput] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [openButton, setOpenButton] = useState(false);
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const socket = useReactiveVar(socketVar);

  /** LIFECYCLES **/
  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (msg: MessageEvent) => {
      const data = JSON.parse(msg.data);

      switch (data.event) {
        case 'info':
          const newInfo: InfoPayload = data;
          setOnlineUsers(newInfo.totalClients);
          break;
        case 'getMessages':
          const list: MessagePayload[] = data.list;
          setMessagesList(list);
          break;
        case 'message':
          const newMessage: MessagePayload = data;
          setMessagesList((prev) => [...prev, newMessage]);
          break;
      }
    };
  }, [socket, messagesList]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOpenButton(true);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    setOpenButton(false);
  }, [router.pathname]);

  /** HANDLERS **/
  const handleOpenChat = () => {
    setOpen((prev) => !prev);
  };

  const getInputMessageHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessageInput(e.target.value);
    },
    [],
  );

  const getKeyHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onClickHandler();
    }
  };

  const onClickHandler = () => {
    if (!messageInput) {
      sweetErrorAlert(Messages.error4);
    } else if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ event: 'message', data: messageInput }));
      setMessageInput('');
    }
  };

  return (
    <Stack className="chatting">
      {openButton && (
        <button className="chat-button" onClick={handleOpenChat}>
          {open ? <CloseFullscreenIcon /> : <MarkChatUnreadIcon />}
        </button>
      )}
      <Stack className={`chat-frame ${open ? 'open' : ''}`}>
        <Box className="chat-top" component="div">
          <div style={{ fontFamily: 'Nunito' }}>Online Chat</div>
          <RippleBadge style={{ margin: '-18px 0 0 21px' }} badgeContent={onlineUsers} />
        </Box>
        <Box className="chat-content" ref={chatContentRef} component="div">
          <ScrollableFeed>
            <Stack className="chat-main">
              <Box flexDirection="row" style={{ display: 'flex' }} sx={{ m: '10px 0px' }} component="div">
                <div className="welcome">Welcome to Live chat!</div>
              </Box>
              {messagesList.map((ele: MessagePayload, index: number) => {
                const { text, memberData } = ele;
                const memberImage = memberData?.memberImage
                  ? `${REACT_APP_API_URL}/${memberData.memberImage}`
                  : '/img/profile/defaultUser.svg';

                return memberData?._id === user?._id ? (
                  <Box
                    key={index}
                    component="div"
                    flexDirection="row"
                    style={{ display: 'flex' }}
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    sx={{ m: '10px 0px' }}
                  >
                    <div className="msg-right">{text}</div>
                  </Box>
                ) : (
                  <Box
                    key={index}
                    flexDirection="row"
                    style={{ display: 'flex' }}
                    sx={{ m: '10px 0px' }}
                    component="div"
                  >
                    <Avatar alt={memberData?.memberNick ?? 'Guest'} src={memberImage} />
                    <div className="msg-left">{text}</div>
                  </Box>
                );
              })}
            </Stack>
          </ScrollableFeed>
        </Box>
        <Box className="chat-bott" component="div">
          <input
            type="text"
            name="message"
            className="msg-input"
            placeholder="Type message"
            onChange={getInputMessageHandler}
            value={messageInput}
            onKeyDown={getKeyHandler}
          />
          <button className="send-msg-btn" onClick={onClickHandler}>
            <SendIcon style={{ color: '#fff' }} />
          </button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Chat;
```

- [ ] **Step 2: Commit**

```bash
git add libs/components/Chat.tsx
git commit -m "feat: create Chat component with WebSocket message handling"
```

---

## Task 6: Initialize WebSocket in _app.tsx

The socket must be established once at app boot with the JWT token in the URL query. It is stored in `socketVar` so the `Chat` component can use it reactively.

**Files:**
- Modify: `pages/_app.tsx`

- [ ] **Step 1: Update _app.tsx**

Replace the entire content of `pages/_app.tsx` with:

```tsx
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { appWithTranslation } from 'next-i18next';
import { useApollo } from '../apollo/client';
import { light } from '../scss/MaterialTheme';
import { socketVar, userVar } from '../apollo/store';
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
    // Restore user session from stored JWT
    const jwt = getJwtToken();
    if (jwt) updateUserInfo(jwt);

    // Initialise WebSocket — token appended so the gateway can authenticate
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
    };

    return () => {
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
```

- [ ] **Step 2: Commit**

```bash
git add pages/_app.tsx
git commit -m "feat: initialise WebSocket connection in _app and set socketVar"
```

---

## Task 7: Add Chat to layout HOCs

**Files:**
- Modify: `libs/components/layout/LayoutBasic.tsx`
- Modify: `libs/components/layout/LayoutHome.tsx`

- [ ] **Step 1: Update LayoutBasic.tsx**

Replace the full file content:

```tsx
import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import Top from '../Top';
import Footer from '../Footer';
import Chat from '../Chat';
import { getJwtToken, updateUserInfo } from '../../auth';

const withLayoutBasic = (Component: any) => {
  return (props: any) => {
    useEffect(() => {
      const jwt = getJwtToken();
      if (jwt) updateUserInfo(jwt);
    }, []);

    return (
      <Stack id="pc-wrap">
        <Top />
        <Stack id="main">
          <Component {...props} />
        </Stack>
        <Chat />
        <Footer />
      </Stack>
    );
  };
};

export default withLayoutBasic;
```

- [ ] **Step 2: Update LayoutHome.tsx**

Replace the full file content:

```tsx
import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import Top from '../Top';
import Footer from '../Footer';
import Chat from '../Chat';
import { getJwtToken, updateUserInfo } from '../../auth';

const withLayoutHome = (Component: any) => {
  return (props: any) => {
    useEffect(() => {
      const jwt = getJwtToken();
      if (jwt) updateUserInfo(jwt);
    }, []);

    return (
      <Stack id="pc-wrap">
        <Top />
        <Component {...props} />
        <Chat />
        <Footer />
      </Stack>
    );
  };
};

export default withLayoutHome;
```

- [ ] **Step 3: Commit**

```bash
git add libs/components/layout/LayoutBasic.tsx libs/components/layout/LayoutHome.tsx
git commit -m "feat: add Chat widget to LayoutBasic and LayoutHome"
```

---

## Task 8: Smoke-test in dev

- [ ] **Step 1: Start the backend**

```bash
cd /Users/khonimkulovjaloliddin/Desktop/monolith && yarn start:dev monolith-api
```

Expected: `WebSocket Server Initialized & total [0]` in logs.

- [ ] **Step 2: Start the frontend**

```bash
cd /Users/khonimkulovjaloliddin/Desktop/monolith-next && yarn dev
```

Expected: server starts on `localhost:3000` with no TS errors.

- [ ] **Step 3: Verify chat button appears**

Open `http://localhost:3000`. After ~100 ms the chat button (💬 icon) should appear at bottom-right. Click it — the chat panel should slide in with "Welcome to Live chat!".

- [ ] **Step 4: Verify online count**

Open a second browser tab. The badge count on the chat header should increment to 2.

- [ ] **Step 5: Verify messaging**

Log in as a user (or guest). Type a message and press Enter or click send. The message should appear on the right side in both tabs.

- [ ] **Step 6: Verify auth flow**

Log in → close tab → reopen. The JWT is re-used and the socket re-connects with the authenticated member nick logged in backend.

---

## Self-Review

**Spec coverage:**
- ✅ WebSocket connects to NestJS gateway on port 3004
- ✅ JWT token passed via URL query `?token=`
- ✅ `info` event sets online count
- ✅ `getMessages` restores last 5 messages on connect
- ✅ `message` event renders own messages right, others left with avatar
- ✅ Chat button animates in after 100ms, hides on route change
- ✅ Chat panel slides in from right on click
- ✅ Enter key and send button both dispatch message
- ✅ Empty-message guard with `sweetErrorAlert`
- ✅ `socketVar` is set only after `ws.onopen` fires (avoids null reference in Chat)
- ✅ SCSS scoped to `#pc-wrap .chatting` (desktop only, consistent with project conventions)
- ✅ `RippleBadge` added to the existing MaterialTheme file (no new file needed)

**Placeholder scan:** None found.

**Type consistency:** `MessagePayload`, `InfoPayload` defined once in `Chat.tsx` and not referenced elsewhere. `RippleBadge` exported from `scss/MaterialTheme/index.ts` and imported with exact path in `Chat.tsx`.
