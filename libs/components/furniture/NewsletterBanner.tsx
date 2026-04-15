import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { SUBSCRIBE_NEWSLETTER } from '../../../apollo/user/mutation';
import { sweetTopSmallSuccessAlert, sweetMixinErrorAlert } from '../../sweetAlert';

type NewsletterVariant = 'furniture' | 'community' | 'about' | 'cs';

const FurnitureSVG = () => (
	<svg width="260" height="220" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
		<rect x="-20" y="130" width="200" height="60" rx="12" fill="#C46A4A" fillOpacity="0.13" />
		<rect x="10" y="110" width="30" height="30" rx="6" fill="#C46A4A" fillOpacity="0.12" />
		<rect x="130" y="110" width="30" height="30" rx="6" fill="#C46A4A" fillOpacity="0.12" />
		<ellipse cx="80" cy="108" rx="60" ry="22" fill="#C46A4A" fillOpacity="0.10" />
		<rect x="-30" y="186" width="220" height="12" rx="6" fill="#C46A4A" fillOpacity="0.09" />
		<circle cx="180" cy="60" r="50" fill="#C46A4A" fillOpacity="0.08" />
		<rect x="140" y="30" width="60" height="60" rx="8" fill="#C46A4A" fillOpacity="0.07" />
	</svg>
);

const CommunitySVG = () => (
	<svg width="240" height="220" viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
		<rect x="-20" y="60" width="180" height="110" rx="20" fill="#C46A4A" fillOpacity="0.12" />
		<polygon points="-10,170 30,170 10,200" fill="#C46A4A" fillOpacity="0.12" />
		<rect x="20" y="90" width="100" height="10" rx="5" fill="#C46A4A" fillOpacity="0.15" />
		<rect x="20" y="112" width="70" height="10" rx="5" fill="#C46A4A" fillOpacity="0.12" />
		<rect x="20" y="134" width="85" height="10" rx="5" fill="#C46A4A" fillOpacity="0.10" />
		<circle cx="190" cy="50" r="40" fill="#C46A4A" fillOpacity="0.08" />
		<rect x="170" y="30" width="50" height="8" rx="4" fill="#C46A4A" fillOpacity="0.12" />
		<rect x="170" y="50" width="35" height="8" rx="4" fill="#C46A4A" fillOpacity="0.10" />
	</svg>
);

const AboutSVG = () => (
	<svg width="250" height="220" viewBox="0 0 250 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
		<rect x="-10" y="80" width="140" height="130" rx="4" fill="#C46A4A" fillOpacity="0.10" />
		<rect x="20" y="60" width="80" height="130" rx="4" fill="#C46A4A" fillOpacity="0.12" />
		<rect x="55" y="40" width="50" height="150" rx="4" fill="#C46A4A" fillOpacity="0.09" />
		<rect x="10" y="200" width="160" height="10" rx="2" fill="#C46A4A" fillOpacity="0.13" />
		<circle cx="190" cy="70" r="42" fill="#C46A4A" fillOpacity="0.08" />
		<circle cx="190" cy="70" r="22" fill="#C46A4A" fillOpacity="0.10" />
		<rect x="175" y="112" width="30" height="60" rx="4" fill="#C46A4A" fillOpacity="0.09" />
	</svg>
);

const CsSVG = () => (
	<svg width="240" height="220" viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
		<circle cx="60" cy="100" r="55" stroke="#C46A4A" strokeOpacity="0.13" strokeWidth="28" fill="none" />
		<path d="M5 100 Q5 50 60 50" stroke="#C46A4A" strokeOpacity="0.12" strokeWidth="20" fill="none" strokeLinecap="round" />
		<path d="M115 100 Q115 50 60 50" stroke="#C46A4A" strokeOpacity="0.12" strokeWidth="20" fill="none" strokeLinecap="round" />
		<rect x="45" y="148" width="30" height="40" rx="6" fill="#C46A4A" fillOpacity="0.12" />
		<rect x="25" y="182" width="70" height="12" rx="6" fill="#C46A4A" fillOpacity="0.10" />
		<circle cx="190" cy="70" r="38" fill="#C46A4A" fillOpacity="0.08" />
		<rect x="168" y="58" width="44" height="8" rx="4" fill="#C46A4A" fillOpacity="0.13" />
		<rect x="175" y="74" width="30" height="8" rx="4" fill="#C46A4A" fillOpacity="0.10" />
		<rect x="170" y="90" width="38" height="8" rx="4" fill="#C46A4A" fillOpacity="0.09" />
	</svg>
);

const VARIANT_SVG: Record<NewsletterVariant, React.FC> = {
	furniture: FurnitureSVG,
	community: CommunitySVG,
	about: AboutSVG,
	cs: CsSVG,
};

interface NewsletterBannerProps {
	variant?: NewsletterVariant;
}

const NewsletterBanner = ({ variant = 'furniture' }: NewsletterBannerProps) => {
	const DecorativeSVG = VARIANT_SVG[variant];
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
			<Box className="newsletter-deco">
				<DecorativeSVG />
			</Box>
			<Typography className="newsletter-title">
				Get <span className="highlight">30% Discount</span> Buying First Product
			</Typography>
			{submitted ? (
				<Typography className="newsletter-success">
					You are subscribed! Thank you.
				</Typography>
			) : (
				<Stack direction="row" alignItems="center" gap="12px">
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
							{loading ? '...' : 'Subscribe'}
						</Typography>
					</Box>
				</Stack>
			)}
		</Stack>
	);
};

export default NewsletterBanner;
