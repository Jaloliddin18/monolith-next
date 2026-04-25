import React, { useState, useMemo } from 'react';
import { Stack } from '@mui/material';
import BlogArticleCard from '../common/BlogArticleCard';
import { useQuery } from '@apollo/client';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { BoardArticle } from '../../types/board-article/board-article';
import { BoardArticlesInquiry } from '../../types/board-article/board-article.input';
import { Direction } from '../../enums/common.enum';
import { REACT_APP_API_URL } from '../../config';
import { T } from '../../types/common';

const DEFAULT_IMAGE = '/img/furniture/luxury_chair.jpg';

interface RelatedPostsSectionProps {
	articleId?: string;
}

const RelatedPostsSection = ({ articleId }: RelatedPostsSectionProps) => {
	const [articles, setArticles] = useState<BoardArticle[]>([]);

	const inquiry = useMemo<BoardArticlesInquiry>(() => ({
		page: 1,
		limit: 4,
		sort: 'createdAt',
		direction: Direction.DESC,
		search: {},
	}), []);

	useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: inquiry },
		onCompleted: (data: T) => {
			const list: BoardArticle[] = data?.getBoardArticles?.list ?? [];
			// exclude the currently viewed article
			setArticles(list.filter((a) => a._id !== articleId).slice(0, 3));
		},
	});

	return (
		<Stack className="related-posts-section">
			<div className="related-posts-header">
				<h2 className="section-title">Related Posts</h2>
				<div className="related-posts-arrows">
					<button className="arrow-btn" type="button">
						<img src="/icons/ArrowRight.svg" alt="Previous" width={24} height={24} style={{ transform: 'rotate(180deg)' }} />
					</button>
					<button className="arrow-btn" type="button">
						<img src="/icons/ArrowRight.svg" alt="Next" width={24} height={24} />
					</button>
				</div>
			</div>
			<div className="related-posts-grid">
				{articles.map((article) => (
					<BlogArticleCard
						key={article._id}
						id={article._id}
						image={article.articleImage ? `${REACT_APP_API_URL}/${article.articleImage}` : DEFAULT_IMAGE}
						category={article.articleCategory}
						date={new Date(article.createdAt).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
						title={article.articleTitle}
					/>
				))}
			</div>
		</Stack>
	);
};

export default RelatedPostsSection;
