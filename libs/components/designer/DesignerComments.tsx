import React from 'react';
import { Stack } from '@mui/material';

const DEFAULT_IMAGE = '/general_images/hello_guy.jpg';

const testimonials = [
	{
		id: '1',
		image: DEFAULT_IMAGE,
		name: 'James Mitchell',
		role: 'Homeowner',
		rating: 5,
		text: "Emily designed a custom dining table for our family, and it has become the heart of our home. The attention to detail and the quality of craftsmanship is unmatched. Every guest asks about it!",
		date: 'March 15, 2024',
	},
	{
		id: '2',
		image: DEFAULT_IMAGE,
		name: 'Sarah Kim',
		role: 'Interior Designer',
		rating: 5,
		text: "I've collaborated with Emily on multiple projects and her ability to translate a client's vision into tangible, beautiful furniture is remarkable. She's my go-to recommendation for bespoke pieces.",
		date: 'February 8, 2024',
	},
	{
		id: '3',
		image: DEFAULT_IMAGE,
		name: 'David Chen',
		role: 'Restaurant Owner',
		rating: 4,
		text: "Emily furnished our entire restaurant with custom pieces that perfectly match our aesthetic. The durability of her work is incredible — after two years of heavy commercial use, everything still looks brand new.",
		date: 'January 22, 2024',
	},
];

const renderStars = (rating: number) => {
	return Array.from({ length: 5 }, (_, i) => (
		<span key={i} className={`review-star ${i < rating ? 'filled' : 'empty'}`}>
			&#9733;
		</span>
	));
};

const DesignerComments = () => {
	return (
		<Stack className="designer-comments-section">
			<div className="designer-comments-header">
				<h2 className="designer-section-title">Client Reviews</h2>
				<div className="designer-comments-summary">
					<div className="review-stars-row">{renderStars(5)}</div>
					<span className="review-average">4.8 out of 5</span>
					<span className="review-count">Based on 124 reviews</span>
				</div>
			</div>
			<div className="designer-comments-list">
				{testimonials.map((review) => (
					<div key={review.id} className="designer-review-item">
						<div className="designer-review-author">
							<div className="review-author-avatar">
								<img src={review.image} alt={review.name} />
							</div>
							<div className="review-author-info">
								<h4 className="review-author-name">{review.name}</h4>
								<span className="review-author-role">{review.role}</span>
							</div>
						</div>
						<div className="designer-review-content">
							<div className="review-content-top">
								<div className="review-stars-row">{renderStars(review.rating)}</div>
								<span className="review-date">{review.date}</span>
							</div>
							<p className="review-text">{review.text}</p>
						</div>
					</div>
				))}
			</div>
		</Stack>
	);
};

export default DesignerComments;
