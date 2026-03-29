import React from 'react';
import { Stack } from '@mui/material';

const DEFAULT_IMAGE = '/img/furniture/luxury_chair.jpg';

const instagramImages = [
	{ id: 1, image: DEFAULT_IMAGE },
	{ id: 2, image: DEFAULT_IMAGE },
	{ id: 3, image: DEFAULT_IMAGE },
	{ id: 4, image: DEFAULT_IMAGE },
	{ id: 5, image: DEFAULT_IMAGE },
	{ id: 6, image: DEFAULT_IMAGE },
];

const InstagramSection = () => {
	return (
		<Stack className="instagram-section">
			<div className="instagram-header">
				<h2 className="section-title">Follow on Instagram</h2>
				<a
					href="https://instagram.com/style_casa"
					target="_blank"
					rel="noopener noreferrer"
					className="instagram-handle"
				>
					@style_casa
				</a>
			</div>
			<div className="instagram-grid">
				{instagramImages.map((item, index) => (
					<div className="instagram-item" key={item.id}>
						<img src={item.image} alt={`Instagram post ${item.id}`} />
						{index === 2 && (
							<div className="instagram-overlay">
								<img src="/icons/InstagramLogo.svg" alt="Instagram" width={40} height={40} />
							</div>
						)}
					</div>
				))}
			</div>
		</Stack>
	);
};

export default InstagramSection;
