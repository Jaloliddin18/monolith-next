import React, { useState } from 'react';
import { Stack, Pagination, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { useReactiveVar } from '@apollo/client';
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

interface ArticleCommentsProps {
	articleId?: string;
}

const ArticleComments = ({ articleId }: ArticleCommentsProps) => {
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [comments, setComments] = useState<Comment[]>([]);
	const [total, setTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [commentText, setCommentText] = useState('');

	const inquiry: CommentsInquiry = {
		page: currentPage,
		limit: LIMIT,
		search: { commentRefId: articleId ?? '' },
	};

	const { loading } = useQuery(GET_COMMENTS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: inquiry },
		skip: !articleId,
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
		if (!articleId) return;
		try {
			const result = await createComment({
				variables: {
					input: {
						commentGroup: CommentGroup.ARTICLE,
						commentContent: commentText.trim(),
						commentRefId: articleId,
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
		<Stack className="article-comments-section">
			{/* Comment Form */}
			<div className="comment-form-wrapper">
				<h2 className="section-title">Add your opinion</h2>
				<form className="comment-form" onSubmit={handleSubmit}>
					<div className="comment-form-group">
						<textarea
							className="comment-textarea"
							placeholder="Type here..."
							value={commentText}
							onChange={(e) => setCommentText(e.target.value)}
							rows={6}
						/>
					</div>
					<button className="post-comment-btn" type="submit" disabled={submitting}>
						{submitting ? 'POSTING...' : 'POST COMMENT'}
					</button>
				</form>
			</div>

			{/* Comments List */}
			<div className="comments-list">
				{loading && comments.length === 0 && (
					<div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
						<CircularProgress size={28} />
					</div>
				)}
				{!loading && comments.length === 0 && (
					<p style={{ padding: '24px', color: 'var(--color-text-muted)' }}>No comments yet.</p>
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
						<div key={comment._id} className="comment-item">
							<div
								className="comment-author"
								style={{ cursor: author?._id ? 'pointer' : 'default' }}
								onClick={() => {
								if (!author?._id) return;
								if (!!user?._id && user._id === author._id) router.push('/mypage');
								else router.push(`/member/detail?memberId=${author._id}`);
							}}
							>
								<div className="comment-author-avatar">
									<img src={image} alt={author?.memberNick ?? 'User'} />
								</div>
								<p className="comment-author-name">
									{author?.memberFullName || author?.memberNick || 'Unknown'}
								</p>
							</div>
							<div className="comment-body">
								<div className="comment-title-row">
									<span className="comment-date">{date}</span>
								</div>
								<p className="comment-text">{comment.commentContent}</p>
							</div>
						</div>
					);
				})}
			</div>

			{/* Pagination */}
			{total > LIMIT && (
				<div className="comments-pagination">
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

export default ArticleComments;
