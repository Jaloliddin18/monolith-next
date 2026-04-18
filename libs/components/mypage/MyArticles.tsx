import React, { useState } from 'react';
import { Stack, Pagination, Tabs, Tab, Box, IconButton } from '@mui/material';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { UPDATE_BOARD_ARTICLE } from '../../../apollo/user/mutation';
import { BoardArticle } from '../../types/board-article/board-article';
import { BoardArticlesInquiry } from '../../types/board-article/board-article.input';
import { BoardArticleStatus, BoardArticleCategory } from '../../enums/board-article.enum';
import { Direction } from '../../enums/common.enum';
import { T } from '../../types/common';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import { sweetConfirmAlert, sweetMixinErrorAlert } from '../../sweetAlert';
import { REACT_APP_API_URL } from '../../config';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';

const LIMIT = 5;

const CATEGORY_TABS: { label: string; value: BoardArticleCategory | 'ALL' }[] = [
	{ label: 'All', value: 'ALL' },
	{ label: 'Free', value: BoardArticleCategory.FREE },
	{ label: 'Recommend', value: BoardArticleCategory.RECOMMEND },
	{ label: 'News', value: BoardArticleCategory.NEWS },
	{ label: 'Humor', value: BoardArticleCategory.HUMOR },
];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
	[BoardArticleStatus.ACTIVE]: { bg: '#E5F0FD', color: '#3554d1' },
};

const STATUS_LABELS: Record<string, string> = {
	[BoardArticleStatus.ACTIVE]: 'Active',
};

const CATEGORY_LABELS: Record<string, string> = {
	[BoardArticleCategory.FREE]: 'Free',
	[BoardArticleCategory.RECOMMEND]: 'Recommend',
	[BoardArticleCategory.NEWS]: 'News',
	[BoardArticleCategory.HUMOR]: 'Humor',
};

const formatDate = (date: Date | string) =>
	new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

