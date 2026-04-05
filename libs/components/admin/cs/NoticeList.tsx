import React, { useState } from 'react';
import {
	TableCell,
	TableHead,
	TableBody,
	TableRow,
	Table,
	TableContainer,
	Button,
	Box,
	Checkbox,
	Toolbar,
	IconButton,
	Tooltip,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

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
	{ id: 'view', numeric: true, disablePadding: false, label: 'VIEWS' },
	{ id: 'action', numeric: false, disablePadding: false, label: 'ACTION' },
];

const HARDCODED_NOTICES = [
	{
		id: 'NTC-001',
		category: 'General',
		title: 'Scheduled site maintenance — Jan 20, 02:00–04:00 AM',
		writer: 'Admin',
		date: '2026-01-15',
		views: 342,
	},
	{
		id: 'NTC-002',
		category: 'Delivery',
		title: 'Holiday shipping delays — orders may take 3–5 extra days',
		writer: 'Admin',
		date: '2025-12-20',
		views: 1204,
	},
	{
		id: 'NTC-003',
		category: 'Promotion',
		title: 'New Year Sale: up to 40% off selected furniture',
		writer: 'Editor',
		date: '2025-12-30',
		views: 2871,
	},
	{
		id: 'NTC-004',
		category: 'Policy',
		title: 'Updated privacy policy effective February 1, 2026',
		writer: 'Admin',
		date: '2026-01-08',
		views: 519,
	},
	{
		id: 'NTC-005',
		category: 'General',
		title: 'New product categories added: Home Office & Outdoor',
		writer: 'Editor',
		date: '2026-01-03',
		views: 746,
	},
];

interface NoticeListType {
	dense?: boolean;
	membersData?: any;
	searchMembers?: any;
	anchorEl?: any;
	handleMenuIconClick?: any;
	handleMenuIconClose?: any;
	generateMentorTypeHandle?: any;
}

export const NoticeList = (props: NoticeListType) => {
	const [selected, setSelected] = useState<string[]>([]);

	const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setSelected(HARDCODED_NOTICES.map((n) => n.id));
		} else {
			setSelected([]);
		}
	};

	const handleSelect = (id: string) => {
		setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
	};

	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
					{selected.length > 0 ? (
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox" colSpan={8}>
									<Toolbar sx={{ minHeight: '48px !important', pl: 1 }}>
										<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
											<Checkbox
												color="primary"
												indeterminate={selected.length > 0 && selected.length < HARDCODED_NOTICES.length}
												checked={selected.length === HARDCODED_NOTICES.length}
												onChange={handleSelectAll}
											/>
											<Typography sx={{ flex: '1 1 100%', fontSize: 14, fontWeight: 600 }} color="inherit" component="div">
												{selected.length} selected
											</Typography>
										</Box>
										<Button variant={'text'} size={'small'} sx={{ color: 'var(--color-sale)', fontFamily: 'var(--font-ui)', fontWeight: 600 }}>
											Delete
										</Button>
									</Toolbar>
								</TableCell>
							</TableRow>
						</TableHead>
					) : (
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">
									<Checkbox
										color="primary"
										indeterminate={selected.length > 0 && selected.length < HARDCODED_NOTICES.length}
										checked={HARDCODED_NOTICES.length > 0 && selected.length === HARDCODED_NOTICES.length}
										onChange={handleSelectAll}
									/>
								</TableCell>
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
					)}
					<TableBody>
						{HARDCODED_NOTICES.map((notice) => (
							<TableRow
								hover
								key={notice.id}
								selected={selected.includes(notice.id)}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell padding="checkbox">
									<Checkbox
										color="primary"
										checked={selected.includes(notice.id)}
										onChange={() => handleSelect(notice.id)}
									/>
								</TableCell>
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
										{notice.category}
									</span>
								</TableCell>
								<TableCell align="left" sx={{ fontWeight: 500, maxWidth: 300 }}>
									{notice.title}
								</TableCell>
								<TableCell align="left" sx={{ color: 'var(--color-text-muted)', fontSize: 12 }}>
									{notice.id}
								</TableCell>
								<TableCell align="left">{notice.writer}</TableCell>
								<TableCell align="left" sx={{ color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
									{notice.date}
								</TableCell>
								<TableCell align="left" sx={{ color: 'var(--color-text-muted)' }}>
									{notice.views.toLocaleString()}
								</TableCell>
								<TableCell align="center">
									<Tooltip title="Delete">
										<IconButton size="small">
											<DeleteRoundedIcon fontSize="small" />
										</IconButton>
									</Tooltip>
									<Tooltip title="Edit">
										<IconButton size="small">
											<EditOutlinedIcon fontSize="small" />
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};
