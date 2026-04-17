# Project MEMORY — Monolith Furniture Platform

Generated: 2026-04-14. Read actual files before acting on any file path or function name — these may have changed.

## Session Update — 2026-04-17

New files created:

- None.

Files changed in this session:

- `.gitignore` (added `docs/superpowers/` ignore entry).
- `libs/components/homepage/TopRated.tsx`.
- `libs/components/homepage/TopSelection.tsx`.
- `libs/components/homepage/TrendingNow.tsx`.
- `pages/furniture/detail.tsx`.
- `scss/pc/furniture/furniture-detail.scss`.
- `scss/pc/homepage/homepage.scss`.

New GraphQL queries/mutations added:

- None in this session.

Components wired or modified:

- Homepage `TopRated`: moved to shared Swiper navigation/pagination pattern, removed custom icon-based controls.
- Homepage `TopSelection`: moved to shared Swiper navigation/pagination pattern, removed custom external arrow controls.
- Homepage `TrendingNow`: changed from static card grid to Swiper slider with navigation/pagination.
- Furniture detail page: replaced gallery carousel with static gallery row; replaced right-side dimension image navigator with side-by-side dimension images.
- Suggested for you SCSS in `scss/pc/homepage/homepage.scss`: restored to previous `.section-title-text` style structure during this session.

Decisions made in this session:

- Standardize homepage product carousels on built-in Swiper navigation + pagination using shared `.section-swiper-wrap` styles.
- Keep Suggested for you section in its previous visual/style state after rollback request.
- Keep GraphQL layer unchanged during this UI/SCSS-focused session.

Current state of what is working:

- Homepage carousel components are aligned to a shared Swiper interaction pattern in code.
- Suggested for you SCSS rollback is applied in `scss/pc/homepage/homepage.scss`.
- Furniture detail gallery/dimension layout refactor is applied in component and SCSS.
- No new GraphQL operations were introduced.
- Runtime validation was not re-run in this session.

---

## Project Overview

An IKEA-style furniture e-commerce + designer marketplace platform.
Users browse and buy furniture; designers list and manage their products; admins moderate everything.

**Full Stack:**

- Backend: NestJS 10, GraphQL (Apollo Server), MongoDB (Mongoose 8), WebSocket, Nodemailer
- Frontend: Next.js (Pages Router), TypeScript strict, Apollo Client, MUI 5, SCSS, i18n (en/kr/ru)
- Ports: API = 3004, Batch = 3005, Frontend = 3000
- GraphQL Playground: http://localhost:3004/graphql

---

## Backend Modules & Files

All source lives in `apps/monolith-api/src/`.

### Member

- Resolver: `components/member/member.resolver.ts`
- Service: `components/member/member.service.ts`
- Module: `components/member/member.module.ts`
- DTO: `libs/dto/member/member.ts`, `member.input.ts`, `member.update.ts`
- Schema: `schemas/Member.model.ts`
- MongoDB collection: `members`

### Furniture

- Resolver: `components/furniture/furniture.resolver.ts`
- Service: `components/furniture/furniture.service.ts`
- Module: `components/furniture/furniture.module.ts`
- DTO: `libs/dto/furniture/furniture.ts`, `furniture.input.ts`, `furniture.update.ts`
- Schema: `schemas/Furniture.model.ts`
- MongoDB collection: `furnitures`

### Board Article

- Resolver: `components/board-article/board-article.resolver.ts`
- Service: `components/board-article/board-article.service.ts`
- Module: `components/board-article/board-article.module.ts`
- DTO: `libs/dto/board-article/board-article.ts`, `board-article.input.ts`, `board-article.update.ts`
- Schema: `schemas/BoardArticle.model.ts`
- MongoDB collection: `boardArticles`

### Comment

- Resolver: `components/comment/comment.resolver.ts`
- Service: `components/comment/comment.service.ts`
- Module: `components/comment/comment.module.ts`
- DTO: `libs/dto/comment/comment.ts`, `comment.input.ts`, `comment.update.ts`
- Schema: `schemas/Comment.model.ts`
- MongoDB collection: `comments`

### Follow

- Resolver: `components/follow/follow.resolver.ts`
- Service: `components/follow/follow.service.ts`
- Module: `components/follow/follow.module.ts`
- DTO: `libs/dto/follow/follow.ts`, `follow.input.ts`
- Schema: `schemas/Follow.model.ts`
- MongoDB collection: `follow`

### Like (service only, no resolver)

- Service: `components/like/like.service.ts`
- Module: `components/like/like.module.ts`
- DTO: `libs/dto/like/like.ts`, `like.input.ts`
- Schema: `schemas/Like.model.ts`
- MongoDB collection: `likes`

### View (service only, no resolver)

- Service: `components/view/view.service.ts`
- Module: `components/view/view.module.ts`
- DTO: `libs/dto/view/view.ts`, `view.input.ts`
- Schema: `schemas/View.model.ts`
- MongoDB collection: `views`

### Notification / Newsletter

- Resolver: `components/notification/notification.resolver.ts`
- Service: `components/notification/notification.service.ts`
- Mail: `components/notification/mail.service.ts`
- Module: `components/notification/notification.module.ts`
- DTO: `libs/dto/notification/notification.ts`, `notification.input.ts`
- Schema: `schemas/Subscriber.model.ts`, `schemas/Notification.model.ts`, `schemas/Notice.model.ts`
- MongoDB collection: `subscribers`

