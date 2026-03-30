import React from 'react';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

const DEFAULT_IMAGE = '/img/furniture/luxury_chair.jpg';

const featuredDesigners = [
	{
		id: '1',
		image: DEFAULT_IMAGE,
		name: 'Emily Nakamura',
		role: 'Furniture Architect',
		quote: 'Great furniture transforms the way you live — every curve and grain should serve a purpose.',
		designs: 47,
		awards: 12,
	},
	{
		id: '2',
		image: DEFAULT_IMAGE,
		name: 'Marcus Johansson',
		role: 'Industrial Designer',
		quote: 'I find beauty in the intersection of raw materials and geometric precision.',
		designs: 35,
		awards: 8,
	},
	{
		id: '3',
		image: DEFAULT_IMAGE,
		name: 'Sofia Petrov',
		role: 'Interior Stylist',
		quote: 'Design is not just what it looks like — it is how it makes you feel at home.',
		designs: 62,
		awards: 15,
	},
];

const FeaturedDesigners = () => {
	const router = useRouter();

	const handleClick = (id: string) => {
		router.push(`/member/detail?memberId=${id}`);
	};

	return (
		<Stack className="featured-designers-section">
			<div className="featured-designers-header">
				<span className="featured-designers-label">Spotlight</span>
				<h2 className="featured-designers-title">Featured Designers</h2>
				<p className="featured-designers-desc">
					Exceptional talent handpicked for their innovation, craftsmanship, and design philosophy
				</p>
			</div>
			<div className="featured-designers-grid">
				{featuredDesigners.map((designer) => (
					<div
						key={designer.id}
						className="featured-designer-card"
						onClick={() => handleClick(designer.id)}
					>
						<div className="featured-card-image">
							<img src={designer.image} alt={designer.name} />
							<div className="featured-card-overlay">
								<span className="featured-card-badge">Featured</span>
							</div>
						</div>
						<div className="featured-card-content">
							<div className="featured-card-top">
								<h3 className="featured-card-name">{designer.name}</h3>
								<span className="featured-card-role">{designer.role}</span>
							</div>
							<p className="featured-card-quote">"{designer.quote}"</p>
							<div className="featured-card-stats">
								<div className="featured-stat">
									<span className="featured-stat-value">{designer.designs}</span>
									<span className="featured-stat-label">Designs</span>
								</div>
								<div className="featured-stat-divider" />
								<div className="featured-stat">
									<span className="featured-stat-value">{designer.awards}</span>
									<span className="featured-stat-label">Awards</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</Stack>
	);
};

export default FeaturedDesigners;
