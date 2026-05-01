import React, { useState } from 'react';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_NOTICES } from '../../../apollo/user/query';
import { Direction } from '../../enums/common.enum';
import { NoticeCategory, NoticeStatus } from '../../enums/notice.enum';
import { T } from '../../types/common';
import { Notice } from '../../types/notice/notice';

const FaqPage = () => {
	const router = useRouter();
	const [openFaq, setOpenFaq] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [faqs, setFaqs] = useState<Notice[]>([]);

	const { loading } = useQuery(GET_NOTICES, {
		fetchPolicy: 'cache-and-network',
		variables: {
			input: {
				page: 1,
				limit: 50,
				sort: 'createdAt',
				direction: Direction.DESC,
				search: {
					noticeStatus: NoticeStatus.ACTIVE,
					noticeCategory: NoticeCategory.FAQ,
				},
			},
		},
		onCompleted: (data: T) => setFaqs(data?.getNotices?.list ?? []),
		onError: () => {},
	});

	const filtered = searchQuery.trim()
		? faqs.filter(
				(f) =>
					f.noticeTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
					f.noticeContent.toLowerCase().includes(searchQuery.toLowerCase()),
		  )
		: faqs;

	return (
		<Stack className="faq-page">
			<Box className="cs-hero">
				<Typography className="cs-hero-title">How can we help you?</Typography>
				<Typography className="cs-hero-subtitle">Find answers, submit questions, or browse our notices</Typography>
				<Box className="cs-hero-search">
					<SearchIcon className="cs-search-icon" />
					<input
						type="text"
						placeholder="Search FAQs and announcements..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</Box>
			</Box>

			<Stack className="faq-content" alignItems="center">
				<Typography className="faq-title" variant="h2">
					Frequently asked questions
				</Typography>

				{loading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
						<CircularProgress size={32} sx={{ color: '#C46A4A' }} />
					</Box>
				) : filtered.length === 0 ? (
					<Box className="faq-list">
						<Typography sx={{ fontFamily: 'var(--font-ui)', fontSize: 15, color: '#787878', py: 4, textAlign: 'center' }}>
							{searchQuery ? `No results for "${searchQuery}"` : 'No FAQs available at this time.'}
						</Typography>
					</Box>
				) : (
					<Box className="faq-list">
						{filtered.map((faq) => (
							<Box key={faq._id} className={`faq-item ${openFaq === faq._id ? 'active' : ''}`}>
								<Stack
									className="faq-question"
									direction="row"
									alignItems="center"
									justifyContent="space-between"
									onClick={() => setOpenFaq(openFaq === faq._id ? null : faq._id)}
								>
									<Typography className="faq-q-text">{faq.noticeTitle}</Typography>
									{openFaq === faq._id ? (
										<KeyboardArrowUpIcon className="faq-icon" />
									) : (
										<KeyboardArrowDownIcon className="faq-icon" />
									)}
								</Stack>
								{openFaq === faq._id && (
									<Typography className="faq-answer">{faq.noticeContent}</Typography>
								)}
							</Box>
						))}
					</Box>
				)}
			</Stack>

			<Box className="cs-contact-prompt">
				<Typography className="cs-contact-prompt-title">Didn&apos;t find what you were looking for?</Typography>
				<Typography className="cs-contact-prompt-sub">
					Submit a question and our team will get back to you within 24 hours.
				</Typography>
				<Stack direction="row" gap="12px" justifyContent="center">
					<Button className="cs-contact-btn primary" onClick={() => router.push('/cs/contact')}>
						Submit a Question
					</Button>
					<Button className="cs-contact-btn secondary" onClick={() => router.push('/cs')}>
						Browse Announcements
					</Button>
				</Stack>
			</Box>
		</Stack>
	);
};

export default FaqPage;
