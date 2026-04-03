import React, { useState } from 'react';
import { Box, Stack, Typography, Pagination } from '@mui/material';

interface Review {
	id: string;
	reviewerName: string;
	rating: number;
	title: string;
	date: string;
	body: string;
	images?: string[];
}

const placeholderReviews: Review[] = [
	{
		id: '1',
		reviewerName: 'Michele',
		rating: 4,
		title: 'Stylish and Comfortable - The Perfect Sofa',
		date: '5 days ago',
		body: "I recently purchased the 'LuxeComfort' sofa from MONOLITH, and I couldn't be happier. The sleek design and luxurious upholstery instantly elevate the look of my living room.",
		images: [
			'/img/furniture/luxury_chair.jpg',
			'/img/furniture/luxury_chair.jpg',
			'/img/furniture/luxury_chair.jpg',
		],
	},
	{
		id: '2',
		reviewerName: 'Michele',
		rating: 4,
		title: "A Relaxing Retreat - The 'DreamScape' Bed",
		date: '5 days ago',
		body: "The 'DreamScape' bed from MONOLITH has transformed my bedroom into a peaceful oasis. The contemporary design with its upholstered headboard and sleek frame instantly caught my attention.",
	},
	{
		id: '3',
		reviewerName: 'Michele',
		rating: 4,
		title: "Functional and Elegant - The 'Moderno' Dining Table",
		date: '5 days ago',
		body: "I was in search of a dining table that could accommodate my large family gatherings and also add a touch of elegance to my dining area. The 'Moderno' dining table from MONOLITH exceeded my expectations.",
		images: ['/img/furniture/luxury_chair.jpg', '/img/furniture/luxury_chair.jpg'],
	},
];

const StarRating = ({ rating }: { rating: number }) => (
	<Stack direction="row" gap="8px">
		{Array.from({ length: 5 }, (_, i) => (
			<Box
				key={i}
				component="img"
				src="/icons/star_icon.svg"
				alt="star"
				width={18}
				height={18}
				sx={{ opacity: i < rating ? 1 : 0.25 }}
			/>
		))}
	</Stack>
);

const ReviewSection = () => {
	const [page, setPage] = useState(1);
	const totalPages = 10;

	return (
		<Stack className="reviews-section" alignItems="center">
			{/* Header */}
			<Stack className="reviews-header" direction="row" justifyContent="space-between" alignItems="center">
				<Typography className="section-title-text">Review for Popular furniture</Typography>
				<Stack direction="row" alignItems="center" gap="10px" sx={{ cursor: 'pointer', py: '14px' }}>
					<Typography className="reviews-sort-link">Sort by</Typography>
					<Box component="img" src="/icons/CaretDown.svg" alt="▾" width={20} height={20} />
				</Stack>
			</Stack>

			{/* Reviews list */}
			<Stack className="reviews-list">
				{placeholderReviews.map((review) => (
					<Stack key={review.id} className="review-item" direction="row" gap="24px">
						{/* Left: name + stars */}
						<Stack className="review-left">
							<Typography className="reviewer-name">{review.reviewerName}</Typography>
							<StarRating rating={review.rating} />
						</Stack>

						{/* Right: title, body, images */}
						<Stack className="review-right" gap="14px">
							<Stack direction="row" justifyContent="space-between" alignItems="center">
								<Typography className="review-title">{review.title}</Typography>
								<Typography className="review-date">{review.date}</Typography>
							</Stack>
							<Typography className="review-body">{review.body}</Typography>
							{review.images && review.images.length > 0 && (
								<Stack direction="row" gap="12px">
									{review.images.map((img, i) => (
										<Box key={i} className="review-image">
											<img src={img} alt={`Review image ${i + 1}`} />
										</Box>
									))}
								</Stack>
							)}
						</Stack>
					</Stack>
				))}
			</Stack>

			{/* Pagination */}
			<Stack className="reviews-pagination" direction="row" alignItems="center" justifyContent="center" gap="53px">
				<Stack
					direction="row"
					alignItems="center"
					gap="12px"
					sx={{ cursor: page > 1 ? 'pointer' : 'default', opacity: page > 1 ? 1 : 0.4 }}
					onClick={() => page > 1 && setPage(page - 1)}
				>
					<Box
						component="img"
						src="/icons/ArrowRight.svg"
						alt="←"
						width={24}
						height={24}
						sx={{ transform: 'rotate(180deg)' }}
					/>
					<Typography className="pagination-text" sx={{ color: '#999' }}>PREV</Typography>
				</Stack>
				<Pagination
					count={totalPages}
					page={page}
					onChange={(_, val) => setPage(val)}
					variant="outlined"
					shape="circular"
					className="custom-pagination"
					hidePrevButton
					hideNextButton
				/>
				<Stack
					direction="row"
					alignItems="center"
					gap="12px"
					sx={{ cursor: page < totalPages ? 'pointer' : 'default', opacity: page < totalPages ? 1 : 0.4 }}
					onClick={() => page < totalPages && setPage(page + 1)}
				>
					<Typography className="pagination-text">NEXT</Typography>
					<Box component="img" src="/icons/ArrowRight.svg" alt="→" width={24} height={24} />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default ReviewSection;
