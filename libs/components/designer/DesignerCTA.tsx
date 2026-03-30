import React from 'react';
import { Stack } from '@mui/material';

const DesignerCTA = () => {
	return (
		<Stack className="designer-cta-section">
			<div className="designer-cta-content">
				<span className="designer-cta-label">Join Our Community</span>
				<h2 className="designer-cta-title">Are You a Furniture Designer?</h2>
				<p className="designer-cta-desc">
					Showcase your portfolio to thousands of furniture enthusiasts. Join our curated network
					of talented designers and connect with clients who value exceptional craftsmanship.
				</p>
				<div className="designer-cta-features">
					<div className="designer-cta-feature">
						<span className="cta-feature-icon">&#9670;</span>
						<span className="cta-feature-text">Showcase your portfolio</span>
					</div>
					<div className="designer-cta-feature">
						<span className="cta-feature-icon">&#9670;</span>
						<span className="cta-feature-text">Connect with clients</span>
					</div>
					<div className="designer-cta-feature">
						<span className="cta-feature-icon">&#9670;</span>
						<span className="cta-feature-text">Grow your audience</span>
					</div>
				</div>
				<button className="designer-cta-btn" type="button">Apply as Designer</button>
			</div>
		</Stack>
	);
};

export default DesignerCTA;
