import React from 'react';
import { useRouter } from 'next/router';

interface BlogCardProps {
	id: string;
	image: string;
	category: string;
	date: string;
	title: string;
}

const BlogCard = ({ id, image, category, date, title }: BlogCardProps) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/community/detail?articleId=${id}`);
	};

	return (
		<div className="blog-card" onClick={handleClick}>
			<div className="blog-card-image">
				<img src={image} alt={title} />
			</div>
			<div className="blog-card-content">
				<div className="blog-card-meta">
					<span className="blog-card-category">{category}</span>
					<span className="blog-card-date">{date}</span>
				</div>
				<p className="blog-card-title">{title}</p>
			</div>
		</div>
	);
};

export default BlogCard;
