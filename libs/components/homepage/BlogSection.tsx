import React from 'react';
import Link from 'next/link';
import { Box, Stack, Typography } from '@mui/material';

const blogs = [
	{
		category: 'Outdoor',
		date: 'Jun 27, 2023',
		title: 'Maximizing Small Spaces: Smart Furniture Ideas for Compact Living',
		image: '/img/furniture/blog-1.png',
	},
	{
		category: 'Masters of Wood',
		date: 'Jun 27, 2023',
		title: 'Innovation in Woodworking: Discover the Cutting-Edge',
		image: '/img/furniture/blog-2.png',
	},
	{
		category: 'Workshop to Home',
		date: 'Jun 27, 2023',
		title: 'Masters of Wood: Meet the Visionary Carpenters Transforming',
		image: '/img/furniture/blog-3.png',
	},
	{
		category: 'Armchair',
		date: 'Jun 27, 2023',
		title: 'Outdoor Oasis: Designing Stylish and Functional Outdoor Furniture Settings',
		image: '/img/furniture/blog-4.png',
	},
];

const BlogSection = () => {
	return (
		<Stack className="blog-section">
			<Typography className="section-title" variant="h2" textAlign="center" mb={4}>
				Our Latest Blog
			</Typography>

			<Stack direction="row" className="blog-grid" gap={3}>
				{blogs.map((blog, index) => (
					<Box key={index} className="blog-card">
						<Box className="blog-card-img">
							<img src={blog.image} alt={blog.title} />
						</Box>
						<Box className="blog-card-content">
							<Stack direction="row" gap={2} mb={1}>
								<Typography variant="caption" className="blog-category">
									{blog.category}
								</Typography>
								<Typography variant="caption" color="text.secondary">
									{blog.date}
								</Typography>
							</Stack>
							<Link href="/community">
								<Typography variant="body1" fontWeight={500} className="blog-title">
									{blog.title}
								</Typography>
							</Link>
						</Box>
					</Box>
				))}
			</Stack>
		</Stack>
	);
};

export default BlogSection;
