import React from 'react';
import { useRouter } from 'next/router';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { BoardArticle } from '../../types/board-article/board-article';
import { REACT_APP_API_URL } from '../../config';

const DEFAULT_IMAGE = '/img/furniture/luxury_chair.jpg';

interface MyPageArticleCardProps {
	article: BoardArticle;
	likedByMe?: boolean;
	onLike?: (e: React.MouseEvent, id: string) => void;
}

const MyPageArticleCard = ({ article, likedByMe, onLike }: MyPageArticleCardProps) => {
	const router = useRouter();
	const date = new Date(article.createdAt);
	const month = date.toLocaleString('en-US', { month: 'long' });
	const day = date.getDate();
	const image = article.articleImage ? `${REACT_APP_API_URL}/${article.articleImage}` : DEFAULT_IMAGE;
	const author = article.memberData;
	const authorName = author?.memberFullName || author?.memberNick || 'Anonymous';

	return (
		<div className="mypage-article-card" onClick={() => router.push(`/community/detail?articleId=${article._id}`)}>
			<div className="mypage-article-card-image">
				<img src={image} alt={article.articleTitle} />
				<div className="mypage-article-card-date">
					<span className="date-month">{month}</span>
					<span className="date-day">{day}</span>
				</div>
			</div>
			<div className="mypage-article-card-body">
				<span className="mypage-article-card-category">{article.articleCategory}</span>
				<p className="mypage-article-card-title">{article.articleTitle}</p>
				<span className="mypage-article-card-author">{authorName}</span>
				<div className="mypage-article-card-stats">
					<span className="mypage-article-card-stat">
						<VisibilityOutlinedIcon sx={{ fontSize: 15 }} />
						{article.articleViews}
					</span>
					<span
						className={`mypage-article-card-stat mypage-article-card-like ${likedByMe ? 'liked' : ''}`}
						onClick={(e) => {
							e.stopPropagation();
							onLike?.(e, article._id);
						}}
					>
						{likedByMe ? (
							<FavoriteIcon sx={{ fontSize: 15, color: '#C46A4A' }} />
						) : (
							<FavoriteBorderIcon sx={{ fontSize: 15 }} />
						)}
						{article.articleLikes}
					</span>
				</div>
			</div>
		</div>
	);
};

export default MyPageArticleCard;
