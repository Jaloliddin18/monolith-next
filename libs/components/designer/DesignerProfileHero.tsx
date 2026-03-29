import React from 'react';
import { Stack } from '@mui/material';

const DEFAULT_IMAGE = '/general_images/hello_guy.jpg';

const DesignerProfileHero = () => {
	return (
		<Stack className="designer-profile-hero">
			<div className="designer-profile-cover">
				<div className="designer-profile-cover-overlay" />
			</div>
			<div className="designer-profile-hero-content">
				<div className="designer-profile-avatar">
					<img src={DEFAULT_IMAGE} alt="Emily Nakamura" />
				</div>
				<div className="designer-profile-info">
					<span className="designer-profile-badge">Furniture Architect</span>
					<h1 className="designer-profile-name">Emily Nakamura</h1>
					<p className="designer-profile-location">San Francisco, California</p>
				</div>
				<div className="designer-profile-stats-row">
					<div className="designer-profile-stat">
						<span className="designer-profile-stat-value">47</span>
						<span className="designer-profile-stat-label">Designs</span>
					</div>
					<div className="designer-profile-stat-divider" />
					<div className="designer-profile-stat">
						<span className="designer-profile-stat-value">1,240</span>
						<span className="designer-profile-stat-label">Followers</span>
					</div>
					<div className="designer-profile-stat-divider" />
					<div className="designer-profile-stat">
						<span className="designer-profile-stat-value">98%</span>
						<span className="designer-profile-stat-label">Satisfaction</span>
					</div>
					<div className="designer-profile-stat-divider" />
					<div className="designer-profile-stat">
						<span className="designer-profile-stat-value">8+</span>
						<span className="designer-profile-stat-label">Years Exp.</span>
					</div>
				</div>
				<div className="designer-profile-actions">
					<button className="designer-follow-btn" type="button">Follow</button>
					<button className="designer-contact-btn" type="button">Contact</button>
				</div>
			</div>
		</Stack>
	);
};

export default DesignerProfileHero;
