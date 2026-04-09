import React, { useState } from 'react';
import { Stack, Pagination } from '@mui/material';
import BlogCard from '../common/BlogCard';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { LIKE_TARGET_BOARD_ARTICLE } from '../../../apollo/user/mutation';
import { BoardArticle } from '../../types/board-article/board-article';
import { BoardArticlesInquiry } from '../../types/board-article/board-article.input';
import { BoardArticleCategory } from '../../enums/board-article.enum';
import { Direction } from '../../enums/common.enum';
import { REACT_APP_API_URL } from '../../config';
import { T } from '../../types/common';
import { userVar } from '../../../apollo/store';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';

const DEFAULT_IMAGE = '/img/furniture/luxury_chair.jpg';
const LIMIT = 6;

const CATEGORIES: { value: BoardArticleCategory; label: string }[] = [
	{ value: BoardArticleCategory.FREE, label: 'Free' },
	{ value: BoardArticleCategory.RECOMMEND, label: 'Recommend' },
	{ value: BoardArticleCategory.NEWS, label: 'News' },
	{ value: BoardArticleCategory.HUMOR, label: 'Humor' },
];

const BlogListSection = () => {
	const user = useReactiveVar(userVar);
	const [articles, setArticles] = useState<BoardArticle[]>([]);
	const [total, setTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [activeCategory, setActiveCategory] = useState<BoardArticleCategory>(BoardArticleCategory.FREE);

	const inquiry: BoardArticlesInquiry = {
		page: currentPage,
		limit: LIMIT,
		sort: 'createdAt',
		direction: Direction.DESC,
		search: { articleCategory: activeCategory },
	};

	const { refetch } = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: inquiry },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setArticles(data?.getBoardArticles?.list ?? []);
			setTotal(data?.getBoardArticles?.metaCounter?.[0]?.total ?? 0);
		},
	});

	const [likeTargetBoardArticle] = useMutation(LIKE_TARGET_BOARD_ARTICLE);

	const handleCategoryChange = (category: BoardArticleCategory) => {
		setActiveCategory(category);
		setCurrentPage(1);
	};

	const handlePageChange = (_e: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
	};

	const handleLike = async (e: React.MouseEvent, id: string) => {
		e.stopPropagation();
		if (!user?._id) {
			sweetMixinErrorAlert('Please login first!');
			return;
		}
		try {
			await likeTargetBoardArticle({ variables: { input: id } });
			await refetch({ input: inquiry });
			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			sweetMixinErrorAlert(err?.message ?? 'Something went wrong');
		}
	};

	return (
		<Stack className="blog-list-section">
			<h2 className="section-title">Styling Tips with Wooden Furniture</h2>

			<div className="blog-category-tabs">
				{CATEGORIES.map((cat) => (
					<button
						key={cat.value}
						type="button"
						className={`blog-category-tab ${activeCategory === cat.value ? 'active' : ''}`}
						onClick={() => handleCategoryChange(cat.value)}
					>
						{cat.label}
					</button>
				))}
			</div>

			<div className="blog-grid">
				{articles.length > 0 ? (
					articles.map((article) => (
						<BlogCard
							key={article._id}
							id={article._id}
							image={article.articleImage ? `${REACT_APP_API_URL}/${article.articleImage}` : DEFAULT_IMAGE}
							category={article.articleCategory}
							date={new Date(article.createdAt).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
							title={article.articleTitle}
							likes={article.articleLikes}
							views={article.articleViews}
							comments={article.articleComments}
							likedByMe={article.likedByMe?.[0]?.myFavorite ?? false}
							onLike={(e) => handleLike(e, article._id)}
						/>
					))
				) : (
					<p style={{ padding: '24px', color: 'var(--color-text-muted)' }}>No articles found.</p>
				)}
			</div>

			{total > LIMIT && (
				<div className="blog-pagination">
					<Pagination
						count={Math.ceil(total / LIMIT)}
						page={currentPage}
						onChange={handlePageChange}
						shape="rounded"
						siblingCount={1}
						boundaryCount={1}
					/>
				</div>
			)}
		</Stack>
	);
};

export default BlogListSection;
