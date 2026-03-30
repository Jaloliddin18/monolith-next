import React from 'react';
import { Stack } from '@mui/material';
import DesignerAbout from './DesignerAbout';

const DEFAULT_IMAGE = '/img/furniture/luxury_chair.jpg';

const designsData = [
	{
		id: '1',
		image: DEFAULT_IMAGE,
		title: 'Aurora Lounge Chair',
		category: 'Seating',
		price: '$2,450',
		year: '2024',
	},
	{
		id: '2',
		image: DEFAULT_IMAGE,
		title: 'Zen Coffee Table',
		category: 'Tables',
		price: '$1,890',
		year: '2024',
	},
	{
		id: '3',
		image: DEFAULT_IMAGE,
		title: 'Harmony Bookshelf',
		category: 'Storage',
		price: '$3,200',
		year: '2023',
	},
	{
		id: '4',
		image: DEFAULT_IMAGE,
		title: 'Sakura Dining Set',
		category: 'Dining',
		price: '$5,600',
		year: '2023',
	},
	{
		id: '5',
		image: DEFAULT_IMAGE,
		title: 'Nordic Bedframe',
		category: 'Bedroom',
		price: '$2,100',
		year: '2023',
	},
	{
		id: '6',
		image: DEFAULT_IMAGE,
		title: 'Whisper Side Table',
		category: 'Tables',
		price: '$980',
		year: '2022',
	},
];

const DesignerDesignsPanel = () => {
	return (
		<Stack className="designer-designs-panel">
			<DesignerAbout />
			<div className="designs-panel-header">
				<h2 className="designs-panel-title">Furniture Collection</h2>
				<p className="designs-panel-subtitle">
					A curated selection of Emily's most celebrated furniture designs
				</p>
			</div>
			<div className="designs-panel-grid">
				{designsData.map((item) => (
					<div key={item.id} className="design-item-card">
						<div className="design-item-image">
							<img src={item.image} alt={item.title} />
							<div className="design-item-overlay">
								<span className="design-item-category">{item.category}</span>
							</div>
						</div>
						<div className="design-item-info">
							<div className="design-item-top">
								<h4 className="design-item-title">{item.title}</h4>
								<span className="design-item-year">{item.year}</span>
							</div>
							<span className="design-item-price">{item.price}</span>
						</div>
					</div>
				))}
			</div>
		</Stack>
	);
};

export default DesignerDesignsPanel;
