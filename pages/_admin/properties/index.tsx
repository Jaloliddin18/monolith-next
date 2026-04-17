import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { Box, List, ListItem, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TabContext } from '@mui/lab';
import TablePagination from '@mui/material/TablePagination';
import { FurniturePanelList } from '../../../libs/components/admin/properties/FurnitureList';
import { AllFurnituresInquiry } from '../../../libs/types/furniture/furniture.input';
import { Furniture } from '../../../libs/types/furniture/furniture';
import { FurnitureRoom, FurnitureStatus } from '../../../libs/enums/furniture.enum';
import { sweetConfirmAlert, sweetMixinErrorAlert } from '../../../libs/sweetAlert';
import { FurnitureUpdate } from '../../../libs/types/furniture/furniture.update';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_FURNITURE_BY_ADMIN, UPDATE_FURNITURE_BY_ADMIN } from '../../../apollo/admin/mutation';
import { GET_ALL_FURNITURES_BY_ADMIN } from '../../../apollo/admin/query';
import { T } from '../../../libs/types/common';
import { Direction } from '../../../libs/enums/common.enum';

const DEFAULT_FURNITURES_INQUIRY: AllFurnituresInquiry = {
	page: 1,
	limit: 10,
	sort: 'createdAt',
	direction: Direction.DESC,
	search: {},
};

