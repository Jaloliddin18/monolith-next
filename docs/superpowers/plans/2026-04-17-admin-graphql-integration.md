# Admin Panel GraphQL Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all hardcoded mock data in admin panel list components with live Apollo `useQuery`/`useMutation` calls, wire loading/empty states, and integrate the CS pages (Notice/FAQ/Inquiry) with GraphQL.

**Architecture:** 
- Users, Properties, Community pages are already page-level wired with Apollo — list components still fall back to `HARDCODED_*` arrays when the real list is empty. Remove those fallbacks and add proper loading/empty states.
- CS pages (notice, faq, inquiry) have no Apollo wiring at all — add queries/mutations to `apollo/admin/query.ts` and `mutation.ts`, refactor the three list components to accept real `Notice[]` props, then wire each page identically to the community/properties pattern.
- Notice resolver does **not** exist in the backend yet (no component directory, schema only). Frontend wiring is done first; backend resolver needs to be added separately to unblock these pages in production.

**Tech Stack:** Next.js 16 (Pages Router), Apollo Client, MUI 5, TypeScript strict, NestJS GraphQL backend

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `libs/components/admin/users/MemberList.tsx` | Modify | Remove `HARDCODED_MEMBERS` fallback; accept `loading` prop; show `CircularProgress` / empty row |
| `libs/components/admin/properties/FurnitureList.tsx` | Modify | Remove `HARDCODED_FURNITURES` fallback; accept `loading` prop |
| `libs/components/admin/community/CommunityArticleList.tsx` | Modify | Remove `HARDCODED_ARTICLES` fallback; accept `loading` prop |
| `pages/_admin/users/index.tsx` | Modify | Pass `loading` prop into `MemberPanelList` |
| `pages/_admin/properties/index.tsx` | Modify | Pass `loading` prop into `FurniturePanelList` |
| `pages/_admin/community/index.tsx` | Modify | Pass `loading` prop into `CommunityArticleList` |
| `apollo/admin/query.ts` | Modify | Add `GET_ALL_NOTICES_BY_ADMIN` query |
| `apollo/admin/mutation.ts` | Modify | Add `UPDATE_NOTICE_BY_ADMIN`, `REMOVE_NOTICE_BY_ADMIN` mutations |
| `libs/components/admin/cs/NoticeList.tsx` | Modify | Accept `notices`, `loading`, `menuIconClickHandler`, `menuIconCloseHandler`, `updateNoticeHandler`, `removeNoticeHandler` props; remove `HARDCODED_NOTICES` |
| `libs/components/admin/cs/FaqList.tsx` | Modify | Accept `notices`, `loading`, `updateNoticeHandler` props; remove `HARDCODED_FAQ` |
| `libs/components/admin/cs/InquiryList.tsx` | Modify | Accept `notices`, `loading`, `updateNoticeHandler` props; remove `HARDCODED_INQUIRIES` |
| `pages/_admin/cs/notice.tsx` | Modify | Wire Apollo: `GET_ALL_NOTICES_BY_ADMIN` filtered by status tabs, `UPDATE_NOTICE_BY_ADMIN`, `REMOVE_NOTICE_BY_ADMIN` |
| `pages/_admin/cs/faq.tsx` | Modify | Wire Apollo: `GET_ALL_NOTICES_BY_ADMIN` with `noticeCategory: FAQ`, status tabs, `UPDATE_NOTICE_BY_ADMIN` |
| `pages/_admin/cs/inquiry.tsx` | Modify | Wire Apollo: `GET_ALL_NOTICES_BY_ADMIN` with `noticeCategory: INQUIRY`, status tabs, `UPDATE_NOTICE_BY_ADMIN` |

---

## Task 1: Fix MemberPanelList — remove hardcoded fallback, add loading state

**File:** `libs/components/admin/users/MemberList.tsx`

- [ ] **Step 1: Update `MemberPanelListType` to include `loading` prop and remove `HARDCODED_MEMBERS`**

Replace the interface and remove the hardcoded array. The complete change to `libs/components/admin/users/MemberList.tsx`:

```typescript
// Remove the entire HARDCODED_MEMBERS array (lines 132–143)
// Update the interface:
interface MemberPanelListType {
  members: Member[];
  loading: boolean;
  anchorEl: any;
  menuIconClickHandler: any;
  menuIconCloseHandler: any;
  updateMemberHandler: any;
}
```

- [ ] **Step 2: Update component body — use `members` directly, show loading/empty states**

Replace the component body in `libs/components/admin/users/MemberList.tsx`:

```typescript
export const MemberPanelList = (props: MemberPanelListType) => {
  const { members, loading, anchorEl, menuIconClickHandler, menuIconCloseHandler, updateMemberHandler } = props;

  return (
    <Stack>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
          {/*@ts-ignore*/}
          <EnhancedTableHead />
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell align="center" colSpan={8}>
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : members.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={8}>
                  <span className={'no-data'}>No members found</span>
                </TableCell>
              </TableRow>
            ) : (
              members.map((member: any, index: number) => {
                const member_image = member.memberImage
                  ? `${REACT_APP_API_URL}/${member.memberImage}`
                  : '/icons/user_profile.png';
                return (
                  // ... existing row JSX unchanged ...
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
```

Also add `CircularProgress` to imports from `@mui/material`.

- [ ] **Step 3: Verify the file builds — run `yarn tsc --noEmit` from the project root**

Expected: no TypeScript errors related to `MemberPanelList`.

---

## Task 2: Fix FurniturePanelList — remove hardcoded fallback, add loading state

**File:** `libs/components/admin/properties/FurnitureList.tsx`

- [ ] **Step 1: Update `FurniturePanelListType` interface — add `loading` prop**

