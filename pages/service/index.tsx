import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';

const services = [
	{
		icon: '/icons/Package.svg',
		title: 'Extensive Product Selection',
		desc: 'The diverse product selection allows customers to find furniture pieces that align with their style.',
	},
	{
		icon: '/icons/security.svg',
		title: 'Secure Payment Options',
		desc: 'Customer information and payment details are protected through secure encryption protocols.',
	},
	{
		icon: '/icons/cube_icon.svg',
		title: 'Personalized Design Assistance',
		desc: 'To assist customers in creating their dream home, StyleCasa provides personalized design assistance.',
	},
	{
		icon: '/icons/window_icon.svg',
		title: 'Interior Design Consultation',
		desc: 'The design experts offer professional advice on furniture styles, color schemes, and layout options',
	},
	{
		icon: '/icons/c_icon.svg',
		title: 'Delivery and Assembly',
		desc: "Offers white glove delivery service, ensuring that furniture is carefully delivered to the customer's doorstep",
	},
	{
		icon: '/icons/oval_icon.svg',
		title: 'Guidance and Support',
		desc: 'Expert guidance and support throughout the furniture selection and purchasing process.',
	},
];

const progressSteps = [
	{
		number: 1,
		title: 'Design and Conceptualisation',
		bullets: [
			'Style Casa starts its wooden furniture working progress by focusing on design and conceptualization.',
			'The team of skilled designers and craftsmen work together to create innovative and aesthetically pleasing furniture designs.',
		],
		image: '/img/furniture/brown_chair.png',
	},
	{
		number: 2,
		title: 'Material Selection',
		bullets: [
			'Style Casa pays great attention to the selection of high-quality materials for their wooden furniture.',
			'The materials are carefully chosen for their durability, strength, and natural beauty.',
		],
		image: '/img/furniture/wood_plant.png',
	},
	{
		number: 3,
		title: 'Craftsmanship and Manufacturing',
		bullets: [
			'The wooden furniture at Style Casa is crafted with meticulous attention to detail and precision.',
			'Skilled artisans and craftsmen use traditional and modern techniques to transform the selected materials into exquisite furniture pieces.',
		],
		image: '/img/furniture/plant_tripod.png',
	},
	{
		number: 4,
		title: 'Finishing and Surface Treatment',
		bullets: [
			'The furniture pieces go through various surface treatments, including staining, varnishing, and polishing.',
			'These treatments enhance the natural beauty of the wood, protect it from wear and tear, and ensure longevity.',
		],
		image: '/img/furniture/lamps.png',
	},
	{
		number: 5,
		title: 'Packaging and Delivery',
		bullets: [
			'Once the furniture is completed, it is carefully packaged to ensure safe transportation and delivery.',
			'The furniture is delivered to customers in a timely manner, with utmost care taken to ensure customer satisfaction.',
		],
		image: '/img/furniture/soft_chair.png',
	},
];

const reviews = [
	{
		name: 'Joan B. Wolfe',
		role: 'Manager',
		text: 'I wanted to furnish my new office with stylish and functional furniture, and StyleCasa exceeded my expectations.',
		stars: 4,
	},
	{
		name: 'Mira Dias',
		role: 'Manager',
		text: 'I am a satisfied customer and will continue to choose StyleCasa for all my furniture needs.',
		stars: 4,
	},
	{
		name: 'Lois K. Chase',
		role: 'Manager',
		text: 'Style casa furniture never fails to impress me. The durability and longevity of their products are unmatched.',
		stars: 4,
	},
	{
		name: 'Lois K. Chase',
		role: 'Manager',
		text: 'I highly recommend StyleCasa for anyone seeking high-quality and long-lasting furniture.',
		stars: 4,
	},
];