const AdminProperties: NextPage = ({ initialInquiry = DEFAULT_FURNITURES_INQUIRY, ...props }: any) => {
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const [furnituresInquiry, setFurnituresInquiry] = useState<AllFurnituresInquiry>(initialInquiry ?? DEFAULT_FURNITURES_INQUIRY);
	const [furnitures, setFurnitures] = useState<Furniture[]>([]);
	const [furnituresTotal, setFurnituresTotal] = useState<number>(0);
	const [value, setValue] = useState(
		furnituresInquiry?.search?.furnitureStatus ? furnituresInquiry?.search?.furnitureStatus : 'ALL',
	);
	const [searchType, setSearchType] = useState('ALL');

	/** APOLLO REQUESTS **/
	const [updateFurnitureByAdmin] = useMutation(UPDATE_FURNITURE_BY_ADMIN);
	const [removeFurnitureByAdmin] = useMutation(REMOVE_FURNITURE_BY_ADMIN);
	const {
		loading: getAllFurnituresByAdminLoading,
		data: getAllFurnituresByAdminData,
		error: getAllFurnituresByAdminError,
		refetch: getAllFurnituresByAdminRefetch,
	} = useQuery(GET_ALL_FURNITURES_BY_ADMIN, {
		fetchPolicy: 'network-only',
		variables: { input: furnituresInquiry },
		skip: !furnituresInquiry,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setFurnitures(data?.getAllFurnituresByAdmin?.list ?? []);
			setFurnituresTotal(data?.getAllFurnituresByAdmin?.metaCounter[0]?.total ?? 0);
		},
		onError: () => {},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		getAllFurnituresByAdminRefetch({ input: furnituresInquiry }).then().catch(() => {});
	}, [furnituresInquiry]);

	/** HANDLERS **/
	const changePageHandler = async (event: unknown, newPage: number) => {
		furnituresInquiry.page = newPage + 1;
		await getAllFurnituresByAdminRefetch({ input: furnituresInquiry });
		setFurnituresInquiry({ ...furnituresInquiry });
	};

	const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		furnituresInquiry.limit = parseInt(event.target.value, 10);
		furnituresInquiry.page = 1;
		await getAllFurnituresByAdminRefetch({ input: furnituresInquiry });
		setFurnituresInquiry({ ...furnituresInquiry });
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
		setFurnituresInquiry({ ...furnituresInquiry, page: 1, sort: 'createdAt' });

		switch (newValue) {
			case 'ACTIVE':
				setFurnituresInquiry({ ...furnituresInquiry, search: { furnitureStatus: FurnitureStatus.ACTIVE } });
				break;
			case 'DISCONTINUED':
				setFurnituresInquiry({ ...furnituresInquiry, search: { furnitureStatus: FurnitureStatus.DISCONTINUED } });
				break;
			case 'DELETE':
				setFurnituresInquiry({ ...furnituresInquiry, search: { furnitureStatus: FurnitureStatus.DELETE } });
				break;
			default:
				delete furnituresInquiry?.search?.furnitureStatus;
				setFurnituresInquiry({ ...furnituresInquiry });
				break;
		}
	};

	const removeFurnitureHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert('Are you sure to remove?')) {
				await removeFurnitureByAdmin({ variables: { input: id } });
				await getAllFurnituresByAdminRefetch({ input: furnituresInquiry });
			}
			menuIconCloseHandler();
		} catch (err: any) {
			await sweetMixinErrorAlert(err?.message ?? 'Something went wrong');
		}
	};

	const searchTypeHandler = async (newValue: string) => {
		try {
			setSearchType(newValue);
			if (newValue !== 'ALL') {
				setFurnituresInquiry({
					...furnituresInquiry,
					page: 1,
					sort: 'createdAt',
					search: {
						...furnituresInquiry.search,
						roomList: [newValue as FurnitureRoom],
					},
				});
			} else {
				delete (furnituresInquiry?.search as any)?.roomList;
				setFurnituresInquiry({ ...furnituresInquiry });
			}
		} catch (err: any) {
			console.log('searchTypeHandler: ', err.message);
		}
	};

	const updateFurnitureHandler = async (updateData: FurnitureUpdate) => {
		try {
			await updateFurnitureByAdmin({ variables: { input: updateData } });
			menuIconCloseHandler();
			await getAllFurnituresByAdminRefetch({ input: furnituresInquiry });
		} catch (err: any) {
			menuIconCloseHandler();
			await sweetMixinErrorAlert(err?.message ?? 'Something went wrong');
		}
	};

	return (
		<Box component={'div'} className={'content'}>
			<Typography variant={'h2'} className={'tit'} sx={{ mb: '24px' }}>
				Furniture List
			</Typography>
			<Box component={'div'} className={'table-wrap'}>
				<Box component={'div'} sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={value}>
						<Box component={'div'}>
							<List className={'tab-menu'}>
								<ListItem
									onClick={(e: any) => tabChangeHandler(e, 'ALL')}
									value="ALL"
									className={value === 'ALL' ? 'li on' : 'li'}
								>
									All
								</ListItem>
								<ListItem
									onClick={(e: any) => tabChangeHandler(e, 'ACTIVE')}
									value="ACTIVE"
									className={value === 'ACTIVE' ? 'li on' : 'li'}
								>
									Active
								</ListItem>
								<ListItem
									onClick={(e: any) => tabChangeHandler(e, 'DISCONTINUED')}
									value="DISCONTINUED"
									className={value === 'DISCONTINUED' ? 'li on' : 'li'}
								>
									Discontinued
								</ListItem>
								<ListItem
									onClick={(e: any) => tabChangeHandler(e, 'DELETE')}
									value="DELETE"
									className={value === 'DELETE' ? 'li on' : 'li'}
								>
									Delete
								</ListItem>
							</List>
							<Divider />
							<Stack className={'search-area'} sx={{ m: '24px' }}>
								<Select sx={{ width: '160px', mr: '20px' }} value={searchType}>
									<MenuItem value={'ALL'} onClick={() => searchTypeHandler('ALL')}>
										ALL
									</MenuItem>
									{Object.values(FurnitureRoom).map((room: string) => (
										<MenuItem value={room} onClick={() => searchTypeHandler(room)} key={room}>
											{room}
										</MenuItem>
									))}
								</Select>
							</Stack>
							<Divider />
						</Box>
						<FurniturePanelList
							furnitures={furnitures}
							loading={getAllFurnituresByAdminLoading}
							anchorEl={anchorEl}
							menuIconClickHandler={menuIconClickHandler}
							menuIconCloseHandler={menuIconCloseHandler}
							updateFurnitureHandler={updateFurnitureHandler}
							removeFurnitureHandler={removeFurnitureHandler}
						/>

						<TablePagination
							rowsPerPageOptions={[10, 20, 40, 60]}
							component="div"
							count={furnituresTotal}
							rowsPerPage={furnituresInquiry?.limit}
							page={furnituresInquiry?.page - 1}
							onPageChange={changePageHandler}
							onRowsPerPageChange={changeRowsPerPageHandler}
						/>
					</TabContext>
				</Box>
			</Box>
		</Box>
	);
};


export default withAdminLayout(AdminProperties);
