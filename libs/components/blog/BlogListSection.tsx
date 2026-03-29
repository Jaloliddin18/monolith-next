import React, { useState } from 'react';
import { Stack, Pagination } from '@mui/material';
import BlogCard from '../common/BlogCard';

const DEFAULT_IMAGE = '/img/furniture/luxury_chair.jpg';

const blogData = [
	{
		id: '1',
		image: DEFAULT_IMAGE,
		category: 'Style Guides',
		date: 'January 5, 2023',
		title: 'Exploring different furniture styles and their characteristics.',
	},
	{
		id: '2',
		image: DEFAULT_IMAGE,
		category: 'Furniture Trends',
		date: 'July 9, 2023',
		title: 'Showcasing the latest trends in furniture design and decor.',
	},
	{
		id: '3',
		image: DEFAULT_IMAGE,
		category: 'Furniture Care',
		date: 'February 14, 2023',
		title: 'Tips and advice on how to care for and maintain different types of furniture.',
	},
	{
		id: '4',
		image: DEFAULT_IMAGE,
		category: 'Upcycling',
		date: 'July 19, 2023',
		title: 'Techniques and inspiration for restoring and upcycling old furniture pieces.',
	},
	{
		id: '5',
		image: DEFAULT_IMAGE,
		category: 'Buying Guides',
		date: 'March 21, 2023',
		title: 'Helping readers make informed decisions when purchasing furniture.',
	},
	{
		id: '6',
		image: DEFAULT_IMAGE,
		category: 'Space Planning',
		date: 'August 28, 2023',
		title: 'Tips for optimizing furniture placement and arrangement in different living spaces.',
	},
	{
		id: '7',
		image: DEFAULT_IMAGE,
		category: 'Furniture DIY Projects',
		date: 'April 8, 2023',
		title: 'Step-by-step guides and ideas for DIY furniture projects.',
	},
	{
		id: '8',
		image: DEFAULT_IMAGE,
		category: 'Materials and Finishes',
		date: 'September 12, 2023',
		title: 'Exploring the various materials and finishes used in furniture construction.',
	},
];

const BlogListSection = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = 10;

	const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
	};

	return (
		<Stack className="blog-list-section">
			<h2 className="section-title">Styling Tips with Wooden Furniture</h2>
			<div className="blog-grid">
				{blogData.map((blog) => (
					<BlogCard
						key={blog.id}
						id={blog.id}
						image={blog.image}
						category={blog.category}
						date={blog.date}
						title={blog.title}
					/>
				))}
			</div>
			<div className="blog-pagination">
				<Pagination
					count={totalPages}
					page={currentPage}
					onChange={handlePageChange}
					shape="rounded"
					siblingCount={1}
					boundaryCount={1}
				/>
			</div>
		</Stack>
	);
};

export default BlogListSection;