```typescript
interface FurniturePanelListType {
  furnitures: Furniture[];
  loading: boolean;
  anchorEl: any;
  menuIconClickHandler: any;
  menuIconCloseHandler: any;
  updateFurnitureHandler: any;
  removeFurnitureHandler: any;
}
```

- [ ] **Step 2: Remove `HARDCODED_FURNITURES` (lines 79–86) and update component body**

Replace in `libs/components/admin/properties/FurnitureList.tsx`:

```typescript
export const FurniturePanelList = (props: FurniturePanelListType) => {
  const {
    furnitures,
    loading,
    anchorEl,
    menuIconClickHandler,
    menuIconCloseHandler,
    updateFurnitureHandler,
    removeFurnitureHandler,
  } = props;

  return (
    <Stack>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
          {/*@ts-ignore*/}
          <EnhancedTableHead />
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell align="center" colSpan={7}>
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : furnitures.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={7}>
                  <span className={'no-data'}>No furniture found</span>
                </TableCell>
              </TableRow>
            ) : (
              furnitures.map((furniture: any, index: number) => {
                const furnitureImage = `${REACT_APP_API_URL}/${furniture?.furnitureImages[0]}`;
                return (
                  // ... existing row JSX unchanged ...
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
```

Add `CircularProgress` import from `@mui/material`.

- [ ] **Step 3: Run `yarn tsc --noEmit` — expect no TS errors**

---

## Task 3: Fix CommunityArticleList — remove hardcoded fallback, add loading state

**File:** `libs/components/admin/community/CommunityArticleList.tsx`

- [ ] **Step 1: Update `CommunityArticleListProps` interface — add `loading` prop**

```typescript
interface CommunityArticleListProps {
  articles: BoardArticle[];
  loading: boolean;
  anchorEl: any;
  menuIconClickHandler: any;
  menuIconCloseHandler: any;
  updateArticleHandler: any;
  removeArticleHandler: any;
}
```

- [ ] **Step 2: Remove `HARDCODED_ARTICLES` (lines 121–126) and update component body**

Replace in `libs/components/admin/community/CommunityArticleList.tsx`:

```typescript
const CommunityArticleList = (props: CommunityArticleListProps) => {
  const { articles, loading, anchorEl, menuIconClickHandler, menuIconCloseHandler, updateArticleHandler, removeArticleHandler } = props;

  return (
    <Stack>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
          {/*@ts-ignore*/}
          <EnhancedTableHead />
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell align="center" colSpan={8}>
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : articles.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={8}>
                  <span className={'no-data'}>No articles found</span>
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article: any, index: number) => (
                // ... existing row JSX unchanged ...
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
```

Add `CircularProgress` import.

- [ ] **Step 3: Run `yarn tsc --noEmit`**

---

## Task 4: Wire loading states from page components to list components

**Files:** `pages/_admin/users/index.tsx`, `pages/_admin/properties/index.tsx`, `pages/_admin/community/index.tsx`

- [ ] **Step 1: Pass `loading` into `MemberPanelList` in `pages/_admin/users/index.tsx`**

Change:
```typescript
<MemberPanelList
  members={members}
  anchorEl={anchorEl}
  menuIconClickHandler={menuIconClickHandler}
  menuIconCloseHandler={menuIconCloseHandler}
  updateMemberHandler={updateMemberHandler}
/>
```
To:
```typescript
<MemberPanelList
  members={members}
  loading={getAllMembersByAdminLoading}
  anchorEl={anchorEl}
  menuIconClickHandler={menuIconClickHandler}
  menuIconCloseHandler={menuIconCloseHandler}
  updateMemberHandler={updateMemberHandler}
/>
```

- [ ] **Step 2: Pass `loading` into `FurniturePanelList` in `pages/_admin/properties/index.tsx`**

Change:
```typescript
<FurniturePanelList
  furnitures={furnitures}
  anchorEl={anchorEl}
  menuIconClickHandler={menuIconClickHandler}
  menuIconCloseHandler={menuIconCloseHandler}
  updateFurnitureHandler={updateFurnitureHandler}
  removeFurnitureHandler={removeFurnitureHandler}
/>
```
To:
```typescript
<FurniturePanelList
  furnitures={furnitures}
  loading={getAllFurnituresByAdminLoading}
  anchorEl={anchorEl}
  menuIconClickHandler={menuIconClickHandler}
  menuIconCloseHandler={menuIconCloseHandler}
  updateFurnitureHandler={updateFurnitureHandler}
  removeFurnitureHandler={removeFurnitureHandler}
/>
```

- [ ] **Step 3: Pass `loading` into `CommunityArticleList` in `pages/_admin/community/index.tsx`**

Change:
```typescript
<CommunityArticleList
  articles={articles}
  anchorEl={anchorEl}
  menuIconClickHandler={menuIconClickHandler}
  menuIconCloseHandler={menuIconCloseHandler}
  updateArticleHandler={updateArticleHandler}
  removeArticleHandler={removeArticleHandler}
/>
```
To:
```typescript
<CommunityArticleList
  articles={articles}
  loading={getAllBoardArticlesByAdminLoading}
  anchorEl={anchorEl}
  menuIconClickHandler={menuIconClickHandler}
  menuIconCloseHandler={menuIconCloseHandler}
  updateArticleHandler={updateArticleHandler}
  removeArticleHandler={removeArticleHandler}
/>
```

- [ ] **Step 4: Run `yarn tsc --noEmit` — all three pages should compile clean**

---

## Task 5: Add Notice GraphQL queries to `apollo/admin/query.ts`

**File:** `apollo/admin/query.ts`

- [ ] **Step 1: Append `GET_ALL_NOTICES_BY_ADMIN` query at the end of `apollo/admin/query.ts`**

