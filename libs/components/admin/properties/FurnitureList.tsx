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
	CircularProgress,
	Avatar,
	Stack,
	Typography,
} from '@mui/material';
import { Furniture } from '../../../types/furniture/furniture';
import { REACT_APP_API_URL } from '../../../config';
import DeleteIcon from '@mui/icons-material/Delete';
import { FurnitureStatus } from '../../../enums/furniture.enum';

interface HeadCell {
	disablePadding: boolean;
	id: string;
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

function EnhancedTableHead() {
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

interface FurniturePanelListType {
	furnitures: Furniture[];
	loading: boolean;
	anchorEl: any;
	menuIconClickHandler: any;
	menuIconCloseHandler: any;
	updateFurnitureHandler: any;
	removeFurnitureHandler: any;
}

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
						) : furnitures.map((furniture, index) => {
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
