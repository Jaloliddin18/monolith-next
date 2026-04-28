import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import Top from '../Top';
import Footer from '../Footer';
import Chat from '../Chat';
import AiChatBubble from '../common/AiChatBubble';
import { getJwtToken, updateUserInfo } from '../../auth';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const withLayoutHome = (Component: any) => {
	return (props: any) => {
		const device = useDeviceDetect();

		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		if (!device) return <div style={{ background: '#FAFAFA', minHeight: '100vh', width: '100%' }} />;

		if (device === 'mobile') {
			return (
				<Stack id="mobile-wrap">
					<Top />
					<Component {...props} />
					<Footer />
				</Stack>
			);
		}

		return (
			<Stack id="pc-wrap">
				<Top />
				<Component {...props} />
				<Chat />
				<AiChatBubble />
				<Footer />
			</Stack>
		);
	};
};

export default withLayoutHome;