```typescript
/**************************
 *         NOTICE         *
 *************************/

export const GET_ALL_NOTICES_BY_ADMIN = gql`
  query GetAllNoticesByAdmin($input: NoticesInquiry!) {
    getAllNoticesByAdmin(input: $input) {
      list {
        _id
        noticeCategory
        noticeStatus
        noticeTitle
        noticeContent
        memberId
        createdAt
        updatedAt
        memberData {
          _id
          memberNick
          memberImage
          memberType
          memberStatus
        }
      }
      metaCounter {
        total
      }
    }
  }
`;
```

- [ ] **Step 2: Run `yarn tsc --noEmit` — no errors**

---

## Task 6: Add Notice GraphQL mutations to `apollo/admin/mutation.ts`

**File:** `apollo/admin/mutation.ts`

- [ ] **Step 1: Append mutations to `apollo/admin/mutation.ts`**

```typescript
/**************************
 *         NOTICE         *
 *************************/

export const UPDATE_NOTICE_BY_ADMIN = gql`
  mutation UpdateNoticeByAdmin($input: NoticeUpdate!) {
    updateNoticeByAdmin(input: $input) {
      _id
      noticeCategory
      noticeStatus
      noticeTitle
      noticeContent
      memberId
      createdAt
      updatedAt
    }
  }
`;

export const REMOVE_NOTICE_BY_ADMIN = gql`
  mutation RemoveNoticeByAdmin($input: String!) {
    removeNoticeByAdmin(noticeId: $input) {
      _id
      noticeCategory
      noticeStatus
      noticeTitle
      noticeContent
      memberId
      createdAt
      updatedAt
    }
  }
`;
```

- [ ] **Step 2: Run `yarn tsc --noEmit` — no errors**

---

## Task 7: Refactor `NoticeList.tsx` to accept real notice data as props

**File:** `libs/components/admin/cs/NoticeList.tsx`

- [ ] **Step 1: Rewrite `NoticeList.tsx` fully**

```typescript
import React from 'react';
import {
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Table,
  TableContainer,
  Button,
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Fade,
  Menu,
  MenuItem,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Notice } from '../../../types/notice/notice';
import { NoticeStatus } from '../../../enums/notice.enum';
import { REACT_APP_API_URL } from '../../../config';

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: 'category', numeric: true, disablePadding: false, label: 'CATEGORY' },
  { id: 'title', numeric: true, disablePadding: false, label: 'TITLE' },
  { id: 'id', numeric: true, disablePadding: false, label: 'NOTICE ID' },
  { id: 'writer', numeric: true, disablePadding: false, label: 'WRITER' },
  { id: 'date', numeric: true, disablePadding: false, label: 'DATE' },
  { id: 'action', numeric: false, disablePadding: false, label: 'ACTION' },
];

interface NoticeListProps {
  notices: Notice[];
  loading: boolean;
  anchorEl: any;
  menuIconClickHandler: (e: any, index: number) => void;
  menuIconCloseHandler: () => void;
  updateNoticeHandler: (updateData: any) => void;
  removeNoticeHandler: (id: string) => void;
}

export const NoticeList = (props: NoticeListProps) => {
  const { notices, loading, anchorEl, menuIconClickHandler, menuIconCloseHandler, updateNoticeHandler, removeNoticeHandler } = props;

  return (
    <Stack>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'left' : 'center'}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : notices.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  <span className={'no-data'}>No notices found</span>
                </TableCell>
              </TableRow>
            ) : (
              notices.map((notice: any, index: number) => {
                const writerImage = notice.memberData?.memberImage
                  ? `${REACT_APP_API_URL}/${notice.memberData.memberImage}`
                  : '/icons/user_profile.png';
                return (
                  <TableRow hover key={notice._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="left">
                      <span
                        style={{
                          background: '#EDE4D8',
                          color: '#6B4C2A',
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '3px 10px',
                          borderRadius: 20,
                          letterSpacing: 0.4,
                          textTransform: 'uppercase',
                        }}
                      >
                        {notice.noticeCategory}
                      </span>
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: 500, maxWidth: 300 }}>
                      {notice.noticeTitle}
                    </TableCell>
                    <TableCell align="left" sx={{ color: 'var(--color-text-muted)', fontSize: 12 }}>
                      {notice._id}
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" alignItems="center" gap={1}>
                        <Avatar src={writerImage} sx={{ width: 28, height: 28 }} />
                        <span>{notice.memberData?.memberNick ?? '-'}</span>
                      </Stack>
                    </TableCell>
                    <TableCell align="left" sx={{ color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                      {new Date(notice.createdAt).toLocaleDateString('en-GB')}
                    </TableCell>
                    <TableCell align="center">
                      {notice.noticeStatus === NoticeStatus.DELETE ? (
                        <Button
                          variant="outlined"
                          sx={{ p: '3px', border: 'none', ':hover': { border: '1px solid #000000' } }}
                          onClick={() => removeNoticeHandler(notice._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      ) : (
                        <>
                          <Button onClick={(e: any) => menuIconClickHandler(e, index)} className={'badge success'}>
                            {notice.noticeStatus}
                          </Button>
                          <Menu
                            className={'menu-modal'}
                            MenuListProps={{ 'aria-labelledby': 'fade-button' }}
                            anchorEl={anchorEl[index]}
                            open={Boolean(anchorEl[index])}
                            onClose={menuIconCloseHandler}
                            TransitionComponent={Fade}
                            sx={{ p: 1 }}
                          >
                            {Object.values(NoticeStatus)
                              .filter((s) => s !== notice.noticeStatus)
                              .map((status: string) => (
                                <MenuItem
                                  onClick={() => updateNoticeHandler({ _id: notice._id, noticeStatus: status })}
                                  key={status}
                                >
                                  <Typography variant={'subtitle1'} component={'span'}>
                                    {status}
                                  </Typography>
                                </MenuItem>
                              ))}
                          </Menu>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
```

- [ ] **Step 2: Run `yarn tsc --noEmit` — no errors**

---

