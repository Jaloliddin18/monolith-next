---
name: Admin Panel Redesign — Apr 28
description: Full admin panel redesign — backend stats module, dashboard with charts, dark sidebar, recharts
type: project
---

Backend stats module created (NestJS GraphQL, admin-only):
- `apps/monolith-api/src/components/stats/stats.module.ts|resolver.ts|service.ts`
- `apps/monolith-api/src/libs/dto/stats/stats.ts` — AdminStats, CategoryCount, RoomCount, MonthCount
- Registered in `components/components.module.ts`
- `getAdminStats` query: RolesGuard (ADMIN). Returns totals, top 5 viewed/liked furnitures, top 5 designers, last 10 members, furniture by category/room, member growth last 6 months.

Frontend:
- `GET_ADMIN_STATS` added to `apollo/admin/query.ts`
- `pages/_admin/index.tsx` — full dashboard (stat cards, recharts line+pie charts, compact top-5 tables, recent members table). Was previously just a redirect to /_admin/users.
- `libs/components/admin/AdminMenuList.tsx` — completely rewritten as dark sidebar with flat nav items (no MUI drawer, no collapse). Nav: Dashboard, Members, Furniture, Articles, CS (expandable).
- `libs/components/layout/LayoutAdmin.tsx` — redesigned with sticky sidebar, topbar with page title, admin-main content area.
- `scss/pc/admin/admin.scss` — full design system rewrite. Design: #1C1A17 sidebar, #F8F7F5 bg, terracotta accent #C46A4A. Classes: admin-sidebar, admin-nav-item, admin-stat-card, admin-chart-card, admin-table-card, admin-compact-table, admin-members-table, badges (badge-user/designer/admin/active/block/delete).
- `pages/_document.tsx` — added DM Sans + Playfair Display Google Fonts.
- `recharts` added to package.json (yarn add recharts).

**Why:** Full redesign to match Stripe/Linear/Vercel dashboard aesthetic.
**How to apply:** recharts loaded via next/dynamic with ssr:false. MUI v7 Grid removed; using CSS grid (display:grid) instead to avoid API changes.
