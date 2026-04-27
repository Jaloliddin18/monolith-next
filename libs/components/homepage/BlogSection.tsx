import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Stack, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { BoardArticle } from '../../types/board-article/board-article';
import { BoardArticlesInquiry } from '../../types/board-article/board-article.input';
import { Direction } from '../../enums/common.enum';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const BlogSection = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [searchFilter] = useState<BoardArticlesInquiry>({
		page: 1,
		limit: 4,
		sort: 'createdAt',
		direction: Direction.DESC,
		search: {},
	});

	const [latestBlogs, setLatestBlogs] = useState<BoardArticle[]>([]);

	useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: searchFilter },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: any) => {
			setLatestBlogs(data?.getBoardArticles?.list ?? []);
		},
	});

	const formatDate = (date: Date) =>
		new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

	const getImage = (article: BoardArticle) =>
		article.articleImage
			? `${process.env.REACT_APP_API_URL}/${article.articleImage}`
			: '/img/furniture/luxury_chair.jpg';

	if (device === 'mobile') {
		const mobileArticles = latestBlogs.slice(0, 2);
		return (
			<Stack className="blog-mobile">
				<Typography className="section-title-mobile">Latest Blog</Typography>
				<Stack className="blog-cards-mobile">
					{mobileArticles.map((article) => (
						<Box
							key={article._id}
							className="blog-card-mobile"
							onClick={() => router.push(`/community/detail?articleId=${article._id}`)}
						>
							<Box className="blog-card-img-mobile">
								<img src={getImage(article)} alt={article.articleTitle} />
							</Box>
							<Stack className="blog-card-content-mobile">
								<Stack className="blog-meta-mobile">
									<Typography className="blog-category-mobile">{article.articleCategory}</Typography>
									<Typography className="blog-date-mobile">{formatDate(article.createdAt)}</Typography>
								</Stack>
								<Typography className="blog-title-mobile">{article.articleTitle}</Typography>
							</Stack>
						</Box>
					))}
				</Stack>
			</Stack>
		);
	}

	return (
		<Stack className="blog-section" alignItems="center" gap="50px">
			<Typography className="section-title-text">Our Latest Blog</Typography>
			<Stack direction="row" flexWrap="wrap" gap="24px" sx={{ width: 1140 }}>
				{latestBlogs.map((article) => (
					<Box
						key={article._id}
						className="blog-card"
						onClick={() => router.push(`/community/detail?articleId=${article._id}`)}
						style={{ cursor: 'pointer' }}
					>
						<Box className="blog-card-img">
							<img src={getImage(article)} alt={article.articleTitle} />
						</Box>
						<Stack className="blog-card-content" gap="10px">
							<Stack direction="row" gap="14px" alignItems="center">
								<Typography className="blog-category">{article.articleCategory}</Typography>
								<Typography className="blog-date">{formatDate(article.createdAt)}</Typography>
							</Stack>
							<Typography className="blog-title">{article.articleTitle}</Typography>
						</Stack>
					</Box>
				))}
			</Stack>
		</Stack>
	);
};

export default BlogSection;
