import React from 'react';
import { useRouter } from 'next/router';

interface BlogArticleCardProps {
	id: string;
	image: string;
	category: string;
	date: string;
	title: string;
}

const BlogArticleCard = ({ id, image, category, date, title }: BlogArticleCardProps) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/community/detail?articleId=${id}`);
	};

	return (
		<div className="blog-article-card" onClick={handleClick}>
			<div className="blog-article-card-image">
				<img src={image} alt={title} />
			</div>
			<div className="blog-article-card-content">
				<div className="blog-article-card-meta">
					<span className="blog-article-card-badge">{category}</span>
					<span className="blog-article-card-date">{date}</span>
				</div>
				<p className="blog-article-card-title">{title}</p>
			</div>
		</div>
	);
};

export default BlogArticleCard;
