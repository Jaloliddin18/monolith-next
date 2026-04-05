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
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { Member } from '../../../types/member/member';
import { REACT_APP_API_URL } from '../../../config';
import { MemberStatus, MemberType } from '../../../enums/member.enum';

interface Data {
	id: string;
	nickname: string;
	fullname: string;
	phone: string;
	type: string;
	state: string;
	warning: string;
	block: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = 'asc' | 'desc';

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'id',
		numeric: true,
		disablePadding: false,
		label: 'MB ID',
	},
	{
		id: 'nickname',
		numeric: true,
		disablePadding: false,
		label: 'NICK NAME',
	},
	{
		id: 'fullname',
		numeric: false,
		disablePadding: false,
		label: 'FULL NAME',
	},
	{
		id: 'phone',
		numeric: true,
		disablePadding: false,
		label: 'PHONE NUM',
	},
	{
		id: 'type',
		numeric: false,
		disablePadding: false,
		label: 'MEMBER TYPE',
	},
	{
		id: 'warning',
		numeric: false,
		disablePadding: false,
		label: 'WARNING',
	},
	{
		id: 'block',
		numeric: false,
		disablePadding: false,
		label: 'BLOCK CRIMES',
	},
	{
		id: 'state',
		numeric: false,
		disablePadding: false,
		label: 'STATE',
	},
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
	const { onSelectAllClick } = props;

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

const HARDCODED_MEMBERS = [
	{ _id: '66089ea21669073834636faf', memberNick: 'Oueen', memberFullName: null, memberPhone: '01089321988', memberType: 'USER', memberStatus: 'ACTIVE', memberWarnings: 0, memberBlocks: 0, memberImage: null },
	{ _id: '660881a71669073834636f5a', memberNick: 'Oscar', memberFullName: null, memberPhone: '01089321989', memberType: 'DESIGNER', memberStatus: 'ACTIVE', memberWarnings: 0, memberBlocks: 0, memberImage: null },
	{ _id: '660006163508d1d2ae04641c', memberNick: 'Justin', memberFullName: null, memberPhone: '01084146861', memberType: 'USER', memberStatus: 'ACTIVE', memberWarnings: 0, memberBlocks: 0, memberImage: null },
	{ _id: '65fadcb11dd7fcf6094d4d4f', memberNick: 'bayram', memberFullName: null, memberPhone: '01099886611', memberType: 'USER', memberStatus: 'ACTIVE', memberWarnings: 0, memberBlocks: 0, memberImage: null },
	{ _id: '65f9254fed2fbdf69b6bece8', memberNick: 'ShawnAgent', memberFullName: null, memberPhone: '0123458769', memberType: 'DESIGNER', memberStatus: 'ACTIVE', memberWarnings: 0, memberBlocks: 0, memberImage: null },
	{ _id: '65f5a45ed8897f8090116a07', memberNick: 'admin', memberFullName: null, memberPhone: '010998877622', memberType: 'ADMIN', memberStatus: 'ACTIVE', memberWarnings: 0, memberBlocks: 0, memberImage: null },
	{ _id: '65f5719cd8897f8090116929', memberNick: 'testxon', memberFullName: null, memberPhone: '01099775522', memberType: 'USER', memberStatus: 'BLOCK', memberWarnings: 1, memberBlocks: 1, memberImage: null },
	{ _id: '65f55fc83b54eae13ccbe99e', memberNick: 'testjon', memberFullName: null, memberPhone: '01973234123', memberType: 'USER', memberStatus: 'ACTIVE', memberWarnings: 0, memberBlocks: 0, memberImage: null },
	{ _id: '65f227283b54eae13ccbdec1', memberNick: 'ShawnUser', memberFullName: null, memberPhone: '294857928375', memberType: 'USER', memberStatus: 'ACTIVE', memberWarnings: 0, memberBlocks: 0, memberImage: null },
	{ _id: '65f21bf03b54eae13ccbdde5', memberNick: 'ShawnU', memberFullName: null, memberPhone: '010123456789', memberType: 'USER', memberStatus: 'ACTIVE', memberWarnings: 0, memberBlocks: 0, memberImage: null },
];

interface MemberPanelListType {
	members: Member[];
	anchorEl: any;
	menuIconClickHandler: any;
	menuIconCloseHandler: any;
	updateMemberHandler: any;
}

export const MemberPanelList = (props: MemberPanelListType) => {
	const { members, anchorEl, menuIconClickHandler, menuIconCloseHandler, updateMemberHandler } = props;
	const displayMembers = members.length > 0 ? members : HARDCODED_MEMBERS;

	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{false && (
							<TableRow>
								<TableCell align="center" colSpan={8}>
									<span className={'no-data'}>data not found!</span>
								</TableCell>
							</TableRow>
						)}

						{displayMembers.map((member: any, index: number) => {
								const member_image = member.memberImage
									? `${REACT_APP_API_URL}/${member.memberImage}`
									: '/img/profile/defaultUser.svg';
								return (
									<TableRow hover key={member?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell align="left">{member._id}</TableCell>

										<TableCell align="left" className={'name'}>
											<Stack direction={'row'}>
												<Link href={`/member?memberId=${member._id}`}>
													<div>
														<Avatar alt="Remy Sharp" src={member_image} sx={{ ml: '2px', mr: '10px' }} />
													</div>
												</Link>
												<Link href={`/member?memberId=${member._id}`}>
													<div>{member.memberNick}</div>
												</Link>
											</Stack>
										</TableCell>

										<TableCell align="center">{member.memberFullName ?? '-'}</TableCell>
										<TableCell align="left">{member.memberPhone}</TableCell>

										<TableCell align="center">
											<Button onClick={(e: any) => menuIconClickHandler(e, index)} className={'badge success'}>
												{member.memberType}
											</Button>

											<Menu
												className={'menu-modal'}
												MenuListProps={{
													'aria-labelledby': 'fade-button',
												}}
												anchorEl={anchorEl[index]}
												open={Boolean(anchorEl[index])}
												onClose={menuIconCloseHandler}
												TransitionComponent={Fade}
												sx={{ p: 1 }}
											>
												{Object.values(MemberType)
													.filter((ele) => ele !== member?.memberType)
													.map((type: string) => (
														<MenuItem
															onClick={() => updateMemberHandler({ _id: member._id, memberType: type })}
															key={type}
														>
															<Typography variant={'subtitle1'} component={'span'}>
																{type}
															</Typography>
														</MenuItem>
													))}
											</Menu>
										</TableCell>

										<TableCell align="center">{member.memberWarnings}</TableCell>
										<TableCell align="center">{member.memberBlocks}</TableCell>
										<TableCell align="center">
											<Button onClick={(e: any) => menuIconClickHandler(e, member._id)} className={'badge success'}>
												{member.memberStatus}
											</Button>

											<Menu
												className={'menu-modal'}
												MenuListProps={{
													'aria-labelledby': 'fade-button',
												}}
												anchorEl={anchorEl[member._id]}
												open={Boolean(anchorEl[member._id])}
												onClose={menuIconCloseHandler}
												TransitionComponent={Fade}
												sx={{ p: 1 }}
											>
												{Object.values(MemberStatus)
													.filter((ele: string) => ele !== member?.memberStatus)
													.map((status: string) => (
														<MenuItem
															onClick={() => updateMemberHandler({ _id: member._id, memberStatus: status })}
															key={status}
														>
															<Typography variant={'subtitle1'} component={'span'}>
																{status}
															</Typography>
														</MenuItem>
													))}
											</Menu>
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
