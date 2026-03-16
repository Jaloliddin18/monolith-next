import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../apollo/store';
import { getJwtToken, updateUserInfo, logOut } from '../auth';
import {
	Box,
	Stack,
	Typography,
	IconButton,
	Badge,
	Menu,
	MenuItem,
	Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';

const Top = () => {
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	useEffect(() => {
		const token = getJwtToken();
		if (token) updateUserInfo(token);
	}, []);

	const handleMenuOpen = useCallback((e: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(e.currentTarget);
	}, []);

	const handleMenuClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	const handleLogout = useCallback(() => {
		logOut();
		handleMenuClose();
	}, []);

	return (
		<Stack id="top">
			{/* Top Banner */}
			<Box className="top-banner">
				<Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
					<CardGiftcardOutlinedIcon sx={{ fontSize: 18 }} />
					<Typography variant="body2">
						Enjoy <span className="highlight">30% Off</span> Everything - Shop Now and Save Big!
					</Typography>
				</Stack>
			</Box>

			{/* Main Navbar */}
			<Stack className="navbar" direction="row" alignItems="center" justifyContent="space-between">
				<Stack direction="row" alignItems="center" gap={4}>
					{/* Logo */}
					<Link href="/" className="logo">
						<svg width="50" height="50" viewBox="0 0 50 50" fill="none">
							<path d="M25 5L5 20L25 35L45 20L25 5Z" fill="#a0616a" />
							<path d="M25 20L5 35L25 50L45 35L25 20Z" fill="#7a4a52" />
						</svg>
					</Link>

					{/* Navigation Links */}
					<Stack direction="row" className="nav-links" gap={3}>
						<Link href="/" className={router.pathname === '/' ? 'active' : ''}>
							Home
						</Link>
						<Link href="/furniture" className={router.pathname.includes('/furniture') ? 'active' : ''}>
							Shop
						</Link>
						<Link href="/designers" className={router.pathname.includes('/designers') ? 'active' : ''}>
							Designers
						</Link>
						<Link href="/community" className={router.pathname.includes('/community') ? 'active' : ''}>
							Blog
						</Link>
						<Link href="/about" className={router.pathname.includes('/about') ? 'active' : ''}>
							About
						</Link>
						<Link href="/cs" className={router.pathname.includes('/cs') ? 'active' : ''}>
							Help
						</Link>
					</Stack>
				</Stack>

				{/* Search + Actions */}
				<Stack direction="row" alignItems="center" gap={2}>
					<Box className="search-box">
						<SearchIcon sx={{ fontSize: 20, color: '#999' }} />
						<input type="text" placeholder="search" />
					</Box>

					{user?._id ? (
						<>
							<IconButton onClick={handleMenuOpen}>
								<PersonOutlineIcon />
							</IconButton>
							<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
								<MenuItem onClick={() => { router.push('/mypage'); handleMenuClose(); }}>
									My Page
								</MenuItem>
								<MenuItem onClick={handleLogout}>Logout</MenuItem>
							</Menu>
						</>
					) : (
						<IconButton onClick={() => router.push('/account/join')}>
							<PersonOutlineIcon />
						</IconButton>
					)}

					<IconButton>
						<Badge badgeContent={0} color="primary">
							<FavoriteBorderIcon />
						</Badge>
					</IconButton>

					<IconButton>
						<Badge badgeContent={0} color="primary">
							<ShoppingCartOutlinedIcon />
						</Badge>
					</IconButton>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Top;
