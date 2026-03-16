import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowUpwardIcon from '@mui/icons-material/NorthEast';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';

const About = () => {
	return (
		<Stack className="about-page">
			{/* ===== HERO SECTION ===== */}
			<Stack className="about-hero">
				<Box className="about-hero-content">
					<Typography className="about-hero-title" variant="h1">
						With over 15 years of expertise in crafting exquisite wooden furniture
					</Typography>
					<Typography className="about-hero-subtitle">
						At StyleCasa, we take pride in offering a wide range of exquisite wooden furniture that combines
						elegance, functionality, and durability.
					</Typography>
				</Box>
				<Box className="about-hero-video">
					<img src="/img/furniture/luxury_chair.jpg" alt="About StyleCasa" />
					<Box className="video-overlay">
						<Box className="play-btn">
							<PlayArrowIcon />
						</Box>
					</Box>
				</Box>
			</Stack>

			{/* ===== PARTNER LOGOS ===== */}
			<Stack className="about-partners" direction="row" alignItems="center" justifyContent="space-between">
				<Box className="partner-logo">
					<Typography sx={{ fontFamily: "'Josefin Slab', serif", fontWeight: 600, fontSize: 22, color: '#653c3c', lineHeight: '26px' }}>
						PineCrest<br />Interiors
					</Typography>
				</Box>
				<Box className="partner-logo">
					<Typography sx={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: 20, color: '#333' }}>
						Timber & Oak
					</Typography>
				</Box>
				<Box className="partner-logo">
					<Typography sx={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: 18, color: '#333' }}>
						WillowWood Furnishings
					</Typography>
				</Box>
				<Box className="partner-logo">
					<Typography sx={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: 20, color: '#333' }}>
						HomeStyle Co.
					</Typography>
				</Box>
				<Box className="partner-logo">
					<Typography sx={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: 16, color: '#333' }}>
						CedarGrove
					</Typography>
				</Box>
			</Stack>

			{/* ===== WHY CHOOSE US ===== */}
			<Stack className="about-why-choose">
				<Stack className="why-choose-container" direction="row" alignItems="center">
					<Box className="why-choose-image">
						<img src="/img/furniture/soft_chair.png" alt="Why Choose Us" />
					</Box>
					<Stack className="why-choose-content">
						<Typography className="why-choose-title">Why Choose us?</Typography>
						<Typography className="why-choose-desc">
							StyleCasa is known for its exceptional craftsmanship and attention to detail. Each piece of
							furniture is meticulously crafted by skilled artisans, ensuring the highest quality and
							durability.
						</Typography>
						<Stack className="why-choose-features">
							<Stack className="feature-item" direction="row" alignItems="center">
								<Box className="feature-icon">
									<img src="/icons/reward_icon.svg" alt="Quality Materials" />
								</Box>
								<Typography className="feature-text">Quality Materials</Typography>
							</Stack>
							<Stack className="feature-item" direction="row" alignItems="center">
								<Box className="feature-icon">
									<img src="/icons/reward_icon.svg" alt="Satisfaction Guaranteed" />
								</Box>
								<Typography className="feature-text">Satisfaction Guaranteed</Typography>
							</Stack>
							<Stack className="feature-item" direction="row" alignItems="center">
								<Box className="feature-icon">
									<img src="/icons/Badge_Dollar.svg" alt="Competitive Pricing" />
								</Box>
								<Typography className="feature-text">Competitive Pricing</Typography>
							</Stack>
						</Stack>
					</Stack>
				</Stack>

				{/* Stats Row */}
				<Stack className="about-stats" direction="row" justifyContent="space-between" sx={{ maxWidth: 1140, width: '100%', mt: '40px' }}>
					{[
						{ value: '44+', label: 'Years Experience' },
						{ value: '100%', label: 'Quality Products' },
						{ value: '50+', label: 'Worldwide Stores' },
						{ value: '97%', label: 'Satisfied Customers' },
					].map((stat) => (
						<Box className="stat-item" key={stat.label}>
							<Typography className="stat-value">{stat.value}</Typography>
							<Typography className="stat-label">{stat.label}</Typography>
						</Box>
					))}
				</Stack>
			</Stack>

			{/* ===== AWARDS SECTION ===== */}
			<Stack className="about-awards">
				<Stack className="awards-container" direction="row" alignItems="center">
					<Box className="awards-image">
						<img src="/img/furniture/brown_chair.png" alt="Awards" />
					</Box>
					<Stack className="awards-content">
						<Typography className="awards-title">Awards we have gained</Typography>
						<Box className="awards-grid">
							<Stack className="awards-row" direction="row">
								<Box className="award-item">
									<Typography className="award-year">2023</Typography>
									<Typography className="award-name">Best Furniture Retailer of the Year</Typography>
								</Box>
								<Box className="award-item">
									<Typography className="award-year">2020</Typography>
									<Typography className="award-name">
										Sustainable Furniture Brand of the Year
									</Typography>
								</Box>
							</Stack>
							<Stack className="awards-row" direction="row">
								<Box className="award-item">
									<Typography className="award-year">2023</Typography>
									<Typography className="award-name">Best Furniture Retailer of the Year</Typography>
								</Box>
								<Box className="award-item">
									<Typography className="award-year">2020</Typography>
									<Typography className="award-name">
										Sustainable Furniture Brand of the Year
									</Typography>
								</Box>
							</Stack>
						</Box>
					</Stack>
				</Stack>
			</Stack>

			{/* ===== SHOP BY CATEGORY ===== */}
			<Stack className="about-category">
				<Stack className="about-category-container">
					<Stack className="category-header" direction="row" justifyContent="space-between" alignItems="center">
						<Typography className="category-title">Shop by Category</Typography>
						<Box className="category-view-all">
							<Typography sx={{ fontFamily: "'Jost', sans-serif", fontSize: 18, fontWeight: 500, color: '#a86464' }}>
								View All
							</Typography>
							<ArrowUpwardIcon sx={{ fontSize: 20, color: '#a86464' }} />
						</Box>
					</Stack>
					<Stack className="category-items" direction="row">
						{[
							{ icon: '/icons/Frame.svg', name: 'Lamp' },
							{ icon: '/icons/Desk.svg', name: 'Desks' },
							{ icon: '/icons/chair.svg', name: 'Chair' },
							{ icon: '/icons/Sofa.svg', name: 'Sofas' },
							{ icon: '/icons/bed.svg', name: 'Bed' },
							{ icon: '/icons/Table.svg', name: 'Table' },
						].map((cat) => (
							<Box className="category-item" key={cat.name}>
								<Box className="category-icon">
									<img src={cat.icon} alt={cat.name} />
								</Box>
								<Typography className="category-name">{cat.name}</Typography>
							</Box>
						))}
					</Stack>
				</Stack>
			</Stack>

			{/* ===== FURNITURE SERVICES ===== */}
			<Stack className="about-services">
				<Stack className="about-services-container">
					<Stack className="services-header" direction="row" justifyContent="space-between" alignItems="center">
						<Typography className="services-title">Furniture Services</Typography>
						<Stack className="services-nav" direction="row">
							<ArrowBackIcon className="nav-arrow" />
							<ArrowForwardIcon className="nav-arrow" />
						</Stack>
					</Stack>
					<Stack className="services-cards" direction="row">
						{[
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
						].map((service) => (
							<Box className="service-card-item" key={service.title}>
								<Box className="service-card-icon">
									<img src={service.icon} alt={service.title} />
								</Box>
								<Box>
									<Typography className="service-card-title">{service.title}</Typography>
									<Typography className="service-card-desc">{service.desc}</Typography>
									<Box className="service-card-link">
										<Typography sx={{ fontFamily: "'Jost', sans-serif", fontSize: 18, fontWeight: 500, color: '#a86464' }}>
											Learn more
										</Typography>
										<ArrowForwardIcon sx={{ fontSize: 20, color: '#a86464' }} />
									</Box>
								</Box>
							</Box>
						))}
					</Stack>
				</Stack>
			</Stack>

			{/* ===== WIDE RANGE OF SELECTION ===== */}
			<Stack className="about-wide-range">
				<Stack className="wide-range-container" direction="row">
					<Stack className="wide-range-left">
						<Typography className="wide-range-title">Wide Range of Selection</Typography>
						<Typography className="wide-range-desc">
							StyleCasa offers a wide range of furniture options to suit various styles and preferences.
							From sleek and contemporary designs to timeless classics,
						</Typography>
						<Stack className="room-list">
							{['Living Room', 'Bedroom', 'Home Office', 'Professional Office', 'Kitchen Room'].map(
								(room, i) => (
									<Stack
										className={`room-item ${i === 0 ? 'active' : ''}`}
										direction="row"
										justifyContent="space-between"
										alignItems="center"
										key={room}
									>
										<Typography className="room-name">{room}</Typography>
										<ArrowUpwardIcon />
									</Stack>
								),
							)}
						</Stack>
						<Button variant="contained" className="btn-view-collection">
							VIEW ALL COLLECTION
						</Button>
					</Stack>
					<Box className="wide-range-image">
						<img src="/img/furniture/wood_plant.png" alt="Wide Range" />
					</Box>
				</Stack>
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
					{[
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
					].map((review, idx) => (
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
										i < review.stars ? (
											<StarIcon key={i} />
										) : (
											<StarBorderIcon key={i} />
										),
									)}
								</Stack>
								<Typography className="feedback-text">{review.text}</Typography>
							</Stack>
						</Box>
					))}
				</Stack>
			</Stack>

			{/* ===== FEATURES ROW ===== */}
			<Stack className="about-features">
				<Stack className="features-container" direction="row" justifyContent="space-between">
					{[
						{
							icon: '/icons/Delivery_Truck.svg',
							title: 'Free Shipping',
							desc: 'From all orders over $100',
						},
						{
							icon: '/icons/Badge_Dollar.svg',
							title: 'Free Returns',
							desc: 'Return money within 30 days',
						},
						{
							icon: '/icons/Package.svg',
							title: 'Secure Shopping',
							desc: "You're in safe hands",
						},
						{
							icon: '/icons/reward_icon.svg',
							title: 'Best Quality',
							desc: 'We have everything you need',
						},
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

export default withLayoutBasic(About);
