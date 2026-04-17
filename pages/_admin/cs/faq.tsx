import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { Box, Button, List, ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TablePagination from '@mui/material/TablePagination';
import { TabContext } from '@mui/lab';
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
	const [searchType, setSearchType] = useState('ALL');

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
