import React from 'react';
import Link from 'next/link';
import { Box, Stack, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
	return (
		<Stack id="footer">
			<Box className="footer-top">
				<Stack className="footer-container" direction="row" justifyContent="space-between" flexWrap="wrap">
					{/* Brand */}
					<Box className="footer-col brand-col">
						<Typography variant="h5" fontWeight={700} mb={2}>
							StyleCasa
						</Typography>
						<Typography variant="body2" color="text.secondary" mb={2}>
							StyleCasa is a premier destination for modern furniture with timeless sophistication.
						</Typography>
						<Stack direction="row" gap={1} className="social-icons">
							<FacebookIcon />
							<TwitterIcon />
							<InstagramIcon />
							<YouTubeIcon />
						</Stack>
					</Box>

					{/* Quick Links */}
					<Box className="footer-col">
						<Typography variant="h6" fontWeight={600} mb={2}>
							Quick Links
						</Typography>
						<Stack gap={1}>
							<Link href="/">Home</Link>
							<Link href="/furniture">Shop</Link>
							<Link href="/community">Blog</Link>
						</Stack>
					</Box>

					{/* Customer Service */}
					<Box className="footer-col">
						<Typography variant="h6" fontWeight={600} mb={2}>
							Customer Service
						</Typography>
						<Stack gap={1}>
							<Link href="/cs">FAQ</Link>
							<Link href="/cs">Shipping & Returns</Link>
							<Link href="/cs">Contact Us</Link>
						</Stack>
					</Box>

					{/* Newsletter */}
					<Box className="footer-col">
						<Typography variant="h6" fontWeight={600} mb={2}>
							Newsletter
						</Typography>
						<Typography variant="body2" color="text.secondary" mb={2}>
							Subscribe to get updates on new arrivals and sales.
						</Typography>
						<Box className="newsletter-form">
							<input type="email" placeholder="Your email address" />
							<button>Subscribe</button>
						</Box>
					</Box>
				</Stack>
			</Box>

			<Box className="footer-bottom">
				<Typography variant="body2" color="text.secondary" textAlign="center">
					© 2024 StyleCasa. All rights reserved.
				</Typography>
			</Box>
		</Stack>
	);
};

export default Footer;
