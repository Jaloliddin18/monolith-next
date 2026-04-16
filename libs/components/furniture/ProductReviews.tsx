import { useState, useRef } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
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
	const reviewsRef = useRef<HTMLDivElement>(null);
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
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setComments(data?.getComments?.list ?? []);
			setTotal(data?.getComments?.metaCounter?.[0]?.total ?? 0);
		},
	});

	const [createComment] = useMutation(CREATE_COMMENT);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
			setCurrentPage(1);
			await refetch({ input: { ...inquiry, page: 1 } });
		} catch (err: any) {
			sweetMixinErrorAlert(err?.message ?? 'Failed to post review');
		}
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		reviewsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
			<Stack
				ref={reviewsRef as any}
				className="section-header-row"
				direction="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Typography className="section-title-lg">
					Reviews {total > 0 ? `(${total})` : ''}
				</Typography>
			</Stack>

			{/* Reviews List */}
			<Stack className="reviews-list">
				{comments.length > 0 ? (
					comments.map((comment) => {
						const member = comment.memberData;
						const memberImage = member?.memberImage
							? `${REACT_APP_API_URL}/${member.memberImage}`
							: '/icons/user_profile.png';
						const name = member?.memberFullName || member?.memberNick || 'Anonymous';
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
									<Stack direction="row" gap="2px" sx={{ mt: '4px' }}>
										{[...Array(5)].map((_, i) => (
											<StarIcon key={i} sx={{ fontSize: 14, color: '#FFD700' }} />
										))}
									</Stack>
								</Stack>
								<Stack className="review-content-col">
									<Typography className="review-date">{date}</Typography>
									<Typography className="review-text">{comment.commentContent}</Typography>
								</Stack>
							</Box>
						);
					})
				) : (
					<Typography sx={{ padding: '24px 0', color: '#aaa', fontSize: 14 }}>
						No reviews yet. Be the first to share your experience!
					</Typography>
				)}
			</Stack>

			{/* Pagination */}
			{totalPages > 1 && (
				<Stack direction="row" alignItems="center" justifyContent="center" gap="8px" sx={{ mt: '32px' }}>
					<button
						onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						style={{
							padding: '8px 16px',
							border: '1px solid #ddd',
							borderRadius: '4px',
							background: 'transparent',
							cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
							opacity: currentPage === 1 ? 0.4 : 1,
							fontFamily: 'inherit',
							fontSize: 14,
						}}
					>
						PREV
					</button>

					{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
						<button
							key={page}
							onClick={() => handlePageChange(page)}
							style={{
								width: 36,
								height: 36,
								border: `1px solid ${currentPage === page ? '#C46A4A' : '#ddd'}`,
								borderRadius: '4px',
								background: currentPage === page ? '#C46A4A' : 'transparent',
								color: currentPage === page ? '#fff' : '#333',
								cursor: 'pointer',
								fontFamily: 'inherit',
								fontSize: 14,
								fontWeight: currentPage === page ? 600 : 400,
							}}
						>
							{page}
						</button>
					))}

					<button
						onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						style={{
							padding: '8px 16px',
							border: '1px solid #ddd',
							borderRadius: '4px',
							background: 'transparent',
							cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
							opacity: currentPage === totalPages ? 0.4 : 1,
							fontFamily: 'inherit',
							fontSize: 14,
						}}
					>
						NEXT
					</button>
				</Stack>
			)}
		</Stack>
	);
};

export default ProductReviews;