## Task 8: Wire `pages/_admin/cs/notice.tsx` with Apollo

**File:** `pages/_admin/cs/notice.tsx`

- [ ] **Step 1: Rewrite `pages/_admin/cs/notice.tsx`**

```typescript
import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { Box, Button, InputAdornment, List, ListItem, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TabContext } from '@mui/lab';
import OutlinedInput from '@mui/material/OutlinedInput';
import TablePagination from '@mui/material/TablePagination';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import SearchIcon from '@mui/icons-material/Search';
import { NoticeList } from '../../../libs/components/admin/cs/NoticeList';
import { NoticesInquiry, NoticeInput } from '../../../libs/types/notice/notice.input';
import { Notice } from '../../../libs/types/notice/notice';
import { NoticeCategory, NoticeStatus } from '../../../libs/enums/notice.enum';
import { NoticeUpdate } from '../../../libs/types/notice/notice.update';
import { sweetConfirmAlert, sweetMixinErrorAlert } from '../../../libs/sweetAlert';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_NOTICES_BY_ADMIN } from '../../../apollo/admin/query';
import { UPDATE_NOTICE_BY_ADMIN, REMOVE_NOTICE_BY_ADMIN } from '../../../apollo/admin/mutation';
import { T } from '../../../libs/types/common';
import { Direction } from '../../../libs/enums/common.enum';

const DEFAULT_NOTICES_INQUIRY: NoticesInquiry = {
  page: 1,
  limit: 10,
  sort: 'createdAt',
  direction: Direction.DESC,
  search: {},
};

const AdminNotice: NextPage = ({ initialInquiry = DEFAULT_NOTICES_INQUIRY, ...props }: any) => {
  const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
  const [noticesInquiry, setNoticesInquiry] = useState<NoticesInquiry>(initialInquiry ?? DEFAULT_NOTICES_INQUIRY);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [noticesTotal, setNoticesTotal] = useState<number>(0);
  const [value, setValue] = useState(
    noticesInquiry?.search?.noticeStatus ? noticesInquiry?.search?.noticeStatus : 'ALL',
  );
  const [searchText, setSearchText] = useState('');

  /** APOLLO REQUESTS **/
  const [updateNoticeByAdmin] = useMutation(UPDATE_NOTICE_BY_ADMIN);
  const [removeNoticeByAdmin] = useMutation(REMOVE_NOTICE_BY_ADMIN);
  const {
    loading: getAllNoticesByAdminLoading,
    refetch: getAllNoticesByAdminRefetch,
  } = useQuery(GET_ALL_NOTICES_BY_ADMIN, {
    fetchPolicy: 'network-only',
    variables: { input: noticesInquiry },
    skip: !noticesInquiry,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setNotices(data?.getAllNoticesByAdmin?.list ?? []);
      setNoticesTotal(data?.getAllNoticesByAdmin?.metaCounter[0]?.total ?? 0);
    },
    onError: () => {},
  });

  /** LIFECYCLES **/
  useEffect(() => {
    getAllNoticesByAdminRefetch({ input: noticesInquiry }).then().catch(() => {});
  }, [noticesInquiry]);

  /** HANDLERS **/
  const changePageHandler = async (event: unknown, newPage: number) => {
    noticesInquiry.page = newPage + 1;
    await getAllNoticesByAdminRefetch({ input: noticesInquiry });
    setNoticesInquiry({ ...noticesInquiry });
  };

  const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    noticesInquiry.limit = parseInt(event.target.value, 10);
    noticesInquiry.page = 1;
    setNoticesInquiry({ ...noticesInquiry });
  };

  const menuIconClickHandler = (e: any, index: number) => {
    const tempAnchor = anchorEl.slice();
    tempAnchor[index] = e.currentTarget;
    setAnchorEl(tempAnchor);
  };

  const menuIconCloseHandler = () => {
    setAnchorEl([]);
  };

  const tabChangeHandler = async (event: any, newValue: string) => {
    setValue(newValue);
    setSearchText('');
    setNoticesInquiry({ ...noticesInquiry, page: 1, sort: 'createdAt' });
    switch (newValue) {
      case 'ACTIVE':
        setNoticesInquiry({ ...noticesInquiry, search: { ...noticesInquiry.search, noticeStatus: NoticeStatus.ACTIVE } });
        break;
      case 'HOLD':
        setNoticesInquiry({ ...noticesInquiry, search: { ...noticesInquiry.search, noticeStatus: NoticeStatus.HOLD } });
        break;
      case 'DELETE':
        setNoticesInquiry({ ...noticesInquiry, search: { ...noticesInquiry.search, noticeStatus: NoticeStatus.DELETE } });
        break;
      default:
        delete noticesInquiry?.search?.noticeStatus;
        setNoticesInquiry({ ...noticesInquiry });
        break;
    }
  };

  const textHandler = useCallback((val: string) => {
    setSearchText(val);
  }, []);

  const searchTextHandler = () => {
    setNoticesInquiry({
      ...noticesInquiry,
      search: { ...noticesInquiry.search, text: searchText },
    });
  };

  const updateNoticeHandler = async (updateData: NoticeUpdate) => {
    try {
      await updateNoticeByAdmin({ variables: { input: updateData } });
      menuIconCloseHandler();
      await getAllNoticesByAdminRefetch({ input: noticesInquiry });
    } catch (err: any) {
      menuIconCloseHandler();
      await sweetMixinErrorAlert(err?.message ?? 'Something went wrong');
    }
  };

  const removeNoticeHandler = async (id: string) => {
    try {
      if (await sweetConfirmAlert('Are you sure to remove?')) {
        await removeNoticeByAdmin({ variables: { input: id } });
        await getAllNoticesByAdminRefetch({ input: noticesInquiry });
      }
      menuIconCloseHandler();
    } catch (err: any) {
      await sweetMixinErrorAlert(err?.message ?? 'Something went wrong');
    }
  };

  return (
    <Box component={'div'} className={'content'}>
      <Box component={'div'} className={'title flex_space'}>
        <Typography variant={'h2'}>Notice Management</Typography>
        <Button className="btn_add" variant={'contained'} size={'medium'}>
          <AddRoundedIcon sx={{ mr: '8px' }} />
          ADD
        </Button>
      </Box>
      <Box component={'div'} className={'table-wrap'}>
        <Box component={'div'} sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box component={'div'}>
              <List className={'tab-menu'}>
                <ListItem onClick={(e: any) => tabChangeHandler(e, 'ALL')} value="ALL" className={value === 'ALL' ? 'li on' : 'li'}>All</ListItem>
                <ListItem onClick={(e: any) => tabChangeHandler(e, 'ACTIVE')} value="ACTIVE" className={value === 'ACTIVE' ? 'li on' : 'li'}>Active</ListItem>
                <ListItem onClick={(e: any) => tabChangeHandler(e, 'HOLD')} value="HOLD" className={value === 'HOLD' ? 'li on' : 'li'}>Hold</ListItem>
                <ListItem onClick={(e: any) => tabChangeHandler(e, 'DELETE')} value="DELETE" className={value === 'DELETE' ? 'li on' : 'li'}>Delete</ListItem>
              </List>
              <Divider />
              <Stack className={'search-area'} sx={{ m: '24px' }}>
                <OutlinedInput
                  value={searchText}
                  onChange={(e: any) => textHandler(e.target.value)}
                  sx={{ width: '100%' }}
                  className={'search'}
                  placeholder="Search notice title"
                  onKeyDown={(event) => { if (event.key === 'Enter') searchTextHandler(); }}
                  endAdornment={
                    <>
                      {searchText && (
                        <CancelRoundedIcon
                          style={{ cursor: 'pointer' }}
                          onClick={async () => {
                            setSearchText('');
                            setNoticesInquiry({ ...noticesInquiry, search: { ...noticesInquiry.search, text: '' } });
                          }}
                        />
                      )}
                      <InputAdornment position="end" onClick={searchTextHandler}>
                        <SearchIcon />
                      </InputAdornment>
                    </>
                  }
                />
              </Stack>
              <Divider />
            </Box>
            <NoticeList
              notices={notices}
              loading={getAllNoticesByAdminLoading}
              anchorEl={anchorEl}
              menuIconClickHandler={menuIconClickHandler}
              menuIconCloseHandler={menuIconCloseHandler}
              updateNoticeHandler={updateNoticeHandler}
              removeNoticeHandler={removeNoticeHandler}
            />
            <TablePagination
              rowsPerPageOptions={[10, 20, 40, 60]}
              component="div"
              count={noticesTotal}
              rowsPerPage={noticesInquiry?.limit}
              page={noticesInquiry?.page - 1}
              onPageChange={changePageHandler}
              onRowsPerPageChange={changeRowsPerPageHandler}
            />
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default withAdminLayout(AdminNotice);
```

