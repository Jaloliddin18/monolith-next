import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';

const instagramImages = [
	'/img/furniture/instagram-1.png',
	'/img/furniture/instagram-2.png',
	'/img/furniture/instagram-3.png',
	'/img/furniture/instagram-4.png',
	'/img/furniture/instagram-5.png',
	'/img/furniture/instagram-6.png',
];

const InstagramSection = () => {
	return (
		<Stack className="instagram-section" alignItems="center" gap="50px">
			<Stack className="instagram-header" direction="row" justifyContent="space-between" alignItems="center">
				<Typography className="section-title-text">Follow on Instagram</Typography>
				<Button className="btn-outline-brown" variant="outlined">
					@style_casa
				</Button>
			</Stack>
			<Stack direction="row" gap="24px" className="instagram-grid">
				{instagramImages.map((img, i) => (
					<Box key={i} className="instagram-item">
						<img src={img} alt={`Instagram ${i + 1}`} />
						{i === 2 && (
							<Box className="instagram-overlay">
								<img src="/icons/InstagramLogo.svg" alt="Instagram" width={40} height={40} />
							</Box>
						)}
					</Box>
				))}
			</Stack>
		</Stack>
	);
};

export default InstagramSection;
