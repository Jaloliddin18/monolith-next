import React from 'react';
import { Stack } from '@mui/material';

const DesignerHero = () => {
	return (
		<Stack className="designer-hero">
			<div className="designer-hero-content">
				<span className="designer-hero-label">Our Creative Team</span>
				<h1 className="designer-hero-title">Meet Our Designers</h1>
				<p className="designer-hero-desc">
					Talented artisans and visionaries who bring timeless furniture designs to life. Each
					designer brings a unique perspective, blending craftsmanship with modern aesthetics.
				</p>
			</div>
		</Stack>
	);
};

export default DesignerHero;
