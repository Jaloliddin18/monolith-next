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
	Menu,
	Fade,
	MenuItem,
	Avatar,
	Stack,
	Typography,
} from '@mui/material';
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
	{ id: 'action', numeric: false, disablePadding: false, label: 'STATUS' },
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
							notices.map((notice, index) => {
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
												<Avatar src={writerImage} alt={notice.memberData?.memberNick} sx={{ width: 28, height: 28 }} />
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
													DELETE
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
