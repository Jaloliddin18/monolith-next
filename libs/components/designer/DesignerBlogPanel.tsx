import React from 'react';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

const DEFAULT_IMAGE = '/img/furniture/luxury_chair.jpg';

const blogPosts = [
	{
		id: '1',
		image: DEFAULT_IMAGE,
		category: 'Design Tips',
		date: 'March 15, 2024',
		title: 'The Art of Blending Japanese Minimalism with Scandinavian Design',
		excerpt:
			'Discover how two seemingly different design philosophies can create harmonious living spaces that are both functional and beautiful.',
	},
	{
		id: '2',
		image: DEFAULT_IMAGE,
		category: 'Sustainability',
		date: 'February 28, 2024',
		title: 'Why Sustainable Materials Are the Future of Luxury Furniture',
		excerpt:
			'Exploring the growing movement of eco-conscious design and how certified sustainable forests are changing the furniture industry.',
	},
	{
		id: '3',
		image: DEFAULT_IMAGE,
		category: 'Behind the Scenes',
		date: 'January 20, 2024',
		title: 'From Sketch to Showroom: The Journey of the Aurora Chair',
		excerpt:
			'A behind-the-scenes look at how my most popular design went from a rough sketch to an award-winning piece of furniture.',
	},
	{
		id: '4',
		image: DEFAULT_IMAGE,
		category: 'Interior Styling',
		date: 'December 10, 2023',
		title: 'How to Style a Living Room Around a Statement Furniture Piece',
		excerpt:
			'Tips and tricks for building a cohesive room design when you start with one bold furniture piece as your anchor.',
	},
];

const DesignerBlogPanel = () => {
	const router = useRouter();

	const handleClick = (id: string) => {
		router.push(`/community/detail?articleId=${id}`);
	};

	return (
		<Stack className="designer-blog-panel">
			<div className="blog-panel-list">
				{blogPosts.map((post) => (
					<div key={post.id} className="blog-panel-item" onClick={() => handleClick(post.id)}>
						<div className="blog-panel-item-image">
							<img src={post.image} alt={post.title} />
						</div>
						<div className="blog-panel-item-content">
							<div className="blog-panel-item-meta">
								<span className="blog-panel-category">{post.category}</span>
								<span className="blog-panel-date">{post.date}</span>
							</div>
							<h3 className="blog-panel-title">{post.title}</h3>
							<p className="blog-panel-excerpt">{post.excerpt}</p>
							<span className="blog-panel-read-more">Read Article →</span>
						</div>
					</div>
				))}
			</div>
		</Stack>
	);
};

export default DesignerBlogPanel;