const Service = () => {
	const [countdown, setCountdown] = useState({ days: 10, hours: 18, mins: 23, secs: 0 });

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prev) => {
				let { days, hours, mins, secs } = prev;
				if (secs > 0) {
					secs--;
				} else if (mins > 0) {
					mins--;
					secs = 59;
				} else if (hours > 0) {
					hours--;
					mins = 59;
					secs = 59;
				} else if (days > 0) {
					days--;
					hours = 23;
					mins = 59;
					secs = 59;
				}
				return { days, hours, mins, secs };
			});
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<Stack className="service-page">
			{/* ===== OUR AWESOME SERVICES (6 cards) ===== */}
			<Stack className="svc-awesome" alignItems="center">
				<Typography className="svc-awesome-title">Our Awesome Services</Typography>
				<Box className="svc-awesome-grid">
					{services.map((svc) => (
						<Box className="svc-card" key={svc.title}>
							<Box className="svc-card-icon">
								<img src={svc.icon} alt={svc.title} />
							</Box>
							<Box>
								<Typography className="svc-card-title">{svc.title}</Typography>
								<Typography className="svc-card-desc">{svc.desc}</Typography>
								<Box className="svc-card-link">
									<span>Learn more</span>
									<ArrowForwardIcon />
								</Box>
							</Box>
						</Box>
					))}
				</Box>
			</Stack>

			{/* ===== OUR WORKING PROGRESS ===== */}
			<Stack className="svc-progress">
				<Typography className="svc-progress-title">Our working Progress</Typography>
				<Box className="svc-progress-container">
					{progressSteps.map((step, idx) => (
						<Box className={`progress-step ${idx % 2 !== 0 ? 'reverse' : ''}`} key={step.number}>
							<Box className="progress-image">
								<img src={step.image} alt={step.title} />
							</Box>
							<Box className="progress-content">
								<Typography className="progress-step-title">
									{step.number}. {step.title}
								</Typography>
								<ul className="progress-bullets">
									{step.bullets.map((bullet, i) => (
										<li key={i}>{bullet}</li>
									))}
								</ul>
							</Box>
						</Box>
					))}
				</Box>
			</Stack>

			{/* ===== FEEDBACK FROM CUSTOMER ===== */}
			<Stack className="about-feedback">
				<Stack className="feedback-header" direction="row" justifyContent="space-between" alignItems="center">
					<Typography className="feedback-title">Feedback from Customer</Typography>
					<Stack className="feedback-nav" direction="row">
						<ArrowBackIcon className="nav-arrow" />
						<ArrowForwardIcon className="nav-arrow" />
					</Stack>
				</Stack>
				<Stack className="feedback-cards" direction="row">
					{reviews.map((review, idx) => (
						<Box className="feedback-card" key={idx}>
							<Stack className="feedback-user" direction="row" alignItems="center">
								<Box className="feedback-avatar">
									<img src="/img/furniture/brown_chair.png" alt={review.name} />
								</Box>
								<Stack>
									<Typography className="feedback-user-name">{review.name}</Typography>
									<Typography className="feedback-user-role">{review.role}</Typography>
								</Stack>
							</Stack>
							<Stack gap="8px">
								<Stack className="feedback-stars" direction="row">
									{[...Array(5)].map((_, i) =>
										i < review.stars ? <StarIcon key={i} /> : <StarBorderIcon key={i} />,
									)}
								</Stack>
								<Typography className="feedback-text">{review.text}</Typography>
							</Stack>
						</Box>
					))}
				</Stack>
			</Stack>

			{/* ===== SALE BANNER WITH COUNTDOWN ===== */}
			<Box className="svc-sale-banner">
				<Box className="sale-bg" />
				<Box className="sale-content-wrap">
					<Box className="sale-image">
						<img src="/img/furniture/luxury_chair.jpg" alt="Sale" />
					</Box>
					<Stack className="sale-info">
						<Stack className="sale-top">
							<Typography className="sale-title">
								30% Off All Furniture
								<br />
								Don&apos;t Miss Out!
							</Typography>
							<Box>
								<Stack className="countdown-row">
									<Box className="countdown-circle">
										<span>{String(countdown.days).padStart(2, '0')}</span>
									</Box>
									<Typography className="countdown-colon">:</Typography>
									<Box className="countdown-circle">
										<span>{String(countdown.hours).padStart(2, '0')}</span>
									</Box>
									<Typography className="countdown-colon">:</Typography>
									<Box className="countdown-circle">
										<span>{String(countdown.mins).padStart(2, '0')}</span>
									</Box>
									<Typography className="countdown-colon">:</Typography>
									<Box className="countdown-circle">
										<span>{String(countdown.secs).padStart(2, '0')}</span>
									</Box>
								</Stack>
								<Stack className="countdown-labels" direction="row">
									<span>Days</span>
									<span>Hours</span>
									<span>Mins</span>
									<span>Secs</span>
								</Stack>
							</Box>
							<Button variant="contained" className="btn-shop-now">
								SHOP NOW
							</Button>
						</Stack>
						<Stack className="sale-thumbnails" direction="row">
							<Box className="sale-thumb">
								<img src="/img/furniture/soft_chair.png" alt="Product 1" />
							</Box>
							<Box className="sale-thumb">
								<img src="/img/furniture/brown_chair.png" alt="Product 2" />
							</Box>
						</Stack>
					</Stack>
				</Box>
			</Box>

			{/* ===== FEATURES ROW ===== */}
			<Stack className="about-features">
				<Stack className="features-container" direction="row" justifyContent="space-between">
					{[
						{ icon: '/icons/Delivery_Truck.svg', title: 'Free Shipping', desc: 'From all orders over $100' },
						{ icon: '/icons/Badge_Dollar.svg', title: 'Free Returns', desc: 'Return money within 30 days' },
						{ icon: '/icons/Package.svg', title: 'Secure Shopping', desc: "You're in safe hands" },
						{ icon: '/icons/reward_icon.svg', title: 'Best Quality', desc: 'We have everything you need' },
					].map((feature) => (
						<Box className="feature-box" key={feature.title}>
							<Box className="feature-box-icon">
								<img src={feature.icon} alt={feature.title} />
							</Box>
							<Typography className="feature-box-title">{feature.title}</Typography>
							<Typography className="feature-box-desc">{feature.desc}</Typography>
						</Box>
					))}
				</Stack>
			</Stack>

			{/* ===== NEWSLETTER BANNER ===== */}
			<Stack className="about-newsletter">
				<Box className="newsletter-container">
					<Typography className="newsletter-title">
						Get <span className="highlight">30% Discount</span> Buying First Product
					</Typography>
					<Stack className="newsletter-form" direction="row" alignItems="center">
						<input className="newsletter-input" type="email" placeholder="example@gmail.com" />
						<Button variant="contained" className="btn-subscribe">
							SUBSCRIBE
						</Button>
					</Stack>
				</Box>
			</Stack>

			{/* ===== INSTAGRAM SECTION ===== */}
			<Stack className="about-instagram">
				<Stack className="instagram-header" direction="row" justifyContent="space-between" alignItems="center">
					<Typography className="instagram-title">Follow on Instagram</Typography>
					<Button variant="outlined" className="btn-follow">
						FOLLOW US
					</Button>
				</Stack>
				<Stack className="instagram-grid" direction="row" justifyContent="center">
					{[1, 2, 3, 4, 5, 6].map((item) => (
						<Box className="instagram-item" key={item}>
							<img src="/img/furniture/luxury_chair.jpg" alt={`Instagram ${item}`} />
						</Box>
					))}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default withLayoutBasic(Service);