### Auth (cross-cutting, no resolver)

- Service: `components/auth/auth.service.ts`
- Module: `components/auth/auth.module.ts`
- Guards: `components/auth/guards/auth.guard.ts`, `roles.guard.ts`, `without.guard.ts`
- Decorators: `components/auth/decorators/authMember.decorator.ts`, `roles.decorator.ts`

### WebSocket

- Gateway: `socket/socket.gateway.ts`
- Module: `socket/socket.module.ts`

### Batch Service

- Location: `apps/monolith-batch/src/`
- Controller: `batch.controller.ts` — all cron jobs
- Service: `batch.service.ts` — all batch logic

### Other Schemas

- `schemas/Notice.model.ts` — notices/announcements
- `schemas/Notification.model.ts` — in-app notifications

---

## GraphQL API

### Queries

| Method                     | Input                     | Returns       | Guard                      |
| -------------------------- | ------------------------- | ------------- | -------------------------- |
| checkAuth                  | —                         | String        | AuthGuard                  |
| checkAuthRoles             | —                         | String        | RolesGuard (USER,DESIGNER) |
| getMember                  | memberId: String          | Member        | WithoutGuard               |
| getDesigners               | DesignersInquiry          | Members       | WithoutGuard               |
| getAllMembersByAdmin       | MembersInquiry            | Members       | RolesGuard (ADMIN)         |
| getFurniture               | furnitureId: String       | Furniture     | WithoutGuard               |
| getFurnitures              | FurnituresInquiry         | Furnitures    | WithoutGuard               |
| getFavorites               | OrdinaryInquiry           | Furnitures    | AuthGuard                  |
| getVisited                 | OrdinaryInquiry           | Furnitures    | AuthGuard                  |
| getDesignerFurnitures      | DesignerFurnituresInquiry | Furnitures    | RolesGuard (DESIGNER)      |
| getAllFurnituresByAdmin    | AllFurnituresInquiry      | Furnitures    | RolesGuard (ADMIN)         |
| getBoardArticle            | articleId: String         | BoardArticle  | WithoutGuard               |
| getBoardArticles           | BoardArticlesInquiry      | BoardArticles | WithoutGuard               |
| getAllBoardArticlesByAdmin | AllBoardArticlesInquiry   | BoardArticles | RolesGuard (ADMIN)         |
| getComments                | CommentsInquiry           | Comments      | WithoutGuard               |
| getMemberFollowers         | FollowInquiry             | Followers     | WithoutGuard               |
| getMemberFollowings        | FollowInquiry             | Followings    | WithoutGuard               |
| getAllSubscribersByAdmin   | GetSubscribersInquiry     | Subscribers   | RolesGuard (ADMIN)         |

### Mutations

| Method                    | Input                                  | Returns                | Guard                 |
| ------------------------- | -------------------------------------- | ---------------------- | --------------------- |
| signup                    | MemberInput                            | Member (+ accessToken) | none                  |
| login                     | LoginInput                             | Member (+ accessToken) | none                  |
| updateMember              | MemberUpdate                           | Member                 | AuthGuard             |
| likeTargetMember          | memberId: String                       | Member                 | AuthGuard             |
| updateMemberByAdmin       | MemberUpdate                           | Member                 | RolesGuard (ADMIN)    |
| imageUploader             | file: GraphQLUpload, target: String    | String (url)           | AuthGuard             |
| imagesUploader            | files: [GraphQLUpload], target: String | [String]               | AuthGuard             |
| createFurniture           | FurnitureInput                         | Furniture              | RolesGuard (DESIGNER) |
| updateFurniture           | FurnitureUpdate                        | Furniture              | RolesGuard (DESIGNER) |
| likeTargetFurniture       | furnitureId: String                    | Furniture              | AuthGuard             |
| updateFurnitureByAdmin    | FurnitureUpdate                        | Furniture              | RolesGuard (ADMIN)    |
| removeFurnitureByAdmin    | furnitureId: String                    | Furniture              | RolesGuard (ADMIN)    |
| createBoardArticle        | BoardArticleInput                      | BoardArticle           | AuthGuard             |
| updateBoardArticle        | BoardArticleUpdate                     | BoardArticle           | AuthGuard             |
| likeTargetBoardArticle    | articleId: String                      | BoardArticle           | AuthGuard             |
| updateBoardArticleByAdmin | BoardArticleUpdate                     | BoardArticle           | RolesGuard (ADMIN)    |
| removeBoardArticleByAdmin | articleId: String                      | BoardArticle           | RolesGuard (ADMIN)    |
| createComment             | CommentInput                           | Comment                | AuthGuard             |
| updateComment             | CommentUpdate                          | Comment                | AuthGuard             |
| removeCommentByAdmin      | commentId: String                      | Comment                | RolesGuard (ADMIN)    |
| subscribe                 | input: String (memberId)               | Follower               | AuthGuard             |
| unsubscribe               | input: String (memberId)               | Follower               | AuthGuard             |
| subscribeNewsletter       | SubscribeInput (email)                 | Subscriber             | WithoutGuard          |
| unsubscribeNewsletter     | UnsubscribeInput (email/token)         | Subscriber             | WithoutGuard          |

