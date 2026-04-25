import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { BoardArticle } from '../../types/board-article/board-article';
import { BoardArticlesInquiry } from '../../types/board-article/board-article.input';
import { T } from '../../types/common';
import { REACT_APP_API_URL } from '../../config';

const DEFAULT_IMAGE = '/img/furniture/luxury_chair.jpg';

interface DesignerBlogPanelProps {
	memberId: string;
}

const DesignerBlogPanel = ({ memberId }: DesignerBlogPanelProps) => {
	const router = useRouter();
	const [articles, setArticles] = useState<BoardArticle[]>([]);

	const inquiry: BoardArticlesInquiry = {
		page: 1,
		limit: 8,
		sort: 'createdAt',
		search: { memberId },
	};

	useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: inquiry },
		skip: !memberId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setArticles(data?.getBoardArticles?.list ?? []);
		},
	});

	const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').slice(0, 100);

	const handleClick = (article: BoardArticle) => {
		router.push(`/community/detail?articleId=${article._id}`);
	};

	return (
		<Stack className="designer-blog-panel">
			<div className="blog-panel-list">
				{articles.map((post) => {
					const image = post.articleImage
						? `${REACT_APP_API_URL}/${post.articleImage}`
						: DEFAULT_IMAGE;
					const date = new Date(post.createdAt).toLocaleDateString('en-GB', {
						day: '2-digit',
						month: 'long',
						year: 'numeric',
					});

					return (
						<div key={post._id} className="blog-panel-item" style={{ cursor: 'pointer' }} onClick={() => handleClick(post)}>
							<div className="blog-panel-item-image">
								<img src={image} alt={post.articleTitle} />
							</div>
							<div className="blog-panel-item-content">
								<div className="blog-panel-item-meta">
									<span className="blog-panel-category">{post.articleCategory}</span>
									<span className="blog-panel-date">{date}</span>
								</div>
								<h3 className="blog-panel-title">{post.articleTitle}</h3>
								<p className="blog-panel-excerpt">{stripHtml(post.articleContent ?? '')}...</p>
								<span className="blog-panel-read-more">Read Article →</span>
							</div>
						</div>
					);
				})}
				{articles.length === 0 && (
					<p style={{ padding: '24px', color: 'var(--color-text-muted)' }}>No blog posts yet.</p>
				)}
			</div>
		</Stack>
	);
};

export default DesignerBlogPanel;
