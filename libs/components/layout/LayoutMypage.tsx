import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import Top from '../Top';
import Footer from '../Footer';
import Chat from '../Chat';
import AiChatBubble from '../common/AiChatBubble';
import { getJwtToken, updateUserInfo } from '../../auth';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

const withLayoutMypage = (Component: any) => {
	return (props: any) => {
		const router = useRouter();
		const user = useReactiveVar(userVar);
		const [loading, setLoading] = useState(true);

		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
			setLoading(false);
		}, []);

		useEffect(() => {
			if (!loading && !user._id) {
				router.push('/').then();
			}
		}, [loading, user]);

		if (loading || !user._id) return null;

		return (
			<Stack id="pc-wrap">
				<Top />
				<Stack id="main">
					<Component {...props} />
				</Stack>
				<Chat />
				<AiChatBubble />
				<Footer />
			</Stack>
		);
	};
};

export default withLayoutMypage;
