import React, { useState } from 'react';
import { Box, Stack, Typography, Pagination } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarIcon from '@mui/icons-material/Star';

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
		reviewerName: 'Sarah Johnson',
		rating: 5,
		title: 'Absolutely love this furniture!',
		date: '5 days ago',
		body: 'The quality is outstanding and the delivery was prompt. The color matches perfectly with my living room decor. Assembly was straightforward with clear instructions.',
		images: ['/img/furniture/placeholder.png', '/img/furniture/placeholder.png'],
	},
	{
		id: '2',
		reviewerName: 'Michael Chen',
		rating: 4,
		title: 'Great value for money',
		date: '2 weeks ago',
		body: 'Very sturdy and well-made. The material feels premium and the finish is smooth. Would recommend to anyone looking for affordable yet stylish furniture pieces.',
	},
	{
		id: '3',
		reviewerName: 'Emily Davis',
		rating: 5,
		title: 'Perfect addition to our home',
		date: '1 month ago',
		body: 'We purchased this for our new apartment and it exceeded our expectations. The design is modern and sleek, fitting perfectly with our minimalist aesthetic.',
		images: ['/img/furniture/placeholder.png'],
	},
	{
		id: '4',
		reviewerName: 'James Wilson',
		rating: 4,
		title: 'Solid construction and design',
		date: '1 month ago',
		body: 'The build quality is impressive for the price point. Comfortable and looks great in our dining room. Minor issue with one of the legs but customer service resolved it quickly.',
	},
	{
		id: '5',
		reviewerName: 'Anna Kim',
		rating: 5,
		title: 'Exceeded expectations',
		date: '2 months ago',
		body: 'Beautiful craftsmanship. The wood grain is gorgeous and the finish is flawless. Everyone who visits our home compliments this piece.',
		images: ['/img/furniture/placeholder.png', '/img/furniture/placeholder.png', '/img/furniture/placeholder.png'],
	},
];

const ReviewSection = () => {
	const [page, setPage] = useState(1);
	const reviewsPerPage = 3;
	const totalPages = Math.ceil(placeholderReviews.length / reviewsPerPage);
	const currentReviews = placeholderReviews.slice((page - 1) * reviewsPerPage, page * reviewsPerPage);

	return (
		<Stack className="reviews-section" alignItems="center">
			<Stack className="reviews-header" direction="row" justifyContent="space-between" alignItems="center">
				<Typography className="section-title-text">Review for Popular furniture</Typography>
				<Typography className="reviews-sort-link">Sort by</Typography>
			</Stack>

			<Stack className="reviews-list">
				{currentReviews.map((review) => (
					<Stack key={review.id} className="review-item" direction="row" gap="40px">
						<Stack className="review-left">
							<Typography className="reviewer-name">{review.reviewerName}</Typography>
							<Stack direction="row" gap="2px">
								{Array.from({ length: 5 }, (_, i) => (
									<StarIcon
										key={i}
										sx={{ fontSize: 18, color: i < review.rating ? '#F89C01' : '#E6E6E6' }}
									/>
								))}
							</Stack>
						</Stack>
						<Stack className="review-right" gap="8px">
							<Stack direction="row" alignItems="center" gap="16px">
								<Typography className="review-title">{review.title}</Typography>
								<Typography className="review-date">{review.date}</Typography>
							</Stack>
							<Typography className="review-body">{review.body}</Typography>
							{review.images && review.images.length > 0 && (
								<Stack direction="row" gap="12px" sx={{ mt: '12px' }}>
									{review.images.map((img, i) => (
										<Box key={i} className="review-image">
											<img src={img} alt={`Review ${i + 1}`} />
										</Box>
									))}
								</Stack>
							)}
						</Stack>
					</Stack>
				))}
			</Stack>

			{totalPages > 1 && (
				<Stack className="reviews-pagination" direction="row" alignItems="center" justifyContent="center" gap="24px">
					<Stack
						direction="row"
						alignItems="center"
						gap="10px"
						sx={{ cursor: page > 1 ? 'pointer' : 'default', opacity: page > 1 ? 1 : 0.4 }}
						onClick={() => page > 1 && setPage(page - 1)}
					>
						<ArrowBackIcon sx={{ fontSize: 24 }} />
						<Typography className="pagination-text">PREV</Typography>
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
						<ArrowForwardIcon sx={{ fontSize: 24 }} />
					</Stack>
				</Stack>
			)}
		</Stack>
	);
};

export default ReviewSection;
