import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { SUBSCRIBE_NEWSLETTER } from '../../../apollo/user/mutation';
import { sweetTopSmallSuccessAlert, sweetMixinErrorAlert } from '../../sweetAlert';

const NewsletterBanner = () => {
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const [subscribe, { loading }] = useMutation(SUBSCRIBE_NEWSLETTER);

	const handleSubscribe = async () => {
		const trimmed = email.trim();
		if (!trimmed) return;
		try {
			await subscribe({ variables: { input: { subscriberEmail: trimmed } } });
			setSubmitted(true);
			setEmail('');
			await sweetTopSmallSuccessAlert('Subscribed! Check your inbox.', 2000);
		} catch (err: any) {
			await sweetMixinErrorAlert(err.message);
		}
	};

	return (
		<Stack className="newsletter-banner" alignItems="center">
			<Typography className="newsletter-title">
				Get <span className="highlight">30% Discount</span> Buying First Product
			</Typography>
			{submitted ? (
				<Typography className="newsletter-success">
					You are subscribed! Thank you.
				</Typography>
			) : (
				<Stack direction="row" alignItems="stretch" gap="12px">
					<Box className="newsletter-input-wrap">
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
							placeholder="example@gmail.com"
							className="newsletter-input"
							disabled={loading}
						/>
					</Box>
					<Box
						className={`newsletter-btn${loading ? ' newsletter-btn--loading' : ''}`}
						onClick={handleSubscribe}
					>
						<Typography className="newsletter-btn-text">
							{loading ? '...' : 'SUBSCRIBE'}
						</Typography>
					</Box>
				</Stack>
			)}
		</Stack>
	);
};

export default NewsletterBanner;
