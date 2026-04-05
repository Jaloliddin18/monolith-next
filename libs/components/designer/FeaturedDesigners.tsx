import React from 'react';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { Member } from '../../types/member/member';
import { REACT_APP_API_URL } from '../../config';

const DEFAULT_IMAGE = '/img/furniture/luxury_chair.jpg';

interface FeaturedDesignersProps {
	designers: Member[];
}

const FeaturedDesigners = ({ designers }: FeaturedDesignersProps) => {
	const router = useRouter();

	const handleClick = (id: string) => {
		router.push(`/member/detail?memberId=${id}`);
	};

	if (!designers.length) return null;

	return (
		<Stack className="featured-designers-section">
			<div className="featured-designers-header">
				<span className="featured-designers-label">Spotlight</span>
				<h2 className="featured-designers-title">Featured Designers</h2>
				<p className="featured-designers-desc">
					Exceptional talent handpicked for their innovation, craftsmanship, and design philosophy
				</p>
			</div>
			<div className="featured-designers-grid">
				{designers.map((designer) => {
					const image = designer.memberImage
						? `${REACT_APP_API_URL}/${designer.memberImage}`
						: DEFAULT_IMAGE;

					return (
						<div
							key={designer._id}
							className="featured-designer-card"
							onClick={() => handleClick(designer._id)}
						>
							<div className="featured-card-image">
								<img src={image} alt={designer.memberNick} />
								<div className="featured-card-overlay">
									<span className="featured-card-badge">Featured</span>
								</div>
							</div>
							<div className="featured-card-content">
								<div className="featured-card-top">
									<h3 className="featured-card-name">
										{designer.memberFullName ?? designer.memberNick}
									</h3>
									<span className="featured-card-role">{designer.memberAddress ?? 'Designer'}</span>
								</div>
								{designer.memberDesc && (
									<p className="featured-card-quote">"{designer.memberDesc}"</p>
								)}
								<div className="featured-card-stats">
									<div className="featured-stat">
										<span className="featured-stat-value">{designer.memberDesigns}</span>
										<span className="featured-stat-label">Designs</span>
									</div>
									<div className="featured-stat-divider" />
									<div className="featured-stat">
										<span className="featured-stat-value">{designer.memberFollowers}</span>
										<span className="featured-stat-label">Followers</span>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</Stack>
	);
};

export default FeaturedDesigners;
