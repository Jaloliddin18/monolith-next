import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import {
	Box, Button, InputAdornment, List, ListItem, Stack,
	Dialog, DialogTitle, DialogContent, DialogActions,
	TextField, Select, MenuItem, FormControl, InputLabel,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import OutlinedInput from '@mui/material/OutlinedInput';
import TablePagination from '@mui/material/TablePagination';
import { TabContext } from '@mui/lab';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import SearchIcon from '@mui/icons-material/Search';
import { NoticeList } from '../../../libs/components/admin/cs/NoticeList';
import { NoticesInquiry, NoticeInput } from '../../../libs/types/notice/notice.input';
import { Notice } from '../../../libs/types/notice/notice';
import { NoticeCategory, NoticeStatus } from '../../../libs/enums/notice.enum';
import { NoticeUpdate } from '../../../libs/types/notice/notice.update';
import { sweetConfirmAlert, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../../libs/sweetAlert';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_NOTICES_BY_ADMIN } from '../../../apollo/admin/query';
import { CREATE_NOTICE_BY_ADMIN, UPDATE_NOTICE_BY_ADMIN, REMOVE_NOTICE_BY_ADMIN } from '../../../apollo/admin/mutation';
import { T } from '../../../libs/types/common';
import { Direction } from '../../../libs/enums/common.enum';

const DEFAULT_NOTICES_INQUIRY: NoticesInquiry = {
	page: 1,
	limit: 10,
	sort: 'createdAt',
	direction: Direction.DESC,
	search: {},
};

const DEFAULT_CREATE_INPUT: NoticeInput = {
	noticeCategory: NoticeCategory.FAQ,
	noticeStatus: NoticeStatus.ACTIVE,
	noticeTitle: '',
	noticeContent: '',
};

const AdminNotice: NextPage = ({ initialInquiry = DEFAULT_NOTICES_INQUIRY, ...props }: any) => {
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const [noticesInquiry, setNoticesInquiry] = useState<NoticesInquiry>(initialInquiry ?? DEFAULT_NOTICES_INQUIRY);
	const [notices, setNotices] = useState<Notice[]>([]);
	const [noticesTotal, setNoticesTotal] = useState<number>(0);
	const [value, setValue] = useState(noticesInquiry?.search?.noticeStatus ?? 'ALL');
	const [searchText, setSearchText] = useState('');
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [createInput, setCreateInput] = useState<NoticeInput>({ ...DEFAULT_CREATE_INPUT });
	const [creating, setCreating] = useState(false);

	/** APOLLO REQUESTS **/
	const [createNoticeByAdmin] = useMutation(CREATE_NOTICE_BY_ADMIN);
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

	const menuIconCloseHandler = () => setAnchorEl([]);

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
		}
	};

	const textHandler = useCallback((val: string) => setSearchText(val), []);

	const searchTextHandler = () => {
		setNoticesInquiry({ ...noticesInquiry, search: { ...noticesInquiry.search, text: searchText } });
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

	const handleCreateNotice = async () => {
		if (!createInput.noticeTitle.trim() || !createInput.noticeContent.trim()) {
			await sweetMixinErrorAlert('Please fill in title and content');
			return;
		}
		setCreating(true);
		try {
			await createNoticeByAdmin({ variables: { input: createInput } });
			setCreateDialogOpen(false);
			setCreateInput({ ...DEFAULT_CREATE_INPUT });
			await sweetTopSmallSuccessAlert('Notice created!', 800);
			await getAllNoticesByAdminRefetch({ input: noticesInquiry });
		} catch (err: any) {
			await sweetMixinErrorAlert(err?.message ?? 'Something went wrong');
		} finally {
			setCreating(false);
		}
	};

	return (
		<Box component={'div'} className={'content'}>
			<Box component={'div'} className={'title flex_space'}>
				<Typography variant={'h2'}>Notice Management</Typography>
				<Button className="btn_add" variant={'contained'} size={'medium'} onClick={() => setCreateDialogOpen(true)}>
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
													onClick={() => {
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

			{/* Create Notice Dialog */}
			<Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
				<DialogTitle sx={{ fontWeight: 600, pb: 1 }}>Create Notice</DialogTitle>
				<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
					<FormControl fullWidth size="small">
						<InputLabel>Category</InputLabel>
						<Select
							value={createInput.noticeCategory}
							label="Category"
							onChange={(e) => setCreateInput({ ...createInput, noticeCategory: e.target.value as NoticeCategory })}
						>
							{Object.values(NoticeCategory).map((c) => (
								<MenuItem key={c} value={c}>{c}</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl fullWidth size="small">
						<InputLabel>Status</InputLabel>
						<Select
							value={createInput.noticeStatus}
							label="Status"
							onChange={(e) => setCreateInput({ ...createInput, noticeStatus: e.target.value as NoticeStatus })}
						>
							{[NoticeStatus.ACTIVE, NoticeStatus.HOLD].map((s) => (
								<MenuItem key={s} value={s}>{s}</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField
						label="Title"
						fullWidth
						size="small"
						value={createInput.noticeTitle}
						onChange={(e) => setCreateInput({ ...createInput, noticeTitle: e.target.value })}
						inputProps={{ maxLength: 100 }}
					/>
					<TextField
						label="Content"
						fullWidth
						multiline
						rows={5}
						value={createInput.noticeContent}
						onChange={(e) => setCreateInput({ ...createInput, noticeContent: e.target.value })}
					/>
				</DialogContent>
				<DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
					<Button onClick={() => setCreateDialogOpen(false)} sx={{ color: '#787878' }}>Cancel</Button>
					<Button
						variant="contained"
						onClick={handleCreateNotice}
						disabled={creating}
						sx={{ background: '#C46A4A', '&:hover': { background: '#a85a3c' } }}
					>
						{creating ? 'Creating...' : 'Create Notice'}
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default withAdminLayout(AdminNotice);
