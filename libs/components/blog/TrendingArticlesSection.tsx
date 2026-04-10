import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import BlogArticleCard from '../common/BlogArticleCard';
import { useQuery } from '@apollo/client';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { BoardArticle } from '../../types/board-article/board-article';
import { BoardArticlesInquiry } from '../../types/board-article/board-article.input';
import { Direction } from '../../enums/common.enum';
import { REACT_APP_API_URL } from '../../config';
import { T } from '../../types/common';

const DEFAULT_IMAGE = '/img/furniture/luxury_chair.jpg';

const inquiry: BoardArticlesInquiry = {
	page: 1,
	limit: 3,
	sort: 'articleLikes',
	direction: Direction.DESC,
	search: {},
};

const TrendingArticlesSection = () => {
	const { t } = useTranslation('common');
	const [articles, setArticles] = useState<BoardArticle[]>([]);
	const [loading, setLoading] = useState(true);

	useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: inquiry },
		onCompleted: (data: T) => {
			setArticles(data?.getBoardArticles?.list ?? []);
			setLoading(false);
		},
	});

	return (
		<Stack className="trending-articles-section">
			<h2 className="section-title">{t('trendingTitle')}</h2>
			<div className="trending-grid">
				{loading
					? [1, 2, 3].map((i) => <div key={i} className="blog-article-skeleton" />)
					: articles.map((article) => (
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

export default TrendingArticlesSection;
