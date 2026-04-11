import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import Top from '../Top';
import Footer from '../Footer';
import Chat from '../Chat';
import { getJwtToken, updateUserInfo } from '../../auth';

const withLayoutHome = (Component: any) => {
	return (props: any) => {
		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		return (
			<Stack id="pc-wrap">
				<Top />
				<Component {...props} />
				<Chat />
				<Footer />
			</Stack>
		);
	};
};

export default withLayoutHome;