- [ ] **Step 2: Run `yarn tsc --noEmit` — no errors**

---

## Task 9: Refactor `FaqList.tsx` to accept real notice data as props

**File:** `libs/components/admin/cs/FaqList.tsx`

- [ ] **Step 1: Rewrite `FaqList.tsx` fully**

```typescript
import React from 'react';
import {
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Table,
  TableContainer,
  Button,
  CircularProgress,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';
import { Notice } from '../../../types/notice/notice';
import { REACT_APP_API_URL } from '../../../config';

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: 'category', numeric: true, disablePadding: false, label: 'CATEGORY' },
  { id: 'title', numeric: true, disablePadding: false, label: 'TITLE' },
  { id: 'writer', numeric: true, disablePadding: false, label: 'WRITER' },
  { id: 'date', numeric: true, disablePadding: false, label: 'DATE' },
  { id: 'status', numeric: false, disablePadding: false, label: 'STATUS' },
];

interface FaqArticlesPanelListType {
  notices: Notice[];
  loading: boolean;
  updateNoticeHandler: (updateData: any) => void;
}

export const FaqArticlesPanelList = (props: FaqArticlesPanelListType) => {
  const { notices, loading, updateNoticeHandler } = props;

  return (
    <Stack>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'left' : 'center'}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : notices.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  <span className={'no-data'}>No FAQ items found</span>
                </TableCell>
              </TableRow>
            ) : (
              notices.map((notice: any) => {
                const writerImage = notice.memberData?.memberImage
                  ? `${REACT_APP_API_URL}/${notice.memberData.memberImage}`
                  : '/icons/user_profile.png';
                return (
                  <TableRow hover key={notice._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="left">
                      <span
                        style={{
                          background: '#EDE4D8',
                          color: '#6B4C2A',
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '3px 10px',
                          borderRadius: 20,
                          letterSpacing: 0.4,
                          textTransform: 'uppercase',
                        }}
                      >
                        {notice.noticeCategory}
                      </span>
                    </TableCell>
                    <TableCell align="left" sx={{ maxWidth: 340, fontWeight: 500 }}>
                      {notice.noticeTitle}
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" alignItems="center" gap={1}>
                        <Avatar src={writerImage} sx={{ width: 28, height: 28 }} />
                        <span>{notice.memberData?.memberNick ?? '-'}</span>
                      </Stack>
                    </TableCell>
                    <TableCell align="left" sx={{ color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                      {new Date(notice.createdAt).toLocaleDateString('en-GB')}
                    </TableCell>
                    <TableCell align="center">
                      <Button className={'badge success'}>{notice.noticeStatus}</Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
```

- [ ] **Step 2: Run `yarn tsc --noEmit`**

---

## Task 10: Wire `pages/_admin/cs/faq.tsx` with Apollo

**File:** `pages/_admin/cs/faq.tsx`

