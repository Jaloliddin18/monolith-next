import { useState } from 'react';
import Link from 'next/link';
import { Box, Stack, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { BoardArticle } from '../../types/board-article/board-article';
import { BoardArticlesInquiry } from '../../types/board-article/board-article.input';
import { Direction } from '../../enums/common.enum';

const BlogSection = () => {
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

	return (
		<Stack className="blog-section" alignItems="center" gap="50px">
			<Typography className="section-title-text">Our Latest Blog</Typography>
			<Stack direction="row" flexWrap="wrap" gap="24px" sx={{ width: 1140 }}>
				{latestBlogs.map((article) => (
					<Box key={article._id} className="blog-card">
						<Box className="blog-card-img">
							<img src={getImage(article)} alt={article.articleTitle} />
						</Box>
						<Stack className="blog-card-content" gap="10px">
							<Stack direction="row" gap="14px" alignItems="center">
								<Typography className="blog-category">{article.articleCategory}</Typography>
								<Typography className="blog-date">{formatDate(article.createdAt)}</Typography>
							</Stack>
							<Link href={`/community/detail?id=${article._id}&articleCategory=${article.articleCategory}`}>
								<Typography className="blog-title">{article.articleTitle}</Typography>
							</Link>
						</Stack>
					</Box>
				))}
			</Stack>
		</Stack>
	);
};

export default BlogSection;
