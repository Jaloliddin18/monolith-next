# CLAUDE.md

## Recent Updates — 2026-06-08

- Keep websocket ownership in `pages/_app.tsx`; do not add a second Apollo websocket client unless actual GraphQL subscriptions are introduced.
- When multiple UI features consume the shared websocket, use `addEventListener('message', ...)` / `removeEventListener(...)` instead of assigning `socket.onmessage`.
- For member avatar rendering, normalize local asset paths (`/img`, `/icons`, `/general_images`) separately from uploaded API paths.
- Live CS notice notifications now cover `FAQ`, `TERMS`, and `ANNOUNCEMENT` notices once they become `ACTIVE`.
- Notification payloads now carry `noticeCategory`; navbar click routing should send users to FAQ, Terms, or announcement detail based on that category.
- Chat online counts should represent unique authenticated members, not raw socket count.
- Newsletter subscribe handling now expects normalized lowercase email addresses and supports reactivating inactive duplicates.

## Current Phase: Backend Integration

Connecting frontend components to live GraphQL API. UI is complete — focus is data fetching, mutations, reactive state, and making pages functional.

## Commands

- `yarn dev` — localhost:3000
- `yarn build` / `yarn start` — production
- Package manager: **yarn**

## Reference Project

**Always check this first before implementing any data fetching, mutation, or Apollo pattern:**
`/Users/khonimkulovjaloliddin/Desktop/NESTAR PROJECT/nestar-next`

Same stack, same structure. When in doubt about how to wire up a query, handle pagination, manage auth state, or structure a component — read the equivalent file there first.

## Stack

- **Next.js 16** — Pages Router (NOT App Router)
- **TypeScript** strict mode
- **MUI 5** + global SCSS + Emotion
- **Apollo Client** — `makeVar` reactive vars, no Redux/Context
- **i18n:** next-i18next (en, kr, ru)
- Path alias: `@/*` → project root

## Backend

- **NestJS 10** monorepo, GraphQL (Apollo Server), MongoDB (Mongoose 8)
- Source: `/Users/khonimkulovjaloliddin/Desktop/monolith/apps/monolith-api/src/components/`
- Batch Server: `/Users/khonimkulovjaloliddin/Desktop/monolith/apps/monolith-batch`
- GraphQL playground: `http://localhost:3004/graphql`
- Auth: JWT Bearer, 30-day expiry
- Uploads: `graphql-upload` → `/uploads/{target}/{uuid}.{ext}` (jpg/png, 15MB max)

## Folder Structure

```
apollo/
├── client.ts              # errorLink → authLink → uploadLink → InMemoryCache
├── store.ts               # userVar, socketVar
├── user/query.ts          # GET_FURNITURES, GET_MEMBER, etc.
├── user/mutation.ts       # LOGIN, SIGN_UP, CREATE_FURNITURE, etc.
└── admin/query.ts|mutation.ts

libs/
├── auth/index.ts          # getJwtToken, setJwtToken, logIn, logOut
├── config.ts              # Constants, API URLs
├── sweetAlert.ts          # sweetErrorAlert, sweetTopSmallSuccessAlert, sweetConfirmAlert
├── utils.ts
├── enums/                 # member.enum.ts, furniture.enum.ts, etc.
├── types/                 # member/, furniture/, board-article/, comment/, follow/, like/, common.ts
├── hooks/                 # useDeviceDetect.ts
└── components/
    ├── layout/            # withLayoutBasic, withLayoutHome, withLayoutFull, withLayoutAdmin
    ├── Top.tsx / Footer.tsx
    ├── common/            # BlogCard, BlogArticleCard, ProductCard, DesignerCard
    └── homepage/ furniture/ member/ mypage/ admin/ blog/ join/

scss/
├── app.scss / reset.scss / variables.scss
├── MaterialTheme/
├── pc/ / mobile/

pages/                     # File-based routing
```

## Apollo Patterns

### Query

```ts
const { data, loading, error } = useQuery(GET_FURNITURES, {
  fetchPolicy: "cache-and-network",
  variables: { input: searchFilter },
  notifyOnNetworkStatusChange: true,
});
```

### Mutation

```ts
const [createFurniture] = useMutation(CREATE_FURNITURE);
await createFurniture({ variables: { input }, fetchPolicy: "network-only" });
```

### Auth Link

JWT from `localStorage` via `getJwtToken()` → `Authorization: Bearer ${token}`

### Reactive State

```ts
import { userVar } from "@/apollo/store";
import { useReactiveVar } from "@apollo/client";
const user = useReactiveVar(userVar);
```

## Auth Flow

- JWT stored in `localStorage` key `'accessToken'`
- Login: `LOGIN` mutation → store token → `jwt-decode` → set `userVar`
- Logout: clear localStorage → reset `userVar` → `window.location.reload()`
- Protected routes: check `user.memberType` in layout HOC

## GraphQL Naming

- Queries: `GET_FURNITURES`, `GET_MEMBER` (UPPER*SNAKE, GET* prefix)
- Mutations: `CREATE_FURNITURE`, `UPDATE_FURNITURE`, `LOGIN`, `SIGN_UP`
- Grouped by: `/** MEMBER */`, `/** FURNITURE */`
- Always return: `memberData`, `meLiked`, `meFollowed`

