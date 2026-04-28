import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import {
	Box, Button, List, ListItem,
	Dialog, DialogTitle, DialogContent, DialogActions,
	TextField, Select, MenuItem, FormControl, InputLabel,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TablePagination from '@mui/material/TablePagination';
import { TabContext } from '@mui/lab';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { FaqArticlesPanelList } from '../../../libs/components/admin/cs/FaqList';
import { NoticesInquiry, NoticeInput } from '../../../libs/types/notice/notice.input';
import { Notice } from '../../../libs/types/notice/notice';
import { NoticeCategory, NoticeStatus } from '../../../libs/enums/notice.enum';
import { NoticeUpdate } from '../../../libs/types/notice/notice.update';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../../libs/sweetAlert';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_NOTICES_BY_ADMIN } from '../../../apollo/admin/query';
import { CREATE_NOTICE_BY_ADMIN, UPDATE_NOTICE_BY_ADMIN } from '../../../apollo/admin/mutation';
import { T } from '../../../libs/types/common';
import { Direction } from '../../../libs/enums/common.enum';

const DEFAULT_FAQ_INQUIRY: NoticesInquiry = {
	page: 1,
	limit: 10,
	sort: 'createdAt',
	direction: Direction.DESC,
	search: { noticeCategory: NoticeCategory.FAQ },
};

const DEFAULT_CREATE_INPUT: NoticeInput = {
	noticeCategory: NoticeCategory.FAQ,
	noticeStatus: NoticeStatus.ACTIVE,
	noticeTitle: '',
	noticeContent: '',
};

const FaqArticles: NextPage = ({ initialInquiry = DEFAULT_FAQ_INQUIRY, ...props }: any) => {
	const [noticesInquiry, setNoticesInquiry] = useState<NoticesInquiry>(initialInquiry ?? DEFAULT_FAQ_INQUIRY);
	const [notices, setNotices] = useState<Notice[]>([]);
	const [noticesTotal, setNoticesTotal] = useState<number>(0);
	const [value, setValue] = useState(
		noticesInquiry?.search?.noticeStatus ? noticesInquiry?.search?.noticeStatus : 'ALL',
	);
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [createInput, setCreateInput] = useState<NoticeInput>({ ...DEFAULT_CREATE_INPUT });
	const [creating, setCreating] = useState(false);

	/** APOLLO REQUESTS **/
	const [createNoticeByAdmin] = useMutation(CREATE_NOTICE_BY_ADMIN);
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

	const handleCreateFaq = async () => {
		if (!createInput.noticeTitle.trim() || !createInput.noticeContent.trim()) {
			await sweetMixinErrorAlert('Please fill in title and content');
			return;
		}
		setCreating(true);
		try {
			await createNoticeByAdmin({ variables: { input: { ...createInput, noticeCategory: NoticeCategory.FAQ } } });
			setCreateDialogOpen(false);
			setCreateInput({ ...DEFAULT_CREATE_INPUT });
			await sweetTopSmallSuccessAlert('FAQ created!', 800);
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
				<Typography variant={'h2'}>FAQ Management</Typography>
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

			{/* Create FAQ Dialog */}
			<Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
				<DialogTitle sx={{ fontWeight: 600, pb: 1 }}>Create FAQ</DialogTitle>
				<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
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
						label="Question"
						fullWidth
						size="small"
						value={createInput.noticeTitle}
						onChange={(e) => setCreateInput({ ...createInput, noticeTitle: e.target.value })}
						inputProps={{ maxLength: 100 }}
					/>
					<TextField
						label="Answer"
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
						onClick={handleCreateFaq}
						disabled={creating}
						sx={{ background: '#C46A4A', '&:hover': { background: '#a85a3c' } }}
					>
						{creating ? 'Creating...' : 'Create FAQ'}
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default withAdminLayout(FaqArticles);
