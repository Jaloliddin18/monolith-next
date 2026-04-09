import React, { useState } from 'react';
import { Stack, Pagination, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { GET_COMMENTS } from '../../../apollo/user/query';
import { CREATE_COMMENT } from '../../../apollo/user/mutation';
import { Comment } from '../../types/comment/comment';
import { CommentsInquiry } from '../../types/comment/comment.input';
import { CommentGroup } from '../../enums/comment.enum';
import { T } from '../../types/common';
import { REACT_APP_API_URL } from '../../config';
import { userVar } from '../../../apollo/store';
import { sweetMixinErrorAlert } from '../../sweetAlert';

const DEFAULT_IMAGE = '/icons/user_profile.png';
const LIMIT = 5;

interface DesignerReviewsPanelProps {
	memberId: string;
}

const DesignerReviewsPanel = ({ memberId }: DesignerReviewsPanelProps) => {
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [comments, setComments] = useState<Comment[]>([]);
	const [total, setTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [commentText, setCommentText] = useState('');

	const inquiry: CommentsInquiry = {
		page: currentPage,
		limit: LIMIT,
		search: { commentRefId: memberId },
	};

	const { loading } = useQuery(GET_COMMENTS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: inquiry },
		skip: !memberId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setComments(data?.getComments?.list ?? []);
			setTotal(data?.getComments?.metaCounter?.[0]?.total ?? 0);
		},
	});

	const [createComment, { loading: submitting }] = useMutation(CREATE_COMMENT);

	const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!commentText.trim()) return;
		if (!user?._id) {
			sweetMixinErrorAlert('Please login first!');
			return;
		}
		try {
			const result = await createComment({
				variables: {
					input: {
						commentGroup: CommentGroup.MEMBER,
						commentContent: commentText.trim(),
						commentRefId: memberId,
					},
				},
			});
			const newComment: Comment = {
				...result.data.createComment,
				memberData: user as any,
			};
			setComments((prev) => [newComment, ...prev]);
			setTotal((prev) => prev + 1);
			setCommentText('');
		} catch (err: any) {
			sweetMixinErrorAlert(err?.message ?? 'Something went wrong');
		}
	};

	return (
		<Stack className="designer-reviews-panel">
			{/* Summary */}
			<div className="reviews-summary-bar">
				<div className="reviews-summary-left">
					<span className="reviews-total-count">
						{total} review{total !== 1 ? 's' : ''}
					</span>
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
					<button className="post-review-btn" type="submit" disabled={submitting}>
						{submitting ? 'POSTING...' : 'POST REVIEW'}
					</button>
				</form>
			</div>

			{/* Reviews List */}
			<div className="reviews-list">
				{loading && comments.length === 0 && (
					<div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
						<CircularProgress size={28} />
					</div>
				)}
				{!loading && comments.length === 0 && (
					<p style={{ padding: '24px', color: 'var(--color-text-muted)' }}>No reviews yet.</p>
				)}
				{comments.map((comment) => {
					const author = comment.memberData;
					const image = author?.memberImage
						? `${REACT_APP_API_URL}/${author.memberImage}`
						: DEFAULT_IMAGE;
					const date = new Date(comment.createdAt).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					});
					return (
						<div key={comment._id} className="review-item">
							<div
								className="review-author"
								style={{ cursor: author?._id ? 'pointer' : 'default' }}
								onClick={() => {
								if (!author?._id) return;
								if (!!user?._id && user._id === author._id) router.push('/mypage');
								else router.push(`/member/detail?memberId=${author._id}`);
							}}
							>
								<div className="review-author-avatar">
									<img src={image} alt={author?.memberNick ?? 'User'} />
								</div>
								<div className="review-author-info">
									<h4 className="review-author-name">
										{author?.memberFullName || author?.memberNick || 'Unknown'}
									</h4>
									<span className="review-author-role">{author?.memberType ?? ''}</span>
								</div>
							</div>
							<div className="review-body">
								<div className="review-body-top">
									<span className="review-item-date">{date}</span>
								</div>
								<p className="review-item-text">{comment.commentContent}</p>
							</div>
						</div>
					);
				})}
			</div>

			{/* Pagination */}
			{total > LIMIT && (
				<div className="reviews-pagination">
					<Pagination
						count={Math.ceil(total / LIMIT)}
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

export default DesignerReviewsPanel;
