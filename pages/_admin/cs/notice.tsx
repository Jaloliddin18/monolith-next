import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { Box, Button, InputAdornment, List, ListItem, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import OutlinedInput from '@mui/material/OutlinedInput';
import TablePagination from '@mui/material/TablePagination';
import { TabContext } from '@mui/lab';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import SearchIcon from '@mui/icons-material/Search';
import { NoticeList } from '../../../libs/components/admin/cs/NoticeList';
import { NoticesInquiry } from '../../../libs/types/notice/notice.input';
import { Notice } from '../../../libs/types/notice/notice';
import { NoticeStatus } from '../../../libs/enums/notice.enum';
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
		</Box>
	);
};

export default withAdminLayout(AdminNotice);