const COL_LISTING = { flex: '2 1 0', minWidth: 0, display: 'flex', alignItems: 'center' };
const COL_DATE = { flex: '0 0 160px', display: 'flex', alignItems: 'center' };
const COL_STATUS = { flex: '0 0 150px', display: 'flex', alignItems: 'center' };
const COL_VIEWS = { flex: '0 0 80px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const COL_ACTION = { flex: '0 0 100px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' };

const MyArticles = () => {
	const user = useReactiveVar(userVar);
	const router = useRouter();
	const [articles, setArticles] = useState<BoardArticle[]>([]);
	const [total, setTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [activeCategory, setActiveCategory] = useState<BoardArticleCategory | 'ALL'>('ALL');

	const inquiry: BoardArticlesInquiry = {
		page: currentPage,
		limit: LIMIT,
		sort: 'createdAt',
		direction: Direction.DESC,
		search: {
			memberId: user?._id,
			...(activeCategory !== 'ALL' ? { articleCategory: activeCategory } : {}),
		},
	};

	const { refetch } = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: inquiry },
		skip: !user?._id,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setArticles(data?.getBoardArticles?.list ?? []);
			setTotal(data?.getBoardArticles?.metaCounter?.[0]?.total ?? 0);
		},
	});

	const [updateBoardArticle] = useMutation(UPDATE_BOARD_ARTICLE);

	const handleTabChange = (category: BoardArticleCategory | 'ALL') => {
		setActiveCategory(category);
		setCurrentPage(1);
		refetch({
			input: {
				...inquiry,
				page: 1,
				search: {
					memberId: user?._id,
					...(category !== 'ALL' ? { articleCategory: category } : {}),
				},
			},
		});
	};

	const handleEdit = (id: string) => {
		router.push({ pathname: '/mypage/write-article', query: { articleId: id } });
	};

	const handleDelete = async (id: string) => {
		try {
			if (await sweetConfirmAlert('Are you sure you want to delete this article?')) {
				await updateBoardArticle({ variables: { input: { _id: id, articleStatus: BoardArticleStatus.DELETE } } });
				await refetch({ input: inquiry });
			}
		} catch (err: any) {
			await sweetMixinErrorAlert(err?.message ?? 'Something went wrong');
		}
	};

	return (
		<Stack sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
			{/* Header */}
			<Box sx={{ pb: '20px', borderBottom: '1px solid #e8e8e8' }}>
				<Box component="h2" sx={{ fontFamily: 'var(--font-ui)', fontSize: '24px', fontWeight: 600, color: '#1a1a1a', m: 0, mb: '6px' }}>
					My Articles
				</Box>
				<Box component="p" sx={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#999', m: 0 }}>
					Manage your community articles
				</Box>
			</Box>

			{/* Tabs */}
			<Tabs
				value={activeCategory}
				onChange={(_e, val) => handleTabChange(val)}
				variant="scrollable"
				scrollButtons="auto"
				sx={{
					borderBottom: '1px solid #e8e8e8',
					minHeight: 40,
					mt: '-16px',
					'& .MuiTab-root': {
						fontFamily: 'var(--font-ui)',
						fontSize: '13px',
						fontWeight: 400,
						color: '#999',
						textTransform: 'none',
						minHeight: 40,
						padding: '8px 16px',
					},
					'& .Mui-selected': { color: 'var(--color-primary) !important', fontWeight: 500 },
					'& .MuiTabs-indicator': { backgroundColor: 'var(--color-primary)' },
				}}
			>
				{CATEGORY_TABS.map((tab) => (
					<Tab key={tab.value} label={tab.label} value={tab.value} disableRipple />
				))}
			</Tabs>

			{articles.length > 0 ? (
				<>
					{/* Table container */}
					<Box sx={{ border: '1px solid #e8e8e8', borderRadius: '12px', overflow: 'hidden', bgcolor: '#fff' }}>
						{/* Header row */}
						<Box sx={{ display: 'flex', alignItems: 'center', px: '28px', py: '18px', bgcolor: '#f7f7f7', borderBottom: '1px solid #efefef' }}>
							<Box sx={COL_LISTING}>
								<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
									Listing title
								</Box>
							</Box>
							<Box sx={COL_DATE}>
								<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
									Date Published
								</Box>
							</Box>
							<Box sx={COL_STATUS}>
								<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
									Status
								</Box>
							</Box>
							<Box sx={COL_VIEWS}>
								<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
									View
								</Box>
							</Box>
							<Box sx={COL_ACTION}>
								<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
									Action
								</Box>
							</Box>
						</Box>

						{/* Data rows */}
						{articles.map((item: BoardArticle, idx: number) => {
							const statusStyle = STATUS_COLORS[item.articleStatus] ?? { bg: '#F5F5F5', color: '#757575' };
							const thumb = item.articleImage
								? `${REACT_APP_API_URL}/${item.articleImage}`
								: '/img/furniture/luxury_chair.jpg';

							return (
								<Box
									key={item._id}
									sx={{
										display: 'flex',
										alignItems: 'center',
										px: '28px',
										py: '28px',
										borderBottom: idx < articles.length - 1 ? '1px solid #f0f0f0' : 'none',
									}}
								>
									{/* Thumbnail + info */}
									<Box sx={COL_LISTING}>
										<Box
											component="img"
											src={thumb}
											alt={item.articleTitle}
											sx={{ width: 140, height: 100, objectFit: 'cover', borderRadius: '6px', flexShrink: 0, mr: '20px' }}
										/>
										<Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: 0 }}>
											<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '15px', fontWeight: 700, color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
												{item.articleTitle}
											</Box>
											<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#aaa', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
												{CATEGORY_LABELS[item.articleCategory] ?? item.articleCategory}
											</Box>
											<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#777', display: 'flex', alignItems: 'center', gap: '8px', mt: '4px' }}>
												<span>{item.articleLikes} likes</span>
												<span>·</span>
												<span>{item.articleComments} comments</span>
											</Box>
										</Box>
									</Box>

									{/* Date */}
									<Box sx={COL_DATE}>
										<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#555' }}>
											{formatDate(item.createdAt)}
										</Box>
									</Box>

									{/* Status pill */}
									<Box sx={COL_STATUS}>
										<Box
											component="span"
											sx={{
												display: 'inline-flex',
												alignItems: 'center',
												justifyContent: 'center',
												px: '18px',
												py: '6px',
												borderRadius: '40px',
												bgcolor: statusStyle.bg,
												color: statusStyle.color,
												fontFamily: 'var(--font-ui)',
												fontSize: '12px',
												fontWeight: 500,
												whiteSpace: 'nowrap',
											}}
										>
											{STATUS_LABELS[item.articleStatus] ?? item.articleStatus}
										</Box>
									</Box>

									{/* Views */}
									<Box sx={COL_VIEWS}>
										<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: '#1a1a1a' }}>
											{item.articleViews.toLocaleString()}
										</Box>
									</Box>

									{/* Actions */}
									<Box sx={COL_ACTION}>
										<IconButton onClick={() => handleEdit(item._id)} size="small" sx={{ p: '6px' }}>
											<ModeIcon sx={{ fontSize: 20, color: '#111' }} />
										</IconButton>
										<IconButton onClick={() => handleDelete(item._id)} size="small" sx={{ p: '6px' }}>
											<DeleteIcon sx={{ fontSize: 20, color: '#111' }} />
										</IconButton>
									</Box>
								</Box>
							);
						})}
					</Box>

					{/* Pagination */}
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', pt: '8px' }}>
						<Pagination
							count={Math.ceil(total / LIMIT)}
							page={currentPage}
							onChange={(_e, page) => setCurrentPage(page)}
							shape="circular"
							color="primary"
						/>
						<Box component="p" sx={{ fontFamily: 'var(--font-ui)', fontSize: '12px', color: '#aaa', m: 0 }}>
							Total {total} article(s) available
						</Box>
					</Box>
				</>
			) : (
				<Box component="p" sx={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: '#aaa', textAlign: 'center', py: '60px', m: 0 }}>
					No articles found.
				</Box>
			)}
		</Stack>
	);
};

export default MyArticles;
