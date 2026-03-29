import React from 'react';
import { Stack } from '@mui/material';

const DEFAULT_IMAGE = '/img/furniture/luxury_chair.jpg';

const portfolioItems = [
	{
		id: '1',
		image: DEFAULT_IMAGE,
		title: 'Aurora Lounge Chair',
		category: 'Seating',
		year: '2024',
	},
	{
		id: '2',
		image: DEFAULT_IMAGE,
		title: 'Zen Coffee Table',
		category: 'Tables',
		year: '2024',
	},
	{
		id: '3',
		image: DEFAULT_IMAGE,
		title: 'Harmony Bookshelf',
		category: 'Storage',
		year: '2023',
	},
	{
		id: '4',
		image: DEFAULT_IMAGE,
		title: 'Sakura Dining Set',
		category: 'Dining',
		year: '2023',
	},
	{
		id: '5',
		image: DEFAULT_IMAGE,
		title: 'Nordic Bedframe',
		category: 'Bedroom',
		year: '2023',
	},
	{
		id: '6',
		image: DEFAULT_IMAGE,
		title: 'Whisper Side Table',
		category: 'Tables',
		year: '2022',
	},
];

const DesignerPortfolio = () => {
	return (
		<Stack className="designer-portfolio-section">
			<div className="designer-portfolio-header">
				<h2 className="designer-section-title">Portfolio</h2>
				<p className="designer-portfolio-subtitle">
					A curated selection of Emily's most celebrated furniture designs
				</p>
			</div>
			<div className="designer-portfolio-grid">
				{portfolioItems.map((item) => (
					<div key={item.id} className="portfolio-item">
						<div className="portfolio-item-image">
							<img src={item.image} alt={item.title} />
							<div className="portfolio-item-overlay">
								<span className="portfolio-item-category">{item.category}</span>
							</div>
						</div>
						<div className="portfolio-item-info">
							<h4 className="portfolio-item-title">{item.title}</h4>
							<span className="portfolio-item-year">{item.year}</span>
						</div>
					</div>
				))}
			</div>
		</Stack>
	);
};

export default DesignerPortfolio;
