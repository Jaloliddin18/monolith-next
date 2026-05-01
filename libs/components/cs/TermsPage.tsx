import { useState } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useQuery } from '@apollo/client';
import { GET_NOTICES } from '../../../apollo/user/query';
import { Direction } from '../../enums/common.enum';
import { NoticeCategory, NoticeStatus } from '../../enums/notice.enum';
import { T } from '../../types/common';
import { Notice } from '../../types/notice/notice';

const TermsPage = () => {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [sections, setSections] = useState<Notice[]>([]);

	const { loading } = useQuery(GET_NOTICES, {
		fetchPolicy: 'cache-and-network',
		variables: {
			input: {
				page: 1,
				limit: 50,
				sort: 'createdAt',
				direction: Direction.ASC,
				search: {
					noticeStatus: NoticeStatus.ACTIVE,
					noticeCategory: NoticeCategory.TERMS,
				},
			},
		},
		onCompleted: (data: T) => {
			const list = data?.getNotices?.list ?? [];
			setSections(list);
			setActiveIndex(0);
		},
		onError: () => {},
	});

	const active = sections[activeIndex];

	return (
		<Stack className="terms-page">
			<Stack className="terms-content">
				<Stack className="terms-header" direction="row" alignItems="flex-start" justifyContent="space-between">
					<Box>
						<Typography className="terms-title" variant="h2">
							Terms and Conditions
						</Typography>
						<Typography className="terms-date">Updated April 01, 2023</Typography>
					</Box>
					<Stack className="need-help" direction="row" alignItems="center">
						<InfoOutlinedIcon className="help-icon" />
						<Typography className="help-text">Need help?</Typography>
					</Stack>
				</Stack>

				{loading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
						<CircularProgress size={32} sx={{ color: '#C46A4A' }} />
					</Box>
				) : sections.length === 0 ? (
					<Typography sx={{ fontFamily: 'var(--font-ui)', fontSize: 15, color: '#787878', py: 4 }}>
						No terms content available at this time.
					</Typography>
				) : (
					<Stack className="terms-body" direction="row">
						<Box className="terms-sidebar">
							<ol className="sidebar-list">
								{sections.map((section, index) => (
									<li
										key={section._id}
										className={`sidebar-item ${activeIndex === index ? 'active' : ''}`}
										onClick={() => setActiveIndex(index)}
									>
										{section.noticeTitle}
									</li>
								))}
							</ol>
						</Box>

						{active && (
							<Box className="terms-detail">
								<Typography className="detail-title">
									{activeIndex + 1}. {active.noticeTitle}
								</Typography>
								<Typography className="detail-paragraph">
									{active.noticeContent}
								</Typography>
							</Box>
						)}
					</Stack>
				)}
			</Stack>
		</Stack>
	);
};

export default TermsPage;