- [ ] **Step 1: Rewrite `pages/_admin/cs/faq.tsx`**

```typescript
import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { Box, Button, List, ListItem, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TabContext } from '@mui/lab';
import TablePagination from '@mui/material/TablePagination';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { FaqArticlesPanelList } from '../../../libs/components/admin/cs/FaqList';
import { NoticesInquiry } from '../../../libs/types/notice/notice.input';
import { Notice } from '../../../libs/types/notice/notice';
import { NoticeCategory, NoticeStatus } from '../../../libs/enums/notice.enum';
import { NoticeUpdate } from '../../../libs/types/notice/notice.update';
import { sweetMixinErrorAlert } from '../../../libs/sweetAlert';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_NOTICES_BY_ADMIN } from '../../../apollo/admin/query';
import { UPDATE_NOTICE_BY_ADMIN } from '../../../apollo/admin/mutation';
import { T } from '../../../libs/types/common';
import { Direction } from '../../../libs/enums/common.enum';

const DEFAULT_FAQ_INQUIRY: NoticesInquiry = {
  page: 1,
  limit: 10,
  sort: 'createdAt',
  direction: Direction.DESC,
  search: { noticeCategory: NoticeCategory.FAQ },
};

const FaqArticles: NextPage = ({ initialInquiry = DEFAULT_FAQ_INQUIRY, ...props }: any) => {
  const [noticesInquiry, setNoticesInquiry] = useState<NoticesInquiry>(initialInquiry ?? DEFAULT_FAQ_INQUIRY);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [noticesTotal, setNoticesTotal] = useState<number>(0);
  const [value, setValue] = useState(
    noticesInquiry?.search?.noticeStatus ? noticesInquiry?.search?.noticeStatus : 'ALL',
  );

  /** APOLLO REQUESTS **/
  const [updateNoticeByAdmin] = useMutation(UPDATE_NOTICE_BY_ADMIN);
  const {
    loading: getAllNoticesByAdminLoading,
    refetch: getAllNoticesByAdminRefetch,
  } = useQuery(GET_ALL_NOTICES_BY_ADMIN, {
    fetchPolicy: 'network-only',
    variables: { input: noticesInquiry },
    skip: !noticesInquiry,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setNotices(data?.getAllNoticesByAdmin?.list ?? []);
      setNoticesTotal(data?.getAllNoticesByAdmin?.metaCounter[0]?.total ?? 0);
    },
    onError: () => {},
  });

  /** LIFECYCLES **/
  useEffect(() => {
    getAllNoticesByAdminRefetch({ input: noticesInquiry }).then().catch(() => {});
  }, [noticesInquiry]);

  /** HANDLERS **/
  const changePageHandler = async (event: unknown, newPage: number) => {
    noticesInquiry.page = newPage + 1;
    await getAllNoticesByAdminRefetch({ input: noticesInquiry });
    setNoticesInquiry({ ...noticesInquiry });
  };

  const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    noticesInquiry.limit = parseInt(event.target.value, 10);
    noticesInquiry.page = 1;
    setNoticesInquiry({ ...noticesInquiry });
  };

  const tabChangeHandler = async (event: any, newValue: string) => {
    setValue(newValue);
    setNoticesInquiry({ ...noticesInquiry, page: 1, sort: 'createdAt' });
    switch (newValue) {
      case 'ACTIVE':
        setNoticesInquiry({ ...noticesInquiry, search: { noticeCategory: NoticeCategory.FAQ, noticeStatus: NoticeStatus.ACTIVE } });
        break;
      case 'HOLD':
        setNoticesInquiry({ ...noticesInquiry, search: { noticeCategory: NoticeCategory.FAQ, noticeStatus: NoticeStatus.HOLD } });
        break;
      case 'DELETE':
        setNoticesInquiry({ ...noticesInquiry, search: { noticeCategory: NoticeCategory.FAQ, noticeStatus: NoticeStatus.DELETE } });
        break;
      default:
        setNoticesInquiry({ ...noticesInquiry, search: { noticeCategory: NoticeCategory.FAQ } });
        break;
    }
  };

  const updateNoticeHandler = async (updateData: NoticeUpdate) => {
    try {
      await updateNoticeByAdmin({ variables: { input: updateData } });
      await getAllNoticesByAdminRefetch({ input: noticesInquiry });
    } catch (err: any) {
      await sweetMixinErrorAlert(err?.message ?? 'Something went wrong');
    }
  };

  return (
    <Box component={'div'} className={'content'}>
      <Box component={'div'} className={'title flex_space'}>
        <Typography variant={'h2'}>FAQ Management</Typography>
        <Button className="btn_add" variant={'contained'} size={'medium'}>
          <AddRoundedIcon sx={{ mr: '8px' }} />
          ADD
        </Button>
      </Box>
      <Box component={'div'} className={'table-wrap'}>
        <Box component={'div'} sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box component={'div'}>
              <List className={'tab-menu'}>
                <ListItem onClick={(e: any) => tabChangeHandler(e, 'ALL')} value="ALL" className={value === 'ALL' ? 'li on' : 'li'}>All</ListItem>
                <ListItem onClick={(e: any) => tabChangeHandler(e, 'ACTIVE')} value="ACTIVE" className={value === 'ACTIVE' ? 'li on' : 'li'}>Active</ListItem>
                <ListItem onClick={(e: any) => tabChangeHandler(e, 'HOLD')} value="HOLD" className={value === 'HOLD' ? 'li on' : 'li'}>Hold</ListItem>
                <ListItem onClick={(e: any) => tabChangeHandler(e, 'DELETE')} value="DELETE" className={value === 'DELETE' ? 'li on' : 'li'}>Delete</ListItem>
              </List>
              <Divider />
            </Box>
            <FaqArticlesPanelList
              notices={notices}
              loading={getAllNoticesByAdminLoading}
              updateNoticeHandler={updateNoticeHandler}
            />
            <TablePagination
              rowsPerPageOptions={[10, 20, 40, 60]}
              component="div"
              count={noticesTotal}
              rowsPerPage={noticesInquiry?.limit}
              page={noticesInquiry?.page - 1}
              onPageChange={changePageHandler}
              onRowsPerPageChange={changeRowsPerPageHandler}
            />
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default withAdminLayout(FaqArticles);
```