### Enums (backend: `libs/enums/`, frontend: `libs/enums/`)

**common.enum.ts:** Message, Direction (ASC=1, DESC=-1)

**member.enum.ts:**

- MemberType: USER, DESIGNER, ADMIN
- MemberStatus: ACTIVE, BLOCK, DELETE
- MemberAuthType: PHONE, EMAIL, TELEGRAM, GOOGLE

**furniture.enum.ts:**

- FurnitureRoom: LIVING_ROOM, BEDROOM, KITCHEN, DINING, BATHROOM, HOME_OFFICE, CHILDRENS_ROOM, OUTDOOR, HALLWAY, LAUNDRY, GARAGE, GAMING_ROOM
- FurnitureCategory: SOFAS_ARMCHAIRS, CHAIRS, TABLES, DESKS, BEDS_MATTRESSES, STORAGE_ORGANIZATION, WARDROBES, BOOKCASES_SHELVING, KITCHEN_FURNITURE, LIGHTING, TEXTILES, RUGS, CURTAINS, DECORATION, COOKWARE, OUTDOOR_FURNITURE
- FurnitureStatus: ACTIVE, NEW, LIMITED, LAST_CHANCE, DISCONTINUED, DELETE
- FurnitureStyle: MINIMALIST, HIGHTECH, SCANDINAVIAN, MODERN, TRADITIONAL, INDUSTRIAL
- FurnitureMaterial: SOLID_WOOD, PARTICLE_BOARD, MDF, METAL, GLASS, PLASTIC, BAMBOO, RATTAN, FABRIC, LEATHER, RECYCLED
- FurnitureColor: WHITE, BLACK, GREY, BEIGE, BROWN, BLUE, GREEN, RED, PINK, YELLOW, ORANGE, PURPLE, NATURAL_WOOD, MULTICOLOR
- AssemblyType: SELF_ASSEMBLY, EASY_ASSEMBLY, PRE_ASSEMBLED
- AssemblyDifficulty: EASY, MEDIUM, COMPLEX
- DeliveryMethod: STORE_PICKUP, HOME_DELIVERY, EXPRESS_DELIVERY, WHITE_GLOVE
- SustainabilityLabel: NONE, SUSTAINABLE_MATERIALS, FSC_CERTIFIED, RECYCLED_CONTENT, CIRCULAR_DESIGN

**board-article.enum.ts:** BoardArticleCategory (FREE, RECOMMEND, NEWS, HUMOR), BoardArticleStatus (ACTIVE, DELETE)

**comment.enum.ts:** CommentStatus (ACTIVE, DELETE), CommentGroup (MEMBER, ARTICLE, FURNITURE)

**like.enum.ts:** LikeGroup (MEMBER, FURNITURE, ARTICLE)

**notification.enum.ts:** NotificationType (LIKE, COMMENT), NotificationStatus (WAIT, READ), NotificationGroup (MEMBER, ARTICLE, FURNITURE)

**notice.enum.ts:** NoticeCategory (FAQ, TERMS, INQUIRY), NoticeStatus (HOLD, ACTIVE, DELETE)

**view.enum.ts:** ViewGroup (MEMBER, ARTICLE, FURNITURE)

### MongoDB Schema Key Fields

**Member:** memberType, memberStatus, memberAuthType, memberEmail (unique sparse), memberPhone (unique sparse, required), memberNick (unique sparse, required), memberPassword (select:false), memberFullName, memberImage, memberAddress, memberDesc, memberDesigns, memberArticles, memberFollowers, memberFollowings, memberLikes, memberViews, memberComments, memberPoints, memberRank, memberWarnings, memberBlocks, deletedAt

**Furniture:** furnitureTitle (required), furnitureRoom, furnitureCategory, furnitureStyle, furnitureStatus (default:ACTIVE), furniturePrice, furnitureLastChancePrice, furnitureDimensions {width,height,depth}, furnitureWeight, furnitureMaterial, furnitureColor, sustainabilityLabel, assemblyType, assemblyTime, assemblyDifficulty, deliveryMethod, furnitureImages ([String], required), furnitureVideo, furniture3DModel, furnitureDesc, assemblyInstructions, furnitureViews, furnitureLikes, furnitureComments, furnitureRank, furnitureTrending, furnitureEngagement, furnitureRent (bool), furnitureDiscount (0-100), discountStart, discountEnd, furnitureOnSale, furnitureBestseller, launchedAt, discontinuedAt, deletedAt, memberId (ref:Member)

- Unique compound: furnitureRoom+furnitureCategory+furnitureTitle+furniturePrice
- Text index: furnitureTitle, furnitureDesc

**Aggregation helpers in `libs/config.ts`:** `lookupAuthMemberLiked()`, `lookupAuthMemberFollowed()`, `lookupMember`, `lookupFollowingData`, `lookupFollowerData`, `shapeIntoMongoObjectId()`, `getSerialForImage()`, `availableDesignerSorts`, `availableMemberSort`, `availableFurnitureSorts`, `availableBoardArticleSorts`, `validMimeTypes`

---

## Frontend Pages & Components

