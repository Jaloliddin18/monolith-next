import React, { useState } from 'react';
import { Stack, Pagination } from '@mui/material';

const DEFAULT_IMAGE = '/general_images/hello_guy.jpg';

const reviewsData = [
	{
		id: '1',
		image: DEFAULT_IMAGE,
		name: 'James Mitchell',
		role: 'Homeowner',
		rating: 5,
		title: 'Absolutely Stunning Custom Dining Table',
		date: 'March 15, 2024',
		content:
			"Emily designed a custom dining table for our family, and it has become the heart of our home. The attention to detail and the quality of craftsmanship is unmatched. Every guest asks about it!",
	},
	{
		id: '2',
		image: DEFAULT_IMAGE,
		name: 'Sarah Kim',
		role: 'Interior Designer',
		rating: 5,
		title: 'The Best Collaborator in Bespoke Furniture',
		date: 'February 8, 2024',
		content:
			"I've collaborated with Emily on multiple projects and her ability to translate a client's vision into tangible, beautiful furniture is remarkable. She's my go-to recommendation for bespoke pieces.",
	},
	{
		id: '3',
		image: DEFAULT_IMAGE,
		name: 'David Chen',
		role: 'Restaurant Owner',
		rating: 4,
		title: 'Durable and Beautiful Commercial Pieces',
		date: 'January 22, 2024',
		content:
			"Emily furnished our entire restaurant with custom pieces that perfectly match our aesthetic. The durability of her work is incredible — after two years of heavy commercial use, everything still looks brand new.",
	},
	{
		id: '4',
		image: DEFAULT_IMAGE,
		name: 'Anna Rodriguez',
		role: 'Homeowner',
		rating: 5,
		title: 'A Living Room Transformation',
		date: 'December 5, 2023',
		content:
			"Our living room went from ordinary to extraordinary thanks to Emily's Aurora Lounge Chair and matching side table. The organic curves and sustainable materials make every piece feel special.",
	},
];

const StarIcon = ({ filled }: { filled: boolean }) => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill={filled ? '#F5A623' : '#E6E6E6'}
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M9 1.5L11.3175 6.195L16.5 6.9525L12.75 10.605L13.635 15.7725L9 13.3275L4.365 15.7725L5.25 10.605L1.5 6.9525L6.6825 6.195L9 1.5Z" />
	</svg>
);

const DesignerReviewsPanel = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [commentText, setCommentText] = useState('');

	const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!commentText.trim()) return;
		setCommentText('');
	};

	return (
		<Stack className="designer-reviews-panel">
			{/* Review Summary Bar */}
			<div className="reviews-summary-bar">
				<div className="reviews-summary-left">
					<span className="reviews-average-score">4.8</span>
					<div className="reviews-average-detail">
						<div className="reviews-stars-row">
							{[1, 2, 3, 4, 5].map((star) => (
								<StarIcon key={star} filled={star <= 5} />
							))}
						</div>
						<span className="reviews-total-count">Based on 124 reviews</span>
					</div>
				</div>
				<div className="reviews-breakdown">
					<div className="breakdown-row">
						<span className="breakdown-label">5 stars</span>
						<div className="breakdown-bar">
							<div className="breakdown-fill" style={{ width: '72%' }} />
						</div>
						<span className="breakdown-count">89</span>
					</div>
					<div className="breakdown-row">
						<span className="breakdown-label">4 stars</span>
						<div className="breakdown-bar">
							<div className="breakdown-fill" style={{ width: '20%' }} />
						</div>
						<span className="breakdown-count">25</span>
					</div>
					<div className="breakdown-row">
						<span className="breakdown-label">3 stars</span>
						<div className="breakdown-bar">
							<div className="breakdown-fill" style={{ width: '6%' }} />
						</div>
						<span className="breakdown-count">8</span>
					</div>
					<div className="breakdown-row">
						<span className="breakdown-label">2 stars</span>
						<div className="breakdown-bar">
							<div className="breakdown-fill" style={{ width: '1.5%' }} />
						</div>
						<span className="breakdown-count">2</span>
					</div>
					<div className="breakdown-row">
						<span className="breakdown-label">1 star</span>
						<div className="breakdown-bar">
							<div className="breakdown-fill" style={{ width: '0%' }} />
						</div>
						<span className="breakdown-count">0</span>
					</div>
				</div>
			</div>

			{/* Comment Form */}
			<div className="review-form-wrapper">
				<h3 className="review-form-title">Leave a Review</h3>
				<form className="review-form" onSubmit={handleSubmit}>
					<textarea
						className="review-textarea"
						placeholder="Share your experience working with this designer..."
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
						rows={5}
					/>
					<button className="post-review-btn" type="submit">
						POST REVIEW
					</button>
				</form>
			</div>

			{/* Reviews List */}
			<div className="reviews-list">
				{reviewsData.map((review) => (
					<div key={review.id} className="review-item">
						<div className="review-author">
							<div className="review-author-avatar">
								<img src={review.image} alt={review.name} />
							</div>
							<div className="review-author-info">
								<h4 className="review-author-name">{review.name}</h4>
								<span className="review-author-role">{review.role}</span>
							</div>
						</div>
						<div className="review-body">
							<div className="review-body-top">
								<div className="review-stars-row">
									{[1, 2, 3, 4, 5].map((star) => (
										<StarIcon key={star} filled={star <= review.rating} />
									))}
								</div>
								<span className="review-item-date">{review.date}</span>
							</div>
							<h4 className="review-item-title">{review.title}</h4>
							<p className="review-item-text">{review.content}</p>
						</div>
					</div>
				))}
			</div>

			{/* Pagination */}
			<div className="reviews-pagination">
				<Pagination
					count={4}
					page={currentPage}
					onChange={handlePageChange}
					shape="rounded"
					siblingCount={0}
					boundaryCount={1}
				/>
			</div>
		</Stack>
	);
};

export default DesignerReviewsPanel;