- [ ] **Step 2: Run `yarn tsc --noEmit`**

---

## Task 11: Refactor `InquiryList.tsx` to accept real notice data as props

**File:** `libs/components/admin/cs/InquiryList.tsx`

- [ ] **Step 1: Rewrite `InquiryList.tsx` fully**

```typescript
import React from 'react';
import {
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Table,
  TableContainer,
  Button,
  CircularProgress,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';
import { Notice } from '../../../types/notice/notice';
import { NoticeStatus } from '../../../enums/notice.enum';
import { REACT_APP_API_URL } from '../../../config';

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: 'category', numeric: true, disablePadding: false, label: 'CATEGORY' },
  { id: 'title', numeric: true, disablePadding: false, label: 'TITLE' },
  { id: 'writer', numeric: true, disablePadding: false, label: 'WRITER' },
  { id: 'date', numeric: true, disablePadding: false, label: 'DATE' },
  { id: 'status', numeric: false, disablePadding: false, label: 'STATUS' },
];

interface InquiryPanelListType {
  notices: Notice[];
  loading: boolean;
  updateNoticeHandler: (updateData: any) => void;
}

export const InquiryList = (props: InquiryPanelListType) => {
  const { notices, loading, updateNoticeHandler } = props;

  return (
    <Stack>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'left' : 'center'}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : notices.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  <span className={'no-data'}>No inquiries found</span>
                </TableCell>
              </TableRow>
            ) : (
              notices.map((notice: any) => {
                const writerImage = notice.memberData?.memberImage
                  ? `${REACT_APP_API_URL}/${notice.memberData.memberImage}`
                  : '/icons/user_profile.png';
                const isAnswered = notice.noticeStatus === NoticeStatus.ACTIVE;
                return (
                  <TableRow hover key={notice._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="left">
                      <span
                        style={{
                          background: '#EDE4D8',
                          color: '#6B4C2A',
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '3px 10px',
                          borderRadius: 20,
                          letterSpacing: 0.4,
                          textTransform: 'uppercase',
                        }}
                      >
                        {notice.noticeCategory}
                      </span>
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: 500, maxWidth: 320 }}>
                      {notice.noticeTitle}
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" alignItems="center" gap={1}>
                        <Avatar src={writerImage} sx={{ width: 28, height: 28 }} />
                        <span>{notice.memberData?.memberNick ?? '-'}</span>
                      </Stack>
                    </TableCell>
                    <TableCell align="left" sx={{ color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                      {new Date(notice.createdAt).toLocaleDateString('en-GB')}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        className={isAnswered ? 'badge success' : 'badge warning'}
                        disableRipple
                        sx={{ cursor: 'default' }}
                      >
                        {notice.noticeStatus}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
```

- [ ] **Step 2: Run `yarn tsc --noEmit`**

---

## Task 12: Wire `pages/_admin/cs/inquiry.tsx` with Apollo

**File:** `pages/_admin/cs/inquiry.tsx`

- [ ] **Step 1: Rewrite `pages/_admin/cs/inquiry.tsx`**

