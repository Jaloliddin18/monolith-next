import React, { useState } from 'react';
import { Box, Stack, Typography, InputBase } from '@mui/material';

const NewsletterBanner = () => {
	const [email, setEmail] = useState('');

	return (
		<Stack className="newsletter-banner" alignItems="center">
			<Typography className="newsletter-title">
				Get <span className="highlight">30% Discount</span> Buying First Product
			</Typography>
			<Stack direction="row" alignItems="stretch" gap="12px">
				<Box className="newsletter-input-wrap">
					<InputBase
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="example@gmail.com"
						className="newsletter-input"
						sx={{
							width: '100%',
							fontFamily: "'Jost', sans-serif",
							fontSize: '16px',
							color: '#000',
							'& input::placeholder': { color: '#999', opacity: 1 },
						}}
					/>
				</Box>
				<Box className="newsletter-btn">
					<Typography className="newsletter-btn-text">SUBSCRIBE</Typography>
				</Box>
			</Stack>
		</Stack>
	);
};

export default NewsletterBanner;
