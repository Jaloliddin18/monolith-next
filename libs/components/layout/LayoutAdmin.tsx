import type { ComponentType } from 'react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Stack, Box, Menu, MenuItem } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AdminMenuList from '../admin/AdminMenuList';
import { getJwtToken, logOut, updateUserInfo } from '../../auth';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { REACT_APP_API_URL } from '../../config';
import { MemberType } from '../../enums/member.enum';

const PAGE_TITLES: Record<string, string> = {
	'/_admin': 'Dashboard',
	'/_admin/users': 'Members',
	'/_admin/furnitures': 'Furniture',
	'/_admin/community': 'Articles',
	'/_admin/cs/inquiry': 'CS — 1:1 Inquiry',
	'/_admin/cs/faq': 'CS — FAQ',
	'/_admin/cs/notice': 'CS — Notice',
};

const withAdminLayout = (Component: ComponentType) => {
	return (props: object) => {
		const router = useRouter();
		const user = useReactiveVar(userVar);
		const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
		const [loading, setLoading] = useState(true);

		const pageTitle = PAGE_TITLES[router.pathname] ?? 'Admin';

		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
			setLoading(false);
		}, []);

		useEffect(() => {
			if (!loading && user.memberType !== MemberType.ADMIN) {
				router.push('/').then();
			}
		}, [loading, user]);

		const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
			setAnchorElUser(event.currentTarget);
		};

		const handleCloseUserMenu = () => {
			setAnchorElUser(null);
		};

		const logoutHandler = () => {
			logOut();
		};

		if (loading || user.memberType !== MemberType.ADMIN) return null;

		const avatarSrc =
			user.memberImage && !user.memberImage.startsWith('/icons')
				? `${REACT_APP_API_URL}/${user.memberImage}`
				: '/general_images/default_profile.png';

		return (
			<Stack id="admin-wrap" direction="row">
				{/* Sidebar */}
				<Box component="aside" className="admin-sidebar-wrap">
					<AdminMenuList />
				</Box>

				{/* Main content */}
				<Box component="main" className="admin-main">
					{/* Top bar */}
					<Box className="admin-topbar">
						<Box className="admin-topbar-left">
							<Typography className="admin-page-title">{pageTitle}</Typography>
						</Box>
						<Box className="admin-topbar-right">
							<Tooltip title="Account settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar
										src={avatarSrc}
										alt={user.memberNick}
										sx={{ width: 34, height: 34, border: '2px solid #EEEBE6' }}
									/>
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								anchorEl={anchorElUser}
								anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
								keepMounted
								transformOrigin={{ vertical: 'top', horizontal: 'right' }}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<Box sx={{ width: 200 }} onClick={handleCloseUserMenu}>
									<Stack sx={{ px: '20px', my: '12px' }}>
										<Typography
											sx={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14 }}
										>
											{user.memberNick}
										</Typography>
										<Typography
											sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#787878' }}
										>
											{user.memberPhone}
										</Typography>
									</Stack>
									<Divider />
									<Box sx={{ p: 1, py: '6px' }} onClick={logoutHandler}>
										<MenuItem sx={{ px: '16px', py: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
											Logout
										</MenuItem>
									</Box>
								</Box>
							</Menu>
						</Box>
					</Box>

					{/* Page content */}
					<Box className="admin-content">
						{/*@ts-ignore*/}
						<Component {...props} />
					</Box>
				</Box>
			</Stack>
		);
	};
};

export default withAdminLayout;