```typescript
import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { Box, List, ListItem, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { TabContext } from '@mui/lab';
import TablePagination from '@mui/material/TablePagination';
import { InquiryList } from '../../../libs/components/admin/cs/InquiryList';
import { NoticesInquiry } from '../../../libs/types/notice/notice.input';
import { Notice } from '../../../libs/types/notice/notice';
import { NoticeCategory, NoticeStatus } from '../../../libs/enums/notice.enum';
import { NoticeUpdate } from '../../../libs/types/notice/notice.update';
import { sweetMixinErrorAlert } from '../../../libs/sweetAlert';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_NOTICES_BY_ADMIN } from '../../../apollo/admin/query';
import { UPDATE_NOTICE_BY_ADMIN } from '../../../apollo/admin/mutation';
import { T } from '../../../libs/types/common';
import { Direction } from '../../../libs/enums/common.enum';

const DEFAULT_INQUIRY_INQUIRY: NoticesInquiry = {
  page: 1,
  limit: 10,
  sort: 'createdAt',
  direction: Direction.DESC,
  search: { noticeCategory: NoticeCategory.INQUIRY },
};

const InquiryArticles: NextPage = ({ initialInquiry = DEFAULT_INQUIRY_INQUIRY, ...props }: any) => {
  const [noticesInquiry, setNoticesInquiry] = useState<NoticesInquiry>(initialInquiry ?? DEFAULT_INQUIRY_INQUIRY);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [noticesTotal, setNoticesTotal] = useState<number>(0);
  const [value, setValue] = useState(
    noticesInquiry?.search?.noticeStatus ? noticesInquiry?.search?.noticeStatus : 'ALL',
  );

  /** APOLLO REQUESTS **/
  const [updateNoticeByAdmin] = useMutation(UPDATE_NOTICE_BY_ADMIN);
  const {
    loading: getAllNoticesByAdminLoading,
    refetch: getAllNoticesByAdminRefetch,
  } = useQuery(GET_ALL_NOTICES_BY_ADMIN, {
    fetchPolicy: 'network-only',
    variables: { input: noticesInquiry },
    skip: !noticesInquiry,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setNotices(data?.getAllNoticesByAdmin?.list ?? []);
      setNoticesTotal(data?.getAllNoticesByAdmin?.metaCounter[0]?.total ?? 0);
    },
    onError: () => {},
  });

  /** LIFECYCLES **/
  useEffect(() => {
    getAllNoticesByAdminRefetch({ input: noticesInquiry }).then().catch(() => {});
  }, [noticesInquiry]);

  /** HANDLERS **/
  const changePageHandler = async (event: unknown, newPage: number) => {
    noticesInquiry.page = newPage + 1;
    await getAllNoticesByAdminRefetch({ input: noticesInquiry });
    setNoticesInquiry({ ...noticesInquiry });
  };

  const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    noticesInquiry.limit = parseInt(event.target.value, 10);
    noticesInquiry.page = 1;
    setNoticesInquiry({ ...noticesInquiry });
  };

  const tabChangeHandler = async (event: any, newValue: string) => {
    setValue(newValue);
    setNoticesInquiry({ ...noticesInquiry, page: 1, sort: 'createdAt' });
    switch (newValue) {
      case 'ACTIVE':
        setNoticesInquiry({ ...noticesInquiry, search: { noticeCategory: NoticeCategory.INQUIRY, noticeStatus: NoticeStatus.ACTIVE } });
        break;
      case 'HOLD':
        setNoticesInquiry({ ...noticesInquiry, search: { noticeCategory: NoticeCategory.INQUIRY, noticeStatus: NoticeStatus.HOLD } });
        break;
      case 'DELETE':
        setNoticesInquiry({ ...noticesInquiry, search: { noticeCategory: NoticeCategory.INQUIRY, noticeStatus: NoticeStatus.DELETE } });
        break;
      default:
        setNoticesInquiry({ ...noticesInquiry, search: { noticeCategory: NoticeCategory.INQUIRY } });
        break;
    }
  };

  const updateNoticeHandler = async (updateData: NoticeUpdate) => {
    try {
      await updateNoticeByAdmin({ variables: { input: updateData } });
      await getAllNoticesByAdminRefetch({ input: noticesInquiry });
    } catch (err: any) {
      await sweetMixinErrorAlert(err?.message ?? 'Something went wrong');
    }
  };

  return (
    <Box component={'div'} className={'content'}>
      <Typography variant={'h2'} className={'tit'} sx={{ mb: '24px' }}>
        1:1 Inquiry Management
      </Typography>
      <Box component={'div'} className={'table-wrap'}>
        <Box component={'div'} sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box component={'div'}>
              <List className={'tab-menu'}>
                <ListItem onClick={(e: any) => tabChangeHandler(e, 'ALL')} value="ALL" className={value === 'ALL' ? 'li on' : 'li'}>All</ListItem>
                <ListItem onClick={(e: any) => tabChangeHandler(e, 'ACTIVE')} value="ACTIVE" className={value === 'ACTIVE' ? 'li on' : 'li'}>Active</ListItem>
                <ListItem onClick={(e: any) => tabChangeHandler(e, 'HOLD')} value="HOLD" className={value === 'HOLD' ? 'li on' : 'li'}>Hold</ListItem>
                <ListItem onClick={(e: any) => tabChangeHandler(e, 'DELETE')} value="DELETE" className={value === 'DELETE' ? 'li on' : 'li'}>Delete</ListItem>
              </List>
              <Divider />
            </Box>
            <InquiryList
              notices={notices}
              loading={getAllNoticesByAdminLoading}
              updateNoticeHandler={updateNoticeHandler}
            />
            <TablePagination
              rowsPerPageOptions={[10, 20, 40, 60]}
              component="div"
              count={noticesTotal}
              rowsPerPage={noticesInquiry?.limit}
              page={noticesInquiry?.page - 1}
              onPageChange={changePageHandler}
              onRowsPerPageChange={changeRowsPerPageHandler}
            />
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default withAdminLayout(InquiryArticles);
```

- [ ] **Step 2: Run `yarn tsc --noEmit` — all files compile clean**

---

## Self-Review Checklist

### Spec Coverage

| Requirement | Task |
|-------------|------|
| Query variables wired to UI state | Tasks 8, 10, 12 — `noticesInquiry` drives all queries |
| Pagination active page updates query | Tasks 4, 8, 10, 12 — `changePageHandler` + `changeRowsPerPageHandler` |
| Status/type filters wired | Tasks 8, 10, 12 — `tabChangeHandler` switches filter |
| Edit action (status update) | Tasks 7, 8 — status dropdown menu → `updateNoticeHandler` |
| Delete action confirm → mutation → refetch | Task 8 — `sweetConfirmAlert` → `removeNoticeByAdmin` → refetch |
| Loading state | Tasks 1–4, 7–12 — `CircularProgress` in list rows |
| Error state | Tasks 8, 10, 12 — `sweetMixinErrorAlert` in catch blocks |
| All enum values match backend | `NoticeStatus.HOLD/ACTIVE/DELETE`, `NoticeCategory.FAQ/INQUIRY/TERMS` verified |
| Remove hardcoded fallback data | Tasks 1–3 — HARDCODED_* arrays deleted |
| Users page: fully wired | Already done pre-plan; Task 4 adds loading prop |
| Properties page: fully wired | Already done pre-plan; Task 4 adds loading prop |
| Community page: fully wired | Already done pre-plan; Task 4 adds loading prop |

### Notes for Backend Work (out of scope for this plan)

The Notice GraphQL resolver does **not** exist in `/Desktop/monolith/apps/monolith-api/src/components/`. CS pages will show `CircularProgress` until the backend implements:
- `getAllNoticesByAdmin(input: NoticesInquiry!)` → `Notices!`
- `updateNoticeByAdmin(input: NoticeUpdate!)` → `Notice!`
- `removeNoticeByAdmin(noticeId: String!)` → `Notice!`

Pattern to follow: same structure as `board-article.resolver.ts` with `@RolesGuard(MemberType.ADMIN)` and `@WithoutGuard` decorators.
