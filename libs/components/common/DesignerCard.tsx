import React from 'react';
import { useRouter } from 'next/router';

interface DesignerCardProps {
	id: string;
	image: string;
	name: string;
	role: string;
	designs: number;
	followers: number;
}

const DesignerCard = ({ id, image, name, role, designs, followers }: DesignerCardProps) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/member?memberId=${id}`);
	};

	return (
		<div className="designer-card" onClick={handleClick}>
			<div className="designer-card-image">
				<img src={image} alt={name} />
			</div>
			<div className="designer-card-info">
				<h3 className="designer-card-name">{name}</h3>
				<p className="designer-card-role">{role}</p>
				<div className="designer-card-stats">
					<div className="designer-stat">
						<span className="stat-value">{designs}</span>
						<span className="stat-label">Designs</span>
					</div>
					<div className="designer-stat-divider" />
					<div className="designer-stat">
						<span className="stat-value">{followers}</span>
						<span className="stat-label">Followers</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DesignerCard;
