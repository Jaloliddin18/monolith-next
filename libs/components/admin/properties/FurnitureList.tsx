import React from 'react';
import Link from 'next/link';
import {
	TableCell,
	TableHead,
	TableBody,
	TableRow,
	Table,
	TableContainer,
	Button,
	Menu,
	Fade,
	MenuItem,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';
import { Furniture } from '../../../types/furniture/furniture';
import { REACT_APP_API_URL } from '../../../config';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { FurnitureStatus } from '../../../enums/furniture.enum';

interface Data {
	id: string;
	title: string;
	price: string;
	designer: string;
	room: string;
	category: string;
	status: string;
}

type Order = 'asc' | 'desc';

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{ id: 'id', numeric: true, disablePadding: false, label: 'MB ID' },
	{ id: 'title', numeric: true, disablePadding: false, label: 'TITLE' },
	{ id: 'price', numeric: false, disablePadding: false, label: 'PRICE' },
	{ id: 'designer', numeric: false, disablePadding: false, label: 'DESIGNER' },
	{ id: 'room', numeric: false, disablePadding: false, label: 'ROOM' },
	{ id: 'category', numeric: false, disablePadding: false, label: 'CATEGORY' },
	{ id: 'status', numeric: false, disablePadding: false, label: 'STATUS' },
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	return (
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
	);
}

const HARDCODED_FURNITURES = [
	{ _id: '66089ea21669073834636aa1', furnitureTitle: 'Oslo Sofa', furniturePrice: 1290, furnitureRoom: 'LIVING_ROOM', furnitureCategory: 'SOFA', furnitureStatus: 'ACTIVE', furnitureImages: ['img/furniture/luxury_chair.jpg'], memberData: { memberNick: 'Oueen' } },
	{ _id: '660881a71669073834636bb2', furnitureTitle: 'Bergen Dining Table', furniturePrice: 870, furnitureRoom: 'DINING_ROOM', furnitureCategory: 'TABLE', furnitureStatus: 'ACTIVE', furnitureImages: ['img/furniture/luxury_chair.jpg'], memberData: { memberNick: 'Oscar' } },
	{ _id: '660006163508d1d2ae04cc3', furnitureTitle: 'Fjord Bookshelf', furniturePrice: 430, furnitureRoom: 'STUDY', furnitureCategory: 'STORAGE', furnitureStatus: 'DISCONTINUED', furnitureImages: ['img/furniture/luxury_chair.jpg'], memberData: { memberNick: 'Justin' } },
	{ _id: '65fadcb11dd7fcf6094ddd4', furnitureTitle: 'Lund Lounge Chair', furniturePrice: 650, furnitureRoom: 'LIVING_ROOM', furnitureCategory: 'CHAIR', furnitureStatus: 'ACTIVE', furnitureImages: ['img/furniture/luxury_chair.jpg'], memberData: { memberNick: 'bayram' } },
	{ _id: '65f9254fed2fbdf69b6bee5', furnitureTitle: 'Trondheim Bed Frame', furniturePrice: 1150, furnitureRoom: 'BEDROOM', furnitureCategory: 'BED', furnitureStatus: 'ACTIVE', furnitureImages: ['img/furniture/luxury_chair.jpg'], memberData: { memberNick: 'ShawnAgent' } },
	{ _id: '65f5a45ed8897f8090116f6', furnitureTitle: 'Stavanger Coffee Table', furniturePrice: 320, furnitureRoom: 'LIVING_ROOM', furnitureCategory: 'TABLE', furnitureStatus: 'DELETE', furnitureImages: ['img/furniture/luxury_chair.jpg'], memberData: { memberNick: 'admin' } },
];

interface FurniturePanelListType {
	furnitures: Furniture[];
	anchorEl: any;
	menuIconClickHandler: any;
	menuIconCloseHandler: any;
	updateFurnitureHandler: any;
	removeFurnitureHandler: any;
}

export const FurniturePanelList = (props: FurniturePanelListType) => {
	const {
		furnitures,
		anchorEl,
		menuIconClickHandler,
		menuIconCloseHandler,
		updateFurnitureHandler,
		removeFurnitureHandler,
	} = props;
	const displayFurnitures = furnitures.length > 0 ? furnitures : HARDCODED_FURNITURES;

	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{displayFurnitures.map((furniture: any, index: number) => {
								const furnitureImage = `${REACT_APP_API_URL}/${furniture?.furnitureImages[0]}`;

								return (
									<TableRow hover key={furniture?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell align="left">{furniture._id}</TableCell>
										<TableCell align="left" className={'name'}>
											{furniture.furnitureStatus === FurnitureStatus.ACTIVE ? (
												<Stack direction={'row'}>
													<Link href={`/furniture/detail?id=${furniture?._id}`}>
														<div>
															<Avatar alt={furniture.furnitureTitle} src={furnitureImage} sx={{ ml: '2px', mr: '10px' }} />
														</div>
													</Link>
													<Link href={`/furniture/detail?id=${furniture?._id}`}>
														<div>{furniture.furnitureTitle}</div>
													</Link>
												</Stack>
											) : (
												<Stack direction={'row'}>
													<div>
														<Avatar alt={furniture.furnitureTitle} src={furnitureImage} sx={{ ml: '2px', mr: '10px' }} />
													</div>
													<div style={{ marginTop: '10px' }}>{furniture.furnitureTitle}</div>
												</Stack>
											)}
										</TableCell>
										<TableCell align="center">{furniture.furniturePrice}</TableCell>
										<TableCell align="center">{furniture.memberData?.memberNick}</TableCell>
										<TableCell align="center">{furniture.furnitureRoom}</TableCell>
										<TableCell align="center">{furniture.furnitureCategory}</TableCell>
										<TableCell align="center">
											{furniture.furnitureStatus === FurnitureStatus.DELETE && (
												<Button
													variant="outlined"
													sx={{ p: '3px', border: 'none', ':hover': { border: '1px solid #000000' } }}
													onClick={() => removeFurnitureHandler(furniture._id)}
												>
													<DeleteIcon fontSize="small" />
												</Button>
											)}

											{furniture.furnitureStatus !== FurnitureStatus.DELETE && furniture.furnitureStatus !== FurnitureStatus.ACTIVE && (
												<Button className={'badge warning'}>{furniture.furnitureStatus}</Button>
											)}

											{furniture.furnitureStatus === FurnitureStatus.ACTIVE && (
												<>
													<Button onClick={(e: any) => menuIconClickHandler(e, index)} className={'badge success'}>
														{furniture.furnitureStatus}
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
														{Object.values(FurnitureStatus)
															.filter((ele) => ele !== furniture.furnitureStatus)
															.map((status: string) => (
																<MenuItem
																	onClick={() => updateFurnitureHandler({ _id: furniture._id, furnitureStatus: status })}
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
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};
