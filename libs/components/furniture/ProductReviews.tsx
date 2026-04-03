import React, { useState } from 'react';
import { Stack, Box, Typography, Pagination } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const reviewsData = [
	{
		name: 'Luis M. Manley',
		stars: 5,
		title: 'Stylish and Comfortable - The Perfect Sofa',
		date: '5 days ago',
		text: "I recently purchased the 'LuxeComfort' sofa from MONOLITH, and I couldn't be happier. The sleek design and luxurious upholstery instantly elevate the look of my living room.",
		hasImages: true,
	},
	{
		name: 'Maria J. Young',
		stars: 4,
		title: "A Relaxing Retreat - The 'DreamScape' Bed",
		date: '5 days ago',
		text: "The 'DreamScape' bed from MONOLITH has transformed my bedroom into a peaceful oasis. The contemporary design with its upholstered headboard and sleek frame instantly caught my attention.",
		hasImages: false,
	},
	{
		name: 'John V. Godwin',
		stars: 5,
		title: "Functional and Elegant - The 'Moderno' Dining Table",
		date: '5 days ago',
		text: "I was in search of a dining table that could accommodate my large family gatherings and also add a touch of elegance to my dining area. The 'Moderno' dining table from MONOLITH exceeded my expectations.",
		hasImages: true,
	},
];

const ProductReviews = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [reviewText, setReviewText] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!reviewText.trim()) return;
		setReviewText('');
	};

	return (
		<Stack className="detail-reviews-section">
			{/* Write a Review Form */}
			<div className="review-form-wrapper">
				<h2 className="review-form-title">Write a review</h2>
				<form className="review-form" onSubmit={handleSubmit}>
					<div className="review-form-group">
						<textarea
							className="review-textarea"
							placeholder="Share your experience with this product..."
							value={reviewText}
							onChange={(e) => setReviewText(e.target.value)}
							rows={6}
						/>
					</div>
					<button className="post-review-btn" type="submit">
						POST REVIEW
					</button>
				</form>
			</div>

			{/* Reviews List Header */}
			<Stack className="section-header-row" direction="row" justifyContent="space-between" alignItems="center">
				<Typography className="section-title-lg">Reviews for Popular furniture</Typography>
			</Stack>

			{/* Reviews List */}
			<Stack className="reviews-list">
				{reviewsData.map((review, idx) => (
					<Box className="review-item" key={idx}>
						<Stack className="review-user-col">
							<Typography className="review-user-name">{review.name}</Typography>
							<Stack direction="row" gap="2px">
								{[...Array(5)].map((_, i) =>
									i < review.stars ? (
										<StarIcon key={i} sx={{ fontSize: 16, color: '#f59e0b' }} />
									) : (
										<StarBorderIcon key={i} sx={{ fontSize: 16, color: '#f59e0b' }} />
									),
								)}
							</Stack>
						</Stack>
						<Stack className="review-content-col">
							<Stack direction="row" justifyContent="space-between" alignItems="center">
								<Typography className="review-title">{review.title}</Typography>
								<Typography className="review-date">{review.date}</Typography>
							</Stack>
							<Typography className="review-text">{review.text}</Typography>
							{review.hasImages && (
								<Stack direction="row" gap="12px" className="review-images">
									{[1, 2, 3].map((img) => (
										<Box className="review-img-thumb" key={img}>
											<img src="/img/furniture/luxury_chair.jpg" alt={`Review ${img}`} />
										</Box>
									))}
								</Stack>
							)}
						</Stack>
					</Box>
				))}
			</Stack>

			{/* Pagination */}
			<div className="reviews-pagination">
				<Pagination
					count={4}
					page={currentPage}
					onChange={(_e, page) => setCurrentPage(page)}
					shape="rounded"
					siblingCount={0}
					boundaryCount={1}
				/>
			</div>
		</Stack>
	);
};

export default ProductReviews;
