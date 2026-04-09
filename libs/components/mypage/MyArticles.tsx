import React, { useState } from 'react';
import { Stack, Pagination } from '@mui/material';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { LIKE_TARGET_BOARD_ARTICLE } from '../../../apollo/user/mutation';
import { BoardArticle } from '../../types/board-article/board-article';
import { BoardArticlesInquiry } from '../../types/board-article/board-article.input';
import { Direction } from '../../enums/common.enum';
import { T } from '../../types/common';
import { userVar } from '../../../apollo/store';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import MyPageArticleCard from '../common/MyPageArticleCard';

const LIMIT = 6;

const MyArticles = () => {
	const user = useReactiveVar(userVar);
	const [articles, setArticles] = useState<BoardArticle[]>([]);
	const [total, setTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

	const inquiry: BoardArticlesInquiry = {
		page: currentPage,
		limit: LIMIT,
		sort: 'createdAt',
		direction: Direction.DESC,
		search: { memberId: user?._id },
	};

	const { refetch } = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: inquiry },
		skip: !user?._id,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setArticles(data?.getBoardArticles?.list ?? []);
			setTotal(data?.getBoardArticles?.metaCounter?.[0]?.total ?? 0);
		},
	});

	const [likeTargetBoardArticle] = useMutation(LIKE_TARGET_BOARD_ARTICLE);

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
		<Stack className="articles-content">
			<div className="articles-header">
				<h2 className="articles-title">Article</h2>
				<p className="articles-subtitle">We are glad to see you again!</p>
			</div>

			{articles.length > 0 ? (
				<>
					<div className="articles-grid">
						{articles.map((article) => (
							<MyPageArticleCard
								key={article._id}
								article={article}
								likedByMe={article.likedByMe?.[0]?.myFavorite ?? false}
								onLike={handleLike}
							/>
						))}
					</div>

					<div className="articles-pagination">
						<Pagination
							count={Math.ceil(total / LIMIT)}
							page={currentPage}
							onChange={(_e, page) => setCurrentPage(page)}
							shape="circular"
						/>
						<p className="articles-total">Total {total} article(s) available</p>
					</div>
				</>
			) : (
				<p className="articles-empty">No articles found.</p>
			)}
		</Stack>
	);
};

export default MyArticles;
