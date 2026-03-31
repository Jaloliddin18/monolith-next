import React from 'react';
import Link from 'next/link';
import { Box, Stack, Typography } from '@mui/material';

const blogs = [
	{
		category: 'Outdoor',
		date: 'Jun 27, 2023',
		title: 'Maximizing Small Spaces: Smart Furniture Ideas for Compact Living',
		image: '/img/furniture/luxury_chair.jpg',
	},
	{
		category: 'Masters of Wood',
		date: 'Jun 27, 2023',
		title: 'Innovation in Woodworking: Discover the Cutting-Edge',
		image: '/img/furniture/luxury_chair.jpg',
	},
	{
		category: 'Workshop to Home',
		date: 'Jun 27, 2023',
		title: 'Masters of Wood: Meet the Visionary Carpenters Transforming ',
		image: '/img/furniture/luxury_chair.jpg',
	},
	{
		category: 'Armchair',
		date: 'Jun 27, 2023',
		title: 'Outdoor Oasis: Designing Stylish and Functional Outdoor Furniture Settings',
		image: '/img/furniture/luxury_chair.jpg',
	},
];

const BlogSection = () => {
	return (
		<Stack className="blog-section" alignItems="center" gap="50px">
			<Typography className="section-title-text">Our Latest Blog</Typography>
			<Stack direction="row" flexWrap="wrap" gap="24px" sx={{ width: 1140 }}>
				{blogs.map((blog, index) => (
					<Box key={index} className="blog-card">
						<Box className="blog-card-img">
							<img src={blog.image} alt={blog.title} />
						</Box>
						<Stack className="blog-card-content" gap="10px">
							<Stack direction="row" gap="14px" alignItems="center">
								<Typography className="blog-category">{blog.category}</Typography>
								<Typography className="blog-date">{blog.date}</Typography>
							</Stack>
							<Link href="/community">
								<Typography className="blog-title">{blog.title}</Typography>
							</Link>
						</Stack>
					</Box>
				))}
			</Stack>
		</Stack>
	);
};

export default BlogSection;
