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

const withAdminLayout = (Component: ComponentType) => {
	return (props: object) => {
		const router = useRouter();
		const user = useReactiveVar(userVar);
		const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
		const [loading, setLoading] = useState(true);

		/** LIFECYCLES **/
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

		/** HANDLERS **/
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

		const avatarSrc = user.memberImage && !user.memberImage.startsWith('/icons')
			? `${REACT_APP_API_URL}/${user.memberImage}`
			: '/general_images/default_profile.png';

		return (
			<Stack id="admin-wrap" direction="row">
				<Box
					component="aside"
					sx={{ width: 240, minHeight: '100vh', background: '#ffffff', flexShrink: 0, borderRight: '1px solid rgba(0,0,0,0.08)' }}
				>
					<AdminMenuList />
				</Box>
				<Box component="main" sx={{ flex: 1, background: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
					<Box className="admin-header" sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', px: 3 }}>
						<Tooltip title="Account settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar src={avatarSrc} alt={user.memberNick} sx={{ width: 36, height: 36 }} />
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
							<Box component={'div'} sx={{ width: 200 }} onClick={handleCloseUserMenu}>
								<Stack sx={{ px: '20px', my: '12px' }}>
									<Typography variant={'h6'} component={'h6'} sx={{ mb: '4px' }}>
										{user.memberNick}
									</Typography>
									<Typography variant={'subtitle1'} component={'p'} color={'#757575'}>
										{user.memberPhone}
									</Typography>
								</Stack>
								<Divider />
								<Box component={'div'} sx={{ p: 1, py: '6px' }} onClick={logoutHandler}>
									<MenuItem sx={{ px: '16px', py: '6px' }}>
										<Typography variant={'subtitle1'} component={'span'}>
											Logout
										</Typography>
									</MenuItem>
								</Box>
							</Box>
						</Menu>
					</Box>
					<Box sx={{ p: '32px 40px' }}>
						{/*@ts-ignore*/}
						<Component {...props} />
					</Box>
				</Box>
			</Stack>
		);
	};
};

export default withAdminLayout;