All pages in `pages/`. All components in `libs/components/`.

### Pages

| File                            | Route                        | Purpose                                                                    |
| ------------------------------- | ---------------------------- | -------------------------------------------------------------------------- |
| `pages/index.tsx`               | /                            | Homepage — trending, ranked, suggested furniture sections                  |
| `pages/_app.tsx`                | global                       | ApolloProvider, MUI theme, i18n, WebSocket init, JWT restore               |
| `pages/_document.tsx`           | global                       | Next.js document shell                                                     |
| `pages/account/join.tsx`        | /account/join                | Login + signup toggle (view=signup param)                                  |
| `pages/account/signup.tsx`      | /account/signup              | Re-export of join.tsx                                                      |
| `pages/furniture/index.tsx`     | /furniture                   | Furniture catalog with filters, sorting, pagination                        |
| `pages/furniture/detail.tsx`    | /furniture/detail?id=        | Product detail: images, specs, like, add-to-cart, similar items, reviews   |
| `pages/community/index.tsx`     | /community                   | Blog/community article listing                                             |
| `pages/community/detail.tsx`    | /community/detail?articleId= | Article detail with comments                                               |
| `pages/member/index.tsx`        | /member                      | Designers directory with pagination                                        |
| `pages/member/detail.tsx`       | /member/detail?memberId=     | Designer profile with tabs (designs, blog, followers, followings, reviews) |
| `pages/designers/index.tsx`     | /designers                   | Alias for /member                                                          |
| `pages/cs/index.tsx`            | /cs                          | Customer service overview                                                  |
| `pages/cs/contact.tsx`          | /cs/contact                  | Contact form                                                               |
| `pages/cs/faq.tsx`              | /cs/faq                      | FAQ page                                                                   |
| `pages/cs/privacy.tsx`          | /cs/privacy                  | Privacy policy                                                             |
| `pages/cs/terms.tsx`            | /cs/terms                    | Terms of service                                                           |
| `pages/about/index.tsx`         | /about                       | About page with video, partners, stats                                     |
| `pages/mypage/index.tsx`        | /mypage                      | My account dashboard                                                       |
| `pages/mypage/manage-address/`  | /mypage/manage-address       | Address management                                                         |
| `pages/mypage/payment-details/` | /mypage/payment-details      | Payment info                                                               |
| `pages/mypage/coupons/`         | /mypage/coupons              | Coupon list                                                                |
| `pages/mypage/wishlist/`        | /mypage/wishlist             | Liked/saved furniture                                                      |
| `pages/mypage/visited/`         | /mypage/visited              | Recently viewed furniture                                                  |
| `pages/mypage/articles/`        | /mypage/articles             | My blog posts                                                              |
| `pages/mypage/write-article/`   | /mypage/write-article        | Article editor                                                             |
| `pages/mypage/my-furnitures/`   | /mypage/my-furnitures        | Designer's furniture listings                                              |
| `pages/mypage/add-furniture/`   | /mypage/add-furniture        | Furniture creation form                                                    |
| `pages/mypage/followers/`       | /mypage/followers            | My followers                                                               |
| `pages/mypage/followings/`      | /mypage/followings           | My followings                                                              |
| `pages/mypage/cart/`            | /mypage/cart                 | Shopping cart                                                              |
| `pages/mypage/orders/`          | /mypage/orders               | Order history                                                              |
| `pages/mypage/order/`           | /mypage/order                | Single order detail                                                        |
| `pages/_admin/index.tsx`        | /\_admin                     | Admin dashboard                                                            |
| `pages/_admin/properties/`      | /\_admin/properties          | Admin furniture management                                                 |
| `pages/_admin/community/`       | /\_admin/community           | Admin article management                                                   |
| `pages/_admin/cs/`              | /\_admin/cs                  | Admin support management                                                   |
| `pages/_admin/users/`           | /\_admin/users               | Admin member management                                                    |
| `pages/checkout/index.tsx`      | /checkout                    | Checkout form + order summary                                              |
| `pages/unsubscribe/index.tsx`   | /unsubscribe                 | Newsletter unsubscribe (token param)                                       |

### HOC Layouts

- `libs/components/layout/LayoutHome.tsx` → `withLayoutHome` — homepage: Top + Footer + Chat
- `libs/components/layout/LayoutBasic.tsx` → `withLayoutBasic` — most pages: Top + Main + Footer + Chat
- `libs/components/layout/LayoutAdmin.tsx` → `withLayoutAdmin` — admin drawer layout

### Components by Domain

**Global:** `libs/components/Top.tsx`, `libs/components/Footer.tsx`, `libs/components/Chat.tsx`

**Homepage (`libs/components/homepage/`):**
HeroSection, IntroSection, ServicesSection, AwesomeServices, NewestChair, TrendingNow, ShopByCategory, SuggestedSection, SaleBanner, LivingRoom, TopSelection, TopRated, FaqSection, BlogSection, StoreFinder, ProductCard

**Furniture (`libs/components/furniture/`):**
FurnitureListPage, ProductGrid, ProductCard, FilterSidebar, ProductReviews, ReviewSection, PopularProducts, NewsletterBanner

