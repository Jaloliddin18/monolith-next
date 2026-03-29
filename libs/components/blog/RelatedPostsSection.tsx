import React from 'react';
import { Stack } from '@mui/material';
import BlogArticleCard from '../common/BlogArticleCard';

const DEFAULT_IMAGE = '/img/furniture/luxury_chair.jpg';

const relatedPosts = [
	{
		id: '201',
		image: DEFAULT_IMAGE,
		category: 'Space Planning',
		date: 'July 25, 2023',
		title: 'Rustic Retreats: Embracing the Charm of Wooden Furniture',
	},
	{
		id: '202',
		image: DEFAULT_IMAGE,
		category: 'Buying Guides',
		date: 'July 25, 2023',
		title: 'Wooden Furniture Makeover: Transforming Old Pieces with Style',
	},
	{
		id: '203',
		image: DEFAULT_IMAGE,
		category: 'Furniture Trends',
		date: 'July 25, 2023',
		title: 'Elevate Your Space: Styling Tips with Wooden Furniture',
	},
];

const RelatedPostsSection = () => {
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
				{relatedPosts.map((post) => (
					<BlogArticleCard
						key={post.id}
						id={post.id}
						image={post.image}
						category={post.category}
						date={post.date}
						title={post.title}
					/>
				))}
			</div>
		</Stack>
	);
};

export default RelatedPostsSection;
