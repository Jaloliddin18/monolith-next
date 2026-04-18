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
	Avatar,
	Stack,
} from '@mui/material';
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
							notices.map((notice) => {
								const writerImage = notice.memberData?.memberImage
									? `${REACT_APP_API_URL}/${notice.memberData.memberImage}`
									: '/general_images/default_profile.png';
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
												<Avatar src={writerImage} alt={notice.memberData?.memberNick} sx={{ width: 28, height: 28 }} />
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
