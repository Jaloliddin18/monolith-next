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
import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';

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

const HARDCODED_FAQ = [
	{
		id: 'FAQ-001',
		category: 'Delivery',
		title: 'How long does standard shipping take?',
		writer: 'Admin',
		writerImage: '/icons/user_profile.png',
		date: '2025-12-15',
		status: 'ACTIVE',
	},
	{
		id: 'FAQ-002',
		category: 'Returns',
		title: 'What is your return and refund policy?',
		writer: 'Admin',
		writerImage: '/icons/user_profile.png',
		date: '2025-12-10',
		status: 'ACTIVE',
	},
	{
		id: 'FAQ-003',
		category: 'Product',
		title: 'Are all furniture materials sustainably sourced?',
		writer: 'Editor',
		writerImage: '/icons/user_profile.png',
		date: '2025-11-22',
		status: 'ACTIVE',
	},
	{
		id: 'FAQ-004',
		category: 'Payment',
		title: 'Which payment methods are accepted?',
		writer: 'Admin',
		writerImage: '/icons/user_profile.png',
		date: '2025-11-18',
		status: 'ACTIVE',
	},
	{
		id: 'FAQ-005',
		category: 'Orders',
		title: 'Can I modify or cancel my order after placing it?',
		writer: 'Editor',
		writerImage: '/icons/user_profile.png',
		date: '2025-11-05',
		status: 'ACTIVE',
	},
];

interface FaqArticlesPanelListType {
	dense?: boolean;
	membersData?: any;
	searchMembers?: any;
	anchorEl?: any;
	handleMenuIconClick?: any;
	handleMenuIconClose?: any;
	generateMentorTypeHandle?: any;
}

export const FaqArticlesPanelList = (props: FaqArticlesPanelListType) => {
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
						{HARDCODED_FAQ.map((faq) => (
							<TableRow hover key={faq.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
										{faq.category}
									</span>
								</TableCell>
								<TableCell align="left" sx={{ maxWidth: 340, fontWeight: 500 }}>
									{faq.title}
								</TableCell>
								<TableCell align="left">
									<Stack direction="row" alignItems="center" gap={1}>
										<Avatar src={faq.writerImage} sx={{ width: 28, height: 28 }} />
										<span>{faq.writer}</span>
									</Stack>
								</TableCell>
								<TableCell align="left" sx={{ color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
									{faq.date}
								</TableCell>
								<TableCell align="center">
									<Button className={'badge success'}>{faq.status}</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};
