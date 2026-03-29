import React from 'react';
import { Stack } from '@mui/material';
import BlogArticleCard from '../common/BlogArticleCard';

const DEFAULT_IMAGE = '/img/furniture/luxury_chair.jpg';

const trendingArticles = [
	{
		id: '101',
		image: DEFAULT_IMAGE,
		category: 'Space Planning',
		date: 'July 25, 2023',
		title: 'Rustic Retreats: Embracing the Charm of Wooden Furniture',
	},
	{
		id: '102',
		image: DEFAULT_IMAGE,
		category: 'Buying Guides',
		date: 'July 25, 2023',
		title: 'Wooden Furniture Makeover: Transforming Old Pieces with Style',
	},
	{
		id: '103',
		image: DEFAULT_IMAGE,
		category: 'Furniture Trends',
		date: 'July 25, 2023',
		title: 'Elevate Your Space: Styling Tips with Wooden Furniture',
	},
];

const TrendingArticlesSection = () => {
	return (
		<Stack className="trending-articles-section">
			<h2 className="section-title">Trending Furniture Ideas for Modern Living</h2>
			<div className="trending-grid">
				{trendingArticles.map((article) => (
					<BlogArticleCard
						key={article.id}
						id={article.id}
						image={article.image}
						category={article.category}
						date={article.date}
						title={article.title}
					/>
				))}
			</div>
		</Stack>
	);
};

export default TrendingArticlesSection;
