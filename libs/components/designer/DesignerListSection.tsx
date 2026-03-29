import React, { useState } from 'react';
import { Stack, Pagination } from '@mui/material';
import DesignerCard from '../common/DesignerCard';

const DEFAULT_IMAGE = '/img/furniture/luxury_chair.jpg';

const designersData = [
	{
		id: '1',
		image: DEFAULT_IMAGE,
		name: 'Emily Nakamura',
		role: 'Furniture Architect',
		designs: 47,
		followers: 1240,
	},
	{
		id: '2',
		image: DEFAULT_IMAGE,
		name: 'Marcus Johansson',
		role: 'Industrial Designer',
		designs: 35,
		followers: 890,
	},
	{
		id: '3',
		image: DEFAULT_IMAGE,
		name: 'Sofia Petrov',
		role: 'Interior Stylist',
		designs: 62,
		followers: 2100,
	},
	{
		id: '4',
		image: DEFAULT_IMAGE,
		name: 'Liam Chen',
		role: 'Woodcraft Specialist',
		designs: 28,
		followers: 670,
	},
	{
		id: '5',
		image: DEFAULT_IMAGE,
		name: 'Amara Osei',
		role: 'Sustainable Designer',
		designs: 41,
		followers: 1580,
	},
	{
		id: '6',
		image: DEFAULT_IMAGE,
		name: 'Henrik Larsson',
		role: 'Scandinavian Minimalist',
		designs: 53,
		followers: 1920,
	},
	{
		id: '7',
		image: DEFAULT_IMAGE,
		name: 'Isla Fernandez',
		role: 'Modern Classicist',
		designs: 39,
		followers: 1050,
	},
	{
		id: '8',
		image: DEFAULT_IMAGE,
		name: 'Daniel Kim',
		role: 'Ergonomic Designer',
		designs: 31,
		followers: 740,
	},
];

const DesignerListSection = () => {
	const [currentPage, setCurrentPage] = useState(1);

	const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
	};

	return (
		<Stack className="designer-list-section">
			<div className="designer-grid">
				{designersData.map((designer) => (
					<DesignerCard
						key={designer.id}
						id={designer.id}
						image={designer.image}
						name={designer.name}
						role={designer.role}
						designs={designer.designs}
						followers={designer.followers}
					/>
				))}
			</div>
			<div className="designer-pagination">
				<Pagination
					count={5}
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

export default DesignerListSection;