## Pagination

- Input: `{ page: 1, limit: 10, sort: 'createdAt', direction: Direction.DESC, search: {} }`
- Filter in URL: `?input=${JSON.stringify(searchFilter)}`
- Parse: `JSON.parse(router?.query?.input as string)`
- Response: `{ list: [...], metaCounter: [{ total: number }] }`
- UI: `<Pagination count={Math.ceil(total / limit)} page={currentPage} onChange={handler} />`

## TypeScript Conventions

- No prefix: `Member`, `Furniture`, `Comment`
- Input: `MemberInput`, Update: `MemberUpdate`
- Inquiry: `FurnituresInquiry { page, limit, sort, direction, search }`
- List: `Furnitures { list: Furniture[], metaCounter: TotalCounter[] }`

## Domain Models

| Model        | Key Fields                                                           |
| ------------ | -------------------------------------------------------------------- |
| Member       | nick, phone, type (USER/DESIGNER/ADMIN), status, image, stats        |
| Furniture    | title, price, room, category, style, material, images, status, stats |
| BoardArticle | title, content, category, image, memberId, stats                     |
| Comment      | content, group (ARTICLE/FURNITURE/MEMBER), commentRefId              |
| Like         | likeGroup, likeRefId, memberId                                       |
| Follow       | followingId, followerId                                              |

## API Patterns

- Auth: `signup(MemberInput)`, `login(LoginInput)` → `accessToken`
- CRUD: `create{Entity}`, `update{Entity}`, `get{Entity}`, `get{Entities}`
- Like: `likeTarget{Entity}`
- Admin: `getAll{Entities}ByAdmin`, `update{Entity}ByAdmin`, `remove{Entity}ByAdmin`
- Social: `subscribe/unsubscribe`, `getMemberFollowings/Followers`, `getFavorites`, `getVisited`
- Naming: `memberNick`, `furniturePrice` (entity-prefixed)
- Guards: `@AuthGuard`, `@RolesGuard`, `@WithoutGuard`

## Error & Loading

- Global: Apollo `onError` link → `sweetErrorAlert(message)`
- Component: `try/catch` → `sweetMixinErrorAlert(err.message)`
- Loading: `loading` from `useQuery` → `<CircularProgress />`
- Success: `sweetTopSmallSuccessAlert('success', 800)`
- Confirm: `sweetConfirmAlert(msg)` → `Promise<boolean>`

## Layout HOCs

- `withLayoutBasic`: `<Top /> → <Header /> → <Component /> → <Chat /> → <Footer />`
- Variants: `withLayoutHome` (filters), `withLayoutFull` (detail), `withLayoutAdmin` (drawer)

## Mobile Development Rules

- Always use `useDeviceDetect()` hook for device detection — user-agent based, no `window.innerWidth`
- Mobile branch: `if (device === 'mobile') return <MobileJSX />;` — added above existing return
- Desktop branch: `return <DesktopJSX />;` — existing code, **never modify when adding mobile**
- Layout HOCs: mobile renders `<Stack id="mobile-wrap">`, desktop renders `<Stack id="pc-wrap">`
- All mobile styles go in `scss/mobile/main.scss` — imported in `_app.tsx`
- All mobile styles scoped under `#mobile-wrap { ... }` — never write bare selectors
- **Never use media queries** — `#mobile-wrap` scoping replaces them entirely
- Mobile navbar uses MUI `Drawer` for hamburger menu (not a simple link bar)
- Reference: `/Users/khonimkulovjaloliddin/Desktop/NESTAR PROJECT/nestar-next` — check equivalent component before implementing any mobile branch

## SCSS Rules

- Global SCSS only — NOT CSS Modules — imported in `_app.tsx`
- Desktop: `scss/pc/`, Mobile: `scss/mobile/`
- BEM-like: `.furniture-big-card-box`, `.card-img`

## Images

- Display: `${REACT_APP_API_URL}/${item.furnitureImages[0]}`
- Upload: pass `File` in mutation → `apollo-upload-client` handles FormData
- Fallback: `/img/furniture/luxury_chair.jpg`
- Never use `/placeholder.svg`

## Environment Variables

- `REACT_APP_API_URL` — backend base
- `REACT_APP_API_GRAPHQL_URL` — GraphQL endpoint
- `REACT_APP_API_WS` — WebSocket URL
- Exposed via `next.config.ts` → consumed from `libs/config.ts`

## Context Rules

- Only read files relevant to current task
- Always check reference project before implementing new patterns
- Never read `node_modules`, `.next`, `build`, or `public` unless asked
- SSR: guard Apollo calls with `typeof window`

## Commit Style

Name commits by the **high-level outcome**, not implementation details.

- Good: `feat: implement profile photo upload`
- Bad: `feat: add axios import, imageUploader mutation, remove Radio component`

One line that describes what changed from the user's perspective — not what files or functions were touched.

**IMPORTANT: Never run `git commit`, `git add`, or any git write command. The user handles all commits themselves. Only make file changes — never commit them.**