**Designer (`libs/components/designer/`):**
DesignerProfileHero, DesignerDesignsPanel, DesignerBlogPanel, DesignerFollowersPanel, DesignerFollowingsPanel, DesignerReviewsPanel, DesignerListSection, DesignerHero, DesignerPortfolio, DesignerAbout, DesignerComments, DesignerCTA, FeaturedDesigners

**Blog/Community (`libs/components/blog/`):**
BlogListSection, ArticleContent, ArticleComments, RelatedPostsSection, TrendingArticlesSection, BlogCard, BlogArticleCard, MyPageArticleCard

**My Page (`libs/components/mypage/`):**
MyPageLayout, MyPageSidebar, PersonalInfo, ManageAddress, PaymentDetails, MyCoupons, MyCart, MyWishlist, MyVisited, MyArticles, WriteArticle, MyFurnitures, AddFurniture, MyFollowers, MyFollowings, MyOrders, OrdersSidebar

**Admin (`libs/components/admin/`):**
AdminMenuList, FurnitureList, PropertyList, MemberList, CommunityArticleList, FaqList, InquiryList, NoticeList

**Auth (`libs/components/join/`):** Login, Signup

**Checkout (`libs/components/checkout/`):** CheckoutForm, OrderSummary

**CS (`libs/components/cs/`):** ContactPage, FaqPage, PrivacyPage, TermsPage

**Cart (`libs/components/cart/`):** MiniCart, MiniWishlist

**Common (`libs/components/common/`):** InstagramSection, ProductCard, DesignerCard, BlogCard, BlogArticleCard, MyPageArticleCard

**Community (`libs/components/community/`):** TuiEditor (rich text editor)

---

## Apollo Queries & Mutations

### `apollo/client.ts`

- Chain: `errorLink → tokenRefreshLink → splitLink`
- splitLink: subscriptions → WebSocketLink, everything else → authLink + uploadLink
- errorLink: calls `sweetErrorAlert(message)` for non-input GraphQL errors
- Auth: `getHeaders()` injects `Authorization: Bearer ${token}` from localStorage
- Upload: `apollo-upload-client` createUploadLink
- WebSocket: custom `LoggingWebSocket` class, appends `?token=JWT` to WS URL
- SSR: `initializeApollo(initialState)` + `useApollo(pageProps)` hook

### `apollo/store.ts`

- `userVar` — `makeVar<CustomJwtPayload>({...empty...})` — current authenticated user
- `socketVar` — `makeVar<WebSocket>()` — active WebSocket connection
- `themeVar` — `makeVar({})` — theme state

### `apollo/user/query.ts`

GetDesigners, GetMember, GetFurniture, GetFurnitures, GetDesignerFurnitures, GetFavorites, GetVisited, GetBoardArticle, GetBoardArticles, GetComments, GetMemberFollowers, GetMemberFollowings, GetSubscribers

Each query returns `memberData`, `meLiked`, or `meFollowed` as needed via aggregation.

### `apollo/user/mutation.ts`

Signup, Login, UpdateMember, LikeTargetMember, CreateFurniture, UpdateFurniture, LikeTargetFurniture, CreateBoardArticle, UpdateBoardArticle, LikeTargetBoardArticle, CreateComment, UpdateComment, Subscribe, Unsubscribe, SubscribeNewsletter, UnsubscribeNewsletter

### `apollo/admin/query.ts`

GetAllMembersByAdmin, GetAllFurnituresByAdmin, GetAllBoardArticlesByAdmin, GetComments

### `apollo/admin/mutation.ts`

UpdateMemberByAdmin, UpdateFurnitureByAdmin, RemoveFurnitureByAdmin, UpdateBoardArticleByAdmin, RemoveBoardArticleByAdmin, RemoveCommentByAdmin

---

## SCSS Structure

```
scss/
├── variables.scss        — fonts, colors, CSS vars, font scales
├── reset.scss            — CSS normalize
├── app.scss              — global app styles
├── MaterialTheme/
│   ├── index.ts          — MUI theme config
│   └── typography.ts     — MUI typography
└── pc/
    ├── main.scss         — main responsive layout
    ├── about/about.scss
    ├── admin/admin.scss
    ├── blog/blog.scss, blog-detail.scss
    ├── cart/cart.scss
    ├── chat/chat.scss
    ├── checkout/checkout.scss
    ├── contact/contact.scss, faq.scss, privacy.scss, terms.scss
    ├── designer/designer.scss, designer-detail.scss
    ├── furniture/furniture-list.scss, furniture-detail.scss
    ├── homepage/homepage.scss
    ├── join/join.scss
    ├── mypage/mypage.scss
    └── service/service.scss
```

**Color palette (from variables.scss):**

- Primary: #C46A4A (terracotta)
- Text dark: #1C1C1C, body: #2D2D2D, muted: #787878
- Background dark: #1C1A17, warm: #EDE4D8, light: #FAFAFA
- Border: #E8E0D8
- Success: #2E7D32, Sale: #C0392B

**Fonts:** Poppins, Playfair Display, Jost, DM Sans

**Rule:** Global SCSS only — NO CSS Modules. All SCSS imported in `_app.tsx`. BEM-like naming: `.furniture-big-card-box`, `.card-img`.

---

## Auth Flow

