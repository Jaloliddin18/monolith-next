import React, { useState } from 'react';
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
	Typography,
	Collapse,
	Box,
	TextField,
} from '@mui/material';
import { Inquiry } from '../../../types/inquiry/inquiry';
import { InquiryStatus } from '../../../enums/inquiry.enum';
import { REACT_APP_API_URL } from '../../../config';

const headCells = [
	{ id: 'num', label: '#' },
	{ id: 'member', label: 'MEMBER' },
	{ id: 'title', label: 'TITLE' },
	{ id: 'status', label: 'STATUS' },
	{ id: 'date', label: 'DATE' },
	{ id: 'action', label: 'ACTION' },
];

const statusStyle: Record<InquiryStatus, { bg: string; color: string }> = {
	[InquiryStatus.PENDING]: { bg: '#FEF3E8', color: '#E67E22' },
	[InquiryStatus.ANSWERED]: { bg: '#EDFAF1', color: '#2E7D32' },
	[InquiryStatus.CLOSED]: { bg: '#F5F5F5', color: '#787878' },
};

interface AdminInquiryListProps {
	inquiries: Inquiry[];
	loading: boolean;
	respondHandler: (inquiryId: string, response: string) => Promise<void>;
}

export const AdminInquiryList = ({ inquiries, loading, respondHandler }: AdminInquiryListProps) => {
	const [expandedId, setExpandedId] = useState<string | null>(null);
	const [responseTexts, setResponseTexts] = useState<Record<string, string>>({});
	const [submitting, setSubmitting] = useState<string | null>(null);

	const handleRespond = async (id: string) => {
		const text = responseTexts[id]?.trim();
		if (!text) return;
		setSubmitting(id);
		await respondHandler(id, text);
		setResponseTexts((prev) => ({ ...prev, [id]: '' }));
		setExpandedId(null);
		setSubmitting(null);
	};

	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} size="medium">
					<TableHead>
						<TableRow>
							{headCells.map((h) => (
								<TableCell key={h.id} align="left">{h.label}</TableCell>
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
						) : inquiries.length === 0 ? (
							<TableRow>
								<TableCell align="center" colSpan={6}>
									<span className="no-data">No inquiries yet</span>
								</TableCell>
							</TableRow>
						) : (
							inquiries.map((inq, index) => {
								const memberImage = inq.memberData?.memberImage
									? `${REACT_APP_API_URL}/${inq.memberData.memberImage}`
									: '/general_images/default_profile.png';
								const sStyle = statusStyle[inq.inquiryStatus];
								const isExpanded = expandedId === inq._id;

								return (
									<React.Fragment key={inq._id}>
										<TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
											<TableCell sx={{ color: 'var(--color-text-muted)', fontSize: 13 }}>{index + 1}</TableCell>
											<TableCell>
												<Stack direction="row" alignItems="center" gap={1}>
													<Avatar src={memberImage} alt={inq.memberData?.memberNick} sx={{ width: 28, height: 28 }} />
													<span style={{ fontSize: 13 }}>{inq.memberData?.memberNick ?? '-'}</span>
												</Stack>
											</TableCell>
											<TableCell sx={{ fontWeight: 500, maxWidth: 280 }}>
												<Typography noWrap sx={{ fontSize: 13, maxWidth: 260 }}>{inq.inquiryTitle}</Typography>
											</TableCell>
											<TableCell>
												<span style={{ background: sStyle.bg, color: sStyle.color, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, textTransform: 'uppercase' }}>
													{inq.inquiryStatus}
												</span>
											</TableCell>
											<TableCell sx={{ color: 'var(--color-text-muted)', fontSize: 12, whiteSpace: 'nowrap' }}>
												{new Date(inq.createdAt).toLocaleDateString('en-GB')}
											</TableCell>
											<TableCell>
												{inq.inquiryStatus !== InquiryStatus.CLOSED && (
													<Button
														size="small"
														variant="outlined"
														onClick={() => setExpandedId(isExpanded ? null : inq._id)}
														sx={{
															fontSize: 11, textTransform: 'none', borderColor: '#C46A4A', color: '#C46A4A',
															'&:hover': { borderColor: '#a85a3c', background: '#FDF0EC' },
														}}
													>
														{isExpanded ? 'Collapse' : inq.inquiryStatus === InquiryStatus.PENDING ? 'Respond' : 'View'}
													</Button>
												)}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell colSpan={6} sx={{ py: 0, borderBottom: isExpanded ? undefined : 'none' }}>
												<Collapse in={isExpanded} unmountOnExit>
													<Box sx={{ p: 2, background: '#FAF8F5', borderRadius: 1, m: 1 }}>
														<Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1, color: '#1C1A17' }}>Inquiry Content:</Typography>
														<Typography sx={{ fontSize: 13, color: '#787878', mb: 2, lineHeight: 1.6 }}>{inq.inquiryContent}</Typography>

														{inq.inquiryStatus === InquiryStatus.ANSWERED && inq.inquiryResponse && (
															<Box sx={{ background: '#EDFAF1', borderRadius: 1, p: 1.5, mb: 2 }}>
																<Typography sx={{ fontSize: 12, fontWeight: 600, color: '#2E7D32', mb: 0.5 }}>Response sent:</Typography>
																<Typography sx={{ fontSize: 13, color: '#1C1A17' }}>{inq.inquiryResponse}</Typography>
															</Box>
														)}

														{inq.inquiryStatus === InquiryStatus.PENDING && (
															<Stack gap={1}>
																<TextField
																	fullWidth
																	multiline
																	rows={3}
																	size="small"
																	placeholder="Type your response..."
																	value={responseTexts[inq._id] ?? ''}
																	onChange={(e) => setResponseTexts((prev) => ({ ...prev, [inq._id]: e.target.value }))}
																	sx={{ background: '#fff', '& .MuiOutlinedInput-root': { fontSize: 13 } }}
																/>
																<Button
																	variant="contained"
																	size="small"
																	disabled={submitting === inq._id || !responseTexts[inq._id]?.trim()}
																	onClick={() => handleRespond(inq._id)}
																	sx={{ alignSelf: 'flex-start', background: '#C46A4A', '&:hover': { background: '#a85a3c' }, textTransform: 'none', fontSize: 12 }}
																>
																	{submitting === inq._id ? <CircularProgress size={14} sx={{ color: '#fff' }} /> : 'Send Response'}
																</Button>
															</Stack>
														)}
													</Box>
												</Collapse>
											</TableCell>
										</TableRow>
									</React.Fragment>
								);
							})
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};
