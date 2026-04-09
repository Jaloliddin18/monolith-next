import React, { useState } from 'react';
import { Stack, Box, Typography, Pagination } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useQuery, useMutation } from '@apollo/client';
import { useReactiveVar } from '@apollo/client';
import { GET_COMMENTS } from '../../../apollo/user/query';
import { CREATE_COMMENT } from '../../../apollo/user/mutation';
import { Comment } from '../../types/comment/comment';
import { CommentsInquiry, CommentInput } from '../../types/comment/comment.input';
import { CommentGroup } from '../../enums/comment.enum';
import { userVar } from '../../../apollo/store';
import { REACT_APP_API_URL } from '../../config';
import { T } from '../../types/common';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';

const LIMIT = 5;

interface ProductReviewsProps {
	furnitureId?: string;
}

const ProductReviews = ({ furnitureId }: ProductReviewsProps) => {
	const user = useReactiveVar(userVar);
	const [currentPage, setCurrentPage] = useState(1);
	const [reviewText, setReviewText] = useState('');
	const [comments, setComments] = useState<Comment[]>([]);
	const [total, setTotal] = useState(0);

	const inquiry: CommentsInquiry = {
		page: currentPage,
		limit: LIMIT,
		sort: 'createdAt',
		search: { commentRefId: furnitureId ?? '' },
	};

	const { refetch } = useQuery(GET_COMMENTS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: inquiry },
		skip: !furnitureId,
		onCompleted: (data: T) => {
			setComments(data?.getComments?.list ?? []);
			setTotal(data?.getComments?.metaCounter?.[0]?.total ?? 0);
		},
	});

	const [createComment] = useMutation(CREATE_COMMENT);

	const handlePageChange = (_e: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!reviewText.trim()) return;
		if (!user?._id) {
			sweetMixinErrorAlert('Please log in to post a review');
			return;
		}
		if (!furnitureId) return;

		try {
			const input: CommentInput = {
				commentGroup: CommentGroup.FURNITURE,
				commentContent: reviewText.trim(),
				commentRefId: furnitureId,
			};
			await createComment({ variables: { input } });
			setReviewText('');
			await sweetTopSmallSuccessAlert('Review posted!', 800);
			await refetch({ input: { ...inquiry, page: 1 } });
			setCurrentPage(1);
		} catch (err: any) {
			sweetMixinErrorAlert(err?.message ?? 'Failed to post review');
		}
	};

	const totalPages = Math.ceil(total / LIMIT);

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
				{comments.length > 0
					? comments.map((comment) => {
							const member = comment.memberData;
							const memberImage = member?.memberImage
								? `${REACT_APP_API_URL}/${member.memberImage}`
								: '/icons/user_profile.png';
							const name = member?.memberFullName ?? member?.memberNick ?? 'Anonymous';
							const date = new Date(comment.createdAt).toLocaleDateString('en-GB', {
								day: '2-digit',
								month: 'short',
								year: 'numeric',
							});

							return (
								<Box className="review-item" key={comment._id}>
									<Stack className="review-user-col">
										<Box
											component="img"
											src={memberImage}
											alt={name}
											sx={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', mb: '8px' }}
										/>
										<Typography className="review-user-name">{name}</Typography>
										<Stack direction="row" gap="2px">
											{[...Array(5)].map((_, i) =>
												i < 5 ? (
													<StarIcon key={i} sx={{ fontSize: 16, color: '#f59e0b' }} />
												) : (
													<StarBorderIcon key={i} sx={{ fontSize: 16, color: '#f59e0b' }} />
												),
											)}
										</Stack>
									</Stack>
									<Stack className="review-content-col">
										<Stack direction="row" justifyContent="space-between" alignItems="center">
											<Typography className="review-date">{date}</Typography>
										</Stack>
										<Typography className="review-text">{comment.commentContent}</Typography>
									</Stack>
								</Box>
							);
					  })
					: !furnitureId && (
							<Typography sx={{ padding: '24px', color: 'var(--color-text-muted)' }}>
								No reviews yet. Be the first to review!
							</Typography>
					  )}
				{furnitureId && comments.length === 0 && (
					<Typography sx={{ padding: '24px', color: 'var(--color-text-muted)' }}>
						No reviews yet. Be the first to review!
					</Typography>
				)}
			</Stack>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="reviews-pagination">
					<Pagination
						count={totalPages}
						page={currentPage}
						onChange={handlePageChange}
						shape="rounded"
						siblingCount={0}
						boundaryCount={1}
					/>
				</div>
			)}
		</Stack>
	);
};

export default ProductReviews;