1. `signup(MemberInput)` or `login(LoginInput)` mutation → returns Member with `accessToken`
2. `setJwtToken(token)` → stores in `localStorage['accessToken']`
3. `updateUserInfo(token)` → `jwt-decode` → populates `userVar` reactive var
4. All Apollo requests: `getJwtToken()` → `Authorization: Bearer ${token}` header via authLink
5. WebSocket: token appended as `?token=JWT` query param
6. Logout: `logOut()` → removes localStorage → resets `userVar` → `window.location.reload()`
7. Protected routes: check `user.memberType` in layout HOC

**Guards (backend):**

- `AuthGuard` — verifies JWT, throws if missing/invalid, sets `request.body.authMember`
- `RolesGuard` — checks `authMember.memberType` against `@Roles(...)` metadata
- `WithoutGuard` — optional auth: sets authMember or null, never throws

**Decorators (backend):**

- `@AuthMember('_id')` — extracts field from authMember
- `@Roles(MemberType.ADMIN)` — sets role metadata for RolesGuard

---

## Naming Conventions

**Resolver methods:** `camelCase` matching GraphQL operation name — `signup`, `login`, `getMember`, `getDesigners`, `likeTargetFurniture`, `getAllMembersByAdmin`, `updateFurnitureByAdmin`, `removeFurnitureByAdmin`

**DTO naming:**

- Object types: `Member`, `Furniture`, `BoardArticle`, `Comment`, `Follow`
- List wrapper: `Members`, `Furnitures`, `BoardArticles` — always `{ list: T[], metaCounter: TotalCounter[] }`
- Input: `MemberInput`, `FurnitureInput`, `BoardArticleInput`
- Update: `MemberUpdate`, `FurnitureUpdate`, `BoardArticleUpdate`
- Inquiry: `FurnituresInquiry`, `DesignersInquiry`, `BoardArticlesInquiry`, `CommentsInquiry`
- Admin inquiry: `AllFurnituresInquiry`, `MembersInquiry`, `AllBoardArticlesInquiry`
- Special: `OrdinaryInquiry` (for favorites/visited), `FollowInquiry`, `DesignerFurnituresInquiry`

**File naming:**

- Backend: `member.resolver.ts`, `member.service.ts`, `member.module.ts`, `member.input.ts`, `member.update.ts`
- Schemas: `Member.model.ts` (PascalCase)
- Frontend: `member.enum.ts`, `furniture.ts` (type files), component files PascalCase

**GQL constant naming (frontend):** `GET_FURNITURES`, `GET_MEMBER`, `CREATE_FURNITURE`, `UPDATE_FURNITURE`, `LOGIN`, `SIGN_UP`, `LIKE_TARGET_FURNITURE`

**Field naming:** entity-prefixed — `furniturePrice`, `memberNick`, `articleTitle`

---

## Reference Project Patterns (nestar-next)

Located at `/Users/khonimkulovjaloliddin/Desktop/NESTAR PROJECT/nestar-next`. Domain is real-estate (Property, Agent) — same stack, same patterns.

**Apollo client.ts pattern:**

- `from([errorLink, tokenRefreshLink, splitLink])` — exact chain order
- `split()` separates subscriptions (wsLink) from queries/mutations (authLink.concat(uploadLink))
- `initializeApollo(initialState)` + `useApollo(pageProps)` for SSR hydration
- `createIsomorphicLink()` guards with `typeof window !== 'undefined'`

**Query file pattern:**

- Grouped by domain with `/** MEMBER */`, `/** PROPERTY */` comment headers
- Every query returns full field list including `memberData`, `meLiked`, `meFollowed`
- `meLiked { memberId likeRefId myFavorite }` — like status shape
- `meFollowed { followingId followerId myFollowing }` — follow status shape

**Mutation pattern:**

- All mutations return full entity fields including `accessToken` on Member
- `SIGN_UP`, `LOGIN` const names (upper snake, not `SIGNUP`)

**Auth pattern (`libs/auth/index.ts`):**

- `logIn(nick, password)` → `requestJwtToken()` → `updateStorage()` + `updateUserInfo()`
- `signUp(nick, password, phone, type)` → `requestSignUpJwtToken()`
- `updateUserInfo(jwtToken)` uses `jwt-decode` to populate `userVar`
- `logOut()` = `deleteStorage()` + `deleteUserInfo()` + `window.location.reload()`
- localStorage key: `'accessToken'`; also sets `'login'`/`'logout'` timestamps

**store.ts:** `userVar`, `socketVar`, `themeVar` all via `makeVar`

**config.ts:** `REACT_APP_API_URL`, `Messages` object, domain-specific filter arrays

**Pagination input shape:** `{ page: 1, limit: N, sort: 'createdAt', direction: Direction.DESC, search: {} }`

**Pagination response shape:** `{ list: [...], metaCounter: [{ total: number }] }`

**Image display:** `` `${REACT_APP_API_URL}/${item.furnitureImages[0]}` ``

**Image upload:** pass `File` object in mutation variables; `apollo-upload-client` converts to multipart

**Error handling:**

- Global: Apollo `onError` → `sweetErrorAlert(message)` (skips 'input' errors)
- Component: `try/catch` → `sweetMixinErrorAlert(err.message)`
- Success: `sweetTopSmallSuccessAlert('success', 800)`

