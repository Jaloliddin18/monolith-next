import React from 'react';
import { useRouter } from 'next/router';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

interface BlogCardProps {
	id: string;
	image: string;
	category: string;
	date: string;
	title: string;
	likes?: number;
	views?: number;
	comments?: number;
	likedByMe?: boolean;
	onLike?: (e: React.MouseEvent) => void;
}

const BlogCard = ({ id, image, category, date, title, likes, views, comments, likedByMe, onLike }: BlogCardProps) => {
	const router = useRouter();

	return (
		<div className="blog-card" onClick={() => router.push(`/community/detail?articleId=${id}`)}>
			<div className="blog-card-image">
				<img src={image} alt={title} />
				<span className="blog-card-category-badge">{category}</span>
			</div>
			<div className="blog-card-content">
				<span className="blog-card-date">{date}</span>
				<p className="blog-card-title">{title}</p>
				<div className="blog-card-stats">
					{views !== undefined && (
						<span className="blog-card-stat">
							<VisibilityOutlinedIcon sx={{ fontSize: 15 }} />
							{views}
						</span>
					)}
					{comments !== undefined && (
						<span className="blog-card-stat">
							<ChatBubbleOutlineIcon sx={{ fontSize: 15 }} />
							{comments}
						</span>
					)}
					{likes !== undefined && (
						<span
							className={`blog-card-stat blog-card-like ${likedByMe ? 'liked' : ''}`}
							onClick={(e) => { e.stopPropagation(); onLike?.(e); }}
						>
							{likedByMe
								? <FavoriteIcon sx={{ fontSize: 15, color: '#e57373' }} />
								: <FavoriteBorderIcon sx={{ fontSize: 15 }} />
							}
							{likes}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
