import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const InstagramSection = () => {
	return (
		<Stack className="instagram-section">
			<Typography className="section-title" variant="h2" textAlign="center" mb={4}>
				Follow on Instagram
			</Typography>
			<Stack direction="row" className="instagram-grid" gap={2} justifyContent="center">
				{[1, 2, 3, 4, 5, 6].map((i) => (
					<Box key={i} className="instagram-item">
						<img src={`/img/furniture/instagram-${i}.png`} alt={`Instagram ${i}`} />
					</Box>
				))}
			</Stack>
		</Stack>
	);
};

export default InstagramSection;