**fetchPolicy:** queries use `"cache-and-network"` + `notifyOnNetworkStatusChange: true`; mutations use `"network-only"`

---

## Environment Variables

### Backend (`.env` at monolith root)

- `PORT_API` — main API port (3004)
- `PORT_BATCH` — batch service port (3005)
- `MONGO_DEV` — MongoDB dev connection string
- `MONGO_PROD` — MongoDB prod connection string
- `SECRET_TOKEN` — JWT secret (30-day expiry)
- `MAIL_HOST` — SMTP host (smtp.gmail.com)
- `MAIL_PORT` — SMTP port (587)
- `MAIL_USER` — Gmail account
- `MAIL_PASS` — Gmail app password
- `MAIL_FROM` — From email address
- `FRONTEND_URL` — Frontend base URL for unsubscribe links

### Frontend (`.env.local` at monolith-next root)

- `REACT_APP_API_URL` — backend base URL (http://localhost:3004)
- `REACT_APP_API_GRAPHQL_URL` — GraphQL endpoint (http://localhost:3004/graphql)
- `REACT_APP_API_WS` — WebSocket URL (ws://localhost:3004)
- Exposed via `next.config.ts` env block, consumed via `libs/config.ts`

---

## Reusable Libs & Utilities

### Frontend (`libs/`)

- `libs/auth/index.ts` — `getJwtToken`, `setJwtToken`, `logIn`, `signUp`, `updateUserInfo`, `logOut`, `updateStorage`, `deleteStorage`
- `libs/sweetAlert.ts` — `sweetErrorAlert`, `sweetMixinErrorAlert`, `sweetTopSmallSuccessAlert`, `sweetConfirmAlert`
- `libs/config.ts` — `REACT_APP_API_URL`, `REACT_APP_API_GRAPHQL_URL`, `REACT_APP_API_WS`, `Messages`
- `libs/utils.ts` — general utilities
- `libs/hooks/useDeviceDetect.ts` — mobile/desktop detection

### Backend (`libs/`)

- `libs/config.ts` — `availableDesignerSorts`, `availableFurnitureSorts`, `lookupAuthMemberLiked()`, `lookupAuthMemberFollowed()`, `lookupMember`, `shapeIntoMongoObjectId()`, `getSerialForImage()`, `validMimeTypes`
- `libs/interceptor/Logging.interceptor.ts` — global request/response logger, measures response time
- `libs/types/common.ts` — shared TypeScript types

### Email (Nodemailer)

- `components/notification/mail.service.ts`
- `sendWelcomeEmail(email, unsubscribeToken)` — welcome + unsubscribe link
- `sendUnsubscribeConfirmation(email)` — confirmation email
- Unsubscribe URL: `${FRONTEND_URL}/unsubscribe?token=${unsubscribeToken}`
- Fire-and-forget (non-blocking) pattern in notification.service.ts

---

## WebSocket Events (socket.gateway.ts)

Gateway: `apps/monolith-api/src/socket/socket.gateway.ts`
Decorator: `@WebSocketGateway({ transports: ['websocket'], secure: false })`
Library: `ws` (Node.js ws, not Socket.io)
Auth: token extracted from URL query param `?token=JWT` via `url.parse(req.url, true)` → `authService.verifyToken(token)`

**Internal state:**

- `summaryClient: number` — total connected clients
- `clientAuthMap: Map<WebSocket, Member>` — socket → member mapping
- `messageList: MessagePayload[]` — last 5 messages (history)

**Events emitted TO client (server → client):**

| Event         | When                                        | Payload shape                                                   |
| ------------- | ------------------------------------------- | --------------------------------------------------------------- |
| `info`        | On connection (broadcast all)               | `{ event: 'info', totalClients, memberData, action: 'joined' }` |
| `info`        | On disconnection (broadcast others)         | `{ event: 'info', totalClients, memberData, action: 'left' }`   |
| `getMessages` | On connection (send to joining client only) | `{ event: 'getMessages', list: MessagePayload[] }`              |
| `message`     | On new message (broadcast all)              | `{ event: 'message', text, memberData }`                        |

**Events received FROM client (client → server):**

| Event     | Handler                        | Behavior                                                                     |
| --------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `message` | `@SubscribeMessage('message')` | Saves to messageList (trim to last 5), broadcasts to all via `emitMessage()` |

**Broadcast helpers:**

- `emitMessage(msg)` — sends to ALL connected clients (including sender)
- `broadCastMessage(sender, msg)` — sends to all EXCEPT sender (used on disconnect)

**Payload interfaces:**

- `MessagePayload { event, text, memberData: Member }`
- `InfoPayload { event, totalClients, memberData: Member, action }`

**Frontend usage:** `socketVar` holds the active `WebSocket` instance; `Chat.tsx` reads it to send/receive.

---

## MUI Theme Customizations

Files: `scss/MaterialTheme/index.ts`, `scss/MaterialTheme/typography.ts`
Applied in `_app.tsx` as `ThemeProvider` with the `light` theme object.

**Palette:**

- primary.main: `#C46A4A` (terracotta), primary.light: `#F7F2EE`, primary.dark: `#AA5A3D`
- secondary.main: `#1C1C1C`
- text.primary: `#2D2D2D`, text.secondary: `#787878`
- background.default: `#FAFAFA`, background.paper: `#FFFFFF`

**Component overrides:**

- `MuiCssBaseline` — `html { scrollBehavior: smooth }`, `body { margin: 0; fontFamily: Poppins }`
- `MuiButton` — `minWidth: auto`, `boxShadow: none`, `borderRadius: 4`
- `MuiContainer` — `maxWidth: inherit`, `padding: 0`

**Typography (all use Poppins):**

- h1: 36px/700, h2: 28px/600, h3: 24px/600, h4: 20px/500, h5: 16px/500, h6: 14px/500
- subtitle1: 16px/400, subtitle2: 14px/400
- body1: 16px/400, body2: 14px/400
- caption: 12px/400, button: 14px/500 textTransform:none

**Custom component exported:**

- `RippleBadge` — styled `Badge` with ripple animation. Badge color: `#b4dcff8f` (blue tint). Ring: `#32c2c1`. Animation: scale 0.8→2.4 opacity 1→0 over 1.2s infinite.

---

## Batch Jobs (cron schedule)

All in `apps/monolith-batch/src/batch.controller.ts`:

| Job                        | Schedule                              | Action                                                                       |
| -------------------------- | ------------------------------------- | ---------------------------------------------------------------------------- |
| BATCH_ROLLBACK             | `00 00 01 * * *` (1st of month 00:00) | Reset furnitureRank/Trending/Engagement to 0; reset memberRank for designers |
| BATCH_TOP_FURNITURES       | `20 00 01 * * *`                      | rank = (likes×2) + (views×1)                                                 |
| BATCH_TOP_DESIGNERS        | `40 00 01 * * *`                      | rank = (designs×5) + (articles×3) + (likes×2) + (views×1)                    |
| BATCH_TRENDING_FURNITURES  | `00 01 01 * * *`                      | trending = (views×1) + (likes×2)                                             |
| BATCH_SUGGESTED_FURNITURES | `20 01 01 * * *`                      | engagement = (likes×2) + (comments×3) + (views×1)                            |
| BATCH_DISCOUNT_EXPIRY      | `00 * * * * *` (every hour)           | Expire/activate discounts by date window                                     |

---

## File Upload

- Single: `imageUploader(file, target)` mutation → `String` (url)
- Multiple: `imagesUploader(files, target)` mutation → `[String]`
- Validation: only `image/png`, `image/jpg`, `image/jpeg` (validMimeTypes array)
- Max size: 15MB; max files: 10
- Storage path: `uploads/{target}/{uuid}.{ext}` relative to backend root
- Served at: `http://localhost:3004/uploads/...`
- Display: `` `${REACT_APP_API_URL}/${path}` ``

---

## Key Decisions

- Pages Router only — never App Router
- Follow nestar-next patterns for module structure, Apollo, resolvers, schemas
- Global SCSS only — no CSS Modules, no inline styles
- Nodemailer + Gmail SMTP for email (fire-and-forget)
- No Stripe integration (deferred indefinitely)
- Cart: localStorage only (no backend)
- Wishlist: GET_FAVORITES (backend, likes system)
- Visited: GET_VISITED (backend, views system)
- Auth: JWT in localStorage, 30-day expiry, no refresh token implemented
- Soft deletes: `deletedAt` field + `status: DELETE` flag pattern

---

## Current State

### Backend — Fully Working

- All 8 modules implemented: Member, Furniture, BoardArticle, Comment, Follow, Like, View, Notification
- Auth system: JWT, bcryptjs, all three guards
- File uploads: single + multiple image upload to local disk
- Newsletter: subscribe/unsubscribe with email confirmation
- WebSocket gateway: live chat, connection tracking, message history
- Batch service: all 6 cron jobs for ranking, trending, engagement, discount expiry
- Admin endpoints: all CRUD for all entities

### Frontend — Fully Working

- All pages implemented and rendering
- Apollo Client wired (client.ts, store.ts, all query/mutation files)
- Auth flow: login, signup, JWT decode, userVar, logout
- Homepage: all sections (trending, top rated, suggested, sale, etc.)
- Furniture catalog: filtering, sorting, pagination
- Furniture detail: full product page, cart (localStorage), like
- Designer profiles: tabs, follow/unsubscribe
- Community/Blog: listing, detail, comments
- My Page: wishlist (real API), visited (real API), articles, add furniture
- Admin panel: member/furniture/article management
- Newsletter: subscribe/unsubscribe pages wired
- Live chat: WebSocket connected
- i18n: next-i18next configured (en, kr, ru)

---

## Pending / Next

1. Run visual regression checks for homepage sections changed this session: Trending Now, Top Selection, Top Rated, Suggested for you.
2. Validate Swiper behavior at breakpoints and confirm no layout overflow in `scss/pc/homepage/homepage.scss`.
3. Verify furniture detail interactions after gallery refactor: lightbox opening from gallery row and dimension image rendering.
4. Decide whether to keep the new static gallery layout in furniture detail or restore carousel behavior for parity with previous UX.
5. Continue pending platform work already identified: notification bell wiring, admin notice/faq/inquiry wiring verification, furniture search UI wiring, and order/address/coupon backend integration.
