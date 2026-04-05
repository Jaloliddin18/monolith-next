import React from 'react';
import {
	TableCell,
	TableHead,
	TableBody,
	TableRow,
	Table,
	TableContainer,
	Button,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';

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
	{ id: 'qna_case_status', numeric: false, disablePadding: false, label: 'QNA STATUS' },
];

const HARDCODED_INQUIRIES = [
	{
		id: 'INQ-001',
		category: 'Delivery',
		title: 'My order has not arrived — it has been 2 weeks',
		writer: 'Sarah Kim',
		writerImage: '/img/profile/defaultUser.svg',
		date: '2026-01-10',
		qnaStatus: 'ANSWERED',
	},
	{
		id: 'INQ-002',
		category: 'Returns',
		title: 'Received damaged item, need replacement',
		writer: 'James Park',
		writerImage: '/img/profile/defaultUser.svg',
		date: '2026-01-09',
		qnaStatus: 'PENDING',
	},
	{
		id: 'INQ-003',
		category: 'Payment',
		title: 'Double charge on my credit card',
		writer: 'Emily Chen',
		writerImage: '/img/profile/defaultUser.svg',
		date: '2026-01-08',
		qnaStatus: 'ANSWERED',
	},
	{
		id: 'INQ-004',
		category: 'Product',
		title: 'Does the Oslo sofa come in dark gray?',
		writer: 'Mike Johnson',
		writerImage: '/img/profile/defaultUser.svg',
		date: '2026-01-07',
		qnaStatus: 'ANSWERED',
	},
	{
		id: 'INQ-005',
		category: 'Orders',
		title: 'Can I change the delivery address after ordering?',
		writer: 'Lena Torres',
		writerImage: '/img/profile/defaultUser.svg',
		date: '2026-01-06',
		qnaStatus: 'PENDING',
	},
];

const qnaStatusStyle = (status: string) => {
	if (status === 'ANSWERED') {
		return { background: '#e8f5e9', color: '#2e7d32' };
	}
	return { background: '#fff8e1', color: '#f57f17' };
};

interface InquiryPanelListType {
	dense?: boolean;
	membersData?: any;
	searchMembers?: any;
	anchorEl?: any;
	handleMenuIconClick?: any;
	handleMenuIconClose?: any;
	generateMentorTypeHandle?: any;
}

export const InquiryList = (props: InquiryPanelListType) => {
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
						{HARDCODED_INQUIRIES.map((inquiry) => (
							<TableRow hover key={inquiry.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
										{inquiry.category}
									</span>
								</TableCell>
								<TableCell align="left" sx={{ fontWeight: 500, maxWidth: 320 }}>
									{inquiry.title}
								</TableCell>
								<TableCell align="left">
									<Stack direction="row" alignItems="center" gap={1}>
										<Avatar src={inquiry.writerImage} sx={{ width: 28, height: 28 }} />
										<span>{inquiry.writer}</span>
									</Stack>
								</TableCell>
								<TableCell align="left" sx={{ color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
									{inquiry.date}
								</TableCell>
								<TableCell align="center">
									<Button
										className={inquiry.qnaStatus === 'ANSWERED' ? 'badge success' : 'badge warning'}
										disableRipple
										sx={{ cursor: 'default' }}
									>
										{inquiry.qnaStatus}
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};
